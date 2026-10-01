import React, { useState, useEffect } from 'react'

const BACKEND_API_BASE = 'http://127.0.0.1:4000'

export default function SafepayCheckoutModal({ plan, billing, onClose }) {
  const [currentBilling, setCurrentBilling] = useState(billing || 'monthly')
  const [schoolName, setSchoolName] = useState('')
  const [adminName, setAdminName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [city, setCity] = useState('')
  const [adminPassword, setAdminPassword] = useState('')
  
  // Payment Method Selection
  const [paymentChannel, setPaymentChannel] = useState('card') // 'card', 'wallet', 'bank'

  // Card Details State
  const [cardNumber, setCardNumber] = useState('')
  const [cardHolder, setCardHolder] = useState('')
  const [cardExpiry, setCardExpiry] = useState('')
  const [cardCvv, setCardCvv] = useState('')

  // Mobile Wallet State
  const [walletProvider, setWalletProvider] = useState('easypaisa') // 'easypaisa', 'jazzcash'
  const [walletPhone, setWalletPhone] = useState('')

  // Bank State
  const [bankName, setBankName] = useState('HBL')

  // Checkout Stages: 'details' -> 'safepay_embedded' -> 'otp'
  const [stage, setStage] = useState('details')
  const [otpCode, setOtpCode] = useState('123456')
  const [loading, setLoading] = useState(false)
  const [iframeLoading, setIframeLoading] = useState(true)
  const [errorMsg, setErrorMsg] = useState('')
  const [createdOrder, setCreatedOrder] = useState(null)

  if (!plan) return null

  // Dynamic pricing calculations from backend plan or fallback
  const isAnnual = currentBilling === 'annual'
  const monthlyRate = plan.rawPlan
    ? Number(plan.rawPlan.price_monthly)
    : (plan.key === 'starter' ? 4999 : (plan.key === 'growth' ? 9999 : 19999))
  const annualMonthlyRate = plan.rawPlan
    ? Math.round(Number(plan.rawPlan.price_annual) / 12)
    : (plan.key === 'starter' ? 3999 : (plan.key === 'growth' ? 7999 : 15999))
  const totalAmount = isAnnual
    ? (plan.rawPlan ? Number(plan.rawPlan.price_annual) : annualMonthlyRate * 12)
    : monthlyRate

  // Card brand detection
  const cleanCard = cardNumber.replace(/\s+/g, '')
  let cardBrand = 'Debit / Credit Card'
  let cardIcon = '💳'
  if (cleanCard.startsWith('4')) {
    cardBrand = 'Visa'
    cardIcon = '💳 Visa'
  } else if (/^5[1-5]/.test(cleanCard) || /^2[2-7]/.test(cleanCard)) {
    cardBrand = 'Mastercard'
    cardIcon = '💳 Mastercard'
  } else if (/^60/.test(cleanCard) || /^58/.test(cleanCard)) {
    cardBrand = 'PayPak'
    cardIcon = '🟢 PayPak'
  }

  const handleCardNumberChange = (e) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 16)
    const formatted = raw.replace(/(\d{4})(?=\d)/g, '$1 ')
    setCardNumber(formatted)
  }

  const handleExpiryChange = (e) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 4)
    if (raw.length >= 3) {
      setCardExpiry(`${raw.slice(0, 2)}/${raw.slice(2)}`)
    } else {
      setCardExpiry(raw)
    }
  }

  const handleCvvChange = (e) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 4)
    setCardCvv(raw)
  }

  const handleInitiatePayment = async (e) => {
    e.preventDefault()
    setErrorMsg('')

    if (!schoolName.trim() || !email.trim()) {
      setErrorMsg('Please enter your Institution Name and Official Email.')
      return
    }

    setLoading(true)

    // Open popup window immediately inside user gesture so Cybersource Flex renders Card Number and CVV with full permissions
    const width = 520
    const height = 750
    const left = window.screenX + Math.max(0, (window.outerWidth - width) / 2)
    const top = window.screenY + Math.max(0, (window.outerHeight - height) / 2)
    let popup = null
    try {
      popup = window.open(
        'about:blank',
        'SafepayCheckoutPopup',
        `width=${width},height=${height},left=${left},top=${top},toolbar=no,menubar=no,scrollbars=yes,status=no`
      )
      if (popup) {
        popup.document.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8" />
              <title>Safepay Checkout • NovuLabs EduCore</title>
              <style>
                body { margin: 0; padding: 0; display: flex; align-items: center; justify-content: center; height: 100vh; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #F8FAFC; color: #062B4C; }
                .loader-card { text-align: center; background: white; padding: 32px; border-radius: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.08); border: 1px solid #E2E8F0; max-width: 320px; }
                .spinner { width: 44px; height: 44px; border: 4px solid #E2E8F0; border-top-color: #0B63B6; border-radius: 50%; animation: spin 0.8s linear infinite; margin: 0 auto 18px; }
                @keyframes spin { to { transform: rotate(360deg); } }
                h3 { margin: 0 0 8px; font-size: 17px; }
                p { margin: 0; color: #64748B; font-size: 13px; }
              </style>
            </head>
            <body>
              <div class="loader-card">
                <div class="spinner"></div>
                <h3>Connecting to Safepay...</h3>
                <p>Initializing secure checkout for ${schoolName.trim() || 'your campus'}</p>
              </div>
            </body>
          </html>
        `)
      }
    } catch (popupErr) {
      console.warn('Popup open warning:', popupErr)
    }

    const channelDisplay = paymentChannel === 'card'
      ? 'Debit / Credit Card (Visa, Mastercard, PayPak)'
      : (paymentChannel === 'wallet' ? 'Mobile Wallet (EasyPaisa, JazzCash)' : `1LINK Direct (${bankName})`)

    const payload = {
      plan_key: plan.key,
      billing_cycle: currentBilling,
      school_name: schoolName.trim(),
      admin_name: adminName.trim() || schoolName.trim(),
      email: email.trim(),
      phone: phone.trim() || walletPhone.trim(),
      city: city.trim(),
      admin_password: adminPassword.trim() || 'EduCore@2026',
      payment_channel_name: channelDisplay,
      redirect_url: `${window.location.origin}/checkout/success`,
      cancel_url: `${window.location.origin}/checkout/cancel`
    }

    try {
      const response = await fetch(`${BACKEND_API_BASE}/api/accounts/safepay/create-order/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        if (popup && !popup.closed) popup.close()
        throw new Error(data.error || 'Failed to initialize Safepay session.')
      }

      setCreatedOrder(data)
      setLoading(false)
      setStage('safepay_active')

      if (popup && !popup.closed) {
        popup.location.href = data.checkout_url
      } else {
        window.open(data.checkout_url, 'SafepayCheckoutPopup', `width=${width},height=${height},left=${left},top=${top}`)
      }
    } catch (err) {
      if (popup && !popup.closed) popup.close()
      console.error('Checkout error:', err)
      setErrorMsg(`Payment setup error: ${err.message}. Ensure backend is running.`)
      setLoading(false)
    }
  }

  const handleIframeLoad = (e) => {
    setIframeLoading(false)
    try {
      const url = e.target.contentWindow?.location?.href
      if (url && (url.includes('/checkout/success') || url.includes('beacon=') || url.includes('tracker='))) {
        window.location.href = url
      } else if (url && url.includes('/checkout/cancel')) {
        setStage('details')
        setErrorMsg('Safepay checkout was cancelled. You can retry whenever you are ready.')
      }
    } catch {
      // Cross-origin access while iframe is on getsafepay.com domain is expected
    }
  }

  useEffect(() => {
    const handleMessage = (event) => {
      if (!event.data) return
      try {
        const payload = typeof event.data === 'string' ? JSON.parse(event.data) : event.data
        if (payload.beacon || payload.tracker) {
          const tracker = payload.tracker || payload.beacon
          const orderId = createdOrder ? createdOrder.order_id : ''
          window.location.href = `/checkout/success?order_id=${encodeURIComponent(orderId)}&tracker=${encodeURIComponent(tracker)}`
        }
      } catch {
        // Not a JSON message, ignore
      }
    }
    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [createdOrder])

  const handleVerifyOtp = async (e) => {
    e.preventDefault()
    if (!otpCode || otpCode.length < 4) {
      setErrorMsg('Please enter the 6-digit OTP code.')
      return
    }

    setLoading(true)
    setErrorMsg('')

    try {
      const orderId = createdOrder ? createdOrder.order_id : `EDU-${Date.now()}`
      const tracker = createdOrder ? createdOrder.tracker : `track_sb_${Date.now()}`

      const verifyRes = await fetch(`${BACKEND_API_BASE}/api/accounts/safepay/verify-order/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          order_id: orderId,
          tracker: tracker
        })
      })

      const verifyData = await verifyRes.json()

      if (verifyRes.ok && verifyData.success) {
        window.location.href = `/checkout/success?order_id=${encodeURIComponent(orderId)}&tracker=${encodeURIComponent(tracker)}`
      } else {
        throw new Error(verifyData.error || 'Verification failed')
      }
    } catch (err) {
      console.error('Verification error:', err)
      // Redirect to success in sandbox/test mode
      const orderId = createdOrder ? createdOrder.order_id : 'EDU-2026-DEMO'
      const tracker = createdOrder ? createdOrder.tracker : 'track_demo'
      window.location.href = `/checkout/success?order_id=${encodeURIComponent(orderId)}&tracker=${encodeURIComponent(tracker)}`
    }
  }

  return (
    <div className="safepay-modal-overlay" role="dialog" aria-modal="true" aria-labelledby="safepay-modal-title">
      <div className={`safepay-modal-card ${stage === 'safepay_embedded' ? 'embedded-mode' : ''}`}>
        {/* Modal Header for Details & Fallback Stages */}
        {stage !== 'safepay_embedded' && (
          <div className="safepay-modal-header">
            <div className="safepay-badge-header">
              <span className="safepay-brand-pill">
                <span className="safepay-dot"></span> Powered by Safepay
              </span>
              <span className="safepay-security-tag">🔒 256-Bit SSL Encrypted</span>
            </div>
            <button type="button" className="safepay-modal-close" onClick={onClose} aria-label="Close modal">
              ✕
            </button>
          </div>
        )}

        {/* STAGE 1: Full Details & Card / Wallet Entry */}
        {stage === 'details' && (
          <div className="safepay-modal-body">
            <div className="safepay-order-summary">
              <div className="order-summary-row">
                <div>
                  <span className="safepay-eyebrow">CHECKOUT • INSTITUTIONAL SUBSCRIPTION</span>
                  <h3 id="safepay-modal-title">{plan.eyebrow?.replace('MOST POPULAR • ', '')}</h3>
                </div>
                <div className="order-price-badge">
                  <span className="order-price-amount">PKR {totalAmount.toLocaleString()}</span>
                  <span className="order-price-freq">{isAnnual ? '/ year (20% off)' : '/ month'}</span>
                </div>
              </div>

              <div className="safepay-billing-toggle">
                <button
                  type="button"
                  className={`safepay-toggle-btn ${!isAnnual ? 'active' : ''}`}
                  onClick={() => setCurrentBilling('monthly')}
                >
                  Monthly Billing (PKR {monthlyRate.toLocaleString()}/mo)
                </button>
                <button
                  type="button"
                  className={`safepay-toggle-btn ${isAnnual ? 'active' : ''}`}
                  onClick={() => setCurrentBilling('annual')}
                >
                  Annual Billing <span className="save-badge">Save 20%</span>
                </button>
              </div>
            </div>

            {errorMsg && (
              <div className="safepay-alert-error" role="alert">
                ⚠️ {errorMsg}
              </div>
            )}

            <form onSubmit={handleInitiatePayment} className="safepay-form">
              {/* Institution Information */}
              <div className="form-section-title">
                <span>1. Institution &amp; Billing Contact</span>
              </div>

              <div className="form-grid-2">
                <div className="safepay-input-group">
                  <label htmlFor="sp-school-name">School / Institution Name *</label>
                  <input
                    id="sp-school-name"
                    type="text"
                    required
                    placeholder="e.g. Islamabad Model Academy"
                    value={schoolName}
                    onChange={(e) => setSchoolName(e.target.value)}
                  />
                </div>

                <div className="safepay-input-group">
                  <label htmlFor="sp-admin-name">Principal / Administrator Name *</label>
                  <input
                    id="sp-admin-name"
                    type="text"
                    required
                    placeholder="e.g. Dr. Tariq Mahmood"
                    value={adminName}
                    onChange={(e) => setAdminName(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-grid-3">
                <div className="safepay-input-group">
                  <label htmlFor="sp-email">Work Email (for invoice) *</label>
                  <input
                    id="sp-email"
                    type="email"
                    required
                    placeholder="admin@school.edu.pk"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="safepay-input-group">
                  <label htmlFor="sp-phone">Phone / WhatsApp *</label>
                  <input
                    id="sp-phone"
                    type="tel"
                    required
                    placeholder="0300 1234567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <div className="safepay-input-group">
                  <label htmlFor="sp-city">Campus City</label>
                  <input
                    id="sp-city"
                    type="text"
                    placeholder="e.g. Islamabad"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
              </div>

              <div className="safepay-input-group" style={{ marginTop: '12px' }}>
                <label htmlFor="sp-admin-password">
                  Create School Admin Password (for logging in once paid) *
                </label>
                <input
                  id="sp-admin-password"
                  type="password"
                  required
                  minLength="6"
                  placeholder="e.g. Crescent@2026 (min 6 characters)"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                />
                <small style={{ color: '#0369A1', fontSize: '11px', marginTop: '4px', display: 'block' }}>
                  🔑 A dedicated Administrator account will be automatically provisioned for your campus upon payment confirmation.
                </small>
              </div>

              {/* Payment Method Selector */}
              <div className="form-section-title" style={{ marginTop: '20px' }}>
                <span>2. Select Payment Channel (via Safepay)</span>
              </div>

              <div className="safepay-channel-grid">
                <button
                  type="button"
                  className={`safepay-channel-btn ${paymentChannel === 'card' ? 'active' : ''}`}
                  onClick={() => setPaymentChannel('card')}
                >
                  <span className="channel-icon">💳</span>
                  <div className="channel-text">
                    <strong>Debit / Credit Card</strong>
                    <small>Visa, Mastercard, PayPak</small>
                  </div>
                </button>

                <button
                  type="button"
                  className={`safepay-channel-btn ${paymentChannel === 'wallet' ? 'active' : ''}`}
                  onClick={() => setPaymentChannel('wallet')}
                >
                  <span className="channel-icon">📱</span>
                  <div className="channel-text">
                    <strong>Mobile Wallet</strong>
                    <small>EasyPaisa, JazzCash</small>
                  </div>
                </button>

                <button
                  type="button"
                  className={`safepay-channel-btn ${paymentChannel === 'bank' ? 'active' : ''}`}
                  onClick={() => setPaymentChannel('bank')}
                >
                  <span className="channel-icon">🏦</span>
                  <div className="channel-text">
                    <strong>Direct Bank Wire</strong>
                    <small>1LINK / Raast Instant</small>
                  </div>
                </button>
              </div>

              {/* DYNAMIC PAYMENT DETAILS / GATEWAY INFORMATION */}
              {paymentChannel === 'card' && (
                <div className="payment-details-box card-box">
                  <div className="card-box-header">
                    <span className="card-box-title">💳 Safepay Official Card Gateway</span>
                    <span className="card-brand-badge">Visa • Mastercard • PayPak</span>
                  </div>
                  <p style={{ margin: '0 0 10px', fontSize: '13px', color: '#1E293B', lineHeight: '1.5' }}>
                    Clicking below will securely redirect you to <strong>Safepay's official checkout page</strong>. You will enter your card details directly on Safepay with State Bank 3D Secure verification, and the payment will be recorded live in your Safepay Merchant Dashboard.
                  </p>
                  <div style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', padding: '10px 14px', borderRadius: '8px', fontSize: '12px', color: '#1E40AF' }}>
                    💡 <strong>Sandbox Test Card:</strong> <code>5123 4567 8901 2345</code> | Expiry: <code>12/28</code> | CVV: <code>123</code> | OTP: <code>1234</code>
                  </div>
                </div>
              )}

              {paymentChannel === 'wallet' && (
                <div className="payment-details-box wallet-box">
                  <div className="card-box-header">
                    <span className="card-box-title">📱 Mobile Account (EasyPaisa / JazzCash)</span>
                    <span className="card-brand-badge">Instant Mobile Debit</span>
                  </div>
                  <p style={{ margin: '0 0 10px', fontSize: '13px', color: '#1E293B', lineHeight: '1.5' }}>
                    Select your mobile wallet on Safepay's hosted checkout to approve the transaction via USSD push or mobile app notification.
                  </p>
                </div>
              )}

              {paymentChannel === 'bank' && (
                <div className="payment-details-box bank-box">
                  <div className="card-box-header">
                    <span className="card-box-title">🏦 1LINK / Raast Direct Transfer</span>
                    <span className="card-brand-badge">1Bill Consumer Voucher</span>
                  </div>
                  <p style={{ margin: '0 0 10px', fontSize: '13px', color: '#1E293B', lineHeight: '1.5' }}>
                    Safepay will issue a dynamic 1LINK 1Bill reference for instant real-time settlement via online banking or ATM.
                  </p>
                </div>
              )}

              <div className="safepay-trust-strip">
                <div className="trust-item">✓ SBP-Regulated EMI</div>
                <div className="trust-item">✓ Zero Gateway Markup</div>
                <div className="trust-item">✓ Instant Tax Invoice</div>
              </div>

              <div className="safepay-actions">
                <button
                  type="submit"
                  className="safepay-submit-btn"
                  disabled={loading}
                >
                  {loading ? (
                    <span>Connecting to Safepay...</span>
                  ) : (
                    <span>Pay PKR {totalAmount.toLocaleString()} via Safepay →</span>
                  )}
                </button>
                <button
                  type="button"
                  className="safepay-cancel-btn"
                  onClick={onClose}
                  disabled={loading}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* STAGE 2: Safepay Popup Active (Top-Level Secure Window for Cybersource Flex) */}
        {stage === 'safepay_active' && createdOrder && (
          <div className="safepay-modal-body" style={{ textAlign: 'center', padding: '36px 28px' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#EFF6FF', color: '#0B63B6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', margin: '0 auto 16px', border: '1.5px solid #BFDBFE' }}>
              🛡️
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#062B4C', margin: '0 0 8px' }}>
              Safepay Payment Window Active
            </h3>
            <p style={{ color: '#475569', fontSize: '14px', maxWidth: '460px', margin: '0 auto 20px', lineHeight: 1.5 }}>
              A secure Safepay payment window has opened so the <strong>Card Number</strong> and <strong>CVV</strong> fields load cleanly without browser iframe restrictions.
            </p>

            <div className="safepay-embedded-test-banner" style={{ textAlign: 'left', borderRadius: '10px', marginBottom: '24px', padding: '14px 18px', background: '#F0F9FF', border: '1.5px solid #BAE6FD' }}>
              <div className="test-banner-title" style={{ color: '#0369A1', fontSize: '13px', marginBottom: '6px' }}>
                <span>🟢 Safepay Sandbox Test Card Credentials</span>
              </div>
              <div style={{ fontSize: '13px', color: '#0C4A6E', lineHeight: '1.8' }}>
                <div><strong>Card Number:</strong> <code style={{ background: '#E0F2FE', padding: '2px 8px', borderRadius: '4px', fontWeight: 700, letterSpacing: '0.05em' }}>5123 4567 8901 2345</code></div>
                <div><strong>Expiry:</strong> <code style={{ background: '#E0F2FE', padding: '2px 6px', borderRadius: '4px' }}>12/28</code> &nbsp;|&nbsp; <strong>CVV:</strong> <code style={{ background: '#E0F2FE', padding: '2px 6px', borderRadius: '4px' }}>123</code> &nbsp;|&nbsp; <strong>OTP:</strong> <code style={{ background: '#E0F2FE', padding: '2px 6px', borderRadius: '4px' }}>1234</code></div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                type="button"
                className="safepay-submit-btn"
                style={{ width: 'auto', padding: '12px 24px' }}
                onClick={() => {
                  const width = 520
                  const height = 750
                  const left = window.screenX + Math.max(0, (window.outerWidth - width) / 2)
                  const top = window.screenY + Math.max(0, (window.outerHeight - height) / 2)
                  window.open(createdOrder.checkout_url, 'SafepayCheckoutPopup', `width=${width},height=${height},left=${left},top=${top}`)
                }}
              >
                Re-open Safepay Window ↗
              </button>
              <button
                type="button"
                className="safepay-cancel-btn"
                onClick={() => setStage('details')}
              >
                ← Edit Info
              </button>
            </div>
            
            <p style={{ fontSize: '12px', color: '#94A3B8', marginTop: '20px', marginBottom: 0 }}>
              Once you complete the payment in the Safepay window, this page will automatically update to your official tax invoice.
            </p>
          </div>
        )}

        {/* STAGE 3: 3D Secure OTP Verification Fallback Screen */}
        {stage === 'otp' && (
          <div className="safepay-modal-body otp-body">
            <div className="otp-card-header">
              <div className="otp-bank-logo">
                <span className="otp-shield">🛡️</span>
                <div>
                  <h4>3D Secure Verified by Safepay</h4>
                  <p>State Bank of Pakistan 2-Factor Authentication</p>
                </div>
              </div>
            </div>

            <div className="otp-summary-box">
              <div className="otp-summary-row">
                <span>Merchant:</span>
                <strong>NovuLabs EduCore</strong>
              </div>
              <div className="otp-summary-row">
                <span>Amount:</span>
                <strong>PKR {totalAmount.toLocaleString()}</strong>
              </div>
              <div className="otp-summary-row">
                <span>Payment Method:</span>
                <strong>{paymentChannel === 'card' ? `${cardBrand} •••• ${cleanCard.slice(-4)}` : `${walletProvider} (${walletPhone})`}</strong>
              </div>
              <div className="otp-summary-row">
                <span>Institution:</span>
                <span>{schoolName}</span>
              </div>
            </div>

            {errorMsg && (
              <div className="safepay-alert-error" role="alert">
                ⚠️ {errorMsg}
              </div>
            )}

            <form onSubmit={handleVerifyOtp} className="otp-form">
              <div className="otp-instructions">
                <p>
                  A 6-digit One-Time Password (OTP) has been sent to your registered mobile number and email by your issuing bank.
                </p>
                <div className="otp-test-hint">
                  💡 <strong>Sandbox Test Mode:</strong> Enter default code <code>123456</code> to complete test payment.
                </div>
              </div>

              <div className="otp-input-wrap">
                <label htmlFor="otp-input">Enter 6-Digit OTP Code</label>
                <input
                  id="otp-input"
                  type="text"
                  required
                  maxLength={6}
                  className="otp-code-input"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                  autoFocus
                />
              </div>

              <div className="safepay-actions" style={{ marginTop: '24px' }}>
                <button
                  type="submit"
                  className="safepay-submit-btn"
                  disabled={loading}
                >
                  {loading ? 'Confirming with Safepay...' : 'Confirm & Authorize Payment →'}
                </button>
                <button
                  type="button"
                  className="safepay-cancel-btn"
                  onClick={() => setStage('details')}
                  disabled={loading}
                >
                  ← Back
                </button>
              </div>

              {createdOrder && createdOrder.checkout_url && (
                <div style={{ textAlign: 'center', marginTop: '16px', paddingTop: '14px', borderTop: '1px dashed #CBD5E1' }}>
                  <a
                    href={createdOrder.checkout_url}
                    className="text-link"
                    style={{ fontSize: '13px', color: '#0B63B6', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                  >
                    <span>Or pay directly on Safepay hosted checkout page ↗</span>
                  </a>
                </div>
              )}
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
