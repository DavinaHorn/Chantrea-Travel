import { useState, useEffect, useRef } from 'react'
import { 
  MapPin, 
  Phone, 
  Mail, 
  CheckCircle, 
  ChevronRight, 
  Menu, 
  X, 
  ChevronRightSquare,
  ArrowRight
} from 'lucide-react'

interface Slide {
  image: string
  subtitle: string
  title: string
  desc: string
}

interface BlogPost {
  id: string
  title: string
  date: string
  author: string
  summary: string
  image: string
  content: string[]
}

const SAMPLE_BLOGS: BlogPost[] = [
  {
    id: 'cambodia',
    title: 'Top 5 Places to Visit in Cambodia: The Kingdom of Wonder',
    date: 'July 12, 2026',
    author: 'Davina Horn',
    summary: 'From the awe-inspiring temple complexes of Angkor Wat to the pristine white sands of Koh Rong and the historical heritage of Phnom Penh, discover the ultimate travel guide to Cambodia.',
    image: '/hotel_cambodia.webp',
    content: [
      'Cambodia, known as the "Kingdom of Wonder," is a destination that captures the heart of every traveler. Rich in history, culture, and natural beauty, it offers a diverse range of experiences from ancient archaeological marvels to tropical island getaways.',
      '1. Angkor Archaeological Park (Siem Reap): No trip to Cambodia is complete without exploring the UNESCO World Heritage site of Angkor. Spanning over 400 square kilometers, this ancient capital of the Khmer Empire features the magnificent Angkor Wat, the stone faces of Bayon Temple, and the jungle-entangled Ta Prohm.',
      '2. Phnom Penh: The bustling capital city sits at the confluence of three rivers. Here, visitors can explore the ornate Royal Palace and Silver Pagoda, shop at the Art Deco Central Market, and pay respects at the historic Tuol Sleng Genocide Museum and Choeung Ek Killing Fields.',
      '3. Koh Rong & Koh Rong Sanloem: For tropical paradise seekers, these islands off the coast of Sihanoukville offer crystal-clear turquoise waters, powdery white sand beaches, and a relaxed, laid-back atmosphere perfect for snorkeling, diving, or simply unwinding.',
      '4. Kampot & Kep: Famous for its world-class black pepper, Kampot is a charming riverside town with French colonial architecture. Just a short drive away is Kep, a quiet coastal town renowned for its delicious fresh crab market and scenic national park.',
      '5. Cardamom Mountains: One of Southeast Asia’s largest remaining rainforests, the Cardamom Mountains offer eco-tourism adventures, community-based homestays, kayaking on pristine rivers, and trekking through dense jungle to spot rare wildlife.'
    ]
  },
  {
    id: 'canada',
    title: 'Discover Canada: Majestic Mountains, Vibrant Cities, and Coastal Beauty',
    date: 'June 28, 2026',
    author: 'Travel Specialist',
    summary: 'Embark on an unforgettable Canadian journey. Explore the breathtaking Canadian Rockies in Banff, the French-infused streets of Old Montreal, and the spectacular coastal vistas of Vancouver.',
    image: '/hotel_canada.webp',
    content: [
      'Canada is a vast and diverse country, boasting some of the world’s most spectacular natural wonders alongside clean, friendly, and culturally rich cities. Spanning six time zones, it offers endless opportunities for outdoor adventure and urban exploration.',
      '1. Banff National Park (Alberta): Nestled in the heart of the Canadian Rockies, Banff is famous for its towering snow-capped peaks, dense pine forests, and glacier-fed lakes with unreal turquoise water—such as Lake Louise and Moraine Lake.',
      '2. Vancouver & Whistler (British Columbia): Vancouver combines a vibrant urban scene with immediate access to nature. Stroll through Stanley Park, explore Granville Island, and then take the scenic Sea-to-Sky Highway up to Whistler, a world-famous ski and mountain resort.',
      '3. Niagara Falls (Ontario): One of the world’s most famous natural attractions, these massive waterfalls straddle the US-Canada border. Take a boat tour to get close to the thundering spray or view them from the Skylon Tower.',
      '4. Quebec City & Montreal (Quebec): Experience European charm in North America. Stroll the historic cobblestone streets of Old Quebec, a fortified colonial city, and visit Montreal to experience its legendary culinary scene, festivals, and bilingual culture.',
      '5. The Maritimes (Atlantic Canada): Explore the rugged coastline, lighthouses, and fishing villages of Nova Scotia, New Brunswick, and Prince Edward Island. Highlights include driving the scenic Cabot Trail and tasting fresh Atlantic lobster.'
    ]
  },
  {
    id: 'us',
    title: 'The Ultimate US Travel Guide: From Skyscrapers to National Parks',
    date: 'June 15, 2026',
    author: 'Travel Specialist',
    summary: 'Plan your dream American road trip. Discover the dazzling lights of New York City, the geological marvels of the Grand Canyon, and the sunny beaches of California.',
    image: '/blog_us.png',
    content: [
      'The United States is a land of incredible variety, offering travelers everything from iconic urban skylines and entertainment capitals to deep canyons, sandy coastlines, and active geothermal parks.',
      '1. New York City: The "City That Never Sleeps" is a global hub of culture, art, fashion, and food. Highlights include walking through Central Park, seeing a Broadway show, exploring diverse neighborhoods like Soho and Brooklyn, and visiting the Statue of Liberty.',
      '2. Grand Canyon National Park (Arizona): A true natural wonder, the Grand Canyon is a massive, colorful gorge carved by the Colorado River over millions of years. The South Rim offers stunning panoramic views, hiking trails, and gorgeous sunset vistas.',
      '3. California Coastline: Drive the iconic Pacific Coast Highway (Highway 1) from San Francisco—with its Golden Gate Bridge and historic cable cars—down to sunny Los Angeles and San Diego, stopping at scenic spots like Big Sur and Santa Barbara.',
      '4. Yellowstone National Park (Wyoming/Montana): The world’s first national park is a geological wonderland. It sits atop a volcanic hot spot and features thousands of geothermal features, including the Old Faithful geyser and the colorful Grand Prismatic Spring.',
      '5. New Orleans (Louisiana): Known for its round-the-clock nightlife, vibrant live music scene, and unique culinary heritage, New Orleans is a melting pot of French, African, and American cultures. Don\'t miss visiting the historic French Quarter and tasting delicious local beignets.'
    ]
  }
]

