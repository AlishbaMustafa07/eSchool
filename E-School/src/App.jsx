import { useState } from 'react'
import './App.css'
import './Reference.css'
import LocalPage from './Pages.jsx'
import './Typography.css'
import Navbar, { Brand } from './Navbar.jsx'
import Footer from './Footer.jsx'

const features = [
  ['✎', 'AI Smart Exams', 'Generate Bloom’s Taxonomy-calibrated question papers, MCQs, theory rubrics, and automated grading keys.'],
  ['◷', 'Smart Face Attendance', 'Rapid attendance tracking with facial recognition, student QR cards, and teacher 15-second manual grid.'],
  ['✉', 'Digital Daily Diary', 'Assign homework, teacher remarks, and lesson logs with automated real-time parent WhatsApp delivery.'],
  ['♧', 'Islamic Studies & Tarbiyah', 'Ayah-level Quranic Hifz tracker (Sabaq, Sabqi, Manzil), Tajweed fluency metrics, and Salah logs.'],
  ['⌁', 'Next-Gen LMS', 'Stream video lectures, upload syllabus milestones, attach lesson slides, and track course completion heatmaps.'],
  ['◈', 'Onsite Admissions', 'Manage incoming applications, entrance assessments, document verification, and one-click student enrollment.'],
  ['▦', 'Timetable & Scheduling', 'Automated period scheduling, conflict-free classroom allocation, and rapid teacher substitution matrix.'],
  ['◎', 'Homework & Assignments', 'Distribute multimedia assignments with submission countdowns, teacher markup, and rubric grading.'],
  ['▣', 'Digital Library', 'Complete cataloging, ISBN lookup, barcode circulation, due date tracking, and digital resource lending.'],
  ['✧', 'STEAM & Future Skills', 'Nurture coding, robotics, public speaking, and 21st-century learner competencies with achievement badges.'],
  ['✦', 'Parent-Teacher Meetings (PTM)', 'Schedule and track structured parent-teacher conferences, student progress logs, and action items.'],
  ['▱', 'Academic Reports & Analytics', 'In-depth multi-board report cards, student percentile radar charts, and Cambridge/National standard compliance.'],
  ['⌁', 'Encrypted Campus Chat', 'Role-scoped secure instant messaging between teachers, parents, and administrative leadership with chat monitoring.'],
  ['♙', 'Staff & Faculty Management', 'Organize teacher profiles, subject assignments, department quotas, and faculty attendance.'],
]

const highlights = [
  ['◎', '4 Dedicated Portals', 'Tailored, distraction-free workspaces for School Admins, Teachers, Students, and Parents.'],
  ['✦', 'AI-First Intelligence', 'Bloom’s Taxonomy exam generation, automated rubric keys, and real-time student at-risk detection.'],
  ['↗', 'Values-Based Education', 'Comprehensive Islamic Studies framework, Ayah-by-Ayah Hifz tracker, and holistic Tarbiyah monitoring.'],
]


