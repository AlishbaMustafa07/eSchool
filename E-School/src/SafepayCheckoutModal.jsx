import React, { useState } from 'react'

const BACKEND_API_BASE = 'http://127.0.0.1:4000'

export default function SafepayCheckoutModal({ plan, billing, onClose, onPaymentSuccess }) {
  const [currentBilling, setCurrentBilling] = useState(billing || 'monthly')
  const [schoolName, setSchoolName] = useState('')
  const [adminName, setAdminName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [city, setCity] = useState('')
  const [paymentChannel, setPaymentChannel] = useState('card') // 'card', 'wallet', 'bank'
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  if (!plan) return null

  // Pricing calculations
  const isAnnual = currentBilling === 'annual'
  const monthlyRate = plan.key === 'starter' ? 4999 : (plan.key === 'growth' ? 9999 : 19999)
  const annualMonthlyRate = plan.key === 'starter' ? 3999 : (plan.key === 'growth' ? 7999 : 15999)
  const totalAmount = isAnnual ? annualMonthlyRate * 12 : monthlyRate

  const handleCheckout = async (e) => {
    e.preventDefault()
    if (!schoolName.trim() || !email.trim()) {
      setErrorMsg('Please enter both Institution Name and Email Address.')
      return
    }

    setLoading(true)
    setErrorMsg('')

    const payload = {
      plan_key: plan.key,
      billing_cycle: currentBilling,
      school_name: schoolName.trim(),
      admin_name: adminName.trim() || schoolName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      city: city.trim(),
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
        throw new Error(data.error || 'Failed to initialize Safepay checkout session.')
      }

      // Check if simulated/sandbox test or live URL
      if (data.checkout_url) {
        // In local development or sandbox simulation, if tracker is simulated, redirect to success
        if (data.simulated) {
          window.location.href = `/checkout/success?order_id=${encodeURIComponent(data.order_id)}&tracker=${encodeURIComponent(data.tracker)}`
        } else {
          // Open Safepay Hosted Checkout
          window.location.href = data.checkout_url
        }
      } else {
        window.location.href = `/checkout/success?order_id=${encodeURIComponent(data.order_id)}&tracker=${encodeURIComponent(data.tracker)}`
      }
    } catch (err) {
      console.error('Safepay checkout error:', err)
      // Fallback for seamless testing if backend is temporarily unreachable
      setErrorMsg(`Checkout error: ${err.message}. Ensure backend is running at ${BACKEND_API_BASE}.`)
      setLoading(false)
    }
  }

  return (
    <div className="safepay-modal-overlay" role="dialog" aria-modal="true" aria-labelledby="safepay-modal-title">
      <div className="safepay-modal-card">
        <div className="safepay-modal-header">
          <div className="safepay-badge-header">
            <span className="safepay-brand-pill">
              <span className="safepay-dot"></span> Powered by Safepay
            </span>
            <span className="safepay-security-tag">🔒 256-Bit SSL Secured</span>
          </div>
          <button type="button" className="safepay-modal-close" onClick={onClose} aria-label="Close modal">
            ✕
          </button>
        </div>

        <div className="safepay-modal-body">
          <div className="safepay-order-summary">
            <div className="order-summary-row">
              <div>
                <span className="safepay-eyebrow">SUBSCRIBING TO</span>
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
                Monthly
              </button>
              <button
                type="button"
                className={`safepay-toggle-btn ${isAnnual ? 'active' : ''}`}
                onClick={() => setCurrentBilling('annual')}
              >
                Annual <span className="save-badge">Save 20%</span>
              </button>
            </div>
          </div>

          {errorMsg && (
            <div className="safepay-alert-error" role="alert">
              ⚠️ {errorMsg}
            </div>
          )}

          <form onSubmit={handleCheckout} className="safepay-form">
            <div className="form-grid-2">
              <div className="safepay-input-group">
                <label htmlFor="sp-school-name">Institution / School Name *</label>
                <input
                  id="sp-school-name"
                  type="text"
                  required
                  placeholder="e.g. Islamabad Grammar School"
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
                  placeholder="e.g. Dr. Ahmad Khan"
                  value={adminName}
                  onChange={(e) => setAdminName(e.target.value)}
                />
              </div>
            </div>

            <div className="form-grid-3">
              <div className="safepay-input-group">
                <label htmlFor="sp-email">Work Email (for invoice & login) *</label>
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

            <div className="safepay-channels-container">
              <label className="safepay-channels-label">Select Payment Method (via Safepay)</label>
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
            </div>

            <div className="safepay-trust-strip">
              <div className="trust-item">✓ SBP-Regulated EMI Gateway</div>
              <div className="trust-item">✓ Zero Gateway Surcharge</div>
              <div className="trust-item">✓ Instant Campus Activation</div>
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
      </div>
    </div>
  )
}
