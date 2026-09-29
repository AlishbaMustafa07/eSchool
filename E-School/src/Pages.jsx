import { useMemo, useState } from 'react'
import './Pages.css'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'

const productPages = {
  '/products/basic': {
    title: 'Admin & Principal Command Center',
    label: 'PORTAL 01 • CAMPUS LEADERSHIP',
    intro: 'A centralized mission control workspace for school principals, vice-principals, and campus registrars.',
    points: [
      'Onsite admissions pipeline and student enrollment',
      'Master class timetable scheduling and teacher substitution matrix',
      'Digital library barcode circulation and cataloging',
      'Campus-wide headcount analytics and encrypted chat monitoring'
    ],
    action: 'Schedule Admin Portal Walkthrough'
  },
  '/products/desktop': {
    title: 'Teacher Workspace & Cockpit',
    label: 'PORTAL 02 • FACULTY EXCELLENCE',
    intro: 'A distraction-free, focused environment designed to free educators from clerical paperwork.',
    points: [
      '15-second rapid digital attendance grid with auto-save',
      'AI Question & Smart Exam Generator calibrated to Bloom’s Taxonomy',
      'Digital daily diary logs synced directly to parent WhatsApp',
      'Rubric-based homework grading and personalized student annotations'
    ],
    action: 'Explore Teacher Cockpit'
  },
  '/products/lms': {
    title: 'Student Learning & Skills Hub',
    label: 'PORTAL 03 • LEARNER EXPERIENCE',
    intro: 'An interactive, clean digital learning environment built for student curiosity and self-paced achievement.',
    points: [
      'Next-Gen LMS with digital video lectures and syllabus milestones',
      'Homework submissions with deadline countdowns and feedback',
      'Ayah-level Quranic Hifz tracker and Islamic Studies progress',
      'STEAM and Future Skills portfolio with unlockable badges'
    ],
    action: 'View Student Hub Demo'
  },
  '/products/mobile-apps': {
    title: 'Parent Companion & WhatsApp Alerts',
    label: 'PORTAL 04 • FAMILY ENGAGEMENT',
    intro: 'Keep parents informed with real-time gate attendance alerts, daily homework diary, and direct teacher communication.',
    points: [
      'Instant WhatsApp/push alert when student scans badge at gate',
      'Daily homework diary with teacher notes and subject remarks',
      'Parent-Teacher Meeting (PTM) scheduling and feedback tracking',
      'Direct, respectful messaging channel with subject teachers'
    ],
    action: 'Explore Parent Companion'
  },
  '/products/pro': {
    title: 'AI Smart Exam & Assessment Engine',
    label: 'AI INTELLIGENCE MODULE',
    intro: 'Save faculty dozens of hours every exam cycle with AI-generated questions aligned with Bloom’s Taxonomy.',
    points: [
      'Bloom’s Taxonomy-calibrated question generator (MCQs, structured theory, rubrics)',
      'Syllabus & chapter-specific question generation with difficulty controls',
      'Automated marking keys, grading rubrics, and answer explanations',
      'Official PDF report card generator with custom grading scales and school crest'
    ],
    action: 'Try AI Exam Generator'
  },
  '/products/integrations': {
    title: 'Smart Attendance & Facial Recognition',
    label: 'CAMPUS HARDWARE & GATE LOGISTICS',
    intro: 'Hardware-agnostic campus attendance supporting facial recognition, QR student badges, and RFID turnstiles.',
    points: [
      'Real-time facial recognition attendance for touchless gate flow',
      'QR badge scanning using any smartphone camera or tablet',
      'Direct hardware integration with ZKTeco, Hikvision, and RFID gates',
      'Instant sub-second WhatsApp notification delivery to parents'
    ],
    action: 'Discuss Attendance Setup'
  },
  '/products/cloud-services': {
    title: 'Enterprise Cloud & Institutional Security',
    label: 'INFRASTRUCTURE & 99.95% SLA',
    intro: 'High-availability cloud infrastructure with strict data encryption, multi-tenant isolation, and dedicated support.',
    points: [
      'AES-256 data encryption at rest and TLS 1.3 in transit',
      'Guaranteed 99.95% cloud uptime Service Level Agreement',
      'Daily automated off-site backups with point-in-time recovery',
      'Free turnkey data migration from spreadsheets and legacy software'
    ],
    action: 'Plan Campus Cloud Deployment'
  },
}

const featureItems = [
  ['AI Smart Exams', 'Generate Bloom’s Taxonomy-calibrated question papers, MCQs, structured theory, and automated grading keys.'],
  ['Smart Face Attendance', 'Rapid attendance tracking with facial recognition, student QR badges, and 15-second teacher grid.'],
  ['Digital Daily Diary', 'Assign daily homework, notes, and remarks with automated real-time parent WhatsApp delivery.'],
  ['Islamic Studies & Hifz', 'Ayah-level Quranic Hifz tracker (Sabaq, Sabqi, Manzil), Tajweed fluency metrics, and Salah logs.'],
  ['Next-Gen LMS', 'Stream video lectures, upload syllabus milestones, attach lesson slides, and track course completion heatmaps.'],
  ['Onsite Admissions', 'Manage incoming applications, entrance assessments, document verification, and one-click student enrollment.'],
  ['Timetable & Scheduling', 'Automated period scheduling, conflict-free classroom allocation, and rapid teacher substitution matrix.'],
  ['Homework & Assignments', 'Distribute multimedia assignments with submission countdowns, teacher markup, and rubric grading.'],
  ['Digital Library', 'Complete cataloging, ISBN lookup, barcode circulation, due date tracking, and digital resource lending.'],
  ['STEAM & Future Skills', 'Nurture coding, robotics, public speaking, and 21st-century learner competencies with achievement badges.'],
  ['PTM Management', 'Schedule and track structured parent-teacher conferences, student progress logs, and action items.'],
  ['Academic Reports', 'In-depth multi-board report cards, student percentile radar charts, and Cambridge/National standard compliance.'],
  ['Encrypted Campus Chat', 'Role-scoped secure instant messaging between teachers, parents, and administrative leadership with chat monitoring.'],
  ['Staff & Faculty HR', 'Organize teacher profiles, subject assignments, department quotas, and faculty attendance.'],
]

