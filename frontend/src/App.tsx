import { useState, useEffect } from 'react'
import { 
  Plane, 
  Hotel, 
  FileText, 
  Globe, 
  MapPin, 
  Phone, 
  Mail, 
  CheckCircle, 
  ChevronRight, 
  Menu, 
  X, 
  Award, 
  Clock, 
  UserCheck, 
  ShieldCheck,
  Sun,
  Moon,
  Info,
  ChevronRightSquare
} from 'lucide-react'

interface Slide {
  image: string
  subtitle: string
  title: string
  desc: string
}

function App() {
  // Theme state: defaults to 'light', persists in localStorage
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light'
  })
  
  const [activeSlide, setActiveSlide] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const slides: Slide[] = [
    {
      image: '/hero_flight.webp',
      subtitle: 'Worldwide Flight Booking',
      title: 'Travel the World with Confidence',
      desc: 'Chantrea Travel offers flight ticket booking through major international airlines, finding the most suitable routes and competitive fares for your journey.'
    },
    {
      image: '/hero_hotel.webp',
      subtitle: 'Global Hotel Reservations',
      title: 'Comfortable Stays Anywhere',
      desc: 'From affordable boutique hotels to luxury resorts and business suites, we arrange accommodations that suit your preferences, budget, and travel style.'
    },
    {
      image: '/hero_visa.webp',
      subtitle: 'Visa & Immigration Assistance',
      title: 'Expert Visa Consultation',
      desc: 'Navigating visa applications can be complex. Our experienced team provides professional assistance to prepare your documents and guide you at every step.'
    }
  ]

  // Synchronize theme state with DOM and localStorage
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [slides.length])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  // Scroll handler for navigation
  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Define active logo image path based on active theme
  const logoSrc = theme === 'dark' ? '/CTT_LOGO-HB.webp' : '/CTT_LOGO-HP.webp'

  return (
    <>
      {/* Header & Navbar */}
      <header className="header">
        <div className="container">
          <nav className="navbar" role="navigation" aria-label="Main Navigation">
            {/* Left: Brand Logo */}
            <a href="/" className="logo-link" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} aria-label="Chantrea Travel Home">
              <img src={logoSrc} alt="Chantrea Travel Logo" className="logo-img" />
            </a>

            {/* Center: Subtitle Tagline Badge */}
            <div className="header-badge">
              <span className="badge-dot"></span>
              <span>Your Trusted Global Travel & Visa Partner</span>
            </div>

            {/* Right: Desktop Controls & Menu */}
            <div className="nav-controls">
              <ul className="nav-menu">
                <li>
                  <a href="#services" className="nav-link" onClick={(e) => { e.preventDefault(); scrollToSection('services'); }}>
                    Our Services
                  </a>
                </li>
                <li>
                  <a href="#about" className="nav-link" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#contact" className="nav-link" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#contact" className="nav-btn" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>
                    Book Consultation
                  </a>
                </li>
              </ul>

              {/* Theme Toggle Switch */}
              <button 
                className="theme-toggle-btn" 
                onClick={toggleTheme}
                aria-label={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              {/* Mobile Menu Icon */}
              <button 
                className="menu-toggle" 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              >
                {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ flexGrow: 1 }}>
        <div className="container">
          
          {/* Hero Slideshow Section */}
          <section className="hero-wrapper" aria-label="Featured Travel Services Slideshow">
            <div className="hero-card">
              {/* Slideshow background images */}
              <div className="slideshow">
                {slides.map((slide, index) => (
                  <div 
                    key={index} 
                    className={`slide ${index === activeSlide ? 'active' : ''}`}
                    aria-hidden={index !== activeSlide}
                  >
                    <img 
                      src={slide.image} 
                      alt={slide.subtitle} 
                      className="slide-img" 
                      loading={index === 0 ? 'eager' : 'lazy'} 
                    />
                  </div>
                ))}
                <div className="slideshow-overlay"></div>
              </div>

              {/* Slide Overlaid Text Content */}
              <div className="hero-content">
                <span className="hero-subtitle">{slides[activeSlide].subtitle}</span>
                <h1 className="hero-title">
                  {slides[activeSlide].title.split(' ').map((word, i) => {
                    // Highlight the last word in white
                    if (i === slides[activeSlide].title.split(' ').length - 1) {
                      return <span key={i}>{word}</span>;
                    }
                    return word + ' ';
                  })}
                </h1>
                <p className="hero-desc">{slides[activeSlide].desc}</p>
              </div>

              {/* Badges Row at Bottom of Card */}
              <div className="hero-badges-row">
                <div className="hero-pill-badge" onClick={() => scrollToSection('services-flights')}>
                  <Plane size={18} />
                  <span>Worldwide Flights</span>
                </div>
                <div className="hero-pill-badge" onClick={() => scrollToSection('services-hotels')}>
                  <Hotel size={18} />
                  <span>Global Hotels</span>
                </div>
                <div className="hero-pill-badge" onClick={() => scrollToSection('services-visas')}>
                  <FileText size={18} />
                  <span>Visa Consultation</span>
                </div>
                <div className="hero-pill-badge" onClick={() => scrollToSection('services-extensions')}>
                  <Globe size={18} />
                  <span>Cambodian Extensions</span>
                </div>
              </div>
            </div>
          </section>

          {/* Our Services Section */}
          <section id="services" className="section">
            <div className="section-header">
              <span className="section-tag">What We Do</span>
              <h2 className="section-title">Our Professional Services</h2>
              <p className="section-desc">
                Chantrea Travel provides comprehensive, reliable travel documentation and booking services to connect you to global destinations with confidence.
              </p>
            </div>

            {/* Service 1: Worldwide Flight Tickets (Split info & Bento Grid layout) */}
            <div id="services-flights" className="service-block">
              <div className="service-row">
                {/* Left side: Information block */}
                <div className="service-col-info">
                  <span className="service-block-tag">Flight Booking</span>
                  <h3 className="service-block-title">Worldwide Flight Tickets</h3>
                  <p className="service-block-text">
                    Travel anywhere in the world with confidence. Chantrea Travel offers worldwide flight ticket booking through major international airlines, helping you find the most suitable routes and competitive fares.
                  </p>
                  <ul className="service-block-list">
                    <li className="service-block-item"><CheckCircle size={16} /> Travel Consultation & Planning</li>
                    <li className="service-block-item"><CheckCircle size={16} /> Ticket Issuance & Flight Changes</li>
                    <li className="service-block-item"><CheckCircle size={16} /> 24/7 Ongoing Traveler Support</li>
                  </ul>
                  <a href="#contact" className="service-block-link" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>
                    Inquire Flights <ChevronRight size={16} />
                  </a>
                </div>
                {/* Right side: Country Bento Grid */}
                <div className="service-col-visual">
                  <div className="bento-grid bento-grid-flights">
                    {/* Box 1: China (Landscape) */}
                    <div className="bento-card bento-card-flights-1">
                      <img src="/country_china.webp" alt="China" className="bento-img" />
                      <div className="bento-overlay"></div>
                      <span className="bento-badge">China</span>
                    </div>
                    {/* Box 2: Vietnam (Portrait Tall) */}
                    <div className="bento-card bento-card-flights-2">
                      <img src="/country_vietnam.webp" alt="Vietnam" className="bento-img" />
                      <div className="bento-overlay"></div>
                      <span className="bento-badge">Vietnam</span>
                    </div>
                    {/* Box 3: Canada (Square) */}
                    <div className="bento-card bento-card-flights-3">
                      <img src="/country_canada.webp" alt="Canada" className="bento-img" />
                      <div className="bento-overlay"></div>
                      <span className="bento-badge">Canada</span>
                    </div>
                    {/* Box 4: Australia (Square) */}
                    <div className="bento-card bento-card-flights-4">
                      <img src="/country_australia.webp" alt="Australia" className="bento-img" />
                      <div className="bento-overlay"></div>
                      <span className="bento-badge">Australia</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Service 2: Global Hotel Reservations (Bento Grid on Left, Info on Right) */}
            <div id="services-hotels" className="service-block">
              <div className="service-row" style={{ flexDirection: 'row-reverse' }}>
                {/* Right side: Information block */}
                <div className="service-col-info">
                  <span className="service-block-tag">Accommodations</span>
                  <h3 className="service-block-title">Global Hotel Reservations</h3>
                  <p className="service-block-text">
                    Wherever your destination, we arrange accommodations that suit your preferences and budget. From affordable boutique hotels to luxury resorts and business suites, we secure the most comfortable stay.
                  </p>
                  <ul className="service-block-list">
                    <li className="service-block-item"><CheckCircle size={16} /> Luxury Resorts & Private Villas</li>
                    <li className="service-block-item"><CheckCircle size={16} /> Budget-Friendly & Business Lodging</li>
                    <li className="service-block-item"><CheckCircle size={16} /> Fast Secure Booking Confirmations</li>
                  </ul>
                  <a href="#contact" className="service-block-link" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>
                    Inquire Hotels <ChevronRight size={16} />
                  </a>
                </div>
                {/* Left side: Hotels Bento Grid (Offset / Masonry layout) */}
                <div className="service-col-visual">
                  <div className="bento-grid bento-grid-hotels">
                    {/* Box 1: Cambodia (Tall Portrait) */}
                    <div className="bento-card bento-card-hotels-1">
                      <img src="/hotel_cambodia.webp" alt="Angkor Resort Cambodia" className="bento-img" />
                      <div className="bento-overlay"></div>
                      <span className="bento-badge">Cambodia</span>
                    </div>
                    {/* Box 2: Singapore (Square) */}
                    <div className="bento-card bento-card-hotels-2">
                      <img src="/hotel_singapore.webp" alt="Rooftop Pool Singapore" className="bento-img" />
                      <div className="bento-overlay"></div>
                      <span className="bento-badge">Singapore</span>
                    </div>
                    {/* Box 3: Vietnam (Square) */}
                    <div className="bento-card bento-card-hotels-3">
                      <img src="/hotel_vietnam.webp" alt="Beach Resort Vietnam" className="bento-img" />
                      <div className="bento-overlay"></div>
                      <span className="bento-badge">Vietnam</span>
                    </div>
                    {/* Box 4: Canada (Wide Landscape) */}
                    <div className="bento-card bento-card-hotels-4">
                      <img src="/hotel_canada.webp" alt="Castle Hotel Canada" className="bento-img" />
                      <div className="bento-overlay"></div>
                      <span className="bento-badge">Canada</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Service 3: Visa Consultation & Assistance (Full-width directory checklist layout) */}
            <div id="services-visas" className="service-block service-visas-section">
              <div className="service-visas-header">
                <div>
                  <span className="service-block-tag">Travel Documents</span>
                  <h3 className="service-block-title" style={{ marginTop: '8px' }}>Visa Consultation & Assistance</h3>
                </div>
                <a href="#contact" className="service-block-link" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>
                  Get Professional Visa Advice <ChevronRight size={16} />
                </a>
              </div>
              <p className="service-block-text" style={{ maxWidth: '800px' }}>
                Applying for a visa can be a complex process, but our experienced team is here to guide you every step of the way. We provide professional consultation and application assistance for major global destinations:
              </p>
              <div className="visas-grid-col">
                {/* Canada Visa card */}
                <div className="visa-country-card">
                  <h4 className="visa-country-name">
                    <span></span> Canada Visas
                  </h4>
                  <p className="visa-country-desc">
                    Comprehensive documentation checking, invitation assistance, and application tracking for tourist, business, and study visas.
                  </p>
                </div>
                {/* Australia Visa card */}
                <div className="visa-country-card">
                  <h4 className="visa-country-name">
                    <span></span> Australia Visas
                  </h4>
                  <p className="visa-country-desc">
                    Assistance with subclass selections, document filing, statement preparation, and submission guidance for Australian visas.
                  </p>
                </div>
                {/* USA Visa card */}
                <div className="visa-country-card">
                  <h4 className="visa-country-name">
                    <span></span> United States Visas
                  </h4>
                  <p className="visa-country-desc">
                    Complete guidance on completing DS-160 forms, scheduling interview appointments, and mock interview preparations.
                  </p>
                </div>
              </div>
            </div>

            {/* Service 4: China & Vietnam Visa Services (Horizontal split layout with a nice subtle colored background) */}
            <div id="services-china-vietnam" className="service-block service-china-vietnam-section">
              <div className="china-vietnam-left">
                <span className="service-block-tag">Specialized Regional Services</span>
                <h3 className="service-block-title">China & Vietnam Visa Services</h3>
                <p className="service-block-text">
                  Chantrea Travel offers dedicated visa assistance for travelers visiting China and Vietnam. We help clients understand visa requirements, compile supporting files, complete applications, and guide submissions.
                </p>
                <ul className="service-block-list">
                  <li className="service-block-item"><CheckCircle size={16} /> Detailed Requirement Checklist</li>
                  <li className="service-block-item"><CheckCircle size={16} /> Form Compiling & Submission Setup</li>
                  <li className="service-block-item"><CheckCircle size={16} /> Fast Processing and Handling Coordination</li>
                </ul>
              </div>
              <div className="china-vietnam-right">
                <h4 className="service-title" style={{ fontSize: '18px', color: 'var(--text-primary)' }}>Key Processing Metrics</h4>
                <div className="china-vietnam-stat-row">
                  <div className="china-vietnam-stat-card">
                    <div className="china-vietnam-stat-num">98%</div>
                    <div className="china-vietnam-stat-label">Approval Rate</div>
                  </div>
                  <div className="china-vietnam-stat-card">
                    <div className="china-vietnam-stat-num">5-7</div>
                    <div className="china-vietnam-stat-label">Working Days</div>
                  </div>
                </div>
                <div className="service-block-item" style={{ fontSize: '14px', fontStyle: 'italic' }}>
                  <Info size={16} style={{ color: 'var(--accent-purple)' }} /> Special fast track options are available upon request.
                </div>
              </div>
            </div>

            {/* Service 5: Cambodian Visa Extensions (pricing/duration table grid layout) */}
            <div id="services-extensions" className="service-block service-cambodian-extensions-section">
              <div className="extensions-left">
                <span className="service-block-tag">In-Country Compliance</span>
                <h3 className="service-block-title">Cambodian Visa Extensions</h3>
                <p className="service-block-text">
                  For foreign visitors currently residing or visiting inside Cambodia, we provide reliable visa extension assistance to help you maintain compliance with Cambodian immigration regulations.
                </p>
                <ul className="service-block-list">
                  <li className="service-block-item"><CheckCircle size={16} /> Extension Option Strategy</li>
                  <li className="service-block-item"><CheckCircle size={16} /> Document Compilation & Passport Handling</li>
                  <li className="service-block-item"><CheckCircle size={16} /> Immigration Department Coordination</li>
                </ul>
                <a href="#contact" className="service-block-link" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>
                  Request Extension Quote <ChevronRight size={16} />
                </a>
              </div>
              <div className="extensions-right">
                <h4 className="service-title" style={{ fontSize: '18px', marginBottom: '20px', color: 'var(--text-primary)' }}>Standard Extensions Available</h4>
                <table className="extensions-table">
                  <thead>
                    <tr>
                      <th>Extension Type</th>
                      <th>Entry Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><span className="extensions-badge-duration">1 Month</span></td>
                      <td>Single Entry Extension</td>
                    </tr>
                    <tr>
                      <td><span className="extensions-badge-duration">3 Months</span></td>
                      <td>Single Entry Extension</td>
                    </tr>
                    <tr>
                      <td><span className="extensions-badge-duration">6 Months</span></td>
                      <td>Multiple Entry Extension</td>
                    </tr>
                    <tr>
                      <td><span className="extensions-badge-duration">12 Months</span></td>
                      <td>Multiple Entry Extension</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Service 6: Chinese Immigration Assistance (Corporate Card Layout) */}
            <div className="service-block service-chinese-immigration-section">
              <div className="immigration-info">
                <span className="service-block-tag">Corporate & Personal Immigration</span>
                <h3 className="service-block-title">Chinese Immigration Assistance</h3>
                <p className="service-block-text">
                  We provide comprehensive support for individuals and businesses requiring assistance with Chinese immigration-related procedures. Whether you need guidance on documentation, visa processes, or other immigration matters, our knowledgeable team is committed to providing professional assistance.
                </p>
                <a href="#contact" className="nav-btn" style={{ alignSelf: 'flex-start' }} onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>
                  Contact Representative
                </a>
              </div>
              <div className="immigration-services-grid">
                <div className="immigration-service-row">
                  <span className="immigration-row-title">Corporate Visa Invitation Checklists</span>
                  <ChevronRightSquare size={20} style={{ color: 'var(--accent-purple)' }} />
                </div>
                <div className="immigration-service-row">
                  <span className="immigration-row-title">Residence Permit Policy Guidance</span>
                  <ChevronRightSquare size={20} style={{ color: 'var(--accent-purple)' }} />
                </div>
                <div className="immigration-service-row">
                  <span className="immigration-row-title">Legal Travel Clearance Advice</span>
                  <ChevronRightSquare size={20} style={{ color: 'var(--accent-purple)' }} />
                </div>
              </div>
            </div>

          </section>

          {/* About Section */}
          <section id="about" className="section section-bg" style={{ borderRadius: 'var(--radius-xl)', padding: '80px 48px' }}>
            {/* Row 1: Split Portrait & Biography */}
            <div className="about-split">
              {/* Left Column: Portrait Frame */}
              <div className="about-founder-container">
                <img src="/davina_horn.webp" alt="Davina Horn - Founder of Chantrea Travel" className="about-founder-img" />
              </div>

              {/* Right Column: Narrative & Biography */}
              <div className="about-text-content">
                <span className="section-tag">About Chantrea Travel</span>
                <h2 className="section-title" style={{ textAlign: 'left' }}>Your Trusted Global Travel & Visa Partner</h2>
                
                <p className="about-paragraph">
                  At Chantrea Travel, we are committed to making international travel simple, convenient, and stress-free. Whether you are traveling for business, leisure, education, or family visits, our experienced team provides professional travel solutions tailored to your needs.
                </p>
                <p className="about-paragraph">
                  From planning your flight itinerary to booking accommodations and assisting with complex travel documentation, we are dedicated to delivering reliable service and exceptional customer support every step of the way. Your journey begins with us—connecting you to destinations around the world with confidence and care.
                </p>

                {/* Professional Experience Section */}
                <div className="about-founder-bio">
                  <h3>Professional Experience</h3>
                  <p className="about-paragraph">
                    Throughout her 22-year career in the travel industry, Davina Horn has worked with leading travel agencies and international travel companies, including K.U. Travel, Amary Travel (Representative of Carlson Wagonlit Travel), Korean Air, and EXO Travel. These roles have provided her with extensive experience in airline reservations, corporate travel, hotel bookings, and travel management, forming the foundation of the professional expertise she brings to every client at Chantrea Travel.
                  </p>
                </div>
              </div>
            </div>

            {/* Row 2: Spanned Core Values Grid */}
            <div className="about-features">
              <div className="about-feature-card">
                <Award className="about-feature-icon" size={32} />
                <h4 className="about-feature-title">Honest Advice</h4>
                <p className="about-feature-desc">We deliver transparent guidance, explaining exact rules, fees, and requirements without hidden surprises.</p>
              </div>
              <div className="about-feature-card">
                <Clock className="about-feature-icon" size={32} />
                <h4 className="about-feature-title">Efficient Service</h4>
                <p className="about-feature-desc">Time is critical in travel. We process bookings and applications rapidly, maintaining schedules on time.</p>
              </div>
              <div className="about-feature-card">
                <UserCheck className="about-feature-icon" size={32} />
                <h4 className="about-feature-title">Personalized Care</h4>
                <p className="about-feature-desc">Every journey is unique. We tailor visa solutions and itineraries to meet your specific individual or family needs.</p>
              </div>
              <div className="about-feature-card">
                <ShieldCheck className="about-feature-icon" size={32} />
                <h4 className="about-feature-title">Professional Integrity</h4>
                <p className="about-feature-desc">Your personal files are handled with absolute confidentiality and care throughout the entire process.</p>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="section contact-section">
            <div className="contact-layout">
              {/* Brand Info */}
              <div className="contact-brand">
                <a href="/" className="contact-logo" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} aria-label="Chantrea Travel Home">
                  <img src={logoSrc} alt="Chantrea Travel Logo" className="logo-img" />
                </a>
                <p className="contact-brand-desc">
                  Connecting you to global destinations with confidence and care. Honest advice, reliable flight bookings, global hotel reservations, and visa processing services.
                </p>
              </div>

              {/* Contact Information */}
              <div>
                <h4 className="service-title" style={{ marginBottom: '24px', fontSize: '18px' }}>Get In Touch</h4>
                <ul className="contact-info-list">
                  <li className="contact-info-item">
                    <MapPin size={18} />
                    <span>Phnom Penh, Cambodia</span>
                  </li>
                  <li className="contact-info-item">
                    <Phone size={18} />
                    <span>+855 (0) 23 456 789<br />+855 (0) 99 999 999</span>
                  </li>
                  <li className="contact-info-item">
                    <Mail size={18} />
                    <span>info@chantreatravel.com<br />support@chantreatravel.com</span>
                  </li>
                </ul>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="service-title" style={{ marginBottom: '24px', fontSize: '18px' }}>Quick Navigation</h4>
                <ul className="contact-links-list">
                  <li>
                    <a href="#services" className="contact-link" onClick={(e) => { e.preventDefault(); scrollToSection('services-flights'); }}>
                      Worldwide Flights
                    </a>
                  </li>
                  <li>
                    <a href="#services" className="contact-link" onClick={(e) => { e.preventDefault(); scrollToSection('services-hotels'); }}>
                      Hotel Bookings
                    </a>
                  </li>
                  <li>
                    <a href="#services" className="contact-link" onClick={(e) => { e.preventDefault(); scrollToSection('services-visas'); }}>
                      Visa Assistance
                    </a>
                  </li>
                  <li>
                    <a href="#services" className="contact-link" onClick={(e) => { e.preventDefault(); scrollToSection('services-extensions'); }}>
                      Cambodian Extensions
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="footer-bottom">
              <p>&copy; {new Date().getFullYear()} Chantrea Travel. All rights reserved. Professional Travel & Visa Services.</p>
            </div>
          </section>

        </div>
      </main>

      {/* Mobile Menu Backdrop */}
      {mobileMenuOpen && (
        <div 
          className="mobile-menu-overlay"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div 
            className="mobile-menu-card"
            onClick={(e) => e.stopPropagation()}
          >
            <a href="#services" className="nav-link" onClick={(e) => { e.preventDefault(); scrollToSection('services'); }}>
              Our Services
            </a>
            <a href="#about" className="nav-link" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>
              About Us
            </a>
            <a href="#contact" className="nav-link" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>
              Contact
            </a>
            <a href="#contact" className="nav-btn" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>
              Book Consultation
            </a>
          </div>
        </div>
      )}
    </>
  )
}

export default App
