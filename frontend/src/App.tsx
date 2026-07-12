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
  Calendar,
  Search
} from 'lucide-react'

interface Slide {
  image: string
  subtitle: string
  title: string
  desc: string
}

function App() {
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
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [slides.length])

  // Scroll handler for navigation
  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      {/* Header & Navbar */}
      <header className="header">
        <div className="container">
          <nav className="navbar" role="navigation" aria-label="Main Navigation">
            {/* Left: Brand Logo */}
            <a href="/" className="logo-link" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
              <img src="/logo.webp" alt="Chantrea Travel Logo" className="logo-icon" />
              <span className="logo-text">Chantrea <span>Travel</span></span>
            </a>

            {/* Center: Subtitle Badge (Inspired by reference) */}
            <div className="header-badge">
              <span className="badge-dot"></span>
              <span>Your Trusted Global Travel & Visa Partner</span>
            </div>

            {/* Right: Desktop Menu */}
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

            {/* Mobile Menu Icon */}
            <button 
              className="menu-toggle" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ flexGrow: 1 }}>
        <div className="container">
          
          {/* Hero Slideshow Section (Mimicking the premium card style of the reference image) */}
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
                    // Highlight the last word in gold
                    if (i === slides[activeSlide].title.split(' ').length - 1) {
                      return <span key={i}>{word}</span>;
                    }
                    return word + ' ';
                  })}
                </h1>
                <p className="hero-desc">{slides[activeSlide].desc}</p>
              </div>

              {/* Badges Row at Bottom of Card (Inspired by reference) */}
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

            <div className="services-grid">
              
              {/* Flights Card */}
              <div id="services-flights" className="service-card">
                <div className="service-icon-wrapper">
                  <Plane size={28} />
                </div>
                <h3 className="service-title">Worldwide Flight Tickets</h3>
                <p className="service-text">
                  Book international flight tickets through major global carriers. We find the most convenient routes and competitive fares to suit your schedule.
                </p>
                <ul className="service-list">
                  <li className="service-list-item"><CheckCircle size={14} /> Travel Consultation & Planning</li>
                  <li className="service-list-item"><CheckCircle size={14} /> Ticket Issuance & Flight Changes</li>
                  <li className="service-list-item"><CheckCircle size={14} /> Ongoing Traveler Support</li>
                </ul>
                <a href="#contact" className="service-link" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>
                  Inquire Flights <ChevronRight size={16} />
                </a>
              </div>

              {/* Hotels Card */}
              <div id="services-hotels" className="service-card">
                <div className="service-icon-wrapper">
                  <Hotel size={28} />
                </div>
                <h3 className="service-title">Global Hotel Reservations</h3>
                <p className="service-text">
                  Arrange secure, comfortable hotel bookings at your destination. We coordinate lodging to match your preferences and budget.
                </p>
                <ul className="service-list">
                  <li className="service-list-item"><CheckCircle size={14} /> Luxury Resorts & Suites</li>
                  <li className="service-list-item"><CheckCircle size={14} /> Affordable Business Lodging</li>
                  <li className="service-list-item"><CheckCircle size={14} /> Secure Booking & Confirmation</li>
                </ul>
                <a href="#contact" className="service-link" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>
                  Inquire Hotels <ChevronRight size={16} />
                </a>
              </div>

              {/* Visa Consultation Card */}
              <div id="services-visas" className="service-card">
                <div className="service-icon-wrapper">
                  <FileText size={28} />
                </div>
                <h3 className="service-title">Visa Consultation & Assistance</h3>
                <p className="service-text">
                  Professional guidance and documentation support to confidently navigate the visa application processes for major international destinations.
                </p>
                <ul className="service-list">
                  <li className="service-list-item"><CheckCircle size={14} /> Canada Visa Assistance</li>
                  <li className="service-list-item"><CheckCircle size={14} /> Australia Visa Assistance</li>
                  <li className="service-list-item"><CheckCircle size={14} /> United States (USA) Visas</li>
                </ul>
                <a href="#contact" className="service-link" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>
                  Get Visa Advice <ChevronRight size={16} />
                </a>
              </div>

              {/* China & Vietnam Visa Card */}
              <div className="service-card">
                <div className="service-icon-wrapper">
                  <Globe size={28} />
                </div>
                <h3 className="service-title">China & Vietnam Visas</h3>
                <p className="service-text">
                  Dedicated visa filing and processing support for travelers visiting China or Vietnam for tourism, business, or family visits.
                </p>
                <ul className="service-list">
                  <li className="service-list-item"><CheckCircle size={14} /> Document Requirements Checklist</li>
                  <li className="service-list-item"><CheckCircle size={14} /> Form Filling & Submission Prep</li>
                  <li className="service-list-item"><CheckCircle size={14} /> Smooth Processing Support</li>
                </ul>
                <a href="#contact" className="service-link" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>
                  Learn More <ChevronRight size={16} />
                </a>
              </div>

              {/* Cambodian Extensions Card */}
              <div id="services-extensions" className="service-card">
                <div className="service-icon-wrapper">
                  <Calendar size={28} />
                </div>
                <h3 className="service-title">Cambodian Visa Extensions</h3>
                <p className="service-text">
                  Reliable visa extension assistance for foreign travelers currently residing or visiting inside Cambodia to maintain legal immigration status.
                </p>
                <ul className="service-list">
                  <li className="service-list-item"><CheckCircle size={14} /> Extension Strategy Options</li>
                  <li className="service-list-item"><CheckCircle size={14} /> Documentation Compilation</li>
                  <li className="service-list-item"><CheckCircle size={14} /> Cambodian Authority Coordination</li>
                </ul>
                <a href="#contact" className="service-link" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>
                  Extend Visa <ChevronRight size={16} />
                </a>
              </div>

              {/* Chinese Immigration Card */}
              <div className="service-card">
                <div className="service-icon-wrapper">
                  <Search size={28} />
                </div>
                <h3 className="service-title">Chinese Immigration Assistance</h3>
                <p className="service-text">
                  Detailed professional guidance for individuals and businesses navigating Chinese immigration regulations, travel permissions, and procedures.
                </p>
                <ul className="service-list">
                  <li className="service-list-item"><CheckCircle size={14} /> Business & Personal Checklists</li>
                  <li className="service-list-item"><CheckCircle size={14} /> Immigration Policy Compliance</li>
                  <li className="service-list-item"><CheckCircle size={14} /> Reliable Authority Advisory</li>
                </ul>
                <a href="#contact" className="service-link" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>
                  Request Support <ChevronRight size={16} />
                </a>
              </div>

            </div>
          </section>

          {/* About Section */}
          <section id="about" className="section section-bg" style={{ borderRadius: 'var(--radius-xl)', padding: '80px 48px' }}>
            <div className="about-split">
              {/* Left Column: Why Choose Us Grid */}
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

              {/* Right Column: Narrative */}
              <div className="about-text-content">
                <span className="section-tag">About Chantrea Travel</span>
                <h2 className="section-title" style={{ textAlign: 'left' }}>Your Trusted Global Travel & Visa Partner</h2>
                <p className="about-paragraph">
                  At Chantrea Travel, we are committed to making international travel simple, convenient, and stress-free. Whether you are traveling for business, leisure, education, or family visits, our experienced team provides professional travel solutions tailored to your needs.
                </p>
                <p className="about-paragraph">
                  From planning your flight itinerary to booking accommodations and assisting with complex travel documentation, we are dedicated to delivering reliable service and exceptional customer support every step of the way. Your journey begins with us—connecting you to destinations around the world with confidence and care.
                </p>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="section contact-section">
            <div className="contact-layout">
              {/* Brand Info */}
              <div className="contact-brand">
                <a href="/" className="contact-logo" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                  <img src="/logo.webp" alt="" style={{ width: '32px', height: '32px' }} />
                  <span>Chantrea <span>Travel</span></span>
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
