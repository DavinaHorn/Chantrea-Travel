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

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

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
        
        {/* Hero Slideshow Section - Now Full Screen Edge-to-Edge outside container */}
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

            {/* Overlaid text aligned to standard container width */}
            <div className="container hero-content-container">
              <div className="hero-content">
                <span className="hero-subtitle">{slides[activeSlide].subtitle}</span>
                <h1 className="hero-title">
                  {slides[activeSlide].title.split(' ').map((word, i) => {
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
          </div>
        </section>

        {/* Outer Site Container for Page Content */}
        <div className="container">
          
          {/* Our Services Section */}
          <section id="services" className="section">
            <div className="section-header">
              <span className="section-tag">What We Do</span>
              <h2 className="section-title">Our Professional Services</h2>
              <p className="section-desc">
                Chantrea Travel provides comprehensive, reliable travel documentation and booking services to connect you to global destinations with confidence.
              </p>
            </div>

            {/* Service 1: Worldwide Flight Tickets */}
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
                    <div className="bento-card bento-card-flights-1">
                      <img src="/country_china.webp" alt="China" className="bento-img" />
                      <div className="bento-overlay"></div>
                      <span className="bento-badge">China</span>
                    </div>
                    <div className="bento-card bento-card-flights-2">
                      <img src="/country_vietnam.webp" alt="Vietnam" className="bento-img" />
                      <div className="bento-overlay"></div>
                      <span className="bento-badge">Vietnam</span>
                    </div>
                    <div className="bento-card bento-card-flights-3">
                      <img src="/country_canada.webp" alt="Canada" className="bento-img" />
                      <div className="bento-overlay"></div>
                      <span className="bento-badge">Canada</span>
                    </div>
                    <div className="bento-card bento-card-flights-4">
                      <img src="/country_australia.webp" alt="Australia" className="bento-img" />
                      <div className="bento-overlay"></div>
                      <span className="bento-badge">Australia</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Service 2: Global Hotel Reservations */}
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
                {/* Left side: Hotels Bento Grid */}
                <div className="service-col-visual">
                  <div className="bento-grid bento-grid-hotels">
                    <div className="bento-card bento-card-hotels-1">
                      <img src="/hotel_cambodia.webp" alt="Angkor Resort Cambodia" className="bento-img" />
                      <div className="bento-overlay"></div>
                      <span className="bento-badge">Cambodia</span>
                    </div>
                    <div className="bento-card bento-card-hotels-2">
                      <img src="/hotel_singapore.webp" alt="Rooftop Pool Singapore" className="bento-img" />
                      <div className="bento-overlay"></div>
                      <span className="bento-badge">Singapore</span>
                    </div>
                    <div className="bento-card bento-card-hotels-3">
                      <img src="/hotel_vietnam.webp" alt="Beach Resort Vietnam" className="bento-img" />
                      <div className="bento-overlay"></div>
                      <span className="bento-badge">Vietnam</span>
                    </div>
                    <div className="bento-card bento-card-hotels-4">
                      <img src="/hotel_canada.webp" alt="Castle Hotel Canada" className="bento-img" />
                      <div className="bento-overlay"></div>
                      <span className="bento-badge">Canada</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Service 3: Visa Consultation & Assistance */}
            <div id="services-visas" className="service-block">
              <div className="service-row">
                <div className="service-col-info" style={{ flex: '1 1 60%', padding: '48px' }}>
                  <span className="service-block-tag">Travel Documents</span>
                  <h3 className="service-block-title" style={{ marginTop: '8px', marginBottom: '16px' }}>Visa Consultation & Assistance</h3>
                  <p className="service-block-text" style={{ marginBottom: '24px' }}>
                    Applying for a visa can be a complex process, but our experienced team is here to guide you every step of the way. We provide professional consultation and application assistance for major global destinations:
                  </p>
                  <div className="visas-grid-col" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                    <div className="visa-country-card" style={{ padding: '20px' }}>
                      <h4 className="visa-country-name" style={{ fontSize: '16px' }}>Canada Visas</h4>
                      <p className="visa-country-desc" style={{ fontSize: '13px' }}>Documentation checks and application tracking.</p>
                    </div>
                    <div className="visa-country-card" style={{ padding: '20px' }}>
                      <h4 className="visa-country-name" style={{ fontSize: '16px' }}>Australia Visas</h4>
                      <p className="visa-country-desc" style={{ fontSize: '13px' }}>Subclass selection and document compilation.</p>
                    </div>
                    <div className="visa-country-card" style={{ padding: '20px' }}>
                      <h4 className="visa-country-name" style={{ fontSize: '16px' }}>United States Visas</h4>
                      <p className="visa-country-desc" style={{ fontSize: '13px' }}>DS-160 support and mock interviews.</p>
                    </div>
                  </div>
                </div>
                <div className="service-col-visual" style={{ flex: '1 1 40%', padding: '0', overflow: 'hidden' }}>
                  <img src="/service_visa_consultation.webp" alt="Visa Travel Documents" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  <div className="bento-overlay"></div>
                </div>
              </div>
            </div>

            {/* Service 4: China & Vietnam Visa Services */}
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
              <div className="china-vietnam-right" style={{ backgroundImage: 'url("/service_china_vietnam.webp")', backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
                <div className="bento-overlay" style={{ background: 'linear-gradient(to bottom, rgba(10, 25, 47, 0.5) 0%, rgba(10, 25, 47, 0.8) 100%)' }}></div>
                <div style={{ position: 'relative', zIndex: 3, width: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <h4 style={{ fontSize: '18px', color: '#FFFFFF', fontWeight: 600 }}>Key Processing Metrics</h4>
                  <div className="china-vietnam-stat-row">
                    <div className="china-vietnam-stat-card" style={{ background: 'rgba(255, 255, 255, 0.15)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255, 255, 255, 0.2)' }}>
                      <div className="china-vietnam-stat-num" style={{ color: '#FFFFFF' }}>98%</div>
                      <div className="china-vietnam-stat-label" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Approval Rate</div>
                    </div>
                    <div className="china-vietnam-stat-card" style={{ background: 'rgba(255, 255, 255, 0.15)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255, 255, 255, 0.2)' }}>
                      <div className="china-vietnam-stat-num" style={{ color: '#FFFFFF' }}>5-7</div>
                      <div className="china-vietnam-stat-label" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Working Days</div>
                    </div>
                  </div>
                  <div className="service-block-item" style={{ fontSize: '14px', fontStyle: 'italic', color: '#FFFFFF' }}>
                    <Info size={16} style={{ color: '#FFFFFF' }} /> Special fast track options are available upon request.
                  </div>
                </div>
              </div>
            </div>

            {/* Service 5: Cambodian Visa Extensions */}
            <div id="services-extensions" className="service-block">
              <div className="service-row">
                {/* Column 1: Info */}
                <div className="extensions-left" style={{ flex: '1 1 40%', padding: '40px' }}>
                  <span className="service-block-tag">In-Country Compliance</span>
                  <h3 className="service-block-title" style={{ fontSize: '26px' }}>Cambodian Visa Extensions</h3>
                  <p className="service-block-text" style={{ fontSize: '14.5px', marginBottom: '16px' }}>
                    For foreign visitors currently residing or visiting inside Cambodia, we provide reliable visa extension assistance to help you maintain compliance with Cambodian immigration regulations.
                  </p>
                  <ul className="service-block-list" style={{ gap: '8px' }}>
                    <li className="service-block-item" style={{ fontSize: '13.5px' }}><CheckCircle size={15} /> Extension Option Strategy</li>
                    <li className="service-block-item" style={{ fontSize: '13.5px' }}><CheckCircle size={15} /> Passport & Document Handling</li>
                    <li className="service-block-item" style={{ fontSize: '13.5px' }}><CheckCircle size={15} /> Immigration Department Coordination</li>
                  </ul>
                </div>
                {/* Column 2: Photo */}
                <div style={{ flex: '1 1 25%', position: 'relative', minHeight: '260px' }}>
                  <img src="/service_cambodian_extensions.webp" alt="Cambodian Visa Scenery" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  <div className="bento-overlay"></div>
                </div>
                {/* Column 3: Table */}
                <div className="extensions-right" style={{ flex: '1 1 35%', padding: '40px' }}>
                  <h4 className="service-title" style={{ fontSize: '17px', marginBottom: '16px', color: 'var(--text-primary)' }}>Standard Extensions</h4>
                  <table className="extensions-table">
                    <thead>
                      <tr>
                        <th style={{ padding: '8px 12px' }}>Type</th>
                        <th style={{ padding: '8px 12px' }}>Entry</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style={{ padding: '8px 12px' }}><span className="extensions-badge-duration">1 Month</span></td>
                        <td style={{ padding: '8px 12px' }}>Single Entry</td>
                      </tr>
                      <tr>
                        <td style={{ padding: '8px 12px' }}><span className="extensions-badge-duration">3 Months</span></td>
                        <td style={{ padding: '8px 12px' }}>Single Entry</td>
                      </tr>
                      <tr>
                        <td style={{ padding: '8px 12px' }}><span className="extensions-badge-duration">6 Months</span></td>
                        <td style={{ padding: '8px 12px' }}>Multiple Entry</td>
                      </tr>
                      <tr>
                        <td style={{ padding: '8px 12px' }}><span className="extensions-badge-duration">12 Months</span></td>
                        <td style={{ padding: '8px 12px' }}>Multiple Entry</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Service 6: Chinese Immigration Assistance */}
            <div className="service-block">
              <div className="service-row">
                {/* Column 1: Text */}
                <div className="immigration-info" style={{ flex: '1 1 40%', padding: '40px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <span className="service-block-tag">Corporate & Personal</span>
                  <h3 className="service-block-title" style={{ fontSize: '26px' }}>Chinese Immigration Assistance</h3>
                  <p className="service-block-text" style={{ fontSize: '14.5px' }}>
                    We provide comprehensive support for individuals and businesses requiring assistance with Chinese immigration-related procedures. Our knowledgeable team is committed to providing professional assistance.
                  </p>
                  <a href="#contact" className="nav-btn" style={{ alignSelf: 'flex-start', padding: '10px 20px', fontSize: '14px' }} onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>
                    Contact Representative
                  </a>
                </div>
                {/* Column 2: Photo */}
                <div style={{ flex: '1 1 30%', position: 'relative', minHeight: '260px' }}>
                  <img src="/service_chinese_immigration.webp" alt="Chinese Immigration Professional Meeting" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  <div className="bento-overlay"></div>
                </div>
                {/* Column 3: Corporate Options */}
                <div className="immigration-services-grid" style={{ flex: '1 1 30%', padding: '40px', display: 'flex', flexDirection: 'column', gap: '12px', justifyContent: 'center' }}>
                  <div className="immigration-service-row" style={{ padding: '12px 16px' }}>
                    <span className="immigration-row-title" style={{ fontSize: '13.5px' }}>Visa Invitation Checklists</span>
                    <ChevronRightSquare size={16} style={{ color: 'var(--accent-purple)' }} />
                  </div>
                  <div className="immigration-service-row" style={{ padding: '12px 16px' }}>
                    <span className="immigration-row-title" style={{ fontSize: '13.5px' }}>Residence Permit Guidance</span>
                    <ChevronRightSquare size={16} style={{ color: 'var(--accent-purple)' }} />
                  </div>
                  <div className="immigration-service-row" style={{ padding: '12px 16px' }}>
                    <span className="immigration-row-title" style={{ fontSize: '13.5px' }}>Legal Travel Clearance Advice</span>
                    <ChevronRightSquare size={16} style={{ color: 'var(--accent-purple)' }} />
                  </div>
                </div>
              </div>
            </div>

          </section>

          {/* About Section */}
          <section id="about" className="section">
            <div className="about-split">
              {/* Left Column: Portrait Frame without outline boxes */}
              <div className="about-founder-container">
                <img src="/davina_horn.webp" alt="Davina Horn - Founder of Chantrea Travel" className="about-founder-img" />
                <div className="about-founder-info">
                  <h4 className="about-founder-name">Davina Horn</h4>
                  <p className="about-founder-title">Owner & Managing Director</p>
                </div>
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

                {/* Blended inline social link row */}
                <div className="contact-social-row">
                  <a href="#" className="contact-social-link" aria-label="Facebook Link" target="_blank" rel="noopener noreferrer">
                    Facebook
                  </a>
                  <span className="contact-social-divider">•</span>
                  <a href="#" className="contact-social-link" aria-label="Telegram Link" target="_blank" rel="noopener noreferrer">
                    Telegram
                  </a>
                  <span className="contact-social-divider">•</span>
                  <a href="#" className="contact-social-link" aria-label="WhatsApp Link" target="_blank" rel="noopener noreferrer">
                    WhatsApp
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
