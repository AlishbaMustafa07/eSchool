import { useMemo, useState } from 'react'
import './Pages.css'

const productPages = {
  '/products/basic': { title: 'Skoolify Basic', label: 'CLOUD SCHOOL MANAGEMENT', intro: 'A practical home for the everyday work of running a school.', points: ['Student and staff records', 'Admissions, classes, and timetables', 'Attendance, exams, and results', 'Fees, accounts, and reports'], action: 'Create a school account' },
  '/products/mobile-apps': { title: 'Skoolify mobile apps', label: 'LEARNING ON THE GO', intro: 'Keep students, families, and teachers connected from their phones.', points: ['Class updates and school announcements', 'Attendance and timetable access', 'Homework and learning resources', 'Parent and teacher communication'], action: 'Get mobile app updates' },
  '/products/desktop': { title: 'Skoolify Desktop', label: 'DESKTOP SCHOOL MANAGEMENT', intro: 'A focused desktop experience for your school’s administration team.', points: ['Work with core school records', 'Manage fees and accounts', 'Prepare exams and results', 'Keep daily office tasks organized'], action: 'Ask about desktop access' },
  '/products/integrations': { title: 'Connect your school tools', label: 'INTEGRATIONS', intro: 'Bring your school communication and workflows into one connected routine.', points: ['SMS notifications', 'WhatsApp communication workflows', 'Data import and export', 'Integration planning for your institution'], action: 'Discuss an integration' },
  '/products/pro': { title: 'Skoolify Pro', label: 'SELF-HOSTED', intro: 'A configurable school management platform for institutions that want to host their own system.', points: ['Self-hosted deployment options', 'Configurable roles and workflows', 'Institution-wide student and staff records', 'Dedicated implementation planning'], action: 'Talk about Skoolify Pro' },
  '/products/lms': { title: 'Skoolify Learning', label: 'LEARNING MANAGEMENT', intro: 'Organize online learning, course materials, and classroom activity in one place.', points: ['Course and lesson organization', 'Learning resources and assignments', 'Student progress tracking', 'Online class support'], action: 'Explore learning tools' },
  '/products/cloud-services': { title: 'Cloud services', label: 'HOSTING & SUPPORT', intro: 'Get help planning a secure, dependable home for your school’s digital tools.', points: ['Cloud setup guidance', 'Data migration planning', 'Backup and continuity options', 'Ongoing support for administrators'], action: 'Plan cloud services' },
}

const featureItems = [
  ['Admissions', 'Keep applications, student details, and enrollment steps organized.'], ['Attendance', 'Record daily attendance and make student presence easy to review.'], ['Classes & subjects', 'Set up classes, subjects, chapters, and academic groups.'], ['Timetable', 'Plan class schedules, teacher assignments, and rooms.'], ['Exams & results', 'Prepare exams, record marks, and share student results.'], ['Fees & accounts', 'Manage fee categories, invoices, discounts, and financial records.'], ['Homework', 'Assign work and keep learning tasks visible to students.'], ['Staff management', 'Organize employee records, roles, and salary information.'], ['Parent communication', 'Share school updates and keep families connected.'], ['Reports & certificates', 'Prepare reports and school documents from organized records.'], ['Online classes', 'Support remote lessons and learning activities.'], ['School store', 'Track school supplies and point of sale activity.'],
]

const articles = [
  ['A calmer start to the school year', 'A simple checklist for preparing classes, timetables, and family communication before students return.', 'Planning'],
  ['Making attendance easier for everyone', 'Ways to make daily attendance clearer for teachers, administrators, students, and families.', 'School operations'],
  ['Better school communication, one update at a time', 'How a thoughtful communication routine can keep families informed without overwhelming them.', 'Community'],
]

const faqs = [
  ['What is Skoolify?', 'Skoolify is a school management platform concept that brings student records, attendance, fees, exams, timetables, and communication into one place.'],
  ['Can I use Skoolify for a college or academy?', 'The pages and product concepts are designed for schools, colleges, academies, and other learning institutions.'],
  ['Does Skoolify have mobile access?', 'The mobile app page describes planned mobile workflows for students, families, and teachers. Contact the team to discuss availability.'],
  ['How do I get started?', 'Create an account inquiry with your name, email, and institution. A Skoolify administrator can follow up when an account service is connected.'],
]

