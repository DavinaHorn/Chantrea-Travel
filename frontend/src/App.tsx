import { useState, useEffect, useRef } from 'react'
import { 
  MapPin, 
  Phone, 
  Mail, 
  CheckCircle, 
  Menu, 
  X, 
  ArrowRight,
  Upload,
  Trash2,
  LogOut,
  Image as ImageIcon,
  User,
  ArrowLeft,
  Edit
} from 'lucide-react'
import { supabase } from './supabaseClient'

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
  if (pathString === '/admin') return 'admin'
  return 'home'
}

const getRouteIndex = (view: string) => {
  switch (view) {
    case 'home': return 0
    case 'blogs': return 1
    case 'blog-detail': return 2
    case 'about': return 3
    case 'admin': return 4
    default: return 0
  }
}

const flightSlidesListDefault = [
  { src: '/hotel_cambodia.webp', panType: 'horizontal', name: 'CAMBODIA' },
  { src: '/country_vietnam.webp', panType: 'horizontal', name: 'VIETNAM' },
  { src: '/country_canada.webp', panType: 'vertical', name: 'CANADA' },
  { src: '/country_australia.webp', panType: 'horizontal', name: 'AUSTRALIA' },
  { src: '/country_china.webp', panType: 'horizontal', name: 'CHINA' },
  { src: '/hero_hotel.webp', panType: 'horizontal', name: '' },
  { src: '/hero_flight.webp', panType: 'horizontal', name: '' },
  { src: '/hero_visa.webp', panType: 'horizontal', name: '' }
]