function Dashboard() {
  return (
    <div className="dashboard-wrap" aria-label="Preview of NovuLabs EduCore school management dashboard">
      <div className="orbit orbit-one" /><div className="orbit orbit-two" />
      <div className="float-card float-card-top">
        <span className="float-icon purple">✓</span>
        <div><b>Face Attendance Verified</b><small>Grade 9-A • just now</small></div>
      </div>
      <div className="float-card float-card-bottom">
        <span className="avatar-stack"><i>A</i><i>T</i><i>P</i></span>
        <div><b>Digital Diary Synced</b><small>Parents & teachers connected via WhatsApp</small></div>
      </div>
      <div className="dashboard">
        <aside className="dash-side">
          <div className="mini-logo"><span>E</span></div>
          <div className="side-active">▦</div>
          <i>✎</i><i>◷</i><i>♧</i><i>⌁</i><i>⚙</i>
        </aside>
        <div className="dash-main">
          <div className="dash-top">
            <span>Good morning, <b>Principal Sarah</b> <span className="wave">✦</span></span>
            <span className="dash-date">⌕　 ◉　 <i>ACTIVE CAMPUS</i></span>
          </div>
          <div className="dash-heading">
            <div>
              <small>ACADEMIC YEAR 2026–2027</small>
              <h3>Campus Command Center</h3>
            </div>
            <button>＋ &nbsp;Generate AI Exam</button>
          </div>
          <div className="stat-row">
            <div className="stat-card">
              <span className="stat-icon peach">♧</span>
              <small>Total enrolled</small>
              <b>1,284</b>
              <em>↗ 100% active students</em>
            </div>
            <div className="stat-card">
              <span className="stat-icon lilac">▣</span>
              <small>Present today</small>
              <b>1,248</b>
              <em>↗ 97.2% face attendance</em>
            </div>
            <div className="stat-card">
              <span className="stat-icon mint">▤</span>
              <small>LMS Courses</small>
              <b>48 Classes</b>
              <em>↗ 84% syllabus on track</em>
            </div>
          </div>
          <div className="dash-lower">
            <div className="chart-card">
              <div className="chart-title">
                <b>Weekly Student Attendance & Engagement</b>
                <small>All Sections⌄</small>
              </div>
              <div className="chart">
                <div className="chart-labels">
                  <span>100%</span>
                  <span>75%</span>
                  <span>50%</span>
                  <span>25%</span>
                </div>
                <svg viewBox="0 0 440 130" preserveAspectRatio="none" aria-label="Attendance chart">
                  <defs>
                    <linearGradient id="fill" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0" stopColor="#0B63B6" stopOpacity=".23"/>
                      <stop offset="1" stopColor="#0B63B6" stopOpacity="0"/>
                    </linearGradient>
                  </defs>
                  <path d="M0 86 C32 76 37 67 70 72 S110 82 142 54 S185 60 212 42 S250 51 281 36 S316 47 348 29 S393 36 440 12 L440 130 L0 130Z" fill="url(#fill)"/>
                  <path d="M0 86 C32 76 37 67 70 72 S110 82 142 54 S185 60 212 42 S250 51 281 36 S316 47 348 29 S393 36 440 12" fill="none" stroke="#0B63B6" strokeWidth="3" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="chart-days">
                <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
              </div>
            </div>
            <div className="events-card">
              <div className="chart-title">
                <b>Today’s Active Sessions</b>
                <small>View timetable &nbsp;→</small>
              </div>
              <div className="event">
                <i className="event-line violet"/>
                <div><b>Grade 10-A Physics</b><small>AI Exam Revision • Room 204</small></div>
                <time>09:00</time>
              </div>
              <div className="event">
                <i className="event-line coral"/>
                <div><b>Islamic Studies & Hifz</b><small>Surah Al-Mulk • Tarbiyah Hall</small></div>
                <time>10:30</time>
              </div>
              <div className="event">
                <i className="event-line blue"/>
                <div><b>STEAM Robotics & Code</b><small>Python Automation • Lab 02</small></div>
                <time>11:45</time>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function HomePage() {
  const [faqOpen, setFaqOpen] = useState(0)
  const [activeReview, setActiveReview] = useState(0)

  const reviews = [
    ['“NovuLabs EduCore replaced disconnected software tools across our campus. Marking attendance takes 15 seconds, and teachers love the AI question generator during exam weeks.”', 'Dr. Tariq Al-Mansoor', 'Managing Director • Beacon Crescent International Schools'],
    ['“The AI Smart Exam generator alone saves our faculty over 12 hours every exam cycle. And parents appreciate the instant WhatsApp attendance alerts when their children enter the school gate.”', 'Sarah Jenkins, M.Ed.', 'Academic Vice Principal • Oakridge Global Academy'],
    ['“The Ayah-level Hifz & Tarbiyah tracker is something we had searched for years. It allows teachers and parents to monitor Quranic memorization progress with absolute clarity.”', 'Mufti Imran Qureshi', 'Head of Islamic Curriculum • Al-Huda Islamic Collegiate'],
  ]

  const faqs = [
    ['What is NovuLabs EduCore?', 'NovuLabs EduCore is an integrated, next-generation AI School ERP, LMS, and Campus Intelligence Suite. It connects administrators, teachers, students, and parents with automated assessments, facial attendance, digital daily diary, Islamic studies, and future skills portfolios.'],
    ['What are the 4 dedicated portals?', 'EduCore provides 4 purpose-built portals: Admin Portal for campus management and admissions; Teacher Portal for rapid attendance, AI exams, and diary; Student Portal for video courses, assignments, and skills; and Parent Portal for live attendance, diary logs, PTMs, and direct teacher chat.'],
    ['How does the AI Smart Exam and Question Generator work?', 'Our assessment engine is calibrated against national curricula and Bloom’s Taxonomy. Teachers can specify subject, grade, chapter, cognitive difficulty, and format (MCQs, structured theory, or oral rubrics). Teachers maintain 100% human editorial authority to review and customize questions.'],
    ['Do we need specialized biometric hardware for attendance?', 'No. EduCore supports facial recognition, QR code badges on student IDs, and standard RFID/biometric readers. Teachers can also mark 35 students in 15 seconds using our intuitive manual grid with zero additional hardware required.'],
    ['What is the Islamic Studies and Tarbiyah module?', 'Tailored for faith-based schools and Islamic academies, this module includes an Ayah-level Hifz tracker (Sabaq, Sabqi, Manzil), Tajweed fluency tracking, daily prayer (Salah) habit checks with parental verification, and holistic Islamic Akhlaq character scoring.'],
    ['Can we customize report cards to match our school or board requirements?', 'Yes. EduCore generates official PDF report cards supporting custom school crests, principal signatures, letterhead styling, dual-language headings, and custom grading scales (Cambridge A*-G, GPA 4.0, or percentage bands).'],
    ['How fast can our school onboard and migrate data?', 'Most schools complete full onboarding in under 48 hours. NovuLabs provides automated CSV/Excel import tools for student records, staff details, and past grades. Our implementation team is available to assist throughout the transition.'],
  ]

  return (
    <div id="home">
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="hero-surface">
          <div className="hero section-shell">
            <div className="hero-copy">
              <div className="eyebrow">
                <span className="rank-badge">AI-FIRST</span>
                <span>SCHOOL ERP & LMS SUITE</span>
                <span className="verified-mark">✓</span>
              </div>
              <h1>
                Next-gen school ERP,<br/>
                <span className="highlight-word">AI exams & LMS<br/>in one platform.</span>
              </h1>
              <p className="hero-description">
                Empower administrators, teachers, students, and parents with NovuLabs EduCore — featuring AI exam generation, facial attendance, Islamic studies & Hifz tracking, and next-gen LMS courses.
              </p>
              <div className="hero-actions">
                <a className="button button-primary" href="/signup">Book Campus Demo <span>→</span></a>
                <a className="watch-link" href="#products"><span className="play-icon">▶</span> Explore the 4 Portals</a>
              </div>
              <div className="hero-proof">
                <div className="proof-avatars"><i>A</i><i>T</i><i>S</i><i>P</i></div>
                <span>
                  <b>4 Role Portals • 14+ Integrated Modules</b>
                  <small>For progressive K-12 schools, academies & colleges</small>
                </span>
              </div>
            </div>
            <div className="hero-visual">
              <Dashboard />
              <div className="hero-spark spark-a">✳</div>
              <div className="hero-spark spark-b">✦</div>
            </div>
          </div>
        </section>

        {/* Trust Metrics Strip */}
        <section className="trust-strip">
          <div className="trust-inner">
            <p>Empowering progressive campuses with institutional-grade intelligence</p>
            <div className="school-logos">
              <span>14+ Integrated Modules</span>
              <span>4 Dedicated Portals</span>
              <span>99.8% Attendance Accuracy</span>
              <span>45 hrs/mo Saved</span>
              <span>99.95% Cloud SLA</span>
            </div>
          </div>
        </section>

        {/* Why Choose EduCore */}
        <section id="why" className="why-section section-shell">
          <div className="section-heading">
            <span className="section-kicker">WHY CHOOSE NOVULABS EDUCORE?</span>
            <h2>A smarter foundation for <span>campus excellence.</span></h2>
            <p>Unify academic planning, examinations, attendance, and parent communication into one seamless ecosystem.</p>
          </div>
          <div className="highlight-grid">
            {highlights.map(([icon, title, desc], i) => (
              <article className="highlight-card" key={title}>
                <div className={`highlight-icon hi-${i}`}>{icon}</div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </article>
            ))}
          </div>
          <div className="standout-panel">
            <div>
              <span className="section-kicker">ENTERPRISE-GRADE RELIABILITY</span>
              <p>Built for modern schools that value data privacy, student safety, and seamless everyday workflows.</p>
              <a href="/signup">Schedule your 1-on-1 school walkthrough <span>→</span></a>
            </div>
            <ul>
              <li>Strict multi-tenant security and Role-Based Access Control (RBAC)</li>
              <li>AES-256 data encryption at rest and TLS 1.3 in transit</li>
              <li>AI assessments aligned with Bloom’s Taxonomy and national curricula</li>
              <li>Daily automated off-site backups with guaranteed 99.95% uptime</li>
            </ul>
          </div>
          <div className="metrics-bar">
            <div><b>Admin Portal</b><small>Admissions, Timetables & Reports</small></div>
            <i/>
            <div><b>Teacher Portal</b><small>Face Attendance & AI Exams</small></div>
            <i/>
            <div><b>Student Portal</b><small>LMS Courses & STEAM Skills</small></div>
            <i/>
            <div className="metric-note">
              <span>Parent Portal</span>
              <small>Live Gate Attendance, Diary & WhatsApp Alerts</small>
            </div>
          </div>
        </section>

        {/* 4 Dedicated Portals Section */}
        <section id="products" className="offer-section section-shell">
          <div className="offer-heading">
            <div>
              <span className="section-kicker">4 DEDICATED WORKSPACES</span>
              <h2>One platform, <span>every role empowered.</span></h2>
            </div>
            <p>EduCore delivers dedicated, distraction-free digital environments tailored to each campus stakeholder.</p>
          </div>
          <div className="offer-grid">
            <article className="offer-card offer-portals">
              <span className="offer-tag">PORTAL 01 • CAMPUS LEADERSHIP</span>
              <h3>Admin & Principal<br/>Command Center.</h3>
              <p>Admissions pipeline, master timetable scheduling, library circulation, teacher attendance, and campus-wide chat monitoring.</p>
              <img src="/illustrations/people.svg" alt="Admin Portal Command Center" loading="lazy"/>
            </article>
            <article className="offer-card offer-chat">
              <span className="offer-tag">PORTAL 02 • FACULTY COCKPIT</span>
              <h3>Teacher Workspace<br/>& AI Exam Suite.</h3>
              <p>Mark 35 students in 15 seconds, generate Bloom-calibrated exam papers, assign digital diary, and manage student grading.</p>
              <img src="/illustrations/classroom.svg" alt="Teacher Workspace and AI Exam Suite" loading="lazy"/>
            </article>
            <article className="offer-card offer-reports">
              <span className="offer-tag">PORTAL 03 • LEARNER EXPERIENCE</span>
              <h3>Student Learning<br/>& Skills Hub.</h3>
              <p>Video courses, lesson attachments, homework submission, timetable countdowns, Islamic studies, and STEAM portfolio badges.</p>
              <img src="/illustrations/reports.svg" alt="Student Learning and Skills Hub" loading="lazy"/>
            </article>
            <article className="offer-card offer-sms">
              <span className="offer-tag">PORTAL 04 • FAMILY COMPANION</span>
              <h3>Parent Portal &<br/>WhatsApp Alerts.</h3>
              <p>Instant school gate entry alerts, daily homework diary with teacher remarks, PTM schedule bookings, and direct teacher line.</p>
              <img src="/illustrations/messages.svg" alt="Parent Portal and WhatsApp Alerts" loading="lazy"/>
            </article>
            <article className="offer-card offer-live">
              <span className="offer-tag">CORE ENGINE • AI & VALUES</span>
              <h3>Smart AI Exams &<br/>Ayah-Level Tarbiyah.</h3>
              <p>Advanced AI assessment engine paired with Quranic Hifz tracker, Tajweed milestones, and moral Akhlaq logs.</p>
              <img src="/illustrations/chat.svg" alt="AI Exams and Tarbiyah Engine" loading="lazy"/>
            </article>
          </div>
        </section>

        {/* 14+ Integrated Modules */}
        <section id="features" className="features-section section-shell">
          <div className="section-heading">
            <span className="section-kicker">ALL-IN-ONE CAMPUS ARCHITECTURE</span>
            <h2>14+ Modules built for <span>institutional growth.</span></h2>
            <p>Everything your campus needs from day-to-day attendance to advanced AI examinations and Tarbiyah tracking.</p>
          </div>
          <div className="feature-grid">
            {features.map(([icon, title, desc], i) => (
              <article className="feature-card" key={title}>
                <span className={`feature-icon feature-${i % 4}`}>{icon}</span>
                <h3>{title}</h3>
                <p>{desc}</p>
                <a href="/features" aria-label={`Learn about ${title}`}>↗</a>
              </article>
            ))}
          </div>
          <a className="button button-outline" href="/features">Explore all 14+ modules in detail <span>→</span></a>
        </section>

        {/* Testimonials */}
        <section className="quote-section">
          <div className="quote-inner section-shell">
            <div className="quote-decoration">“</div>
            <div className="quote-content">
              <span className="section-kicker">VOICES FROM THE CLASSROOM</span>
              <h2>Trusted by forward-thinking <span>school leaders.</span></h2>
              <div className="review-card" id="reviews">
                <div className="review-stars">★★★★★</div>
                <blockquote>{reviews[activeReview][0]}</blockquote>
                <div className="review-person">
                  <span className={`review-avatar review-${activeReview}`}>
                    {reviews[activeReview][1].slice(0, 1)}
                  </span>
                  <div>
                    <b>{reviews[activeReview][1]}</b>
                    <small>{reviews[activeReview][2]}</small>
                  </div>
                  <div className="review-controls">
                    <button aria-label="Previous review" onClick={() => setActiveReview((activeReview + reviews.length - 1) % reviews.length)}>←</button>
                    <button aria-label="Next review" onClick={() => setActiveReview((activeReview + 1) % reviews.length)}>→</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="quote-side-art">
              <div className="testimonial-blob">
                <span>“</span>
                <b>Smarter campuses<br/>start with EduCore.</b>
                <i>✳</i>
              </div>
              <div className="side-spark">✦</div>
              <div className="side-flower">✽</div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="faq-section section-shell">
          <div className="section-heading">
            <span className="section-kicker">FREQUENTLY ASKED QUESTIONS</span>
            <h2>Everything you need to <span>know.</span></h2>
            <p>Got questions about NovuLabs EduCore? Here are the answers to the most common queries.</p>
          </div>
          <div className="faq-list">
            {faqs.map(([question, answer], i) => (
              <article className={`faq-item ${faqOpen === i ? 'faq-active' : ''}`} key={question}>
                <button aria-expanded={faqOpen === i} onClick={() => setFaqOpen(faqOpen === i ? -1 : i)}>
                  <span>{question}</span>
                  <i>{faqOpen === i ? '−' : '+'}</i>
                </button>
                {faqOpen === i && <p>{answer}</p>}
              </article>
            ))}
          </div>
        </section>

        {/* CTA Banner */}
        <section id="get-started" className="cta-section section-shell">
          <div className="cta-card">
            <div className="cta-decoration cta-dots"/>
            <div className="cta-decoration cta-star">✳</div>
            <span className="section-kicker">MODERNIZE YOUR SCHOOL TODAY</span>
            <h2>Ready to transform your<br/>campus with <span>NovuLabs EduCore?</span></h2>
            <p>Empower your administration, inspire teachers, engage students, and give parents total peace of mind.</p>
            <a className="button button-light" href="/signup">Schedule a Live Campus Demo <span>→</span></a>
            <small>Fast 48-Hour Onboarding • Free Excel Data Migration • 24/7 Support</small>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

function App() {
  const path = window.location.pathname.replace(/\/$/, '') || '/'
  return path === '/' ? <HomePage/> : <LocalPage path={path}/>
}

export default App