const articles = [
  ['How AI Exam Generators Save Teachers 12+ Hours Every Exam Week', 'A look into how Bloom’s Taxonomy calibrated AI questions improve test rigor while cutting faculty preparation time.', 'AI in Education'],
  ['Touchless School Gate Safety: Facial Attendance & Instant Parent WhatsApp', 'How modern schools are combining facial recognition with automated parental notifications for foolproof campus security.', 'Campus Operations'],
  ['Integrating Tarbiyah & Hifz into Modern School Academics', 'Why forward-thinking Islamic academies are adopting Ayah-by-Ayah memorization tracking alongside Cambridge curricula.', 'Faith & Values'],
]

const faqs = [
  ['What is NovuLabs EduCore?', 'NovuLabs EduCore is an integrated, next-generation AI School ERP, LMS, and Campus Intelligence Suite connecting administrators, teachers, students, and parents.'],
  ['What are the 4 dedicated portals?', 'EduCore provides 4 purpose-built portals: Admin Portal for campus management and admissions; Teacher Portal for rapid attendance, AI exams, and diary; Student Portal for video courses, assignments, and skills; and Parent Portal for live attendance, diary logs, PTMs, and direct teacher chat.'],
  ['How does the AI Question Generator work?', 'Our assessment engine is calibrated against national curricula and Bloom’s Taxonomy. Teachers can specify subject, grade, chapter, cognitive difficulty, and format (MCQ, structured theory, or oral rubrics).'],
  ['Do we need specialized biometric hardware for attendance?', 'No. EduCore supports facial recognition, QR code badges on student IDs, and standard RFID readers. Teachers can also mark attendance in 15 seconds using our intuitive manual grid.'],
  ['What is the Islamic Studies and Tarbiyah module?', 'This proprietary module includes an Ayah-level Hifz tracker (Sabaq, Sabqi, Manzil), Tajweed progress indicators, daily prayer (Salah) habit checks, and holistic Islamic Akhlaq character scoring.'],
  ['Can we customize report cards to match our board requirements?', 'Yes. EduCore includes an automated PDF report card generator supporting custom school crests, principal signatures, letterhead styling, dual-language headings, and custom grading scales.'],
  ['How fast can our school onboard and migrate data?', 'Most schools complete full onboarding in under 48 hours. NovuLabs provides automated CSV/Excel import tools and dedicated implementation support.'],
]

function Layout({ children }) {
  return (
    <div className="local-page">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  )
}

function ContactForm({ type = 'contact' }) {
  const [sent, setSent] = useState(false)
  const isAccount = type === 'signup' || type === 'login'
  return (
    <form className="local-form" onSubmit={e => { e.preventDefault(); setSent(true) }}>
      {type === 'signup' && <label>School / Campus Name<input required placeholder="e.g. Crescent International School"/></label>}
      {type === 'contact' && <label>Your Name<input required placeholder="Principal / Administrator Name"/></label>}
      <label>Email Address<input required type="email" placeholder="principal@school.edu"/></label>
      {type === 'login' && <label>Password<input required type="password" placeholder="Enter password" minLength="6"/></label>}
      {type === 'signup' && (
        <label>Your Role
          <select defaultValue="">
            <option value="" disabled>Select role</option>
            <option>School Administrator / Principal</option>
            <option>Academic Director / Coordinator</option>
            <option>Faculty / Teacher</option>
            <option>IT / Systems Head</option>
          </select>
        </label>
      )}
      {type === 'contact' && (
        <label>Campus Requirements
          <textarea required placeholder="Tell us about your campus size, curricula (Cambridge/National), and key goals." rows="4"/>
        </label>
      )}
      <button className="local-button" type="submit">
        {type === 'login' ? 'Sign In to Portal' : type === 'signup' ? 'Request Institutional Demo' : 'Send Message'} <span>→</span>
      </button>
      {sent && (
        <p className="form-note">
          {isAccount
            ? 'Thank you! Your institutional demo request has been received. A NovuLabs EduCore specialist will contact you shortly.'
            : 'Thank you! Your inquiry has been sent to our campus engineering team.'}
        </p>
      )}
    </form>
  )
}

