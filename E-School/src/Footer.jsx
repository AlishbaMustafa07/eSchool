import { useState } from 'react'
import { Brand } from './Navbar.jsx'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  return (
    <footer id="footer" className="site-footer">
      <div className="footer-inner section-shell">
        <div className="footer-main">
          <div className="footer-about">
            <Brand footer/>
            <p>NovuLabs EduCore is the unified AI School ERP, LMS & Campus Intelligence Suite designed for modern educational institutions.</p>
            <div className="social-links">
              <a href="/blog" aria-label="NovuLabs blog">b</a>
              <a href="/features" aria-label="NovuLabs features">✦</a>
              <a href="/help" aria-label="NovuLabs help">?</a>
            </div>
          </div>
          <div className="footer-column">
            <b>4 Portals</b>
            <a href="/products/basic">Admin Portal</a>
            <a href="/products/desktop">Teacher Portal</a>
            <a href="/products/lms">Student Portal</a>
            <a href="/products/mobile-apps">Parent Portal</a>
          </div>
          <div className="footer-column">
            <b>Platform</b>
            <a href="/features">All 14+ Modules</a>
            <a href="/products/pro">AI Smart Exams</a>
            <a href="/products/integrations">Face Attendance</a>
            <a href="/pricing">SaaS Subscription Plans</a>
            <a href="/about">About NovuLabs</a>
          </div>
          <div className="footer-column">
            <b>Support & Legal</b>
            <a href="/help">Knowledge Base</a>
            <a href="/tutorials">Video Tutorials</a>
            <a href="/contact">Book Demo</a>
            <a href="/ownership">Ownership Statement</a>
            <a href="/refund-policy">Cancellation & Refund</a>
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms & Conditions</a>
          </div>
          <div className="footer-newsletter">
            <b>Campus Insights Newsletter</b>
            <p>Subscribe for updates on AI education, pedagogy, and campus leadership.</p>
            <form onSubmit={e => { e.preventDefault(); if (email.includes('@')) setSubscribed(true) }}>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter work email" required/>
              <button aria-label="Subscribe">→</button>
            </form>
            <small>{subscribed ? 'Thank you for subscribing!' : 'No spam. Unsubscribe at any time.'}</small>
            <a className="footer-contact" href="/contact">Speak with a NovuLabs Consultant</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} NovuLabs EduCore. All rights reserved.</span>
          <div>
            <a href="/ownership">Ownership</a>
            <a href="/refund-policy">Refund Policy</a>
            <a href="/privacy">Privacy</a>
            <a href="/terms">Terms</a>
            <span>Developed with excellence by NovuLabs</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
