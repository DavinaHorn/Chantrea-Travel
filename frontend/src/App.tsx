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
          <section id="about" className="section">
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
                    <span>+855 (0) 86 910 008<br />+855 (0) 17 910 007</span>
                  </li>
                  <li className="contact-info-item">
                    <Mail size={18} />
                    <span>davina@chantreatravel.com</span>
                  </li>
                </ul>

                {/* Theme-fit social buttons row */}
                <div className="contact-social-row">
                  <a href="#" className="contact-social-btn" aria-label="Facebook Link" target="_blank" rel="noopener noreferrer">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                      <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
                    </svg>
                    <span>Facebook</span>
                  </a>
                  <a href="#" className="contact-social-btn" aria-label="Telegram Link" target="_blank" rel="noopener noreferrer">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.25-5.54 3.69-.52.36-1 .53-1.42.52-.47-.01-1.37-.26-2.03-.48-.82-.27-1.47-.42-1.42-.88.03-.24.35-.49.97-.74 3.79-1.65 6.32-2.74 7.59-3.27 3.61-1.5 4.36-1.76 4.85-1.77.11 0 .35.03.51.16.13.11.17.26.19.37.02.1.02.21-.01.32z"/>
                    </svg>
                    <span>Telegram</span>
                  </a>
                  <a href="#" className="contact-social-btn" aria-label="WhatsApp Link" target="_blank" rel="noopener noreferrer">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.1 1.458 4.796 1.459 5.539 0 10.047-4.479 10.05-9.986.002-2.67-1.032-5.18-2.907-7.06C16.613 1.686 14.12 .65 11.66.65c-5.54 0-10.048 4.478-10.051 9.987-.001 2.078.543 4.103 1.571 5.881L2.12 20.612l4.527-1.458zm11.168-7.56c-.305-.153-1.805-.89-2.083-.99-.279-.101-.482-.153-.684.153-.202.304-.785.99-.962 1.19-.177.203-.355.228-.66.076-.304-.152-1.285-.474-2.448-1.512-.904-.808-1.513-1.807-1.69-2.112-.177-.305-.019-.47.133-.621.137-.136.305-.355.457-.532.152-.177.202-.304.304-.507.102-.203.051-.38-.025-.532-.076-.153-.684-1.65-.938-2.26-.247-.594-.5-.513-.684-.523-.177-.01-.38-.01-.582-.01-.203 0-.532.076-.811.38-.279.305-1.065 1.042-1.065 2.541 0 1.498 1.09 2.946 1.242 3.149.152.203 2.146 3.28 5.197 4.598.726.313 1.293.5 1.734.64.73.232 1.396.199 1.922.12.586-.088 1.805-.738 2.059-1.45.253-.711.253-1.32.177-1.448-.076-.126-.279-.203-.583-.355z"/>
                    </svg>
                    <span>WhatsApp</span>
                  </a>
                </div>
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