function PageHeader() {
  return <header className="local-header"><a className="brand" href="/" aria-label="Skoolify home"><span className="brand-mark">S</span><span>Skoolify<span className="brand-dot">.</span></span></a><nav><a href="/products/basic">Products</a><a href="/features">Features</a><a href="/about">About</a><a href="/help">Help</a><a className="local-login" href="/login">Log in</a><a className="local-button" href="/signup">Get started <span>→</span></a></nav></header>
}

function PageFooter() {
  return <footer className="local-footer"><div><a className="brand" href="/"><span className="brand-mark">S</span><span>Skoolify<span className="brand-dot">.</span></span></a><p>Make school life simpler.</p></div><section><b>Platform</b><a href="/products/basic">Skoolify Basic</a><a href="/products/lms">Learning</a><a href="/features">Features</a><a href="/pricing">Plans</a></section><section><b>Company</b><a href="/about">About</a><a href="/blog">Blog</a><a href="/contact">Contact</a></section><section><b>Support</b><a href="/help">Help center</a><a href="/tutorials">Tutorials</a><a href="/privacy">Privacy</a><a href="/terms">Terms</a></section><small>© {new Date().getFullYear()} Skoolify</small></footer>
}

function Layout({ children }) {
  return <div className="local-page"><PageHeader/><main>{children}</main><PageFooter/></div>
}

function ContactForm({ type = 'contact' }) {
  const [sent, setSent] = useState(false)
  const isAccount = type === 'signup' || type === 'login'
  return <form className="local-form" onSubmit={e => { e.preventDefault(); setSent(true) }}>
    {type === 'signup' && <label>School or institution<input required placeholder="Your school name"/></label>}
    {type === 'contact' && <label>Your name<input required placeholder="Full name"/></label>}
    <label>Email address<input required type="email" placeholder="you@school.edu"/></label>
    {type === 'login' && <label>Password<input required type="password" placeholder="Your password" minLength="6"/></label>}
    {type === 'signup' && <label>Your role<select defaultValue=""><option value="" disabled>Select a role</option><option>School administrator</option><option>Teacher</option><option>Parent</option><option>Other</option></select></label>}
    {type === 'contact' && <label>How can we help?<textarea required placeholder="Tell us a little about what you need." rows="4"/></label>}
    <button className="local-button" type="submit">{type === 'login' ? 'Log in' : type === 'signup' ? 'Request an account' : 'Prepare message'} <span>→</span></button>
    {sent && <p className="form-note">{isAccount ? 'Thanks. This demo form is ready, but account authentication is not connected yet.' : 'Thanks. This demo form is ready, but message delivery is not connected yet.'}</p>}
  </form>
}

function ProductPage({ data }) {
  return <Layout><section className="local-hero"><span className="local-eyebrow">{data.label}</span><h1>{data.title}</h1><p>{data.intro}</p><a className="local-button" href="/contact">{data.action} <span>→</span></a><div className="product-visual"><div className="product-visual-sidebar">S<br/>▦<br/>◷<br/>▤</div><div><small>SCHOOL OVERVIEW</small><h3>Your school, at a glance.</h3><div className="product-metrics"><span><b>Students</b><strong>1,248</strong></span><span><b>Present today</b><strong>94%</strong></span><span><b>Open tasks</b><strong>18</strong></span></div><div className="product-chart"><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/></div></div></div></section><section className="local-content"><div className="local-section-heading"><span className="local-eyebrow">WHAT’S INCLUDED</span><h2>Tools for the work your school does every day.</h2></div><div className="local-card-grid">{data.points.map((point,i)=><article className="local-card" key={point}><span className="local-card-icon">{['✓','▦','◷','✦'][i%4]}</span><h3>{point}</h3><p>Keep this part of school life organized and easy to follow for your team.</p></article>)}</div></section></Layout>
}