const hotelSlidesListDefault = [
  { src: '/hotel_cambodia.webp', panType: 'horizontal', name: 'CAMBODIA' },
  { src: '/hotel_singapore.webp', panType: 'vertical', name: 'SINGAPORE' },
  { src: '/hotel_vietnam.webp', panType: 'horizontal', name: 'VIETNAM' },
  { src: '/hotel_canada.webp', panType: 'vertical', name: 'CANADA' }
]

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [path, setPath] = useState(() => window.location.pathname)
  const [viewState, setViewState] = useState(() => {
    const initialView = getPageView(window.location.pathname)
    return {
      currentView: initialView,
      prevView: null as string | null,
      direction: null as 'forward' | 'backward' | 'fade' | null,
      isTransitioning: false
    }
  })
  const transitionTimerRef = useRef<any>(null)

  const [isScrolled, setIsScrolled] = useState(false)
  const [logoTransitionProgress, setLogoTransitionProgress] = useState(0)
  const logoRef = useRef<HTMLDivElement | null>(null)
  const [aboutScrollProgress, setAboutScrollProgress] = useState(0)
  const homepageAboutRef = useRef<HTMLDivElement | null>(null)
  
  const [activeFlightSlide, setActiveFlightSlide] = useState(0)
  const [activeHotelSlide, setActiveHotelSlide] = useState(0)

  const [flightSlides, setFlightSlides] = useState(flightSlidesListDefault)
  const [hotelSlides, setHotelSlides] = useState(hotelSlidesListDefault)
  const [founderPortrait, setFounderPortrait] = useState('/davina_horn.webp')
  const [blogs, setBlogs] = useState(SAMPLE_BLOGS)

  // Fetch dynamic images from Supabase
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const { data, error } = await supabase
          .from('website_images')
          .select('*')
          .order('order_index', { ascending: true })

        if (error) {
          console.error('Error fetching images:', error)
          return
        }

        if (data && data.length > 0) {
          const flights = data.filter(img => img.section === 'flights')
          const hotels = data.filter(img => img.section === 'hotels')
          const founder = data.find(img => img.section === 'founder')

          // Map custom blog images
          const updatedBlogs = SAMPLE_BLOGS.map(b => {
            const dbMatch = data.find(img => img.section === `blog-${b.id}`)
            return dbMatch ? { ...b, image: dbMatch.image_url } : b
          })
          setBlogs(updatedBlogs)

          if (flights.length > 0) {
            setFlightSlides(flights.map(img => ({ src: img.image_url, panType: img.pan_type, name: img.name })))
          } else {
            setFlightSlides(flightSlidesListDefault)
          }

          if (hotels.length > 0) {
            setHotelSlides(hotels.map(img => ({ src: img.image_url, panType: img.pan_type, name: img.name })))
          } else {
            setHotelSlides(hotelSlidesListDefault)
          }

          if (founder) {
            setFounderPortrait(founder.image_url)
          } else {
            setFounderPortrait('/davina_horn.webp')
          }
        } else {
          // Reset to default fallbacks if database table has 0 rows
          setFlightSlides(flightSlidesListDefault)
          setHotelSlides(hotelSlidesListDefault)
          setFounderPortrait('/davina_horn.webp')
          setBlogs(SAMPLE_BLOGS)
        }
      } catch (err) {
        console.error('Failed to connect to database:', err)
      }
    }

    fetchImages()
  }, [viewState.currentView])

  // Redirect to admin panel if the URL contains Google OAuth token hash
  useEffect(() => {
    if (window.location.hash.includes('access_token')) {
      const targetPath = '/admin'
      window.history.pushState(null, '', targetPath)
      setPath(targetPath)
      setViewState({
        currentView: 'admin',
        prevView: null,
        direction: null,
        isTransitioning: false
      })
    }
  }, [])

  // Disable right-click context menu on all images and videos for public visitors
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      if (viewState.currentView === 'admin') return
      const target = e.target as HTMLElement
      if (target && (target.tagName === 'IMG' || target.tagName === 'VIDEO')) {
        e.preventDefault()
      }
    }
    document.addEventListener('contextmenu', handleContextMenu)
    return () => document.removeEventListener('contextmenu', handleContextMenu)
  }, [viewState.currentView])

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveFlightSlide((prev) => (prev + 1) % flightSlides.length)
      setActiveHotelSlide((prev) => (prev + 1) % hotelSlides.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [flightSlides.length, hotelSlides.length])

  useEffect(() => {
    const handleNavbarScroll = () => {
      setIsScrolled(window.scrollY > 20)
      
      if (logoRef.current) {
        const rect = logoRef.current.getBoundingClientRect()
        const initialY = window.scrollY + rect.top
        const headerHeight = 90
        const startScroll = 0
        const endScroll = Math.max(initialY - headerHeight, 100)
        
        const progress = Math.min(Math.max((window.scrollY - startScroll) / (endScroll - startScroll), 0), 1)
        setLogoTransitionProgress(progress)
      }
      
      if (homepageAboutRef.current) {
        const rect = homepageAboutRef.current.getBoundingClientRect()
        const viewportHeight = window.innerHeight
        const isDesktop = window.innerWidth > 1024
        
        if (isDesktop) {
          const startTrigger = viewportHeight * 0.95
          const endTrigger = viewportHeight * 0.25
          const distance = startTrigger - endTrigger
          const currentPos = rect.top
          const progress = Math.min(Math.max((startTrigger - currentPos) / distance, 0), 1)
          setAboutScrollProgress(progress)
        } else {
          setAboutScrollProgress(1)
        }
      }
    }
    
    const timeoutId = setTimeout(handleNavbarScroll, 100)
    
    window.addEventListener('scroll', handleNavbarScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleNavbarScroll)
      clearTimeout(timeoutId)
    }
  }, [])

  // Redesign state variables
  const [statCountries, setStatCountries] = useState(0)
  const [statExpertise, setStatExpertise] = useState(0)
  const [statReviews, setStatReviews] = useState(0)
  const [statsAnimated, setStatsAnimated] = useState(false)

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
      
      window.scrollTo(0, 0)
      
      setViewState({
        currentView: targetView,
        prevView: prevView,
        direction: direction,
        isTransitioning: true
      })
      
      setPath(newPath)
      
      transitionTimerRef.current = window.setTimeout(() => {
        setViewState(prev => ({
          ...prev,
          prevView: null,
          isTransitioning: false
        }))
        transitionTimerRef.current = null
        window.scrollTo(0, 0)
      }, 650)
    }
    
    window.addEventListener('popstate', handlePopState)
    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [path])

  // Clear transition timer on unmount and set scroll restoration to manual
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
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
        c += 5
        if (c >= 130) {
          setStatCountries(130)
          clearInterval(cTimer)
        } else {
          setStatCountries(c)
        }
      }, 25)

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

      let rStep = 0
      const rTimer = setInterval(() => {
        rStep += 1
        if (rStep >= 50) {
          setStatReviews(5)
          clearInterval(rTimer)
        } else {
          setStatReviews(rStep / 10)
        }
      }, 15)

      return () => {
        clearInterval(cTimer)
        clearInterval(eTimer)
        clearInterval(rTimer)
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
    
    window.scrollTo(0, 0)

    setViewState({
      currentView: targetView,
      prevView: prevView,
      direction: direction,
      isTransitioning: true
    })
    
    window.history.pushState(null, '', targetPath)
    setPath(targetPath)
    
    transitionTimerRef.current = window.setTimeout(() => {
      setViewState(prev => ({
        ...prev,
        prevView: null,
        isTransitioning: false
      }))
      transitionTimerRef.current = null
      window.scrollTo(0, 0)
      
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
          {/* Hero Video Section - Full Screen Edge-to-Edge */}
          <section className="hero-wrapper" aria-label="Featured Travel Services Video">
            <div className="hero-card">
              {/* Background Video */}
              <video
                src="/CTT_HOMEPAGE-VID.mp4"
                className="hero-video"
                autoPlay
                loop
                muted
                playsInline
              />

              {/* Centered Tagline & Logo Overlaid on Video */}
              <div 
                ref={logoRef} 
                className="hero-video-overlay-content"
                style={{
                  opacity: Math.max(1 - logoTransitionProgress * 1.25, 0),
                  transform: `translate(-50%, -50%) scale(${1 - logoTransitionProgress * 0.15}) translateY(${-logoTransitionProgress * 20}px)`,
                  transition: 'opacity 0.1s ease-out, transform 0.1s ease-out',
                  willChange: 'opacity, transform'
                }}
              >
                <span className="hero-video-tagline">EXPLORE THE WORLD WITH</span>
                <img src="/CTT_LOGO-HW.webp" alt="CHANTREA Travel Logo" className="hero-video-logo" />
              </div>

              <div className="hero-top-vignette"></div>
              <div className="hero-bottom-fade"></div>
            </div>
          </section>

          {/* Outer Site Container for Page Content */}
          <div className="container">
            
            {/* Stats Counters Section */}
            <div className="stats-reveal-row reveal-element" style={{ margin: '32px 0 64px 0' }}>
              <div className="stat-reveal-card">
                <div className="stat-reveal-num">{statCountries >= 130 ? '130+' : statCountries}</div>
                <div className="stat-reveal-label">Travelable Countries</div>
              </div>
              <div className="stat-reveal-card">
                <div className="stat-reveal-num">{statExpertise >= 22 ? '22+' : statExpertise}</div>
                <div className="stat-reveal-label">Years Experience</div>
              </div>
              <div className="stat-reveal-card">
                <div className="stat-reveal-num">{statReviews % 1 === 0 ? statReviews : statReviews.toFixed(1)}★</div>
                <div className="stat-reveal-label">Client Reviews</div>
              </div>
            </div>
            
            {/* Our Services Section */}
            <section id="services" className="section">
              <div className="section-header">
                <span className="section-tag">What We Do</span>
                <h2 className="section-title">Our Professional Services</h2>
                <p className="section-desc">
                  CHANTREA Travel provides comprehensive, reliable travel documentation and booking services to connect you to global destinations with confidence.
                </p>
              </div>

              {/* Service 1: Worldwide Flight Tickets */}
              <div id="services-flights" className="service-block reveal-element">
                <div className="service-row">
                  {/* Left side: Information block */}
                  <div className="service-col-info">
                    <span className="service-block-tag">Flight Booking</span>
                    <h3 className="service-block-title">Worldwide Flight Tickets</h3>
                    <p className="service-block-text">
                      CHANTREA Travel offers worldwide flight ticket booking through major international airlines, helping you find the most suitable routes and competitive fares. Wherever your destination, we connect you with confidence and care.
                    </p>
                    <ul className="service-block-list">
                      <li className="service-block-item"><CheckCircle size={16} /> Travel Consultation & Planning</li>
                      <li className="service-block-item"><CheckCircle size={16} /> Ticket Issuance & Flight Changes</li>
                      <li className="service-block-item"><CheckCircle size={16} /> Ongoing Traveler Support</li>
                    </ul>
                    <a href="#contact" className="nav-btn" style={{ alignSelf: 'flex-start', display: 'inline-flex', alignItems: 'center', gap: '8px' }} onClick={(e) => { e.preventDefault(); navigate('/', 'contact'); }}>
                      Inquire Flights <ArrowRight size={16} />
                    </a>
                  </div>

                  {/* Right side: Slideshow block */}
                  <div className="service-col-visual">
                    <div className="embedded-slideshow-container">
                      <div className="slideshow-track">
                        {flightSlides.map((slide, index) => (
                          <div key={index} className={`slideshow-slide ${index === activeFlightSlide ? 'active' : ''}`}>
                            <img 
                              src={slide.src} 
                              alt="Worldwide travel destination" 
                              className={`slideshow-slide-img ${slide.panType === 'horizontal' ? 'pan-horizontal' : 'pan-vertical'}`}
                            />
                            {slide.name && (
                              <div className="slideshow-slide-overlay">
                                <span className="slideshow-slide-name">{slide.name}</span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                      <div className="slideshow-dots">
                        {flightSlides.map((_, index) => (
                          <button 
                            key={index} 
                            className={`slideshow-dot ${index === activeFlightSlide ? 'active' : ''}`}
                            onClick={() => setActiveFlightSlide(index)}
                            aria-label={`Go to slide ${index + 1}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Service 2: Global Hotel Reservations */}
              <div id="services-hotels" className="service-block reveal-element">
                <div className="service-row">
                  {/* Left side: Slideshow block */}
                  <div className="service-col-visual">
                    <div className="embedded-slideshow-container">
                      <div className="slideshow-track">
                        {hotelSlides.map((slide, index) => (
                          <div key={index} className={`slideshow-slide ${index === activeHotelSlide ? 'active' : ''}`}>
                            <img 
                              src={slide.src} 
                              alt="Luxury accommodation" 
                              className={`slideshow-slide-img ${slide.panType === 'horizontal' ? 'pan-horizontal' : 'pan-vertical'}`}
                            />
                            {slide.name && (
                              <div className="slideshow-slide-overlay">
                                <span className="slideshow-slide-name">{slide.name}</span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                      <div className="slideshow-dots">
                        {hotelSlides.map((_, index) => (
                          <button 
                            key={index} 
                            className={`slideshow-dot ${index === activeHotelSlide ? 'active' : ''}`}
                            onClick={() => setActiveHotelSlide(index)}
                            aria-label={`Go to slide ${index + 1}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

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
                    <a href="#contact" className="nav-btn" style={{ alignSelf: 'flex-start', display: 'inline-flex', alignItems: 'center', gap: '8px' }} onClick={(e) => { e.preventDefault(); navigate('/', 'contact'); }}>
                      Inquire Hotels <ArrowRight size={16} />
                    </a>
                  </div>
                </div>
              </div>

              {/* Service 3: Visa & Immigration Services (Unified Block) */}
              <div id="services-visas" className="service-block reveal-element">
                {/* Header inside the box */}
                <div style={{ padding: '0 0 32px 0', borderBottom: '1px solid var(--border-light)' }}>
                  <span className="service-block-tag">Visa & Immigration</span>
                  <h3 className="service-block-title" style={{ marginTop: '8px' }}>Visa & Immigration Support</h3>
                  <p className="service-block-text" style={{ marginTop: '12px' }}>
                    CHANTREA Travel provides professional assistance and documentation guidance for all your global travel visa and immigration requirements.
                  </p>
                </div>

                {/* Subsection A: Visa Consultation & Assistance */}
                <div className="visa-subsection" style={{ borderBottom: '1px solid var(--border-light)' }}>
                  <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '22px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '16px' }}>
                    Visa Consultation & Assistance
                  </h4>
                  <p className="service-block-text" style={{ marginBottom: '24px' }}>
                    We provide professional consultation and application assistance for major global destinations:
                  </p>
                  <div className="visas-grid-col">
                    <div className="visa-country-card">
                      <h5 className="visa-country-name">Canada Visas</h5>
                    </div>
                    <div className="visa-country-card">
                      <h5 className="visa-country-name">Australia Visas</h5>
                    </div>
                    <div className="visa-country-card">
                      <h5 className="visa-country-name">United States Visas</h5>
                    </div>
                  </div>
                </div>

                {/* Subsection B: China & Vietnam Visa Services */}
                <div className="visa-subsection" style={{ borderBottom: '1px solid var(--border-light)' }}>
                  <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '22px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '16px' }}>
                    China & Vietnam Visa Services
                  </h4>
                  <p className="service-block-text" style={{ marginBottom: '20px' }}>
                    CHANTREA Travel offers dedicated visa assistance for travelers visiting China and Vietnam. We help clients understand requirements, compile files, and complete applications.
                  </p>
                  <ul className="service-block-list" style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', padding: 0 }}>
                    <li className="service-block-item" style={{ margin: 0 }}><CheckCircle size={16} /> Detailed Requirement Checklists</li>
                    <li className="service-block-item" style={{ margin: 0 }}><CheckCircle size={16} /> Form Compiling & Submission Setup</li>
                  </ul>
                </div>

                {/* Subsection C: Cambodian Visa Extensions */}
                <div className="service-cambodian-extensions-section" style={{ borderBottom: '1px solid var(--border-light)' }}>
                  <div className="extensions-left">
                    <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '22px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '16px' }}>
                      Cambodian Visa Extensions
                    </h4>
                    <p className="service-block-text" style={{ marginBottom: '20px' }}>
                      We provide reliable visa extension assistance to help foreign residents inside Cambodia maintain compliance with local regulations.
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
                <div className="visa-subsection" style={{ paddingBottom: 0 }}>
                  <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '22px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '16px' }}>
                    Chinese Immigration Assistance
                  </h4>
                  <p className="service-block-text" style={{ marginBottom: '24px' }}>
                    We provide support for individuals and businesses requiring assistance with Chinese immigration procedures, travel planning, and policy checkups.
                  </p>
                  <a href="#contact" className="nav-btn" style={{ alignSelf: 'flex-start', padding: '10px 20px', fontSize: '14px', display: 'inline-block' }} onClick={(e) => { e.preventDefault(); navigate('/', 'contact'); }}>
                    Contact Representative
                  </a>
                </div>
              </div>
            </section>

            {/* Biography & Split About Section */}
            <section 
              ref={homepageAboutRef} 
              className="section homepage-about-section reveal-element" 
              style={{ borderTop: '1px solid var(--border-light)', paddingTop: '80px', marginTop: '40px', marginBottom: '40px' }}
            >
              <div className="homepage-about-split">
                {/* Left Column: Portrait */}
                <div 
                  className="about-founder-container homepage-founder-container"
                  style={{
                    ['--about-progress' as any]: aboutScrollProgress
                  }}
                >
                  <img src={founderPortrait} alt="Davina Horn - Founder of CHANTREA Travel" className="about-founder-img" />
                  <div className="about-founder-info">
                    <h4 className="about-founder-name">Davina Horn</h4>
                    <p className="about-founder-title">Owner & Managing Director</p>
                  </div>
                </div>

                {/* Right Column: Narrative Info */}
                <div 
                  className="homepage-about-text-content"
                  style={{
                    ['--about-progress' as any]: aboutScrollProgress
                  }}
                >
                  <h2 className="section-title">Your Trusted Global Travel & Visa Partner</h2>
                  <p className="about-paragraph">
                    Throughout her 22-year career in the travel industry, Davina Horn has worked with leading travel agencies and international travel companies, including <span style={{ whiteSpace: 'nowrap' }}><strong>K.U. Travel</strong></span>, <span style={{ whiteSpace: 'nowrap' }}><strong>Amary Travel</strong></span> (Representative of <span style={{ whiteSpace: 'nowrap' }}><strong>Carlson Wagonlit Travel</strong></span>), <span style={{ whiteSpace: 'nowrap' }}><strong>Korean Air</strong></span>, and <span style={{ whiteSpace: 'nowrap' }}><strong>EXO Travel</strong></span>. These roles have provided her with extensive experience in airline reservations, corporate travel, hotel bookings, and travel management, forming the foundation of the professional expertise she brings to every client at <span style={{ whiteSpace: 'nowrap' }}><strong>CHANTREA Travel</strong></span>.
                  </p>
                  
                  <div className="more-info-btn-wrapper">
                    <a 
                      href="/about" 
                      className="nav-btn homepage-more-info-btn"
                      onClick={(e) => { 
                        e.preventDefault(); 
                        navigate('/about'); 
                      }}
                    >
                      Read More About Us
                    </a>
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
                      src={blogs[0].image} 
                      alt={blogs[0].title} 
                      style={{ width: '100%', height: '100%', minHeight: '320px', maxHeight: '420px', objectFit: 'cover', display: 'block', borderRadius: '20px' }}
                    />
                  </div>
                  <div className="service-col-info" style={{ flex: '1 1 50%', gap: '20px' }}>
                    <span className="service-block-tag">Featured Post • {blogs[0].date}</span>
                    <h3 className="service-block-title" style={{ fontSize: '28px' }}>{blogs[0].title}</h3>
                    <p className="service-block-text">
                      {blogs[0].summary}
                    </p>
                    <div style={{ display: 'flex', gap: '16px', marginTop: '8px' }}>
                      <a 
                        href={`/blog/${blogs[0].id}`} 
                        className="nav-btn" 
                        style={{ display: 'inline-block', fontSize: '14px', padding: '10px 20px' }}
                        onClick={(e) => { e.preventDefault(); navigate(`/blog/${blogs[0].id}`); }}
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



          </div>
        </>
      )
    }

    if (view === 'blogs') {
      return (
        <div className="container page-container-padding">
          <div className="section-header" style={{ marginBottom: '48px' }}>
            <span className="section-tag">Travel Guides & Advice</span>
            <h1 className="section-title">CHANTREA Travel Blog</h1>
            <p className="section-desc">
              Explore our collections of expert guides, top destinations, and practical tips for your next international journey.
            </p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '32px', marginBottom: '64px' }}>
            {blogs.map((blog) => (
              <div 
                key={blog.id} 
                className="service-block" 
                style={{ height: '100%', marginBottom: 0, display: 'flex', flexDirection: 'column' }}
              >
                <div style={{ position: 'relative', height: '240px', overflow: 'hidden', borderRadius: '20px' }}>
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
        <div className="container page-container-padding">
          <section id="about" className="section" style={{ marginBottom: 0 }}>
            <div className="about-split">
              {/* Left Column: Portrait Frame without outline boxes, lines, or shadows */}
              <div className="about-founder-container">
                <img src={founderPortrait} alt="Davina Horn - Founder of CHANTREA Travel" className="about-founder-img" />
                <div className="about-founder-info">
                  <h4 className="about-founder-name">Davina Horn</h4>
                  <p className="about-founder-title">Owner & Managing Director</p>
                </div>
              </div>

              {/* Right Column: Narrative & Biography */}
              <div className="about-text-content">
                <h2 className="section-title">Your Trusted Global Travel & Visa Partner</h2>
                
                <p className="about-paragraph">
                  Throughout her 22-year career in the travel industry, Davina Horn has worked with leading travel agencies and international travel companies, including <span style={{ whiteSpace: 'nowrap' }}><strong>K.U. Travel</strong></span>, <span style={{ whiteSpace: 'nowrap' }}><strong>Amary Travel</strong></span> (Representative of <span style={{ whiteSpace: 'nowrap' }}><strong>Carlson Wagonlit Travel</strong></span>), <span style={{ whiteSpace: 'nowrap' }}><strong>Korean Air</strong></span>, and <span style={{ whiteSpace: 'nowrap' }}><strong>EXO Travel</strong></span>. These roles have provided her with extensive experience in airline reservations, corporate travel, hotel bookings, and travel management, forming the foundation of the professional expertise she brings to every client at <span style={{ whiteSpace: 'nowrap' }}><strong>CHANTREA Travel</strong></span>.
                </p>
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
      const blog = blogs.find(b => b.id === activeBlogPostId);
      if (!blog) {
        return (
          <div className="container page-container-padding">
            <div style={{ textAlign: 'center', padding: '80px 0' }}>
              <h2 className="section-title">Blog Post Not Found</h2>
              <p className="section-desc" style={{ marginBottom: '32px' }}>The blog post you are looking for does not exist.</p>
              <a href="/blogs" className="nav-btn" onClick={(e) => { e.preventDefault(); navigate('/blogs'); }}>Back to Blogs</a>
            </div>
          </div>
        );
      }
      return (
        <div className="container page-container-padding">
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

  if (viewState.currentView === 'admin') {
    return <AdminPanel navigate={navigate} blogs={blogs} />
  }

  const logoSrc = '/CTT_LOGO-HP.webp'

  return (
    <>
      {/* Header & Navbar */}
      <header className={`header ${viewState.currentView === 'home' && !isScrolled ? 'header-transparent' : ''}`}>
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
              aria-label="CHANTREA Travel Home"
            >
              <img 
                src={logoSrc} 
                alt="CHANTREA Travel Logo" 
                className="logo-img" 
                style={{
                  opacity: viewState.currentView === 'home' ? Math.min(Math.max((logoTransitionProgress - 0.4) / 0.6, 0), 1) : 1,
                  transform: viewState.currentView === 'home' ? `scale(${0.85 + Math.min(Math.max((logoTransitionProgress - 0.4) / 0.6, 0), 1) * 0.15})` : 'scale(1)',
                  transition: 'opacity 0.15s ease-out, transform 0.15s ease-out',
                  willChange: 'opacity, transform'
                }}
              />
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
                <a href="/" className="contact-logo" onClick={(e) => { e.preventDefault(); navigate('/'); }} aria-label="CHANTREA Travel Home">
                  <img src={logoSrc} alt="CHANTREA Travel Logo" className="logo-img" />
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
                    <span>info@chantreatravel.com</span>
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
              <p>&copy; {new Date().getFullYear()} CHANTREA Travel. All rights reserved. Professional Travel & Visa Services.</p>
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

function AdminPanel({ navigate, blogs }: { navigate: (to: string, anchor?: string) => void, blogs: any[] }) {
  const [session, setSession] = useState<any>(null)
  const [authLoading, setAuthLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'flights' | 'hotels' | 'founder' | 'blogs'>('flights')
  
  const [images, setImages] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  
  // Upload form state
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [panType, setPanType] = useState<'horizontal' | 'vertical'>('horizontal')
  const [orderIndex, setOrderIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [imageName, setImageName] = useState('')

  // Inline editing state
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editName, setEditName] = useState('')
  const [editPanType, setEditPanType] = useState<'horizontal' | 'vertical'>('horizontal')
  const [editOrderIndex, setEditOrderIndex] = useState(0)

  // Get system default images when database is empty
  const getDefaultsForTab = (tab: string) => {
    if (tab === 'flights') {
      return flightSlidesListDefault.map((s, idx) => ({
        id: `default-flight-${idx}`,
        image_url: s.src,
        pan_type: s.panType,
        order_index: idx,
        name: s.name,
        isDefault: true
      }))
    }
    if (tab === 'hotels') {
      return hotelSlidesListDefault.map((s, idx) => ({
        id: `default-hotel-${idx}`,
        image_url: s.src,
        pan_type: s.panType,
        order_index: idx,
        name: s.name,
        isDefault: true
      }))
    }
    if (tab === 'founder') {
      return [{
        id: 'default-founder',
        image_url: '/davina_horn.webp',
        pan_type: 'horizontal',
        order_index: 0,
        name: '',
        isDefault: true
      }]
    }
    return []
  }
  
  // Auth state management
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setAuthLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setAuthLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  // Fetch images for the active tab
  const fetchImages = async () => {
    setLoading(true)
    try {
      let query = supabase.from('website_images').select('*')
      if (activeTab === 'blogs') {
        query = query.like('section', 'blog-%')
      } else {
        query = query.eq('section', activeTab)
      }
      
      const { data, error } = await query.order('order_index', { ascending: true })
      if (error) throw error
      setImages(data || [])
    } catch (err) {
      console.error('Error loading images:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (session && session.user?.email?.endsWith('@chantreatravel.com')) {
      fetchImages()
    }
  }, [session, activeTab])

  // Google Login
  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/admin`
      }
    })
  }

  // Logout
  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  // Compression helper
  const compressImage = (file: File): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (event) => {
        const img = new Image()
        img.onload = () => {
          const canvas = document.createElement('canvas')
          let width = img.width
          let height = img.height
          const MAX_SIZE = 1600
          
          if (width > height) {
            if (width > MAX_SIZE) {
              height = Math.round((height * MAX_SIZE) / width)
              width = MAX_SIZE
            }
          } else {
            if (height > MAX_SIZE) {
              width = Math.round((width * MAX_SIZE) / height)
              height = MAX_SIZE
            }
          }

          canvas.width = width
          canvas.height = height
          const ctx = canvas.getContext('2d')
          ctx?.drawImage(img, 0, 0, width, height)

          canvas.toBlob(
            (blob) => {
              if (blob) resolve(blob)
              else reject(new Error('Canvas downscaling failed.'))
            },
            'image/jpeg',
            0.82
          )
        }
        img.onerror = () => {
          reject(new Error('Selected file is not a valid image format.'))
        }
        img.src = event.target?.result as string
      }
      reader.onerror = () => {
        reject(new Error('Failed to read the file from your disk.'))
      }
      reader.readAsDataURL(file)
    })
  }

  // Handle Upload
  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedFile) return

    setUploading(true)
    try {
      // 1. Compress image client-side
      const compressedBlob = await compressImage(selectedFile)
      
      // 2. Generate clean filename
      const fileExt = 'jpg'
      const fileName = `${activeTab}_${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`
      const filePath = `${activeTab}/${fileName}`

      // 3. Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, compressedBlob, {
          contentType: 'image/jpeg',
          cacheControl: '3600'
        })

      if (uploadError) throw uploadError

      // 4. Get Public URL
      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(filePath)

      // 5. Insert / Update Database row
      if (activeTab === 'founder') {
        // Founder portrait is single, delete any previous founder images first
        const { data: oldImages } = await supabase
          .from('website_images')
          .select('*')
          .eq('section', 'founder')

        if (oldImages && oldImages.length > 0) {
          for (const old of oldImages) {
            const oldPath = old.image_url.split('/storage/v1/object/public/images/')[1]
            if (oldPath) {
              await supabase.storage.from('images').remove([oldPath])
            }
            await supabase.from('website_images').delete().eq('id', old.id)
          }
        }
      }

      const { error: dbError } = await supabase
        .from('website_images')
        .insert({
          section: activeTab,
          image_url: publicUrl,
          pan_type: panType,
          order_index: orderIndex,
          name: imageName.trim() || null
        })

      if (dbError) throw dbError

      // Reset form & reload list
      setSelectedFile(null)
      setImageName('')
      setOrderIndex(prev => prev + 1)
      fetchImages()
    } catch (err: any) {
      alert(`Upload failed: ${err.message || err}`)
    } finally {
      setUploading(false)
    }
  }

  // Handle Delete
  const handleDelete = async (img: any) => {
    if (!confirm('Are you sure you want to remove this image?')) return
    
    try {
      // 1. Delete file from storage
      const storagePath = img.image_url.split('/storage/v1/object/public/images/')[1]
      if (storagePath) {
        const { error: storageError } = await supabase.storage
          .from('images')
          .remove([storagePath])
        if (storageError) console.warn('Storage delete warning:', storageError)
      }

      // 2. Delete database row
      const { error: dbError } = await supabase
        .from('website_images')
        .delete()
        .eq('id', img.id)

      if (dbError) throw dbError
      fetchImages()
    } catch (err: any) {
      alert(`Delete failed: ${err.message || err}`)
    }
  }

  // Start Inline Edit
  const handleStartEdit = (img: any) => {
    setEditingId(img.id)
    setEditName(img.name || '')
    setEditPanType(img.pan_type || 'horizontal')
    setEditOrderIndex(img.order_index || 0)
  }

  // Save Inline Edit
  const handleSaveEdit = async (imgId: string) => {
    try {
      const { error } = await supabase
        .from('website_images')
        .update({
          name: editName.trim() || null,
          pan_type: editPanType,
          order_index: editOrderIndex
        })
        .eq('id', imgId)

      if (error) throw error

      setEditingId(null)
      fetchImages()
    } catch (err: any) {
      alert(`Failed to save edit: ${err.message || err}`)
    }
  }

  // Handle Blog Cover Upload & Replace
  const handleBlogCoverUpload = async (file: File | null, sectionName: string) => {
    if (!file) return
    setUploading(true)
    try {
      const compressedBlob = await compressImage(file)
      
      const fileExt = 'jpg'
      const fileName = `${sectionName}_${Date.now()}.${fileExt}`
      const filePath = `blogs/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, compressedBlob, {
          contentType: 'image/jpeg',
          cacheControl: '3600'
        })

      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(filePath)

      const { data: oldImages } = await supabase
        .from('website_images')
        .select('*')
        .eq('section', sectionName)

      if (oldImages && oldImages.length > 0) {
        for (const old of oldImages) {
          const oldPath = old.image_url.split('/storage/v1/object/public/images/')[1]
          if (oldPath) {
            await supabase.storage.from('images').remove([oldPath])
          }
          await supabase.from('website_images').delete().eq('id', old.id)
        }
      }

      const { error: dbError } = await supabase
        .from('website_images')
        .insert({
          section: sectionName,
          image_url: publicUrl,
          pan_type: 'horizontal',
          order_index: 0,
          name: null
        })

      if (dbError) throw dbError

      fetchImages()
    } catch (err: any) {
      alert(`Blog image upload failed: ${err.message || err}`)
    } finally {
      setUploading(false)
    }
  }

  // Reset blog cover to default
  const handleBlogResetDefault = async (sectionName: string) => {
    if (!confirm('Are you sure you want to restore the default picture for this blog post?')) return
    try {
      const { data: oldImages } = await supabase
        .from('website_images')
        .select('*')
        .eq('section', sectionName)

      if (oldImages && oldImages.length > 0) {
        for (const old of oldImages) {
          const oldPath = old.image_url.split('/storage/v1/object/public/images/')[1]
          if (oldPath) {
            await supabase.storage.from('images').remove([oldPath])
          }
          await supabase.from('website_images').delete().eq('id', old.id)
        }
      }
      fetchImages()
    } catch (err: any) {
      alert(`Reset failed: ${err.message || err}`)
    }
  }

  // Render Loading State
  if (authLoading) {
    return (
      <div className="admin-login-wrapper">
        <div style={{ color: '#ffffff', fontWeight: 600 }}>Loading authorization session...</div>
      </div>
    )
  }

  const isEmailAuthorized = session?.user?.email?.endsWith('@chantreatravel.com')

  // Render Login View if not authenticated
  if (!session) {
    return (
      <div className="admin-login-wrapper">
        <div className="admin-login-card">
          <img src="/CTT_LOGO-HP.webp" alt="CHANTREA Travel Logo" className="admin-login-logo" />
          <h2 className="admin-login-title">Admin Portal Access</h2>
          <p className="admin-login-desc">
            Sign in with your authorized @chantreatravel.com Google account to manage website content and slideshow images.
          </p>
          <button className="admin-google-btn" onClick={handleGoogleLogin}>
            <svg className="admin-google-icon" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            Sign in with Google
          </button>
          <a href="/" className="admin-nav-btn" style={{ marginTop: '24px', justifyContent: 'center' }} onClick={(e) => { e.preventDefault(); navigate('/'); }}>
            Back to Public Website
          </a>
        </div>
      </div>
    )
  }

  // Render Access Denied View if email is not chantreatravel.com
  if (!isEmailAuthorized) {
    return (
      <div className="admin-login-wrapper">
        <div className="admin-login-card" style={{ maxWidth: '480px' }}>
          <h2 className="admin-login-title" style={{ color: '#ef4444' }}>Access Denied</h2>
          <p className="admin-login-desc">
            Your email <strong>{session.user.email}</strong> is not authorized. Access is strictly restricted to accounts ending in <strong>@chantreatravel.com</strong>.
          </p>
          <button className="admin-btn-delete" style={{ width: '100%', padding: '14px', marginBottom: '16px' }} onClick={handleLogout}>
            <LogOut size={18} /> Sign Out & Switch Account
          </button>
          <a href="/" className="admin-nav-btn" style={{ justifyContent: 'center' }} onClick={(e) => { e.preventDefault(); navigate('/'); }}>
            Back to Public Website
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="admin-layout">
      {/* Sidebar navigation */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar-header">
          <img src="/CTT_LOGO-HP.webp" alt="CHANTREA Travel Logo" style={{ height: '40px', width: 'auto', alignSelf: 'flex-start' }} />
          <span className="admin-sidebar-title">Admin Console</span>
          <span className="admin-sidebar-user">{session.user.email}</span>
        </div>
        
        <ul className="admin-nav-list">
          <li className="admin-nav-item">
            <button className={`admin-nav-btn ${activeTab === 'flights' ? 'active' : ''}`} onClick={() => setActiveTab('flights')}>
              <ImageIcon size={18} /> Flight Slideshow
            </button>
          </li>
          <li className="admin-nav-item">
            <button className={`admin-nav-btn ${activeTab === 'hotels' ? 'active' : ''}`} onClick={() => setActiveTab('hotels')}>
              <ImageIcon size={18} /> Hotel Slideshow
            </button>
          </li>
          <li className="admin-nav-item">
            <button className={`admin-nav-btn ${activeTab === 'founder' ? 'active' : ''}`} onClick={() => setActiveTab('founder')}>
              <User size={18} /> Founder Portrait
            </button>
          </li>
          <li className="admin-nav-item">
            <button className={`admin-nav-btn ${activeTab === 'blogs' ? 'active' : ''}`} onClick={() => setActiveTab('blogs')}>
              <ImageIcon size={18} /> Blog Pictures
            </button>
          </li>
        </ul>

        <button className="admin-nav-btn" style={{ marginTop: 'auto', color: '#ef4444' }} onClick={handleLogout}>
          <LogOut size={18} /> Sign Out
        </button>
      </aside>

      {/* Main content workspace */}
      <main className="admin-content">
        <a href="/" className="admin-back-btn" onClick={(e) => { e.preventDefault(); navigate('/'); }}>
          <ArrowLeft size={16} /> Back to Website homepage
        </a>

        <div className="admin-section-header">
          <h1 className="admin-section-title">
            {activeTab === 'flights' && 'Flight Booking Slideshow'}
            {activeTab === 'hotels' && 'Hotel Reservations Slideshow'}
            {activeTab === 'founder' && 'Founder Portrait'}
            {activeTab === 'blogs' && 'Blog Cover Pictures'}
          </h1>
        </div>

        {loading ? (
          <div style={{ color: 'var(--text-secondary)' }}>Loading section details...</div>
        ) : (
          <>
            {/* Image Lists Grid */}
            <div className="admin-grid">
              {(activeTab === 'blogs' 
                ? blogs.map((b: any, idx: number) => {
                    const isDefault = b.image === SAMPLE_BLOGS.find((x: any) => x.id === b.id)?.image
                    const dbMatch = images.find((img: any) => img.section === `blog-${b.id}`)
                    return {
                      id: dbMatch ? dbMatch.id : `blog-${b.id}`,
                      section: `blog-${b.id}`,
                      image_url: b.image,
                      name: b.title,
                      pan_type: 'horizontal',
                      order_index: idx,
                      isDefault
                    }
                  })
                : (images.length > 0 ? images : getDefaultsForTab(activeTab))
              ).map((img: any) => (
                <div key={img.id} className="admin-img-card" style={img.isDefault ? { opacity: 0.85, borderStyle: 'dashed' } : {}}>
                  <div className="admin-img-preview-wrapper">
                    <img src={img.image_url} alt="Cover or Slideshow file" className="admin-img-preview" />
                    {img.isDefault && (
                      <span style={{ position: 'absolute', top: '8px', right: '8px', backgroundColor: 'var(--accent-purple)', color: '#ffffff', fontSize: '11px', fontWeight: 700, padding: '4px 8px', borderRadius: '4px' }}>
                        System Default
                      </span>
                    )}
                  </div>
                  
                  {activeTab === 'blogs' ? (
                    /* Blog Cover Info Mode */
                    <div className="admin-img-meta" style={{ minHeight: '120px' }}>
                      <span className="admin-meta-label">Blog Title</span>
                      <span className="admin-meta-val" style={{ fontWeight: 600, fontSize: '13px', lineHeight: '1.4' }}>{img.name}</span>
                      <span className="admin-meta-label">Status</span>
                      <span className="admin-meta-val" style={{ color: img.isDefault ? '#3b82f6' : '#10b981', fontWeight: 600 }}>
                        {img.isDefault ? 'Default Cover' : 'Custom Cover'}
                      </span>
                    </div>
                  ) : (
                    editingId === img.id ? (
                      /* Inline Editing Mode */
                      <div className="admin-img-meta" style={{ gap: '4px' }}>
                        <span className="admin-meta-label">Image Name</span>
                        <input 
                          type="text" 
                          className="admin-select" 
                          style={{ padding: '4px 8px', fontSize: '12px', height: '28px', minHeight: 'unset', marginBottom: '8px', width: '100%' }}
                          value={editName} 
                          onChange={(e) => setEditName(e.target.value)} 
                          placeholder="e.g. Cambodia"
                        />
                        <span className="admin-meta-label">Pan Mode</span>
                        <select 
                          className="admin-select" 
                          style={{ padding: '4px 8px', fontSize: '12px', height: '28px', minHeight: 'unset', marginBottom: '8px', width: '100%' }}
                          value={editPanType} 
                          onChange={(e: any) => setEditPanType(e.target.value)}
                        >
                          <option value="horizontal">Horizontal</option>
                          <option value="vertical">Vertical</option>
                        </select>
                        <span className="admin-meta-label">Display Order</span>
                        <input 
                          type="number" 
                          className="admin-select" 
                          style={{ padding: '4px 8px', fontSize: '12px', height: '28px', minHeight: 'unset', width: '100%' }}
                          value={editOrderIndex} 
                          onChange={(e) => setEditOrderIndex(parseInt(e.target.value) || 0)} 
                        />
                      </div>
                    ) : (
                      /* Standard Info Mode */
                      <div className="admin-img-meta">
                        {activeTab !== 'founder' && (
                          <>
                            <span className="admin-meta-label">Image Name</span>
                            <span className="admin-meta-val" style={{ fontStyle: img.name ? 'normal' : 'italic' }}>
                              {img.name || 'None'}
                            </span>
                            <span className="admin-meta-label">Pan Mode</span>
                            <span className="admin-meta-val" style={{ textTransform: 'capitalize' }}>{img.pan_type}</span>
                            <span className="admin-meta-label">Display Order</span>
                            <span className="admin-meta-val">{img.order_index}</span>
                          </>
                        )}
                        {activeTab === 'founder' && (
                          <>
                            <span className="admin-meta-label">Status</span>
                            <span className="admin-meta-val" style={{ color: img.isDefault ? '#3b82f6' : '#10b981', fontWeight: 600 }}>
                              {img.isDefault ? 'Default Portrait' : 'Active Portrait'}
                            </span>
                          </>
                        )}
                      </div>
                    )
                  )}

                  <div className="admin-img-actions" style={{ justifyContent: 'center', display: 'flex', gap: '8px' }}>
                    {activeTab === 'blogs' ? (
                      /* Blog Cover Upload Actions */
                      <>
                        <button 
                          className="admin-btn-edit" 
                          onClick={() => document.getElementById(`file-input-${img.section}`)?.click()}
                          disabled={uploading}
                        >
                          <Upload size={13} /> {uploading ? 'Processing...' : 'Replace Picture'}
                        </button>
                        <input 
                          id={`file-input-${img.section}`}
                          type="file"
                          accept="image/*"
                          style={{ display: 'none' }}
                          onChange={(e) => handleBlogCoverUpload(e.target.files?.[0] || null, img.section)}
                          disabled={uploading}
                        />
                        {!img.isDefault && (
                          <button 
                            className="admin-btn-delete" 
                            style={{ flexGrow: 1 }}
                            onClick={() => handleBlogResetDefault(img.section)}
                            disabled={uploading}
                          >
                            Reset
                          </button>
                        )}
                      </>
                    ) : (
                      img.isDefault ? (
                        <span style={{ fontSize: '12px', color: 'var(--text-light)', fontStyle: 'italic', padding: '4px 0', textAlign: 'center' }}>
                          Upload a file below to replace
                        </span>
                      ) : (
                        editingId === img.id ? (
                          <>
                            <button className="admin-btn-save" onClick={() => handleSaveEdit(img.id)}>
                              Save
                            </button>
                            <button className="admin-btn-cancel" onClick={() => setEditingId(null)}>
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            {activeTab !== 'founder' && (
                              <button className="admin-btn-edit" onClick={() => handleStartEdit(img)}>
                                <Edit size={13} /> Edit
                              </button>
                            )}
                            <button className="admin-btn-delete" onClick={() => handleDelete(img)}>
                              <Trash2 size={13} /> Remove
                            </button>
                          </>
                        )
                      )
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Upload form container */}
            {activeTab !== 'blogs' && (
              <div className="admin-upload-card">
                <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '20px', color: 'var(--text-primary)' }}>
                  {activeTab === 'founder' ? 'Replace Founder Portrait' : 'Add New Slideshow Image'}
                </h3>
                
                <form onSubmit={handleUpload}>
                  <div className="admin-form-group">
                    <label className="admin-form-label">Select Image File</label>
                    <div 
                      className={`admin-file-dropzone ${isDragging ? 'dragging' : ''}`}
                      onClick={() => document.getElementById('file-input')?.click()}
                      onDragOver={(e) => {
                        e.preventDefault()
                        setIsDragging(true)
                      }}
                      onDragLeave={(e) => {
                        e.preventDefault()
                        setIsDragging(false)
                      }}
                      onDrop={(e) => {
                        e.preventDefault()
                        setIsDragging(false)
                        const files = e.dataTransfer.files
                        if (files && files.length > 0) {
                          const file = files[0]
                          if (file.type.startsWith('image/')) {
                            setSelectedFile(file)
                          } else {
                            alert('Please drop an image file (JPG, PNG, WebP).')
                          }
                        }
                      }}
                      style={isDragging ? {
                        borderColor: 'var(--accent-purple)',
                        backgroundColor: 'var(--accent-purple-light)',
                        color: 'var(--accent-purple)'
                      } : {}}
                    >
                      <Upload size={24} style={{ color: isDragging ? 'var(--accent-purple)' : 'var(--text-light)', marginBottom: '8px' }} />
                      <p style={{ fontSize: '13px', color: isDragging ? 'var(--accent-purple)' : 'var(--text-secondary)', fontWeight: isDragging ? 600 : 400 }}>
                        {selectedFile ? selectedFile.name : (isDragging ? 'Drop your image here!' : 'Drag & drop image here, or click to browse')}
                      </p>
                    </div>
                    <input 
                      id="file-input"
                      type="file" 
                      accept="image/*" 
                      style={{ display: 'none' }} 
                      onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                    />
                  </div>

                  {activeTab !== 'founder' && (
                    <>
                      <div className="admin-form-group">
                        <label className="admin-form-label" htmlFor="image-name-input">Image Name / Label (Optional)</label>
                        <input 
                          id="image-name-input"
                          type="text" 
                          className="admin-select"
                          placeholder="e.g. Cambodia"
                          value={imageName}
                          onChange={(e) => setImageName(e.target.value)}
                        />
                      </div>

                      <div className="admin-form-group">
                        <label className="admin-form-label" htmlFor="pan-select">Panning Motion Mode</label>
                        <select 
                          id="pan-select"
                          className="admin-select"
                          value={panType} 
                          onChange={(e: any) => setPanType(e.target.value)}
                        >
                          <option value="horizontal">Horizontal Pan (For Wide Images)</option>
                          <option value="vertical">Vertical Pan (For Tall Images)</option>
                        </select>
                      </div>

                      <div className="admin-form-group">
                        <label className="admin-form-label" htmlFor="order-input">Order Index (Display Position)</label>
                        <input 
                          id="order-input"
                          type="number" 
                          className="admin-select"
                          value={orderIndex}
                          onChange={(e) => setOrderIndex(parseInt(e.target.value) || 0)}
                        />
                      </div>
                    </>
                  )}

                  <button 
                    type="submit" 
                    className="admin-btn-submit" 
                    disabled={uploading || !selectedFile}
                  >
                    {uploading ? 'Compressing & Uploading...' : (activeTab === 'founder' ? 'Upload & Replace Portrait' : 'Upload Image')}
                  </button>
                </form>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  )
}

export default App
