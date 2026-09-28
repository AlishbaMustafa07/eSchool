import { useState } from 'react'
import './App.css'
import './Reference.css'
import LocalPage from './Pages.jsx'
import './Typography.css'

const features = [
  ['◈', 'Institute profile', 'Customize your institution’s details, logo, and branding.'],
  ['▤', 'Fee management', 'Generate invoices, collect fees, track defaulters, and issue fee slips.'],
  ['◷', 'Attendance', 'Track daily attendance with quick, reliable tools.'],
  ['▦', 'Timetable', 'Design schedules for classes, teachers, weekdays, and rooms.'],
  ['✎', 'Exams & tests', 'Manage marks, create result cards, and share date sheets.'],
  ['♧', 'Parent & student portals', 'Dedicated access for administrators, teachers, students, and parents.'],
  ['▧', 'Admissions', 'Simplify enrollment with automated student account creation.'],
  ['⌁', 'Live classes', 'Run live classes without needing third-party meeting apps.'],
  ['▱', 'Accounts', 'Track income, expenses, and your chart of accounts.'],
  ['▧', 'Question papers', 'Build question banks and create custom question papers.'],
  ['▣', 'ID cards', 'Generate and print student and staff ID cards in bulk.'],
  ['✉', 'Homework', 'Assign and track homework, assignments, and class tasks.'],
  ['⌁', 'SMS & WhatsApp', 'Send school updates and alerts to families.'],
  ['♙', 'Employee management', 'Manage staff records, job letters, payroll, and logins.'],
  ['▣', 'Online store & POS', 'Manage school supplies, products, and point of sale.'],
  ['✧', 'Certificates & reports', 'Create certificates and reports with customizable templates.'],
  ['◎', 'Behavior & skills', 'Monitor learner development and generate detailed reports.'],
]

const highlights = [
  ['◎', 'Made for every role', 'Separate spaces for administrators, teachers, students, and parents.'],
  ['✦', 'Simple by design', 'Clear reports turn everyday school data into useful insights.'],
  ['↗', 'Ready to grow', 'Automate routine work and give your team more time to teach.'],
]

function Brand({ footer = false }) {
  return <a className={`brand ${footer ? 'brand-footer' : ''}`} href="#home" aria-label="Skoolify home"><span className="brand-mark">S</span><span>Skoolify<span className="brand-dot">.</span></span></a>
}

function Dashboard() {
  return (
    <div className="dashboard-wrap" aria-label="Preview of a school management dashboard">
      <div className="orbit orbit-one" /><div className="orbit orbit-two" />
      <div className="float-card float-card-top"><span className="float-icon purple">✓</span><div><b>Attendance marked</b><small>Class 8 · just now</small></div></div>
      <div className="float-card float-card-bottom"><span className="avatar-stack"><i>R</i><i>A</i><i>M</i></span><div><b>Stay in the loop</b><small>Parents & teachers, connected</small></div></div>
      <div className="dashboard">
        <aside className="dash-side"><div className="mini-logo"><span>e</span></div><div className="side-active">▦</div><i>▣</i><i>♧</i><i>◷</i><i>▤</i><i>⚙</i></aside>
        <div className="dash-main">
          <div className="dash-top"><span>Good morning, <b>Alex</b> <span className="wave">✦</span></span><span className="dash-date">⌕　 ◉　 <i>AM</i></span></div>
          <div className="dash-heading"><div><small>MONDAY, 16 SEPTEMBER 2024</small><h3>Dashboard</h3></div><button>＋ &nbsp;Add new</button></div>
          <div className="stat-row"><div className="stat-card"><span className="stat-icon peach">♧</span><small>Total students</small><b>1,284</b><em>↗ 12% this month</em></div><div className="stat-card"><span className="stat-icon lilac">▣</span><small>Present today</small><b>1,176</b><em>↗ 92% attendance</em></div><div className="stat-card"><span className="stat-icon mint">▤</span><small>Fees collected</small><b>$24,680</b><em>↗ 8% this month</em></div></div>
          <div className="dash-lower"><div className="chart-card"><div className="chart-title"><b>Attendance overview</b><small>This week⌄</small></div><div className="chart"><div className="chart-labels"><span>100%</span><span>75%</span><span>50%</span><span>25%</span></div><svg viewBox="0 0 440 130" preserveAspectRatio="none" aria-label="Attendance chart"><defs><linearGradient id="fill" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#9271ed" stopOpacity=".23"/><stop offset="1" stopColor="#9271ed" stopOpacity="0"/></linearGradient></defs><path d="M0 86 C32 76 37 67 70 72 S110 82 142 54 S185 60 212 42 S250 51 281 36 S316 47 348 29 S393 36 440 12 L440 130 L0 130Z" fill="url(#fill)"/><path d="M0 86 C32 76 37 67 70 72 S110 82 142 54 S185 60 212 42 S250 51 281 36 S316 47 348 29 S393 36 440 12" fill="none" stroke="#9271ed" strokeWidth="3" strokeLinecap="round"/></svg></div><div className="chart-days"><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span></div></div><div className="events-card"><div className="chart-title"><b>Today’s classes</b><small>View all &nbsp;→</small></div><div className="event"><i className="event-line violet"/><div><b>Mathematics</b><small>Grade 8 · Room 204</small></div><time>09:00</time></div><div className="event"><i className="event-line coral"/><div><b>English language</b><small>Grade 6 · Room 108</small></div><time>10:30</time></div><div className="event"><i className="event-line blue"/><div><b>General science</b><small>Grade 9 · Lab 02</small></div><time>11:45</time></div></div></div>
        </div>
      </div>
    </div>
  )
}