function ProductPage({ data }) {
  return (
    <Layout>
      <section className="local-hero">
        <span className="local-eyebrow">{data.label}</span>
        <h1>{data.title}</h1>
        <p>{data.intro}</p>
        <a className="local-button" href="/contact">{data.action} <span>→</span></a>
        <div className="product-visual">
          <div className="product-visual-sidebar">E<br/>▦<br/>◷<br/>✎</div>
          <div>
            <small>CAMPUS DASHBOARD PREVIEW</small>
            <h3>Real-time operations, standardized.</h3>
            <div className="product-metrics">
              <span><b>Enrolled</b><strong>1,284</strong></span>
              <span><b>Attendance</b><strong>97.2%</strong></span>
              <span><b>Syllabus</b><strong>84%</strong></span>
            </div>
            <div className="product-chart"><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/></div>
          </div>
        </div>
      </section>
      <section className="local-content">
        <div className="local-section-heading">
          <span className="local-eyebrow">KEY CAPABILITIES</span>
          <h2>Engineered for academic precision and zero friction.</h2>
        </div>
        <div className="local-card-grid">
          {data.points.map((point, i) => (
            <article className="local-card" key={point}>
              <span className="local-card-icon">{['✓', '▦', '◷', '✦'][i % 4]}</span>
              <h3>{point}</h3>
              <p>Designed to provide maximum transparency, automation, and speed for your faculty and administration.</p>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  )
}

function FormPage({ path }) {
  const isSignup = path === '/signup'
  const isLogin = path === '/login'
  const title = isSignup ? 'Schedule a 1-on-1 Campus Demo' : isLogin ? 'Sign In to EduCore Portal' : 'Contact NovuLabs EduCore Team'
  const subtitle = isSignup
    ? 'See how NovuLabs EduCore can transform your school’s examinations, attendance, and LMS in under 48 hours.'
    : isLogin
    ? 'Access your dedicated Admin, Teacher, Student, or Parent workspace.'
    : 'Have questions about onboarding, biometric integrations, or pricing? We are here to help.'

  return (
    <Layout>
      <section className="form-page">
        <div>
          <span className="local-eyebrow">{isSignup ? 'CAMPUS PILOT' : isLogin ? 'WORKSPACE LOGIN' : 'GET IN TOUCH'}</span>
          <h1>{title}</h1>
          <p>{subtitle}</p>
          {isLogin && <p className="form-note">Use your institutional credentials provided by your campus administrator.</p>}
        </div>
        <ContactForm type={isSignup ? 'signup' : isLogin ? 'login' : 'contact'}/>
      </section>
    </Layout>
  )
}

function FeaturesPage() {
  return (
    <Layout>
      <section className="local-page-heading">
        <span className="local-eyebrow">NOVULABS EDUCORE ARCHITECTURE</span>
        <h1>14+ Modules for modern education.</h1>
        <p>Explore the complete suite of academic, operational, AI, and values-based tools built into EduCore.</p>
      </section>
      <section className="local-content">
        <div className="local-card-grid">
          {featureItems.map(([title, desc], i) => (
            <article className="local-card" key={title}>
              <span className="local-card-icon">{['▦', '◷', '✎', '⌁', '♧', '◈'][i % 6]}</span>
              <h3>{title}</h3>
              <p>{desc}</p>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  )
}

function ProductsPage() {
  return (
    <Layout>
      <section className="local-page-heading">
        <span className="local-eyebrow">4 DEDICATED PORTALS & MODULES</span>
        <h1>Workspaces that fit every role in your institution.</h1>
        <p>Explore purpose-built interfaces for Principals, Teachers, Students, and Parents.</p>
      </section>
      <section className="local-content">
        <div className="local-card-grid">
          {Object.entries(productPages).map(([path, product]) => (
            <article className="local-card" key={path}>
              <span className="local-eyebrow">{product.label}</span>
              <h3>{product.title}</h3>
              <p>{product.intro}</p>
              <a className="text-link" href={path}>Explore portal →</a>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  )
}

function BlogPage({ path }) {
  const slug = path.split('/')[2]
  const article = articles.find(item => item[0].toLowerCase().replaceAll(' ', '-').replace(/[^a-z0-9-]/g, '') === slug)
  if (article) {
    return (
      <Layout>
        <article className="article-page">
          <span className="local-eyebrow">{article[2]} • NOVULABS JOURNAL</span>
          <h1>{article[0]}</h1>
          <p className="article-lead">{article[1]}</p>
          <p>Modern education demands tools that respect teacher time, enhance academic rigor, and keep parents closely informed. Rather than juggling disparate spreadsheets and multiple disconnected apps, forward-thinking institutions are uniting under single, AI-powered suites.</p>
          <p>NovuLabs EduCore was purpose-built from the ground up to solve these friction points—bringing AI examinations, touchless attendance, Tarbiyah tracking, and unified role portals into a single institutional standard.</p>
          <a className="text-link" href="/blog">← Back to all articles</a>
        </article>
      </Layout>
    )
  }

  return (
    <Layout>
      <section className="local-page-heading">
        <span className="local-eyebrow">CAMPUS INSIGHTS & PEDAGOGY</span>
        <h1>Ideas for progressive school leadership.</h1>
        <p>Practical articles on AI in education, campus safety, and values-based curriculum management.</p>
      </section>
      <section className="local-content">
        <div className="local-card-grid">
          {articles.map(([title, desc, category]) => (
            <article className="local-card blog-card" key={title}>
              <span className="local-eyebrow">{category}</span>
              <h3>{title}</h3>
              <p>{desc}</p>
              <a className="text-link" href={`/blog/${title.toLowerCase().replaceAll(' ', '-').replace(/[^a-z0-9-]/g, '')}`}>Read article →</a>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  )
}

function HelpPage({ path }) {
  const isTutorial = path === '/tutorials'
  const [query, setQuery] = useState('')
  const shownFaqs = useMemo(() => faqs.filter(([q, a]) => `${q} ${a}`.toLowerCase().includes(query.toLowerCase())), [query])

  return (
    <Layout>
      <section className="local-page-heading">
        <span className="local-eyebrow">{isTutorial ? 'VIDEO WALKTHROUGHS' : 'HELP & KNOWLEDGE BASE'}</span>
        <h1>{isTutorial ? 'Master NovuLabs EduCore step by step.' : 'How can we help your campus?'}</h1>
        <p>{isTutorial ? 'Quick video guides for setting up attendance, generating AI exams, and managing portals.' : 'Find answers about EduCore implementation, security, and features.'}</p>
        {!isTutorial && (
          <input className="help-search" aria-label="Search help articles" placeholder="Search questions (e.g. AI exams, biometric sync, Tarbiyah)..." value={query} onChange={e => setQuery(e.target.value)}/>
        )}
      </section>
      <section className="local-content">
        {isTutorial ? (
          <div className="tutorial-list">
            {[
              'Setting up your Campus Profile & Academic Sessions',
              'Configuring Facial Recognition & QR Gate Attendance',
              'Generating Bloom-Calibrated AI Exam Papers',
              'Managing Ayah-by-Ayah Tarbiyah & Hifz Logs',
              'Publishing Digital Daily Diaries to Parent WhatsApp'
            ].map((title, i) => (
              <article key={title}>
                <span>0{i + 1}</span>
                <div>
                  <h3>{title}</h3>
                  <p>Follow our concise, step-by-step walkthrough to configure this feature in your EduCore workspace. Full documentation and best practices are included.</p>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="help-faqs">
            {shownFaqs.map(([q, a]) => (
              <details key={q}>
                <summary>{q}</summary>
                <p>{a}</p>
              </details>
            ))}
            {shownFaqs.length === 0 && (
              <p>No matching help articles. <a href="/contact">Contact our support team</a> and we will assist you immediately.</p>
            )}
          </div>
        )}
      </section>
    </Layout>
  )
}

function AboutPage() {
  return (
    <Layout>
      <section className="local-hero about-hero">
        <span className="local-eyebrow">ABOUT NOVULABS EDUCORE</span>
        <h1>Empowering educators with AI, values, and intelligence.</h1>
        <p>NovuLabs EduCore was created to modernize educational institutions by unifying daily campus administration with cutting-edge artificial intelligence and holistic Tarbiyah.</p>
        <a className="local-button" href="/features">Explore the Platform <span>→</span></a>
      </section>
      <section className="local-content about-content">
        <div>
          <span className="local-eyebrow">OUR PHILOSOPHY</span>
          <h2>Software that frees educators to focus on teaching.</h2>
        </div>
        <p>We believe school software should not just be a digital spreadsheet. It should actively assist educators by automating exam creation with Bloom’s Taxonomy, taking attendance in 15 seconds, and providing parents with instant peace of mind. EduCore is the all-in-one ecosystem where leadership, faculty, students, and families thrive together.</p>
      </section>
    </Layout>
  )
}

function PricingPage() {
  return (
    <Layout>
      <section className="local-page-heading">
        <span className="local-eyebrow">INSTITUTIONAL SAAS PLANS</span>
        <h1>Transparent subscription tiers for every campus size.</h1>
        <p>Predictable monthly and annual pricing with zero hidden fees and free Excel data migration.</p>
      </section>
      <section className="local-content local-card-grid">
        <article className="local-card pricing-card">
          <span className="local-eyebrow">STARTER CAMPUS</span>
          <h2>$149 <small>/ month</small></h2>
          <p>Essential digital operations for growing academies replacing paper registers.</p>
          <ul>
            <li>Up to 300 Enrolled Students</li>
            <li>Core SIS & Admin Workspace</li>
            <li>Biometric & QR Attendance Grid</li>
            <li>Digital Daily Diary & Notes</li>
            <li>Standard PDF Report Cards</li>
            <li>Standard Email & Ticket Support</li>
          </ul>
          <a className="local-button" href="/signup">Start 14-Day Free Pilot →</a>
        </article>

        <article className="local-card pricing-card" style={{ border: '2px solid #0B63B6' }}>
          <span className="local-eyebrow" style={{ color: '#0B63B6', fontWeight: 800 }}>MOST POPULAR • GROWTH ACADEMY</span>
          <h2>$349 <small>/ month</small></h2>
          <p>The complete AI-powered operating system for progressive K-12 schools.</p>
          <ul>
            <li>Up to 1,200 Enrolled Students</li>
            <li>All Features in Starter Campus</li>
            <li>AI Question & Smart Exam Generator</li>
            <li>Next-Gen LMS with Video Lessons</li>
            <li>Islamic Studies & Hifz Tracker</li>
            <li>Automated WhatsApp / SMS Alerts</li>
            <li>Smart Digital Library with Barcodes</li>
            <li>Priority 24/7 Phone & WhatsApp Support</li>
          </ul>
          <a className="local-button" href="/signup" style={{ background: '#0B63B6', color: '#fff' }}>Deploy Growth Plan →</a>
        </article>

        <article className="local-card pricing-card">
          <span className="local-eyebrow">ENTERPRISE UNIFIED</span>
          <h2>$699 <small>/ month</small></h2>
          <p>Advanced multi-campus governance, custom board analytics, and priority engineering.</p>
          <ul>
            <li>Up to 3,500 Enrolled Students</li>
            <li>All Features in Growth Academy</li>
            <li>Multi-Campus Central HQ Dashboard</li>
            <li>STEAM & Future Skills Portfolio Engine</li>
            <li>Custom Report Card Template Engine</li>
            <li>Biometric Hardware Direct Local API Sync</li>
            <li>Dedicated Account Success Manager</li>
          </ul>
          <a className="local-button" href="/signup">Schedule Consultation →</a>
        </article>

        <article className="local-card pricing-card">
          <span className="local-eyebrow">DISTRICT & GOVERNMENT</span>
          <h2>Custom Pricing</h2>
          <p>Tailored sovereign cloud or on-premises deployment for large school networks.</p>
          <ul>
            <li>Unlimited Campuses & Students</li>
            <li>Dedicated Private Sovereign Cloud</li>
            <li>Custom Ministry & Board Compliance</li>
            <li>Bespoke Localized AI Models</li>
            <li>24/7 Dedicated Senior Engineering Team</li>
          </ul>
          <a className="local-button" href="/contact">Request Institutional RFP →</a>
        </article>
      </section>
    </Layout>
  )
}

const COMPANY_LEGAL = {
  name: 'Novulabs (SMC-Private) Limited',
  publicationDate: '2 June 2026',
  address: 'I-10/4, I-10, Islamabad, Pakistan',
  supportEmail: 'info@novulabs.net',
  privacyEmail: 'info@novulabs.net',
  website: 'https://novulabs.net',
  secpRegNumber: null, // Pending SECP CUIN / Registration Number
}

function Placeholder({ text }) {
  return <span className="legal-placeholder">[{text}]</span>
}

function LegalNav({ currentPath }) {
  const links = [
    { path: '/ownership', label: 'Ownership Statement' },
    { path: '/refund-policy', label: 'Cancellation & Refund' },
    { path: '/privacy', label: 'Privacy Policy' },
    { path: '/terms', label: 'Terms & Conditions' },
  ]
  return (
    <nav className="legal-nav" aria-label="Legal policies navigation" style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: '10px',
      marginBottom: '32px',
      paddingBottom: '20px',
      borderBottom: '1px solid #C8D5E3'
    }}>
      {links.map(link => {
        const active = currentPath === link.path || (link.path === '/refund-policy' && currentPath.includes('refund'))
        return (
          <a
            key={link.path}
            href={link.path}
            style={{
              padding: '8px 16px',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: 600,
              textDecoration: 'none',
              background: active ? '#0B63B6' : '#EAF3FB',
              color: active ? '#ffffff' : '#062B4C',
              transition: 'all 0.15s ease'
            }}
          >
            {link.label}
          </a>
        )
      })}
    </nav>
  )
}

function OwnershipPage({ path }) {
  return (
    <Layout>
      <article className="article-page">
        <LegalNav currentPath={path} />
        <span className="local-eyebrow">NOVU LABS SUBSCRIPTION SOFTWARE</span>
        <h1>Ownership Statement</h1>
        <p className="article-lead">
          Novu Labs subscription software &nbsp;|&nbsp; Effective on {COMPANY_LEGAL.publicationDate}
        </p>

        <p>
          This statement identifies the operator of Novu Labs subscription products and explains the ownership of the platform and customer data. It is intended for publication alongside the Privacy Policy, Terms and Conditions, and Cancellation and Refund Policy.
        </p>

        <h2>Legal operator</h2>
        <p>
          The website <a href={COMPANY_LEGAL.website} target="_blank" rel="noopener noreferrer">{COMPANY_LEGAL.website}</a> and the subscription products offered under the Novu Labs name are operated by {COMPANY_LEGAL.name}, a company incorporated in Pakistan, subject to verification of the exact company name and registration particulars before publication. Registered office: {COMPANY_LEGAL.address}. Company registration number: {COMPANY_LEGAL.secpRegNumber ? COMPANY_LEGAL.secpRegNumber : <Placeholder text="INSERT SECP REGISTRATION NUMBER" />}.
        </p>
        <p>
          The company is the merchant and contracting supplier for subscriptions sold through its own checkout unless a product page or signed order clearly identifies another seller. Payment processing by Safepay or another gateway does not make the gateway the owner or operator of the software.
        </p>

        <h2>Software and brand</h2>
        <p>
          Novu Labs owns or licenses the software, website content, code, interfaces, product documentation, names and branding that it makes available, subject to third-party and open-source licence terms. Copyright, trade mark and other applicable rights remain with their lawful owners. A subscription gives customers only the access rights described in the Terms and Conditions or signed order.
        </p>

        <h2>Customer information</h2>
        <p>
          Schools, legal practices, finance teams and other subscribers keep their rights in the records and content they lawfully provide. Novu Labs processes that information to deliver and secure the service according to the contract and Privacy Policy. No general transfer of ownership of customer records occurs through use of a Novu Labs platform.
        </p>

        <h2>White label and custom projects</h2>
        <p>
          A white label appearance, custom configuration or feature request does not by itself transfer source code or underlying platform rights. Ownership of commissioned deliverables, custom code, customer marks and third-party components is determined by the signed project or white label agreement. Any exception should be recorded in writing.
        </p>

        <h2>Verification before publication</h2>
        <p>
          Complete the exact registered legal name, SECP company registration number, registered address and working contact email. If a product is sold by another Novu Labs group entity or a reseller, identify that seller on its checkout and product-specific order.
        </p>

        <h2>Contact</h2>
        <p>
          <strong>Legal operator:</strong> {COMPANY_LEGAL.name}.<br />
          <strong>Registered office:</strong> {COMPANY_LEGAL.address}.<br />
          <strong>Website:</strong> <a href={COMPANY_LEGAL.website} target="_blank" rel="noopener noreferrer">{COMPANY_LEGAL.website}</a>.<br />
          <strong>Email:</strong> <a href={`mailto:${COMPANY_LEGAL.supportEmail}`}>{COMPANY_LEGAL.supportEmail}</a>. Requests should identify the relevant product, organization and account so we can respond securely.
        </p>
      </article>
    </Layout>
  )
}

function RefundPolicyPage({ path }) {
  return (
    <Layout>
      <article className="article-page">
        <LegalNav currentPath={path} />
        <span className="local-eyebrow">NOVU LABS SUBSCRIPTION SOFTWARE</span>
        <h1>Cancellation and Refund Policy</h1>
        <p className="article-lead">
          Novu Labs subscription software &nbsp;|&nbsp; Effective on {COMPANY_LEGAL.publicationDate}
        </p>

        <p>
          This policy explains how customers stop recurring charges and request refunds for Novu Labs digital subscriptions. It applies across Digital School, Legal Management System, Finance Management System and other SaaS products, subject to a signed enterprise order and mandatory law.
        </p>

        <h2>Digital service and delivery</h2>
        <p>
          Our standard products are delivered through electronic account activation, not shipment. Physical returns do not ordinarily apply. A customer may contact support if access has not been activated after a successful payment.
        </p>

        <h2>How to cancel</h2>
        <p>
          Use the subscription account control if available or email <a href={`mailto:${COMPANY_LEGAL.supportEmail}`}>{COMPANY_LEGAL.supportEmail}</a> from the account email with the organization, product and invoice or transaction reference. We will acknowledge the request and confirm its effective date. Cancellation stops renewal charges once processed before the next renewal; access generally continues to the end of the paid period. We will not require a reason to cancel. The customer remains responsible for charges already incurred, subject to the refund rules below and mandatory law.
        </p>

        <h2>Refund requests</h2>
        <p>
          For an initial subscription, request a refund within seven calendar days of the first payment. We will consider the request where activation failed, the same subscription was charged twice, an incorrect amount was charged, a verified unauthorized transaction occurred, or a material service fault attributable to Novu Labs prevented reasonable use and was not remedied within a reasonable time. Please include the transaction reference, date, product, account email and a short description.
        </p>
        <p>
          The seven-day request window is a voluntary service policy; it does not shorten any remedy or complaint period required by applicable law. Nonuse of a working activated service alone does not automatically entitle a customer to a refund. We will not deny a lawful remedy merely because access began or the customer used the software.
        </p>

        <h2>Renewals, upgrades and special work</h2>
        <p>
          A renewal charge made after a valid timely cancellation will be reviewed and reversed or refunded if verified. Other renewal refunds are assessed for billing error, service failure and mandatory rights. Upgrades, setup work, implementation, customization, training and white label services follow the specific written order; an undisclosed no-refund term does not apply. Any partial refund for delivered and undelivered work will be calculated reasonably and communicated to the customer.
        </p>

        <h2>Review and payment method</h2>
        <p>
          We may ask for information reasonably needed to verify the payment or diagnose a fault. We aim to respond to a complete request within seven working days and to initiate any approved refund within fourteen working days after approval. The payment provider or bank may take additional time to credit the original payment method. Where the original method is unavailable, a lawful alternative will be arranged after verification.
        </p>

        <h2>Charge disputes and consumer rights</h2>
        <p>
          Contact us promptly to resolve a billing error. A customer may also use the payment provider’s dispute process. We will cooperate with legitimate chargeback reviews. Applicable consumer protection rules, including relevant provincial consumer law where the customer qualifies as a consumer, prevail over conflicting terms of this policy.
        </p>

        <h2>Data after cancellation</h2>
        <p>
          Customers should export their information before the paid access period ends. Any agreed post-termination export, retention or deletion period appears in the product order or data processing schedule. Cancellation does not automatically erase billing records that Novu Labs must retain lawfully.
        </p>

        <h2>Contact</h2>
        <p>
          <strong>Legal operator:</strong> {COMPANY_LEGAL.name}.<br />
          <strong>Registered office:</strong> {COMPANY_LEGAL.address}.<br />
          <strong>Website:</strong> <a href={COMPANY_LEGAL.website} target="_blank" rel="noopener noreferrer">{COMPANY_LEGAL.website}</a>.<br />
          <strong>Email:</strong> <a href={`mailto:${COMPANY_LEGAL.supportEmail}`}>{COMPANY_LEGAL.supportEmail}</a>. Requests should identify the relevant product, organization and account so we can respond securely.
        </p>
      </article>
    </Layout>
  )
}

function PrivacyPolicyPage({ path }) {
  return (
    <Layout>
      <article className="article-page">
        <LegalNav currentPath={path} />
        <span className="local-eyebrow">NOVU LABS SUBSCRIPTION SOFTWARE</span>
        <h1>Privacy Policy</h1>
        <p className="article-lead">
          Novu Labs subscription software &nbsp;|&nbsp; Effective on {COMPANY_LEGAL.publicationDate}
        </p>

        <p>
          This policy explains how Novu Labs handles account, billing and product data across its subscription software, including Digital School, Legal Management System, Finance Management System and future products. It applies to the website, applications and related support services.
        </p>

        <h2>Who handles the information</h2>
        <p>
          {COMPANY_LEGAL.name} (“Novu Labs”, “we”) handles its own website, account, billing, security and support records. For records that a school, law firm, finance team or other customer enters into a subscribed product, that customer normally decides what information to collect and why; Novu Labs hosts and processes it to provide the service under the customer’s instructions. Product contracts may allocate these roles more precisely.
        </p>

        <h2>Information we collect</h2>
        <p>
          Account and contact details may include names, organization, job title, email, phone, login credentials and administrator settings. Billing records include plan, invoices, payment status, transaction references and limited payer details. Technical records may include IP address, browser and device details, timestamps, audit logs and support correspondence.
        </p>
        <p>
          Digital School may contain student, guardian and staff records, attendance, results, grades, fees, communications and uploaded files. The Legal Management System may contain client and matter records, case documents, deadlines, communications and billing data. The Finance Management System may contain invoices, counterparties, transactions, accounting records and reports. The information actually processed depends on the customer’s configuration and use.
        </p>
        <p>
          Payments handled by a gateway such as Safepay are processed through that provider. We receive payment status and references needed to administer a subscription; we do not ask customers to send full card numbers or CVV by email or support chat.
        </p>

        <h2>How we use information</h2>
        <p>
          We use information to create accounts, deliver contracted functions, authenticate users, process subscriptions, issue invoices, provide support, prevent abuse, investigate security events, maintain backups, improve reliability, comply with applicable obligations and handle disputes. We use customer content only as needed to deliver, secure and support the service or as the customer otherwise authorizes in writing.
        </p>
        <p>
          We do not use student records or confidential legal matter content for independent advertising. If an optional AI or analytics feature sends customer content to another provider, the product or contract should disclose that feature and its applicable settings before use.
        </p>

        <h2>Schools, children and confidential records</h2>
        <p>
          The subscribing school is responsible for the notices, permissions and lawful authority needed for student and guardian information. Law firms and other professional customers must decide whether their uploaded files contain privileged or regulated records and set access rights accordingly. Finance customers remain responsible for the accuracy and lawful handling of their own records. Novu Labs limits staff access to customer content according to operational need and contractual controls.
        </p>

        <h2>Disclosure and service providers</h2>
        <p>
          We may share information with hosting, backup, email, authentication, customer support, analytics and payment providers to the extent needed for their services; with a customer’s authorized users; or when lawfully required by a competent authority. We may disclose limited records to investigate fraud, protect rights or enforce our terms. We do not sell customer content. A product-specific arrangement may identify subprocessors and hosting locations.
        </p>

        <h2>Security and international processing</h2>
        <p>
          We use proportionate access controls, logging, backups and administrative safeguards. No online service can promise absolute security. Customers should protect credentials, use suitable role permissions and promptly report suspected compromise. Hosting or service providers may process data outside Pakistan; the applicable order or data processing arrangement should identify any location or transfer restrictions agreed with a customer.
        </p>

        <h2>Retention and deletion</h2>
        <p>
          We retain account, tax, billing and security records for as long as needed for the service, lawful recordkeeping and disputes. Customer content is retained during the subscription and for the export and deletion period stated in the applicable order or product schedule. If no period is specified, customers should request an export before termination and contact support promptly about deletion; residual backup copies are removed in normal backup rotation, subject to lawful holds. We will not promise an exact purge period until a product-specific retention schedule is confirmed.
        </p>

        <h2>Requests and cookies</h2>
        <p>
          A person may contact us to request access, correction or deletion of information we control, subject to identity checks and applicable law. If an institution controls the record, we may direct the request to that institution and assist it as agreed. Essential cookies support login, security and preferences; optional analytics or marketing tools, if deployed, should be described in the live cookie notice and configured in line with applicable requirements.
        </p>

        <h2>Updates and applicable law</h2>
        <p>
          We may revise this policy and post the new effective date. Material changes affecting subscribed customers will be communicated where appropriate. This policy is intended to operate alongside applicable Pakistani law and any mandatory rights in other places where a product is lawfully offered; it does not waive those rights.
        </p>

        <h2>Contact</h2>
        <p>
          <strong>Legal operator:</strong> {COMPANY_LEGAL.name}.<br />
          <strong>Registered office:</strong> {COMPANY_LEGAL.address}.<br />
          <strong>Website:</strong> <a href={COMPANY_LEGAL.website} target="_blank" rel="noopener noreferrer">{COMPANY_LEGAL.website}</a>.<br />
          <strong>Email:</strong> <a href={`mailto:${COMPANY_LEGAL.privacyEmail}`}>{COMPANY_LEGAL.privacyEmail}</a>. Requests should identify the relevant product, organization and account so we can respond securely.
        </p>
      </article>
    </Layout>
  )
}

function TermsPage({ path }) {
  return (
    <Layout>
      <article className="article-page">
        <LegalNav currentPath={path} />
        <span className="local-eyebrow">NOVU LABS SUBSCRIPTION SOFTWARE</span>
        <h1>Terms and Conditions</h1>
        <p className="article-lead">
          Novu Labs subscription software &nbsp;|&nbsp; Effective on {COMPANY_LEGAL.publicationDate}
        </p>

        <p>
          These terms govern subscriptions to Novu Labs cloud software and related support. They apply to Digital School, Legal Management System, Finance Management System and other products identified in an order or checkout, unless a signed product or enterprise agreement expressly replaces a provision.
        </p>

        <h2>Agreement and customer authority</h2>
        <p>
          The contracting supplier is {COMPANY_LEGAL.name}. The person accepting these terms confirms that they can bind the customer organization. A subscription begins when the order is accepted and access is activated. The applicable order, checkout and product schedule state the product, users, features, limits, fees, term, taxes and support commitments. If there is a conflict, a signed agreement prevails for that customer, followed by the order, then these terms.
        </p>

        <h2>Accounts and use</h2>
        <p>
          Customers must provide accurate account information, restrict administrator access, maintain credential security, assign appropriate user permissions and promptly report suspected compromise. They are responsible for their authorized users and for the legality and accuracy of content they upload.
        </p>
        <p>
          During a paid term, Novu Labs grants a limited, nonexclusive, nontransferable right to access the subscribed software for the customer’s authorized internal or agreed use, subject to the stated plan limits. No source code or ownership is transferred by a subscription. White label branding, resale, implementation and custom development require a separate written order.
        </p>

        <h2>Fees, renewal and payment</h2>
        <p>
          Fees and billing intervals are shown before purchase or in the signed order. Taxes, setup fees and usage charges are payable only as disclosed there. Automatic renewal occurs only if clearly stated at checkout or in the order, with the renewal period and recurring amount or price basis disclosed. Customers can cancel under the Cancellation and Refund Policy. Price changes apply to future billing periods after advance notice, unless the signed agreement provides otherwise.
        </p>
        <p>
          Payments may be processed by Safepay, bank transfer or another offered method. Gateway rules also apply to the payment transaction. An invoice or confirmation is issued through the account or agreed channel. For nonpayment, we may give notice and a reasonable opportunity to cure before suspension, except where immediate action is needed for security or fraud.
        </p>

        <h2>Digital delivery and support</h2>
        <p>
          Access is delivered electronically through a web or mobile app or API; no physical delivery is ordinarily involved. Activation instructions and support channels are provided with the order. Planned maintenance, incidents, internet outages and third-party failures may affect access. Any uptime commitment or service credit applies only if stated in a signed service level schedule.
        </p>

        <h2>Customer content and privacy</h2>
        <p>
          Customers keep their rights in data and files they lawfully upload. They authorize Novu Labs and its contracted service providers to host, process, transmit, back up and secure that content for the service. Customers must supply required notices and permissions to students, parents, staff, clients and other affected people. Our Privacy Policy explains our general practices; a signed data processing schedule governs if one is provided.
        </p>

        <h2>Product responsibilities</h2>
        <p>
          Digital School provides administration tools; the school controls admissions, academic decisions, student records, fee decisions and any accreditation obligations. Legal Management System provides workflow tools; the lawyer or firm controls advice, privilege, deadlines, filings and professional duties. Finance Management System provides records and reporting tools; the customer verifies entries, accounting treatment, tax filings and financial decisions. Optional AI output requires human review and does not replace a qualified professional.
        </p>

        <h2>Acceptable use and integrations</h2>
        <p>
          Users must not gain unauthorized access, upload malware, interfere with other tenants, violate law or third-party rights, or reverse engineer except to the extent a law permits. Integrations with gateways, banks, messaging providers or government systems may have separate terms and availability. We may restrict an abusive account when reasonably necessary and will provide notice when practicable.
        </p>

        <h2>Intellectual property and feedback</h2>
        <p>
          Novu Labs or its licensors retain rights in the software, interface, documentation, logos and underlying technology. Customer names and logos are not used for marketing without permission. If the customer sends product suggestions, Novu Labs may use them without transferring customer content or confidential information.
        </p>

        <h2>Term, cancellation and data export</h2>
        <p>
          The subscription continues for the disclosed billing period and any renewal accepted under the order. Cancellation takes effect as described in the Cancellation and Refund Policy. On expiry or termination, access ends after the paid period or applicable cure period. Customers should export their data while access remains active; enterprise export assistance and deletion deadlines are governed by the order or data processing schedule.
        </p>

        <h2>Liability and mandatory rights</h2>
        <p>
          Each party remains responsible for its own fraud, wilful misconduct and obligations that cannot legally be excluded. Subject to mandatory law and a signed enterprise agreement, neither party is liable for indirect or consequential loss arising from ordinary use of the service. A specific monetary liability cap must be stated in the order or signed agreement; these public terms do not impose an undisclosed cap. Nothing here removes statutory consumer remedies or lawful claims for defective services.
        </p>

        <h2>Law, disputes and changes</h2>
        <p>
          Pakistani law governs these terms unless a signed agreement says otherwise, subject to any mandatory local consumer protections. A customer should first contact support with the disputed charge or service issue. Courts with jurisdiction under applicable law may hear unresolved disputes. We may update these terms for future subscriptions; material changes to an active term will be notified and will not retrospectively alter paid fees without agreement.
        </p>

        <h2>Contact</h2>
        <p>
          <strong>Legal operator:</strong> {COMPANY_LEGAL.name}.<br />
          <strong>Registered office:</strong> {COMPANY_LEGAL.address}.<br />
          <strong>Website:</strong> <a href={COMPANY_LEGAL.website} target="_blank" rel="noopener noreferrer">{COMPANY_LEGAL.website}</a>.<br />
          <strong>Email:</strong> <a href={`mailto:${COMPANY_LEGAL.supportEmail}`}>{COMPANY_LEGAL.supportEmail}</a>. Requests should identify the relevant product, organization and account so we can respond securely.
        </p>
      </article>
    </Layout>
  )
}

function HomeFallback() {
  return (
    <Layout>
      <section className="local-page-heading">
        <span className="local-eyebrow">NOVULABS EDUCORE</span>
        <h1>We couldn’t find that page.</h1>
        <p>Go back to the homepage or explore our dedicated portals.</p>
        <a className="local-button" href="/">Go to Homepage →</a>
      </section>
    </Layout>
  )
}

export default function LocalPage({ path }) {
  if (productPages[path]) return <ProductPage data={productPages[path]}/>
  if (path === '/products') return <ProductsPage/>
  if (path === '/features') return <FeaturesPage/>
  if (path === '/blog' || path.startsWith('/blog/')) return <BlogPage path={path}/>
  if (path === '/help' || path === '/tutorials') return <HelpPage path={path}/>
  if (path === '/about') return <AboutPage/>
  if (path === '/pricing') return <PricingPage/>
  if (path === '/contact' || path === '/signup' || path === '/login') return <FormPage path={path}/>
  if (path === '/ownership' || path === '/ownership-statement') return <OwnershipPage path={path} />
  if (path === '/refund-policy' || path === '/cancellation-refund' || path === '/cancellation-and-refund') return <RefundPolicyPage path={path} />
  if (path === '/privacy' || path === '/privacy-policy') return <PrivacyPolicyPage path={path} />
  if (path === '/terms' || path === '/terms-and-conditions' || path === '/terms-of-service') return <TermsPage path={path} />
  return <HomeFallback/>
}