function FormPage({ path }) {
  const isSignup = path === '/signup'
  const isLogin = path === '/login'
  const title = isSignup ? 'Create your school account' : isLogin ? 'Welcome back' : 'Talk to the Skoolify team'
  const subtitle = isSignup ? 'Tell us about your school to get started.' : isLogin ? 'Sign in to continue to your school workspace.' : 'Share a few details and we’ll help you find the right next step.'
  return <Layout><section className="form-page"><div><span className="local-eyebrow">{isSignup ? 'GET STARTED' : isLogin ? 'YOUR WORKSPACE' : 'CONTACT'}</span><h1>{title}</h1><p>{subtitle}</p>{isLogin && <p className="form-note">Authentication is not connected in this project yet.</p>}</div><ContactForm type={isSignup?'signup':isLogin?'login':'contact'}/></section></Layout>
}

function FeaturesPage() {
  return <Layout><section className="local-page-heading"><span className="local-eyebrow">SKOOLIFY FEATURES</span><h1>One place for school operations.</h1><p>Explore the tools that help keep your institution organized and connected.</p></section><section className="local-content"><div className="local-card-grid">{featureItems.map(([title,desc],i)=><article className="local-card" key={title}><span className="local-card-icon">{['▦','◷','▤','⌁','✎','◈'][i%6]}</span><h3>{title}</h3><p>{desc}</p></article>)}</div></section></Layout>
}

function ProductsPage() {
  return <Layout><section className="local-page-heading"><span className="local-eyebrow">SKOOLIFY PRODUCTS</span><h1>Tools that fit the way your school works.</h1><p>Start with school management essentials, then explore learning, mobile, and hosting options.</p></section><section className="local-content"><div className="local-card-grid">{Object.entries(productPages).map(([path,product])=><article className="local-card" key={path}><span className="local-eyebrow">{product.label}</span><h3>{product.title}</h3><p>{product.intro}</p><a className="text-link" href={path}>Learn more →</a></article>)}</div></section></Layout>
}

function BlogPage({ path }) {
  const slug = path.split('/')[2]
  const article = articles.find(item => item[0].toLowerCase().replaceAll(' ','-').replace(/[^w-]/g,'') === slug)
  if (article) return <Layout><article className="article-page"><span className="local-eyebrow">{article[2]} · SKOOLIFY JOURNAL</span><h1>{article[0]}</h1><p className="article-lead">{article[1]}</p><p>Strong school routines grow from clear information and small, repeatable steps. Start by agreeing on the details your team needs, make responsibilities easy to understand, and share updates through a channel families can find.</p><p>Skoolify is designed to bring these everyday tasks together so school teams can spend less time chasing information and more time supporting learning.</p><a className="text-link" href="/blog">← Back to all articles</a></article></Layout>
  return <Layout><section className="local-page-heading"><span className="local-eyebrow">SKOOLIFY JOURNAL</span><h1>Ideas for a smoother school day.</h1><p>Practical notes on school operations, learning, and communication.</p></section><section className="local-content"><div className="local-card-grid">{articles.map(([title,desc,category])=><article className="local-card blog-card" key={title}><span className="local-eyebrow">{category}</span><h3>{title}</h3><p>{desc}</p><a className="text-link" href={`/blog/${title.toLowerCase().replaceAll(' ','-').replace(/[^a-z0-9-]/g,'')}`}>Read article →</a></article>)}</div></section></Layout>
}

function HelpPage({ path }) {
  const isTutorial = path === '/tutorials'
  const [query, setQuery] = useState('')
  const shownFaqs = useMemo(() => faqs.filter(([q,a]) => `${q} ${a}`.toLowerCase().includes(query.toLowerCase())), [query])
  return <Layout><section className="local-page-heading"><span className="local-eyebrow">{isTutorial?'LEARNING CENTER':'HELP CENTER'}</span><h1>{isTutorial?'Learn Skoolify, step by step.':'How can we help?'}</h1><p>{isTutorial?'Short walkthroughs for setting up and running your school workspace.':'Find answers about Skoolify and managing your school.'}</p>{!isTutorial&&<input className="help-search" aria-label="Search help articles" placeholder="Search questions…" value={query} onChange={e=>setQuery(e.target.value)}/>}</section><section className="local-content">{isTutorial?<div className="tutorial-list">{['Set up your school profile','Add classes, subjects, and staff','Enroll students and organize records','Take attendance and build your timetable','Set up fees, exams, and reports'].map((title,i)=><article key={title}><span>0{i+1}</span><div><h3>{title}</h3><p>Open the relevant section in your workspace, enter the required details, and save your changes. Review the setup with your school administrator before inviting your team.</p></div></article>)}</div>:<div className="help-faqs">{shownFaqs.map(([q,a])=><details key={q}><summary>{q}</summary><p>{a}</p></details>)}{shownFaqs.length===0&&<p>No matching help articles. <a href="/contact">Contact us</a> and we’ll point you in the right direction.</p>}</div>}</section></Layout>
}