const getPageView = (pathString: string) => {
  if (pathString === '/blogs') return 'blogs'
  if (pathString.startsWith('/blog/')) return 'blog-detail'
  if (pathString === '/about') return 'about'
  return 'home'
}

const getRouteIndex = (view: string) => {
  switch (view) {
    case 'home': return 0
    case 'blogs': return 1
    case 'blog-detail': return 2
    case 'about': return 3
    default: return 0
  }
}

interface LastFlightCardProps {
  navigate: (targetPath: string, anchorId?: string) => void
}

const LastFlightCard = ({ navigate }: LastFlightCardProps) => {
  const worldImages = [
    '/hotel_cambodia.webp',
    '/country_vietnam.webp',
    '/country_canada.webp',
    '/country_australia.webp',
    '/country_china.webp',
    '/hero_hotel.webp',
    '/hero_flight.webp',
    '/hero_visa.webp'
  ]

  const [imgIndex, setImgIndex] = useState(0)
  const speedRef = useRef(1) // Speed multiplier: 1 at start, 15 at end
  const cardRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!cardRef.current) return
      const parent = cardRef.current.closest('.flights-stack-container')
      if (!parent) return
      
      const rect = parent.getBoundingClientRect()
      const totalScroll = rect.height - window.innerHeight
      if (totalScroll <= 0) return
      
      const progress = Math.min(Math.max(-rect.top / totalScroll, 0), 1)
      speedRef.current = 1 + Math.pow(progress, 2.5) * 14
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    let lastTime = performance.now()
    let accumulator = 0
    let frameId: number

    const tick = (now: number) => {
      const delta = now - lastTime
      lastTime = now

      accumulator += delta * speedRef.current

      if (accumulator >= 1200) {
        setImgIndex((prev) => (prev + 1) % worldImages.length)
        accumulator = accumulator % 1200
      }

      frameId = requestAnimationFrame(tick)
    }

    frameId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameId)
  }, [])

  return (
    <div ref={cardRef} className="flight-stack-card last-card reveal-element">
      <div className="last-card-slideshow">
        {worldImages.map((src, index) => (
          <img 
            key={index} 
            src={src} 
            alt="Worldwide travel destination" 
            className={`last-card-slide-img ${index === imgIndex ? 'active' : ''}`}
          />
        ))}
      </div>
      <div className="card-overlay dark-overlay"></div>
      <div className="card-content last-card-content">
        <span className="last-card-tag">Flight Booking</span>
        <h3 className="last-card-title">Worldwide Flight Tickets</h3>
        <p className="last-card-text">
          CHANTREA Travel Cambodia offers worldwide flight ticket booking through major international airlines, helping you find the most suitable routes and competitive fares. Wherever your destination, we connect you with confidence and care.
        </p>
        <ul className="last-card-list">
          <li className="last-card-item"><CheckCircle size={16} /> Travel Consultation & Planning</li>
          <li className="last-card-item"><CheckCircle size={16} /> Ticket Issuance & Flight Changes</li>
          <li className="last-card-item"><CheckCircle size={16} /> 24/7 Ongoing Traveler Support</li>
        </ul>
        <a href="#contact" className="last-card-btn" onClick={(e) => { e.preventDefault(); navigate('/', 'contact'); }}>
          Inquire Flights <ArrowRight size={16} />
        </a>
      </div>
    </div>
  )
}