function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [faqOpen, setFaqOpen] = useState(0)
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [activeReview, setActiveReview] = useState(0)
  const reviews = [
    ['“Skoolify has transformed our administrative processes. Communication and resource management are now wonderfully simple.”', 'Maheshwari Lall', 'School Head · Redhill School'],
    ['“From attendance tracking to parent engagement, our school day runs more smoothly than ever.”', 'Jane Lunnon', 'School Head · Alleyn’s School'],
    ['“It gives me more time for teaching, with the right student information always close at hand.”', 'Jamie Flegg', 'Class Teacher · Wellington College'],
  ]
  return <div id="home">
    <div className="announcement"><span className="announcement-pill">NEW</span> &nbsp; Meet the all-new Skoolify dashboard <a href="#features">Take a look <span>→</span></a><button aria-label="Dismiss announcement" onClick={e => e.currentTarget.parentElement.remove()}>×</button></div>
    <header className="site-header"><div className="nav-shell"><Brand /><button className="mobile-menu" aria-label="Toggle navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? '×' : '☰'}</button><nav className={menuOpen ? 'nav-open' : ''}><div className="nav-dropdown"><a href="#products">Products <span className="chevron">⌄</span></a><div className="nav-popover"><b>Cloud solutions</b><a href="/products/basic">Skoolify Basic <em>Free</em></a><a href="/products/mobile-apps">Mobile apps <em>Free</em></a><a href="/products/desktop">Skoolify Desktop <em className="paid">Paid</em></a><a href="/products/integrations">Integrations <em>Free</em></a><b>Self hosted</b><a href="/products/pro">Skoolify Pro <em className="paid">Paid</em></a><a href="/products/lms">Skoolify LMS <em className="paid">Paid</em></a><a href="/products/cloud-services">Cloud services <em className="paid">Paid</em></a></div></div><div className="nav-dropdown"><a href="#why">Explore <span className="chevron">⌄</span></a><div className="nav-popover nav-popover-small"><a href="/blog">Blogs</a><a href="/features">Features & tools</a><a href="/about">Our story</a></div></div><a href="#features">Features</a><a href="#reviews">Reviews</a><div className="nav-dropdown"><a href="#footer">Support <span className="chevron">⌄</span></a><div className="nav-popover nav-popover-small"><a href="/help">Knowledge base</a><a href="/tutorials">Video tutorials</a><a href="/contact">Support center</a></div></div><a className="login-link" href="/login">Log in</a><a className="button button-nav" href="/signup">Sign up now <span>→</span></a></nav></div></header>
    <main>
      <section className="hero-surface"><div className="hero section-shell"><div className="hero-copy"><div className="eyebrow"><span className="rank-badge">#1</span><span>GLOBALLY RANKED · VERIFIED</span><span className="verified-mark">✓</span></div><h1>Free online school<br/><span className="highlight-word">management<br/>software.</span></h1><p className="hero-description">Manage your school, college, or educational institution seamlessly with Skoolify — completely free for life, with no limitations.</p><div className="hero-actions"><a className="button button-primary" href="/signup">Sign up now <span>→</span></a><a className="watch-link" href="#features"><span className="play-icon">▶</span> Watch how it works</a></div><div className="hero-proof"><div className="proof-avatars"><i>J</i><i>A</i><i>M</i><i>+</i></div><span><b>For schools, colleges, and academies</b><small>Built for school communities</small></span></div></div><div className="hero-visual"><Dashboard /><div className="hero-spark spark-a">✳</div><div className="hero-spark spark-b">✦</div></div></div></section>
      <section className="trust-strip"><div className="trust-inner"><p>Join 125,000+ schools and a galaxy of users</p><div className="school-logos"><span>Schools</span><span>Colleges</span><span>Academies</span><span>Teachers</span><span>Families</span></div></div></section>
      <section id="why" className="why-section section-shell"><div className="section-heading"><span className="section-kicker">WHY CHOOSE SKOOLIFY?</span><h2>A revolution in <span>education management.</span></h2><p>Give your school an intuitive home for daily operations, reporting, communication, and growth.</p></div><div className="highlight-grid">{highlights.map(([icon,title,desc],i)=><article className="highlight-card" key={title}><div className={`highlight-icon hi-${i}`}>{icon}</div><h3>{title}</h3><p>{desc}</p></article>)}</div><div className="standout-panel"><div><span className="section-kicker">WHY SKOOLIFY STANDS OUT</span><p>Keep your school connected with a secure, reliable platform built to scale with your community.</p><a href="/signup">Create your free account <span>→</span></a></div><ul><li>GDPR, CCPA, and ISO 27001 controls</li><li>AES-256 encryption at rest and in transit</li><li>99.9% uptime target and daily off-site backups</li><li>Data centers across seven global regions</li></ul></div><div className="metrics-bar"><div><b>Students</b><small>Records & progress</small></div><i/><div><b>Teachers</b><small>Classes & timetables</small></div><i/><div><b>Families</b><small>Updates & communication</small></div><i/><div className="metric-note"><span>One connected workspace</span><small>Admissions · attendance · fees · results</small></div></div></section>
      <section id="products" className="offer-section section-shell"><div className="offer-heading"><div><span className="section-kicker">WHAT WE OFFER</span><h2>Everything your school needs, <span>all in one place.</span></h2></div><p>Skoolify brings the essentials of school management together in one straightforward platform.</p></div><div className="offer-grid"><article className="offer-card offer-portals"><span className="offer-tag">MULTI-USER ACCESS</span><h3>One platform,<br/>everybody connected.</h3><p>Dedicated spaces for admins, teachers, students, and parents.</p><img src="/illustrations/people.svg" alt="School management portals for staff, students, and parents" loading="lazy"/></article><article className="offer-card offer-chat"><span className="offer-tag">STAY CONNECTED</span><h3>Conversations that<br/>move learning forward.</h3><p>Built-in chat and secure file sharing for your school team.</p><img src="/illustrations/chat.svg" alt="School chat and communication illustration" loading="lazy"/></article><article className="offer-card offer-reports"><span className="offer-tag">COMPREHENSIVE REPORTS</span><h3>See progress<br/>at a glance.</h3><p>Clear reports highlight learner strengths and growth.</p><img src="/illustrations/reports.svg" alt="Student performance report dashboard" loading="lazy"/></article><article className="offer-card offer-sms"><span className="offer-tag">COMMUNICATION TOOLS</span><h3>Keep every family<br/>in the loop.</h3><p>Send school updates through SMS and WhatsApp.</p><img src="/illustrations/messages.svg" alt="SMS messaging tools for school communication" loading="lazy"/></article><article className="offer-card offer-live"><span className="offer-tag">LIVE CLASSES</span><h3>Learning that<br/>travels with you.</h3><p>Run online classes right from your school platform.</p><img src="/illustrations/classroom.svg" alt="Online classroom interface" loading="lazy"/></article></div></section>
      <section id="features" className="features-section section-shell"><div className="section-heading"><span className="section-kicker">A SINGLE STOP SOLUTION</span><h2>Everything in its <span>right place.</span></h2><p>Comprehensive features for every need in school management.</p></div><div className="feature-grid">{features.map(([icon,title,desc],i)=><article className="feature-card" key={title}><span className={`feature-icon feature-${i%4}`}>{icon}</span><h3>{title}</h3><p>{desc}</p><a href="/features" aria-label={`Learn about ${title}`}>↗</a></article>)}</div><a className="button button-outline" href="/features">Explore all features <span>→</span></a></section>
      <section className="quote-section"><div className="quote-inner section-shell"><div className="quote-decoration">“</div><div className="quote-content"><span className="section-kicker">A NOTE FROM OUR COMMUNITY</span><h2>Good things happen when school just <span>works.</span></h2><div className="review-card" id="reviews"><div className="review-stars">★★★★★</div><blockquote>{reviews[activeReview][0]}</blockquote><div className="review-person"><span className={`review-avatar review-${activeReview}`}>{reviews[activeReview][1].slice(0,1)}</span><div><b>{reviews[activeReview][1]}</b><small>{reviews[activeReview][2]}</small></div><div className="review-controls"><button aria-label="Previous review" onClick={()=>setActiveReview((activeReview+reviews.length-1)%reviews.length)}>←</button><button aria-label="Next review" onClick={()=>setActiveReview((activeReview+1)%reviews.length)}>→</button></div></div></div></div><div className="quote-side-art"><div className="testimonial-blob"><span>“</span><b>Better days<br/>start at school.</b><i>✳</i></div><div className="side-spark">✦</div><div className="side-flower">✽</div></div></div></section>
      <section className="faq-section section-shell"><div className="section-heading"><span className="section-kicker">A FEW QUICK ANSWERS</span><h2>Questions? <span>We’re here.</span></h2><p>Learn a little more about Skoolify and getting started.</p></div><div className="faq-list">{[
        ['What is Skoolify?', 'Skoolify is an online school management software and student information system that helps schools, colleges, and academies manage admissions, attendance, exams, results, timetables, and more.'],
        ['Is Skoolify really free?', 'Yes. Skoolify Basic is available free for schools and educational institutions. Optional products and services may have separate pricing.'],
        ['Can Skoolify be used for colleges and universities?', 'Yes. Skoolify supports schools, colleges, universities, and academies of different sizes.'],
        ['Can I manage admissions and attendance online?', 'Yes. You can manage student admissions, keep student records, and track attendance in the school management system.'],
        ['Is Skoolify cloud-based or self-hosted?', 'Both options are available. Choose the hosted cloud solution or explore self-hosted products for your institution.'],
        ['How do I get started?', 'Sign up for an account, verify your email, and configure your school profile to begin setting up your institution.'],
      ].map(([question,answer],i)=><article className={`faq-item ${faqOpen===i?'faq-active':''}`} key={question}><button aria-expanded={faqOpen===i} onClick={()=>setFaqOpen(faqOpen===i?-1:i)}><span>{question}</span><i>{faqOpen===i?'−':'+'}</i></button>{faqOpen===i&&<p>{answer}</p>}</article>)}</div></section>
      <section id="get-started" className="cta-section section-shell"><div className="cta-card"><div className="cta-decoration cta-dots"/><div className="cta-decoration cta-star">✳</div><span className="section-kicker">YOUR NEXT CHAPTER STARTS HERE</span><h2>Ready to transform<br/>your <span>institution?</span></h2><p>With Skoolify, you’re building a brighter future for education.</p><a className="button button-light" href="/signup">Get started today <span>→</span></a><small>Start with Skoolify Basic · Free online school management software</small></div></section>
    </main>
    <footer id="footer" className="site-footer"><div className="footer-inner section-shell"><div className="footer-main"><div className="footer-about"><Brand footer/><p>The world’s #1 free online school management software, helping schools manage everything digitally.</p><div className="social-links"><a href="/blog" aria-label="Skoolify journal">b</a><a href="/features" aria-label="Skoolify features">✦</a><a href="/help" aria-label="Skoolify help">?</a></div></div><div className="footer-column"><b>Information</b><a href="/products">Products</a><a href="/pricing">Plans & pricing</a><a href="/features">Features & tools</a><a href="/about">About Skoolify</a></div><div className="footer-column"><b>Support</b><a href="/help">Knowledge base</a><a href="/tutorials">Video tutorials</a><a href="/blog">Our blogs</a><a href="/contact">Contact us</a></div><div className="footer-newsletter"><b>Get updates from Skoolify</b><p>Subscribe now to be in the know.</p><form onSubmit={e=>{e.preventDefault();if(email.includes('@'))setSubscribed(true)}}><input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email address" required/><button aria-label="Subscribe">→</button></form><small>{subscribed?'Thanks for subscribing!':'By subscribing, you accept our privacy policy.'}</small><a className="footer-contact" href="/contact">Contact the Skoolify team</a></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Skoolify Inc. · All rights reserved.</span><div><a href="/privacy">Privacy</a><a href="/terms">Terms</a><span>103, Oxford House, Manchester, UK</span></div></div></div></footer>
  </div>
}

function App() {
  const path = window.location.pathname.replace(/\/$/, '') || '/'
  return path === '/' ? <HomePage/> : <LocalPage path={path}/>
}

export default App