function AboutPage() {
  return <Layout><section className="local-hero about-hero"><span className="local-eyebrow">ABOUT SKOOLIFY</span><h1>More time for what matters at school.</h1><p>Skoolify brings the everyday work of school management into a clearer, more connected workspace.</p><a className="local-button" href="/features">Explore the platform <span>→</span></a></section><section className="local-content about-content"><div><span className="local-eyebrow">OUR APPROACH</span><h2>Good tools should make school feel more manageable.</h2></div><p>We believe school software should be straightforward for the people who use it every day. Skoolify is organized around the essential work of school communities: caring for student records, supporting teachers, keeping families informed, and helping administrators see what needs attention.</p></section></Layout>
}

function PricingPage() {
  return <Layout><section className="local-page-heading"><span className="local-eyebrow">PLANS</span><h1>Choose what fits your school.</h1><p>Start with the essentials and contact us when you need a tailored setup.</p></section><section className="local-content local-card-grid"><article className="local-card pricing-card"><span className="local-eyebrow">STARTER</span><h2>Skoolify Basic</h2><p>Core tools for organizing a school’s daily administration.</p><ul><li>Student and staff records</li><li>Attendance, classes, and timetables</li><li>Exams, fees, and reports</li></ul><a className="local-button" href="/signup">Request access →</a></article><article className="local-card pricing-card"><span className="local-eyebrow">TAILORED</span><h2>For your institution</h2><p>Discuss hosting, onboarding, and workflow needs with the Skoolify team.</p><ul><li>Implementation planning</li><li>Data migration discussion</li><li>Support options</li></ul><a className="local-button" href="/contact">Talk to us →</a></article></section></Layout>
}

function LegalPage({ path }) {
  const privacy = path === '/privacy'
  return <Layout><article className="article-page"><span className="local-eyebrow">SKOOLIFY · {privacy?'PRIVACY':'TERMS'}</span><h1>{privacy?'Privacy information':'Terms of use'}</h1><p className="article-lead">Last updated September 2026</p>{privacy?<><h2>Information on this demo site</h2><p>This Skoolify website is a front-end demonstration. The contact, login, and signup forms do not send or store submissions. Do not enter sensitive personal or student information.</p><h2>Cookies and analytics</h2><p>This project does not currently include analytics or advertising scripts. Your browser and hosting provider may process standard technical request data.</p><h2>Future account services</h2><p>If Skoolify adds live accounts or data collection, this page should be updated with the operator’s identity, purposes, retention periods, processors, and ways to exercise privacy rights before those services launch.</p></>:<><h2>Using this website</h2><p>This website is provided as a demonstration of Skoolify’s proposed school management pages. Product descriptions are informational and do not create a service agreement.</p><h2>Accounts and school data</h2><p>Login and signup are demonstration forms only; no accounts are created and no school data is stored by this project. Do not submit confidential, student, or payment information.</p><h2>Availability and changes</h2><p>Features shown here may change as the product is developed. A live service should publish complete terms before users create accounts or rely on it for school operations.</p></>}</article></Layout>
}

function HomeFallback() {
  return <Layout><section className="local-page-heading"><span className="local-eyebrow">SKOOLIFY</span><h1>We couldn’t find that page.</h1><p>Go back to the homepage or choose a section below.</p><a className="local-button" href="/">Go to homepage →</a></section></Layout>
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
  if (path === '/privacy' || path === '/terms') return <LegalPage path={path}/>
  return <HomeFallback/>
}
