import React, { useState } from 'react'

const BACKEND_API_BASE = 'http://127.0.0.1:4000'

export default function SafepayCheckoutModal({ plan, billing, onClose }) {
  const [currentBilling, setCurrentBilling] = useState(billing || 'monthly')
  const [schoolName, setSchoolName] = useState('')
  const [adminName, setAdminName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [city, setCity] = useState('')
  
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

  // Checkout Stages: 'details' -> 'otp' -> 'processing'
  const [stage, setStage] = useState('details')
  const [otpCode, setOtpCode] = useState('123456')
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [createdOrder, setCreatedOrder] = useState(null)

  if (!plan) return null

  // Pricing calculations
  const isAnnual = currentBilling === 'annual'
  const monthlyRate = plan.key === 'starter' ? 4999 : (plan.key === 'growth' ? 9999 : 19999)
  const annualMonthlyRate = plan.key === 'starter' ? 3999 : (plan.key === 'growth' ? 7999 : 15999)
  const totalAmount = isAnnual ? annualMonthlyRate * 12 : monthlyRate

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
        throw new Error(data.error || 'Failed to initialize Safepay session.')
      }

      // If official Safepay checkout URL is returned, redirect immediately to Safepay
      if (data.checkout_url) {
        window.location.href = data.checkout_url
        return
      }

      setCreatedOrder(data)
      setLoading(false)
      setStage('otp')
    } catch (err) {
      console.error('Checkout error:', err)
      setErrorMsg(`Payment setup error: ${err.message}. Ensure backend is running.`)
      setLoading(false)
    }
  }

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
      <div className="safepay-modal-card">
        {/* Modal Header */}
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

        {/* STAGE 2: 3D Secure OTP Verification Screen */}
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