function App() {
  const [activeSlide, setActiveSlide] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [path, setPath] = useState(() => window.location.pathname)
  const [viewState, setViewState] = useState(() => {
    const initialView = getPageView(window.location.pathname)
    return {
      currentView: initialView,
      prevView: null as string | null,
      direction: null as 'forward' | 'backward' | null,
      isTransitioning: false
    }
  })
  const transitionTimerRef = useRef<any>(null)

  // Redesign state variables
  const [statCustomers, setStatCustomers] = useState(0)
  const [statExpertise, setStatExpertise] = useState(0)
  const [statApproval, setStatApproval] = useState(0)
  const [statPartners, setStatPartners] = useState(0)
  const [statsAnimated, setStatsAnimated] = useState(false)

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

  // Handle browser popstate (back/forward buttons)
  useEffect(() => {
    const handlePopState = () => {
      const newPath = window.location.pathname
      const targetView = getPageView(newPath)
      const prevView = getPageView(path)
      
      if (prevView === targetView) {
        setPath(newPath)
        return
      }

      if (transitionTimerRef.current) {
        clearTimeout(transitionTimerRef.current)
        transitionTimerRef.current = null
      }
      
      const prevIndex = getRouteIndex(prevView)
      const targetIndex = getRouteIndex(targetView)
      const direction = targetIndex >= prevIndex ? 'forward' : 'backward'
      
      setViewState({
        currentView: targetView,
        prevView: prevView,
        direction: direction,
        isTransitioning: true
      })
      
      setPath(newPath)
      window.scrollTo(0, 0)
      
      transitionTimerRef.current = window.setTimeout(() => {
        setViewState(prev => ({
          ...prev,
          prevView: null,
          isTransitioning: false
        }))
        transitionTimerRef.current = null
      }, 650)
    }
    
    window.addEventListener('popstate', handlePopState)
    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [path])

  // Clear transition timer on unmount
  useEffect(() => {
    return () => {
      if (transitionTimerRef.current) {
        clearTimeout(transitionTimerRef.current)
      }
    }
  }, [])

  // Scroll helper for initial load if URL contains hash (e.g. #services)
  useEffect(() => {
    const hash = window.location.hash
    if (hash) {
      const id = hash.substring(1)
      const timer = setTimeout(() => {
        const element = document.getElementById(id)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [])

  // Scroll Reveal Observer Setup
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            if (entry.target.classList.contains('stats-reveal-row') && !statsAnimated) {
              setStatsAnimated(true)
            }
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    const timer = setTimeout(() => {
      const elements = document.querySelectorAll('.reveal-element')
      elements.forEach((el) => observer.observe(el))
    }, 150)

    return () => {
      clearTimeout(timer)
      observer.disconnect()
    }
  }, [viewState.currentView, statsAnimated])

  // Stats Counters Animation Effect
  useEffect(() => {
    if (statsAnimated) {
      let c = 0
      const cTimer = setInterval(() => {
        c += 400
        if (c >= 10000) {
          setStatCustomers(10000)
          clearInterval(cTimer)
        } else {
          setStatCustomers(c)
        }
      }, 30)

      let e = 0
      const eTimer = setInterval(() => {
        e += 1
        if (e >= 22) {
          setStatExpertise(22)
          clearInterval(eTimer)
        } else {
          setStatExpertise(e)
        }
      }, 40)

      let a = 0
      const aTimer = setInterval(() => {
        a += 4
        if (a >= 98) {
          setStatApproval(98)
          clearInterval(aTimer)
        } else {
          setStatApproval(a)
        }
      }, 30)

      let p = 0
      const pTimer = setInterval(() => {
        p += 2
        if (p >= 50) {
          setStatPartners(50)
          clearInterval(pTimer)
        } else {
          setStatPartners(p)
        }
      }, 35)

      return () => {
        clearInterval(cTimer)
        clearInterval(eTimer)
        clearInterval(aTimer)
        clearInterval(pTimer)
      }
    }
  }, [statsAnimated])






  const navigate = (targetPath: string, anchorId?: string) => {
    const currentPath = window.location.pathname
    
    if (currentPath === targetPath) {
      if (anchorId) {
        const element = document.getElementById(anchorId)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
      return
    }

    const prevView = getPageView(currentPath)
    const targetView = getPageView(targetPath)
    
    const prevIndex = getRouteIndex(prevView)
    const targetIndex = getRouteIndex(targetView)
    const direction = targetIndex >= prevIndex ? 'forward' : 'backward'
    
    if (transitionTimerRef.current) {
      clearTimeout(transitionTimerRef.current)
      transitionTimerRef.current = null
    }
    
    setViewState({
      currentView: targetView,
      prevView: prevView,
      direction: direction,
      isTransitioning: true
    })
    
    window.history.pushState(null, '', targetPath)
    setPath(targetPath)
    window.scrollTo(0, 0)
    
    transitionTimerRef.current = window.setTimeout(() => {
      setViewState(prev => ({
        ...prev,
        prevView: null,
        isTransitioning: false
      }))
      transitionTimerRef.current = null
      
      if (anchorId) {
        setTimeout(() => {
          const element = document.getElementById(anchorId)
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
          }
        }, 50)
      }
    }, 650)
  }

  const renderView = (view: string) => {
    if (view === 'home') {
      return (
        <>
          {/* Hero Slideshow Section - Full Screen Edge-to-Edge */}
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

              {/* Service 1: Worldwide Flight Tickets (Sticky Stacking Cards) */}
              <div id="services-flights" className="flights-stack-section">
                <div className="flights-stack-container">
                  {/* Card 1: Cambodia */}
                  <div className="flight-stack-card reveal-element">
                    <img src="/hotel_cambodia.webp" alt="Cambodia" className="card-bg-img" />
                    <div className="card-overlay"></div>
                    <div className="card-content">
                      <span className="card-tag">Destinations</span>
                      <h3 className="card-title">Cambodia</h3>
                    </div>
                  </div>

                  {/* Card 2: Vietnam */}
                  <div className="flight-stack-card reveal-element">
                    <img src="/country_vietnam.webp" alt="Vietnam" className="card-bg-img" />
                    <div className="card-overlay"></div>
                    <div className="card-content">
                      <span className="card-tag">Destinations</span>
                      <h3 className="card-title">Vietnam</h3>
                    </div>
                  </div>

                  {/* Card 3: Canada */}
                  <div className="flight-stack-card reveal-element">
                    <img src="/country_canada.webp" alt="Canada" className="card-bg-img" />
                    <div className="card-overlay"></div>
                    <div className="card-content">
                      <span className="card-tag">Destinations</span>
                      <h3 className="card-title">Canada</h3>
                    </div>
                  </div>

                  {/* Card 4: Australia */}
                  <div className="flight-stack-card reveal-element">
                    <img src="/country_australia.webp" alt="Australia" className="card-bg-img" />
                    <div className="card-overlay"></div>
                    <div className="card-content">
                      <span className="card-tag">Destinations</span>
                      <h3 className="card-title">Australia</h3>
                    </div>
                  </div>

                  {/* Card 5: China */}
                  <div className="flight-stack-card reveal-element">
                    <img src="/country_china.webp" alt="China" className="card-bg-img" />
                    <div className="card-overlay"></div>
                    <div className="card-content">
                      <span className="card-tag">Destinations</span>
                      <h3 className="card-title">China</h3>
                    </div>
                  </div>

                  {/* Card 6: Last Card (Worldwide Flight Tickets) */}
                  <LastFlightCard navigate={navigate} />
                </div>
              </div>

              {/* Service 2: Global Hotel Reservations */}
              <div id="services-hotels" className="service-block reveal-element">
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
                    <a href="#contact" className="service-block-link" onClick={(e) => { e.preventDefault(); navigate('/', 'contact'); }}>
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

              {/* Service 3: Visa & Immigration Services (Unified Block) */}
              <div id="services-visas" className="service-block reveal-element">
                {/* Header inside the box */}
                <div style={{ padding: '48px 48px 32px 48px', borderBottom: '1px solid var(--border-light)' }}>
                  <span className="service-block-tag">Visa & Immigration</span>
                  <h3 className="service-block-title" style={{ marginTop: '8px' }}>Visa & Immigration Support</h3>
                  <p className="service-block-text" style={{ marginTop: '12px' }}>
                    Chantrea Travel provides professional assistance and documentation guidance for all your global travel visa and immigration requirements.
                  </p>
                </div>

                {/* Subsection A: Visa Consultation & Assistance */}
                <div className="visa-subsection" style={{ borderBottom: '1px solid var(--border-light)' }}>
                  <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '22px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '16px' }}>
                    Visa Consultation & Assistance
                  </h4>
                  <p className="service-block-text" style={{ marginBottom: '24px' }}>
                    Applying for a visa can be a complex process, but our experienced team is here to guide you every step of the way. We provide professional consultation and application assistance for major global destinations:
                  </p>
                  <div className="visas-grid-col">
                    <div className="visa-country-card">
                      <h5 className="visa-country-name">Canada Visas</h5>
                      <p className="visa-country-desc">Comprehensive documentation checking, invitation assistance, and application tracking for tourist, business, and study visas.</p>
                    </div>
                    <div className="visa-country-card">
                      <h5 className="visa-country-name">Australia Visas</h5>
                      <p className="visa-country-desc">Assistance with subclass selections, document filing, statement preparation, and submission guidance for Australian visas.</p>
                    </div>
                    <div className="visa-country-card">
                      <h5 className="visa-country-name">United States Visas</h5>
                      <p className="visa-country-desc">Complete guidance on completing DS-160 forms, scheduling interview appointments, and mock interview preparations.</p>
                    </div>
                  </div>
                </div>

                {/* Subsection B: China & Vietnam Visa Services */}
                <div className="service-china-vietnam-section" style={{ borderBottom: '1px solid var(--border-light)' }}>
                  <div className="china-vietnam-left">
                    <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '22px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '16px' }}>
                      China & Vietnam Visa Services
                    </h4>
                    <p className="service-block-text" style={{ marginBottom: '20px' }}>
                      Chantrea Travel offers dedicated visa assistance for travelers visiting China and Vietnam. We help clients understand visa requirements, compile supporting files, complete applications, and guide submissions.
                    </p>
                    <ul className="service-block-list">
                      <li className="service-block-item"><CheckCircle size={16} /> Detailed Requirement Checklist</li>
                      <li className="service-block-item"><CheckCircle size={16} /> Form Compiling & Submission Setup</li>
                    </ul>
                  </div>
                  <div className="china-vietnam-right" style={{ background: 'var(--accent-purple-light)' }}>
                    <h5 style={{ fontSize: '16px', color: 'var(--text-primary)', fontWeight: 600 }}>Key Processing Metrics</h5>
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
                  </div>
                </div>

                {/* Subsection C: Cambodian Visa Extensions */}
                <div className="service-cambodian-extensions-section" style={{ borderBottom: '1px solid var(--border-light)' }}>
                  <div className="extensions-left">
                    <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '22px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '16px' }}>
                      Cambodian Visa Extensions
                    </h4>
                    <p className="service-block-text" style={{ marginBottom: '20px' }}>
                      For foreign visitors currently residing or visiting inside Cambodia, we provide reliable visa extension assistance to help you maintain compliance with Cambodian immigration regulations.
                    </p>
                    <ul className="service-block-list">
                      <li className="service-block-item"><CheckCircle size={16} /> Extension Option Strategy</li>
                      <li className="service-block-item"><CheckCircle size={16} /> Passport & Document Handling</li>
                    </ul>
                  </div>
                  <div className="extensions-right" style={{ background: 'var(--bg-secondary)' }}>
                    <h5 style={{ fontSize: '16px', marginBottom: '16px', color: 'var(--text-primary)', fontWeight: 600 }}>Standard Extensions Available</h5>
                    <table className="extensions-table">
                      <tbody>
                        <tr>
                          <td style={{ padding: '6px 12px' }}><span className="extensions-badge-duration">1 Month</span></td>
                          <td style={{ padding: '6px 12px' }}>Single Entry Extension</td>
                        </tr>
                        <tr>
                          <td style={{ padding: '6px 12px' }}><span className="extensions-badge-duration">3 Months</span></td>
                          <td style={{ padding: '6px 12px' }}>Single Entry Extension</td>
                        </tr>
                        <tr>
                          <td style={{ padding: '6px 12px' }}><span className="extensions-badge-duration">6 Months</span></td>
                          <td style={{ padding: '6px 12px' }}>Multiple Entry Extension</td>
                        </tr>
                        <tr>
                          <td style={{ padding: '6px 12px' }}><span className="extensions-badge-duration">12 Months</span></td>
                          <td style={{ padding: '6px 12px' }}>Multiple Entry Extension</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Subsection D: Chinese Immigration Assistance */}
                <div className="service-chinese-immigration-section">
                  <div className="immigration-info">
                    <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '22px', fontWeight: 700, color: 'var(--text-primary)' }}>
                      Chinese Immigration Assistance
                    </h4>
                    <p className="service-block-text">
                      We provide comprehensive support for individuals and businesses requiring assistance with Chinese immigration-related procedures, travel planning, and policy checkups.
                    </p>
                    <a href="#contact" className="nav-btn" style={{ alignSelf: 'flex-start', padding: '10px 20px', fontSize: '14px', display: 'inline-block' }} onClick={(e) => { e.preventDefault(); navigate('/', 'contact'); }}>
                      Contact Representative
                    </a>
                  </div>
                  <div className="immigration-services-grid">
                    <div className="immigration-service-row">
                      <span className="immigration-row-title">Visa Invitation Checklists</span>
                      <ChevronRightSquare size={16} style={{ color: 'var(--accent-purple)' }} />
                    </div>
                    <div className="immigration-service-row">
                      <span className="immigration-row-title">Residence Permit Guidance</span>
                      <ChevronRightSquare size={16} style={{ color: 'var(--accent-purple)' }} />
                    </div>
                    <div className="immigration-service-row">
                      <span className="immigration-row-title">Legal Travel Clearance Advice</span>
                      <ChevronRightSquare size={16} style={{ color: 'var(--accent-purple)' }} />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Latest Blog Summary Section (Between Visa Support and About Partner) */}
            <section className="section reveal-element" id="home-latest-blog" aria-label="Latest Travel Blog Post Summary" style={{ borderTop: '1px solid var(--border-light)', paddingTop: '80px', marginTop: '40px' }}>
              <div className="section-header">
                <span className="section-tag">Travel Insights & Stories</span>
                <h2 className="section-title">Latest Travel Guide</h2>
                <p className="section-desc">
                  Get the latest travel tips, highlights, and insights from our professional travel guides.
                </p>
              </div>
              
              <div className="service-block" style={{ marginBottom: 0 }}>
                <div className="service-row">
                  <div className="service-col-visual" style={{ flex: '1 1 50%', padding: 0 }}>
                    <img 
                      src={SAMPLE_BLOGS[0].image} 
                      alt={SAMPLE_BLOGS[0].title} 
                      style={{ width: '100%', height: '100%', minHeight: '320px', maxHeight: '420px', objectFit: 'cover', display: 'block' }}
                    />
                  </div>
                  <div className="service-col-info" style={{ flex: '1 1 50%', gap: '20px' }}>
                    <span className="service-block-tag">Featured Post • {SAMPLE_BLOGS[0].date}</span>
                    <h3 className="service-block-title" style={{ fontSize: '28px' }}>{SAMPLE_BLOGS[0].title}</h3>
                    <p className="service-block-text">
                      {SAMPLE_BLOGS[0].summary}
                    </p>
                    <div style={{ display: 'flex', gap: '16px', marginTop: '8px' }}>
                      <a 
                        href={`/blog/${SAMPLE_BLOGS[0].id}`} 
                        className="nav-btn" 
                        style={{ display: 'inline-block', fontSize: '14px', padding: '10px 20px' }}
                        onClick={(e) => { e.preventDefault(); navigate(`/blog/${SAMPLE_BLOGS[0].id}`); }}
                      >
                        Read This Post
                      </a>
                      <a 
                        href="/blogs" 
                        className="nav-btn" 
                        style={{ 
                          display: 'inline-block', 
                          fontSize: '14px', 
                          padding: '10px 20px', 
                          backgroundColor: 'transparent', 
                          color: 'var(--accent-purple)', 
                          borderColor: 'var(--accent-purple)' 
                        }}
                        onClick={(e) => { e.preventDefault(); navigate('/blogs'); }}
                      >
                        Read More Blogs
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Stats Counters Section */}
            <section className="section reveal-element" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
              <div className="stats-reveal-row reveal-element">
                <div className="stat-reveal-card">
                  <div className="stat-reveal-num">{statCustomers >= 10000 ? '10K+' : statCustomers.toLocaleString()}</div>
                  <div className="stat-reveal-label">Happy Travelers</div>
                </div>
                <div className="stat-reveal-card">
                  <div className="stat-reveal-num">{statExpertise}+</div>
                  <div className="stat-reveal-label">Years Experience</div>
                </div>
                <div className="stat-reveal-card">
                  <div className="stat-reveal-num">{statApproval}%</div>
                  <div className="stat-reveal-label">Visa Approval</div>
                </div>
                <div className="stat-reveal-card">
                  <div className="stat-reveal-num">{statPartners}+</div>
                  <div className="stat-reveal-label">Global Partners</div>
                </div>
              </div>
            </section>

          </div>
        </>
      )
    }

    if (view === 'blogs') {
      return (
        <div className="container" style={{ paddingTop: '140px', paddingBottom: '60px' }}>
          <div className="section-header" style={{ marginBottom: '48px' }}>
            <span className="section-tag">Travel Guides & Advice</span>
            <h1 className="section-title">Chantrea Travel Blog</h1>
            <p className="section-desc">
              Explore our collections of expert guides, top destinations, and practical tips for your next international journey.
            </p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '32px', marginBottom: '64px' }}>
            {SAMPLE_BLOGS.map((blog) => (
              <div 
                key={blog.id} 
                className="service-block" 
                style={{ height: '100%', marginBottom: 0, display: 'flex', flexDirection: 'column' }}
              >
                <div style={{ position: 'relative', height: '240px', overflow: 'hidden' }}>
                  <img 
                    src={blog.image} 
                    alt={blog.title} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  />
                </div>
                <div style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '16px', justifyContent: 'space-between', flexGrow: 1 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-light)', letterSpacing: '1px', textTransform: 'uppercase' }}>
                      {blog.date} • By {blog.author}
                    </span>
                    <h3 className="visa-country-name" style={{ fontSize: '20px', lineHeight: '1.4' }}>
                      {blog.title}
                    </h3>
                    <p className="service-block-text" style={{ fontSize: '14px' }}>
                      {blog.summary}
                    </p>
                  </div>
                  <a 
                    href={`/blog/${blog.id}`} 
                    className="service-block-link" 
                    style={{ alignSelf: 'flex-start', marginTop: '8px' }}
                    onClick={(e) => { e.preventDefault(); navigate(`/blog/${blog.id}`); }}
                  >
                    Read Story <ArrowRight size={16} />
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center' }}>
            <a 
              href="/" 
              className="nav-btn" 
              onClick={(e) => { e.preventDefault(); navigate('/'); }}
            >
              Back to Home
            </a>
          </div>
        </div>
      )
    }

    if (view === 'about') {
      return (
        <div className="container" style={{ paddingTop: '140px', paddingBottom: '60px' }}>
          <section id="about" className="section" style={{ marginBottom: 0 }}>
            <div className="about-split">
              {/* Left Column: Portrait Frame without outline boxes, lines, or shadows */}
              <div className="about-founder-container">
                <img src="/davina_horn.webp" alt="Davina Horn - Founder of Chantrea Travel" className="about-founder-img" />
                <div className="about-founder-info">
                  <h4 className="about-founder-name">Davina Horn</h4>
                  <p className="about-founder-title">Owner & Managing Director</p>
                </div>
              </div>

              {/* Right Column: Narrative & Biography */}
              <div className="about-text-content">
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
                    Throughout her 22-year career in the travel industry, Davina Horn has worked with leading travel agencies and international travel companies, including <strong>K.U. Travel</strong>, <strong>Amary Travel</strong> (Representative of <strong>Carlson Wagonlit Travel</strong>), <strong>Korean Air</strong>, and <strong>EXO Travel</strong>. These roles have provided her with extensive experience in airline reservations, corporate travel, hotel bookings, and travel management, forming the foundation of the professional expertise she brings to every client at <strong>Chantrea Travel</strong>.
                  </p>
                </div>
              </div>
            </div>
          </section>
          
          <div style={{ textAlign: 'center', marginTop: '64px' }}>
            <a 
              href="/" 
              className="nav-btn" 
              onClick={(e) => { e.preventDefault(); navigate('/'); }}
            >
              Back to Home
            </a>
          </div>
        </div>
      )
    }

    if (view === 'blog-detail') {
      const activeBlogPostId = window.location.pathname.replace('/blog/', '');
      const blog = SAMPLE_BLOGS.find(b => b.id === activeBlogPostId);
      if (!blog) {
        return (
          <div className="container" style={{ paddingTop: '140px', paddingBottom: '60px' }}>
            <div style={{ textAlign: 'center', padding: '80px 0' }}>
              <h2 className="section-title">Blog Post Not Found</h2>
              <p className="section-desc" style={{ marginBottom: '32px' }}>The blog post you are looking for does not exist.</p>
              <a href="/blogs" className="nav-btn" onClick={(e) => { e.preventDefault(); navigate('/blogs'); }}>Back to Blogs</a>
            </div>
          </div>
        );
      }
      return (
        <div className="container" style={{ paddingTop: '140px', paddingBottom: '60px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ marginBottom: '32px' }}>
              <span className="section-tag" style={{ marginBottom: '16px' }}>{blog.date} • By {blog.author}</span>
              <h1 className="section-title" style={{ textAlign: 'left', fontSize: 'clamp(28px, 5vw, 48px)', lineHeight: '1.15', marginBottom: '24px' }}>
                {blog.title}
              </h1>
            </div>
            
            <div style={{ borderRadius: 'var(--radius-xl)', overflow: 'hidden', height: 'clamp(200px, 35vh, 400px)', marginBottom: '40px', boxShadow: 'var(--shadow-md)' }}>
              <img 
                src={blog.image} 
                alt={blog.title} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '64px' }}>
              {blog.content.map((paragraph, index) => (
                <p 
                  key={index} 
                  className="about-paragraph" 
                  style={{ 
                    fontSize: '17px', 
                    lineHeight: '1.8', 
                    color: 'var(--text-primary)',
                    fontWeight: paragraph.startsWith('1.') || paragraph.startsWith('2.') || paragraph.startsWith('3.') || paragraph.startsWith('4.') || paragraph.startsWith('5.') ? 600 : 400,
                    marginTop: paragraph.startsWith('1.') || paragraph.startsWith('2.') || paragraph.startsWith('3.') || paragraph.startsWith('4.') || paragraph.startsWith('5.') ? '16px' : '0'
                  }}
                >
                  {paragraph}
                </p>
              ))}
            </div>
            
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', borderTop: '1px solid var(--border-light)', paddingTop: '40px' }}>
              <a href="/blogs" className="nav-btn" style={{ backgroundColor: 'transparent', color: 'var(--accent-purple)', borderColor: 'var(--accent-purple)' }} onClick={(e) => { e.preventDefault(); navigate('/blogs'); }}>
                Back to Blogs
              </a>
              <a href="/" className="nav-btn" onClick={(e) => { e.preventDefault(); navigate('/'); }}>
                Back to Home
              </a>
            </div>
          </div>
        </div>
      );
    }

    return null;
  }

  const logoSrc = '/CTT_LOGO-HP.webp'

  return (
    <>



      {/* Header & Navbar */}
      <header className="header">
        <div className="container">
          <nav className="navbar" role="navigation" aria-label="Main Navigation">
            {/* Left: Brand Logo */}
            <a 
              href="/" 
              className="logo-link" 
              onClick={(e) => { 
                e.preventDefault(); 
                navigate('/');
              }} 
              aria-label="Chantrea Travel Home"
            >
              <img src={logoSrc} alt="Chantrea Travel Logo" className="logo-img" />
            </a>

            {/* Right: Desktop Controls & Menu */}
            <div className="nav-controls">
              <ul className="nav-menu">
                <li>
                  <a href="#services" className="nav-link" onClick={(e) => { e.preventDefault(); navigate('/', 'services'); }}>
                    Our Services
                  </a>
                </li>
                <li>
                  <a href="/blogs" className="nav-link" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); navigate('/blogs'); }}>
                    Blogs
                  </a>
                </li>
                <li>
                  <a href="/about" className="nav-link" onClick={(e) => { e.preventDefault(); navigate('/about'); }}>
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#contact" className="nav-link" onClick={(e) => { e.preventDefault(); navigate('/', 'contact'); }}>
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#contact" className="nav-btn" onClick={(e) => { e.preventDefault(); navigate('/', 'contact'); }}>
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
            </div>
          </nav>
        </div>
      </header>

            <main style={{ flexGrow: 1 }}>
        <div className="page-transition-container">
          {/* Current view */}
          <div className={`page-view-wrapper ${
            viewState.isTransitioning && viewState.direction === 'forward' ? 'slide-forward-enter' : ''
          } ${
            viewState.isTransitioning && viewState.direction === 'backward' ? 'slide-backward-enter' : ''
          }`}>
            {renderView(viewState.currentView)}
          </div>

          {/* Previous view during transition */}
          {viewState.isTransitioning && viewState.prevView && (
            <div className={`page-view-wrapper page-view-exit ${
              viewState.direction === 'forward' ? 'slide-forward-exit' : ''
            } ${
              viewState.direction === 'backward' ? 'slide-backward-exit' : ''
            }`}>
              {renderView(viewState.prevView)}
            </div>
          )}
        </div>

        <div className="container">
          {/* Contact Section */}
          <section id="contact" className="section contact-section">
            <div className="contact-layout">
              {/* Brand Info */}
              <div className="contact-brand">
                <a href="/" className="contact-logo" onClick={(e) => { e.preventDefault(); navigate('/'); }} aria-label="Chantrea Travel Home">
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
                    <a href="#services" className="contact-link" onClick={(e) => { e.preventDefault(); navigate('/', 'services-flights'); }}>
                      Worldwide Flights
                    </a>
                  </li>
                  <li>
                    <a href="#services" className="contact-link" onClick={(e) => { e.preventDefault(); navigate('/', 'services-hotels'); }}>
                      Hotel Bookings
                    </a>
                  </li>
                  <li>
                    <a href="#services" className="contact-link" onClick={(e) => { e.preventDefault(); navigate('/', 'services-visas'); }}>
                      Visa Services
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
            <a href="#services" className="nav-link" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); navigate('/', 'services'); }}>
              Our Services
            </a>
            <a href="/blogs" className="nav-link" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); navigate('/blogs'); }}>
              Blogs
            </a>
            <a href="/about" className="nav-link" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); navigate('/about'); }}>
              About Us
            </a>
            <a href="#contact" className="nav-link" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); navigate('/', 'contact'); }}>
              Contact
            </a>
            <a href="#contact" className="nav-btn" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); navigate('/', 'contact'); }}>
              Book Consultation
            </a>
          </div>
        </div>
      )}
    </>
  )
}

export default App
