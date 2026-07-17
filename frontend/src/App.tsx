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
  Edit,
  Globe
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

const TRANSLATIONS = {
  en: {
    navServices: "Our Services",
    navBlogs: "Blogs",
    navAbout: "About Us",
    navContact: "Contact",
    navConsultation: "Book Consultation",
    heroTagline: "EXPLORE THE WORLD WITH",
    statCountries: "Travelable Countries",
    statExperience: "Years Experience",
    statReviews: "Client Reviews",
    servicesWhatWeDo: "What We Do",
    servicesTitle: "Our Professional Services",
    servicesDesc: "CHANTREA Travel provides comprehensive, reliable travel documentation and booking services to connect you to global destinations with confidence.",
    flightTag: "Flight Booking",
    flightTitle: "Worldwide Flight Tickets",
    flightDesc: "CHANTREA Travel offers worldwide flight ticket booking through major international airlines, helping you find the most suitable routes and competitive fares. Wherever your destination, we connect you with confidence and care.",
    flightItem1: "Travel Consultation & Planning",
    flightItem2: "Ticket Issuance & Flight Changes",
    flightItem3: "Ongoing Traveler Support",
    flightBtn: "Inquire Flights",
    hotelTag: "Accommodations",
    hotelTitle: "Global Hotel Reservations",
    hotelDesc: "Wherever your destination, we arrange accommodations that suit your preferences and budget. From affordable boutique hotels to luxury resorts and business suites, we secure the most comfortable stay.",
    hotelItem1: "Luxury Resorts & Private Villas",
    hotelItem2: "Budget-Friendly & Business Lodging",
    hotelItem3: "Fast Secure Booking Confirmations",
    hotelBtn: "Inquire Hotels",
    visaTag: "Visa & Immigration",
    visaTitle: "Visa & Immigration Support",
    visaDesc: "CHANTREA Travel provides professional assistance and documentation guidance for all your global travel visa and immigration requirements.",
    visaSub1Title: "Visa Consultation & Assistance",
    visaSub1Desc: "We provide professional consultation and application assistance for major global destinations:",
    visaSub1Canada: "Canada Visas",
    visaSub1Australia: "Australia Visas",
    visaSub1US: "United States Visas",
    visaSub2Title: "China & Vietnam Visa Services",
    visaSub2Desc: "CHANTREA Travel offers dedicated visa assistance for travelers visiting China and Vietnam. We help clients understand requirements, compile files, and complete applications.",
    visaSub2Item1: "Detailed Requirement Checklists",
    visaSub2Item2: "Form Compiling & Submission Setup",
    visaSub3Title: "Cambodian Visa Extensions",
    visaSub3Desc: "We provide reliable visa extension assistance to help foreign residents inside Cambodia maintain compliance with local regulations.",
    visaSub3Item1: "Extension Option Strategy",
    visaSub3Item2: "Passport & Document Handling",
    visaSub3RightTitle: "Standard Extensions Available",
    duration1Month: "1 Month",
    duration3Months: "3 Months",
    duration6Months: "6 Months",
    duration12Months: "12 Months",
    singleExtension: "Single Entry Extension",
    multiExtension: "Multiple Entry Extension",
    visaSub4Title: "Chinese Immigration Assistance",
    visaSub4Desc: "We provide support for individuals and businesses requiring assistance with Chinese immigration procedures, travel planning, and policy checkups.",
    visaSub4Btn: "Contact Representative",
    aboutTitle: "Your Trusted Global Travel & Visa Partner",
    aboutPara: "Throughout her 22-year career in the travel industry, Davina Horn has worked with leading travel agencies and international travel companies, including K.U. Travel, Amary Travel (Representative of Carlson Wagonlit Travel), Korean Air, and EXO Travel. These roles have provided her with extensive experience in airline reservations, corporate travel, hotel bookings, and travel management, forming the foundation of the professional expertise she brings to every client at CHANTREA Travel.",
    aboutFounderTitle: "Owner & Managing Director",
    aboutReadMore: "Read More About Us",
    blogTag: "Travel Insights & Stories",
    blogTitle: "Latest Travel Guide",
    blogDesc: "Get the latest travel tips, highlights, and insights from our professional travel guides.",
    blogFeatured: "Featured Post",
    blogReadThis: "Read This Post",
    blogReadMore: "Read More Blogs",
    blogsTag: "Travel Guides & Advice",
    blogsTitle: "CHANTREA Travel Blog",
    blogsDesc: "Explore our collections of expert guides, top destinations, and practical tips for your next international journey.",
    blogsReadStory: "Read Story",
    blogsBackHome: "Back to Home",
    blogNotFoundTitle: "Blog Post Not Found",
    blogNotFoundDesc: "The blog post you are looking for does not exist.",
    blogBackBlogs: "Back to Blogs",
    contactGetInTouch: "Get In Touch",
    contactLocation: "Phnom Penh, Cambodia",
    contactQuickNav: "Quick Navigation",
    contactFlights: "Worldwide Flights",
    contactHotels: "Hotel Bookings",
    contactVisas: "Visa Services",
    footerCopy: "CHANTREA Travel. All rights reserved. Professional Travel & Visa Services.",
    contactDesc: "Connecting you to global destinations with confidence and care. Honest advice, reliable flight bookings, global hotel reservations, and visa processing services."
  },
  km: {
    navServices: "សេវាកម្មរបស់យើង",
    navBlogs: "អត្ថបទប្លុក",
    navAbout: "អំពីយើង",
    navContact: "ទំនាក់ទំនង",
    navConsultation: "កក់ការពិគ្រោះយោបល់",
    heroTagline: "ស្វែងយល់ពិភពលោកជាមួយ",
    statCountries: "ប្រទេសដែលអាចធ្វើដំណើរបាន",
    statExperience: "ឆ្នាំនៃបទពិសោធន៍",
    statReviews: "ការវាយតម្លៃរបស់អតិថិជន",
    servicesWhatWeDo: "អ្វីដែលយើងធ្វើ",
    servicesTitle: "សេវាកម្មវិជ្ជាជីវៈរបស់យើង",
    servicesDesc: "CHANTREA Travel ផ្តល់សេវាកម្មរៀបចំឯកសារធ្វើដំណើរ និងកក់សំបុត្រគ្រប់ជ្រុងជ្រោយ ដែលគួរឱ្យទុកចិត្ត ដើម្បីភ្ជាប់អ្នកទៅកាន់គោលដៅពិភពលោកដោយភាពជឿជាក់។",
    flightTag: "ការកក់ជើងហោះហើរ",
    flightTitle: "សំបុត្រយន្តហោះទូទាំងពិភពលោក",
    flightDesc: "CHANTREA Travel ផ្តល់សេវាកម្មកក់សំបុត្រយន្តហោះទូទាំងពិភពលោកតាមរយៈក្រុមហ៊ុនអាកាសចរណ៍អន្តរជាតិធំៗ ជួយអ្នកស្វែងរកផ្លូវហោះហើរដែលសមស្របបំផុត និងតម្លៃប្រកួតប្រជែងបំផុត។ ទោះជាគោលដៅរបស់អ្នកនៅទីណាក៏ដោយ យើងភ្ជាប់ទំនាក់ទំនងអ្នកដោយភាពជឿជាក់ និងការយកចិត្តទុកដាក់។",
    flightItem1: "ការពិគ្រោះយោបល់ និងរៀបចំផែនការធ្វើដំណើរ",
    flightItem2: "ការចេញសំបុត្រ និងការផ្លាស់ប្តូរជើងហោះហើរ",
    flightItem3: "ការគាំទ្រអ្នកដំណើរជាបន្តបន្ទាប់",
    flightBtn: "សាកសួរព័ត៌មានជើងហោះហើរ",
    hotelTag: "កន្លែងស្នាក់នៅ",
    hotelTitle: "ការកក់សណ្ឋាគារទូទាំងពិភពលោក",
    hotelDesc: "មិនថាគោលដៅរបស់អ្នកនៅទីណាទេ យើងរៀបចំកន្លែងស្នាក់នៅដែលត្រូវនឹងចំណូលចិត្ត និងថវិការបស់អ្នក។ ចាប់ពីសណ្ឋាគារប៊ូទិកតម្លៃសមរម្យ រហូតដល់រមណីយដ្ឋានប្រណីត និងបន្ទប់ស្នាក់នៅលំដាប់អាជីវកម្ម យើងធានាការស្នាក់នៅប្រកបដោយផាសុកភាពបំផុត។",
    hotelItem1: "រមណីយដ្ឋានប្រណីត និងវីឡាឯកជន",
    hotelItem2: "កន្លែងស្នាក់នៅតម្លៃសមរម្យ និងសម្រាប់ធុរកិច្ច",
    hotelItem3: "ការបញ្ជាក់ការកក់រហ័ស និងមានសុវត្ថិភាព",
    hotelBtn: "សាកសួរព័ត៌មានសណ្ឋាគារ",
    visaTag: "ទិដ្ឋាការ និងអន្តោប្រវេសន៍",
    visaTitle: "ការគាំទ្រទិដ្ឋាការ និងអន្តោប្រវេសន៍",
    visaDesc: "CHANTREA Travel ផ្តល់ជំនួយវិជ្ជាជីវៈ និងការណែនាំអំពីឯកសារសម្រាប់រាល់តម្រូវការទិដ្ឋាការធ្វើដំណើរ និងអន្តោប្រវេសន៍ទូទាំងពិភពលោករបស់អ្នក។",
    visaSub1Title: "ការពិគ្រោះយោបល់ និងជំនួយទិដ្ឋាការ",
    visaSub1Desc: "យើងផ្តល់ការពិគ្រោះយោបល់ប្រកបដោយវិជ្ជាជីវៈ និងជំនួយក្នុងការដាក់ពាក្យសុំសម្រាប់គោលដៅសំខាន់ៗលើសកលលោក៖",
    visaSub1Canada: "ទិដ្ឋាការប្រទេសកាណាដា",
    visaSub1Australia: "ទិដ្ឋាការប្រទេសអូស្ត្រាលី",
    visaSub1US: "ទិដ្ឋាការសហរដ្ឋអាមេរិក",
    visaSub2Title: "សេវាកម្មទិដ្ឋាការប្រទេសចិន និងវៀតណាម",
    visaSub2Desc: "CHANTREA Travel ផ្តល់ជំនួយទិដ្ឋាការពិសេសសម្រាប់អ្នកដំណើរដែលទៅទស្សនាប្រទេសចិន និងវៀតណាម។ យើងជួយអតិថិជនឱ្យយល់ពីតម្រូវការ រៀបចំឯកសារ និងបំពេញពាក្យសុំ។",
    visaSub2Item1: "បញ្ជីត្រួតពិនិត្យតម្រូវការលម្អិត",
    visaSub2Item2: "ការចងក្រងទម្រង់បែបបទ និងការរៀបចំការដាក់ពាក្យ",
    visaSub3Title: "ការបន្តទិដ្ឋាការប្រទេសកម្ពុជា",
    visaSub3Desc: "យើងផ្តល់ជំនួយបន្តទិដ្ឋាការដែលអាចទុកចិត្តបាន ដើម្បីជួយជនបរទេសដែលរស់នៅក្នុងប្រទេសកម្ពុជា រក្សាការអនុលោមតាមបទប្បញ្ញត្តិក្នុងស្រុក។",
    visaSub3Item1: "យុទ្ធសាស្ត្រជម្រើសនៃការបន្តទិដ្ឋាការ",
    visaSub3Item2: "ការចាត់ចែងលិខិតឆ្លងដែន និងឯកសារ",
    visaSub3RightTitle: "ការបន្តទិដ្ឋាការស្តង់ដារដែលមាន",
    duration1Month: "១ ខែ",
    duration3Months: "៣ ខែ",
    duration6Months: "៦ ខែ",
    duration12Months: "១២ ខែ",
    singleExtension: "ការបន្តទិដ្ឋាការចូលម្តង",
    multiExtension: "ការបន្តទិដ្ឋាការចូលច្រើនដង",
    visaSub4Title: "ជំនួយអន្តោប្រវេសន៍ប្រទេសចិន",
    visaSub4Desc: "យើងផ្តល់ការគាំទ្រសម្រាប់បុគ្គល និងអាជីវកម្មដែលត្រូវការជំនួយក្នុងនីតិវិធីអន្តោប្រវេសន៍ចិន ការរៀបចំផែនការធ្វើដំណើរ និងការពិនិត្យគោលនយោបាយ។",
    visaSub4Btn: "ទាក់ទងតំណាងសេវាកម្ម",
    aboutTitle: "ដៃគូធ្វើដំណើរ និងទិដ្ឋាការសកលដែលអ្នកទុកចិត្ត",
    aboutPara: "ពេញមួយអាជីពរយៈពេល ២២ ឆ្នាំនៅក្នុងឧស្សាហកម្មធ្វើដំណើរ លោកស្រី Davina Horn បានធ្វើការជាមួយភ្នាក់ងារធ្វើដំណើរឈានមុខគេ និងក្រុមហ៊ុនធ្វើដំណើរអន្តរជាតិ រួមមាន K.U. Travel, Amary Travel (តំណាងក្រុមហ៊ុន Carlson Wagonlit Travel), Korean Air, និង EXO Travel។ តួនាទីទាំងនេះបានផ្តល់ឱ្យគាត់នូវបទពិសោធន៍យ៉ាងទូលំទូលាយក្នុងការកក់សំបុត្រយន្តហោះ ការធ្វើដំណើររបស់សាជីវកម្ម ការកក់សណ្ឋាគារ និងការគ្រប់គ្រងការធ្វើដំណើរ ដែលបង្កើតជាមូលដ្ឋានគ្រឹះនៃជំនាញវិជ្ជាជីវៈដែលគាត់នាំយកជូនអតិថិជនគ្រប់រូបនៅ CHANTREA Travel។",
    aboutFounderTitle: "ម្ចាស់ និងជានាយកគ្រប់គ្រង",
    aboutReadMore: "អានបន្ថែមអំពីយើង",
    blogTag: "ការយល់ដឹង និងរឿងរ៉ាវធ្វើដំណើរ",
    blogTitle: "មគ្គុទ្ទេសក៍ធ្វើដំណើរចុងក្រោយបង្អស់",
    blogDesc: "ទទួលបានគន្លឹះធ្វើដំណើរ ព័ត៌មានលម្អិត និងការយល់ដឹងចុងក្រោយបង្អស់ពីមគ្គុទ្ទេសក៍ធ្វើដំណើរអាជីពរបស់យើង។",
    blogFeatured: "អត្ថបទពិសេស",
    blogReadThis: "អានអត្ថបទនេះ",
    blogReadMore: "អានប្លុកបន្ថែម",
    blogsTag: "មគ្គុទ្ទេសក៍ និងដំបូន្មានធ្វើដំណើរ",
    blogsTitle: "ប្លុក CHANTREA Travel",
    blogsDesc: "ស្វែងរកការប្រមូលផ្តុំនៃមគ្គុទ្ទេសក៍ជំនាញ គោលដៅកំពូលៗ និងគន្លឹះជាក់ស្តែងសម្រាប់ដំណើរអន្តរជាតិបន្ទាប់របស់អ្នក។",
    blogsReadStory: "អានរឿងរ៉ាវ",
    blogsBackHome: "ត្រឡប់ទៅទំព័រដើម",
    blogNotFoundTitle: "រកមិនឃើញអត្ថបទប្លុកទេ",
    blogNotFoundDesc: "អត្ថបទប្លុកដែលអ្នកកំពុងស្វែងរកមិនមានទេ។",
    blogBackBlogs: "ត្រឡប់ទៅប្លុកវិញ",
    contactGetInTouch: "ទាក់ទងមកយើង",
    contactLocation: "ភ្នំពេញ ប្រទេសកម្ពុជា",
    contactQuickNav: "ការរុករករហ័ស",
    contactFlights: "ជើងហោះហើរទូទាំងពិភពលោក",
    contactHotels: "ការកក់សណ្ឋាគារ",
    contactVisas: "សេវាកម្មទិដ្ឋាការ",
    footerCopy: "CHANTREA Travel. រក្សាសិទ្ធិគ្រប់យ៉ាង。សេវាកម្មធ្វើដំណើរ និងទិដ្ឋាការកម្រិតអាជីព。",
    contactDesc: "ភ្ជាប់ទំនាក់ទំនងអ្នកទៅកាន់គោលដៅពិភពលោកដោយភាពជឿជាក់ និងការយកចិត្តទុកដាក់។ ដំបូន្មានស្មោះត្រង់ ការកក់ជើងហោះហើរដែលអាចទុកចិត្តបាន ការកក់សណ្ឋាគារទូទាំងពិភពលោក និងសេវាកម្មរៀបចំទិដ្ឋាការ។"
  },
  zh: {
    navServices: "我们的服务",
    navBlogs: "旅游博客",
    navAbout: "关于我们",
    navContact: "联系我们",
    navConsultation: "预约咨询",
    heroTagline: "与我们一起探索世界",
    statCountries: "可行目的国",
    statExperience: "年行业经验",
    statReviews: "客户好评度",
    servicesWhatWeDo: "我们的服务",
    servicesTitle: "我们的专业服务",
    servicesDesc: "CHANTREA Travel 提供全面、可靠的旅游文件和预订服务，让您满怀信心地前往全球目的地。",
    flightTag: "机票预订",
    flightTitle: "全球机票",
    flightDesc: "CHANTREA Travel 提供各大国际航空公司的全球机票预订服务，帮助您找到最合适的航线和最具竞争力的票价。无论您的目的地在哪里，我们都将以信心和关怀与您相连。",
    flightItem1: "旅游咨询与规划",
    flightItem2: "机票出票与改签",
    flightItem3: "持续的旅客支持",
    flightBtn: "咨询机票",
    hotelTag: "酒店住宿",
    hotelTitle: "全球酒店预订",
    hotelDesc: "无论您的目的地在哪里，我们都会为您安排符合您的喜好和预算的住宿。从经济实惠的精品酒店到豪华度假村和商务套房，我们确保您享受最舒适的住宿体验。",
    hotelItem1: "豪华度假村与私人别墅",
    hotelItem2: "经济型与商务住宿",
    hotelItem3: "快速安全的预订确认",
    hotelBtn: "咨询酒店",
    visaTag: "签证与移民",
    visaTitle: "签证与移民支持",
    visaDesc: "CHANTREA Travel 为您所有的全球旅行签证和移民需求提供专业的协助和文件指导。",
    visaSub1Title: "签证咨询与协助",
    visaSub1Desc: "我们为全球主要目的地提供专业的签证咨询和申请协助：",
    visaSub1Canada: "加拿大签证",
    visaSub1Australia: "澳大利亚签证",
    visaSub1US: "美国签证",
    visaSub2Title: "中国和越南签证服务",
    visaSub2Desc: "CHANTREA Travel 为前往中国和越南的旅客提供专门的签证协助。我们帮助客户了解相关要求、整理文件并完成申请。",
    visaSub2Item1: "详细的要求清单",
    visaSub2Item2: "表格填写与递交准备",
    visaSub3Title: "柬埔寨签证延期",
    visaSub3Desc: "我们提供可靠的签证延期服务，帮助在柬埔寨的外国居民符合当地法规。",
    visaSub3Item1: "延期方案策划",
    visaSub3Item2: "护照与文件处理",
    visaSub3RightTitle: "可提供的标准延期",
    duration1Month: "1个月",
    duration3Months: "3个月",
    duration6Months: "6个月",
    duration12Months: "12个月",
    singleExtension: "单次入境延期",
    multiExtension: "多次入境延期",
    visaSub4Title: "中国移民协助",
    visaSub4Desc: "我们为需要中国移民程序、旅行规划和政策咨询的个人及企业提供支持。",
    visaSub4Btn: "联系专员",
    aboutTitle: "您信赖的全球旅游和签证伙伴",
    aboutPara: "在旅游业长达22年的职业生涯中，Davina Horn 曾服务于多家领先的旅行社和国际旅游公司，包括 K.U. Travel、Amary Travel（Carlson Wagonlit Travel 代表处）、大韩航空（Korean Air）和 EXO Travel。这些工作经历使她积淀了在机票预订、企业差旅、酒店预订及旅游管理等领域的丰富经验，这也构成了她为 CHANTREA Travel 每位客户提供专业服务的基础。",
    aboutFounderTitle: "创始人兼总经理",
    aboutReadMore: "阅读更多关于我们",
    blogTag: "旅行见闻与故事",
    blogTitle: "最新旅行指南",
    blogDesc: "从我们的专业旅行指南中获取最新的旅行提示、亮点和见解。",
    blogFeatured: "精选文章",
    blogReadThis: "阅读此文章",
    blogReadMore: "阅读更多博客",
    blogsTag: "旅行指南与建议",
    blogsTitle: "CHANTREA 旅游博客",
    blogsDesc: "探索我们精选的专家指南、热门目的地和实用建议，为您下一次的国际旅行做好准备。",
    blogsReadStory: "阅读故事",
    blogsBackHome: "返回首页",
    blogNotFoundTitle: "未找到博客文章",
    blogNotFoundDesc: "您寻找的博客文章不存在。",
    blogBackBlogs: "返回博客列表",
    contactGetInTouch: "联系我们",
    contactLocation: "柬埔寨 金边",
    contactQuickNav: "快速导航",
    contactFlights: "全球机票",
    contactHotels: "酒店预订",
    contactVisas: "签证服务",
    footerCopy: "CHANTREA Travel. 版权所有。专业旅游与签证服务。",
    contactDesc: "以信心和关怀与全球目的地相连。诚挚的建议、可靠的机票预订、全球酒店预订和签证办理服务。"
  }
}

const BLOGS_TRANSLATIONS: Record<string, BlogPost[]> = {
  en: SAMPLE_BLOGS,
  km: [
    {
      id: 'cambodia',
      title: 'ទីកន្លែងកំពូលទាំង ៥ ដែលត្រូវទៅកម្សាន្តនៅប្រទេសកម្ពុជា៖ ព្រះរាជាណាចក្រអច្ឆរិយៈ',
      date: 'July 12, 2026',
      author: 'Davina Horn',
      summary: 'ចាប់ពីប្រាសាទអង្គរវត្តដ៏អស្ចារ្យ រហូតដល់ឆ្នេរខ្សាច់សក្បុសនៃកោះរ៉ុង និងបេតិកភណ្ឌប្រវត្តិសាស្ត្រនៃរាជធានីភ្នំពេញ ស្វែងយល់ពីមគ្គុទ្ទេសក៍ធ្វើដំណើរចុងក្រោយបង្អស់ទៅកាន់ប្រទេសកម្ពុជា។',
      image: '/hotel_cambodia.webp',
      content: [
        'ប្រទេសកម្ពុជា ដែលស្គាល់ថាជា «ព្រះរាជាណាចក្រអច្ឆរិយៈ» គឺជាគោលដៅធ្វើដំណើរដែលទាក់ទាញចិត្តអ្នកទេសចរគ្រប់រូប។ សម្បូរទៅដោយប្រវត្តិសាស្ត្រ វប្បធម៌ និងសម្រស់ធម្មជាតិ វាផ្តល់នូវបទពិសោធន៍ប្លែកៗគ្នាជាច្រើន ចាប់ពីអច្ឆរិយវត្ថុបុរាណវិទ្យា រហូតដល់ការសម្រាកលំហែកាយនៅលើកោះតំបន់ក្ដៅ។',
        '១. ឧទ្យានបុរាណវិទ្យាអង្គរ (សៀមរាប)៖ គ្មានការធ្វើដំណើរទៅកាន់ប្រទេសកម្ពុជាណាដែលពេញលេញនោះទេ ប្រសិនបើគ្មានការស្វែងយល់ពីតំបន់បេតិកភណ្ឌពិភពលោករបស់អង្គការយូណេស្កូនៃតំបន់អង្គរ។ គ្របដណ្តប់លើផ្ទៃដីជាង ៤០០ គីឡូម៉ែត្រការ៉េ រាជធានីបុរាណនៃចក្រភពខ្មែរនេះមានប្រាសាទអង្គរវត្តដ៏អស្ចារ្យ ប្រាសាទបាយ័នដែលមានព្រហ្មមុខបួនធ្វើពីថ្ម និងប្រាសាទតាព្រហ្មដែលព័ទ្ធជុំវិញដោយឫសឈើធំៗ។',
        '២. ភ្នំពេញ៖ រាជធានីដ៏មមាញឹកនេះស្ថិតនៅចំណុចប្រសព្វនៃទន្លេបី។ នៅទីនេះ ភ្ញៀវទេសចរអាចទស្សនាព្រះបរមរាជវាំង និងព្រះវិហារប្រាក់ដ៏ប្រណីត ទិញឥវ៉ាន់នៅផ្សារធំថ្មីដែលមានស្ថាបត្យកម្មបែប Art Deco និងសម្តែងការគោរពនៅសារមន្ទីរប្រល័យពូជសាសន៍ទួលស្លែង និងវាលពិឃាតជើងឯក។',
        '៣. កោះរ៉ុង និងកោះរ៉ុងសន្លឹម៖ សម្រាប់អ្នកស្វែងរកឋានសួគ៌កោះក្តៅ កោះទាំងនេះនៅក្រៅឆ្នេរសមុទ្រក្រុងព្រះសីហនុផ្តល់នូវទឹកសមុទ្រពណ៌ខៀវថ្លាឆ្វង់ ឆ្នេរខ្សាច់សម៉ដ្តក្បុស និងបរិយាកាសធូរស្រាលលំហែកាយ ដែលល្អឥតខ្ចោះសម្រាប់ការមុជទឹកមើលផ្កាថ្ម ឬគ្រាន់តែសម្រាកលំហែចិត្ត។',
        '៤. កំពត និងកែប៖ ល្បីល្បាញដោយសារម្រេចខ្មៅលំដាប់ថ្នាក់ពិភពលោក ក្រុងកំពតគឺជាទីក្រុងមាត់ទន្លេដ៏គួរឱ្យទាក់ទាញដែលមានស្ថាបត្យកម្មអាណានិគមបារាំង។ គ្រាន់តែបើកបរក្នុងចម្ងាយខ្លី គឺដល់ខេត្តកែប ដែលជាក្រុងមាត់សមុទ្រដ៏ស្ងប់ស្ងាត់ ល្បីល្បាញដោយសារផ្សារក្តាមស្រស់ៗដ៏ឆ្ងាញ់ និងឧទ្យានជាតិដ៏ស្រស់ស្អាត។',
        '៥. ជួរភ្នំក្រវាញ៖ ជាព្រៃទឹកភ្លៀងដ៏ធំបំផុតមួយដែលនៅសេសសល់ក្នុងអាស៊ីអាគ្នេយ៍ ជួរភ្នំក្រវាញផ្តល់នូវដំណើរផ្សងព្រេងទេសចរណ៍ធម្មជាតិ កន្លែងស្នាក់នៅបែបសហគមន៍ ការជិះទូកកាយ៉ាក់នៅលើដងទន្លេដ៏ស្ងប់ស្ងាត់ និងការដើរព្រៃដើម្បីស្វែងរកសត្វព្រៃកម្រ។'
      ]
    },
    {
      id: 'canada',
      title: 'ស្វែងយល់ពីប្រទេសកាណាដា៖ ជួរភ្នំដ៏អស្ចារ្យ ទីក្រុងដ៏រស់រវើក និងសម្រស់ឆ្នេរ',
      date: 'June 28, 2026',
      author: 'Travel Specialist',
      summary: 'ចាប់ផ្តើមដំណើរធ្វើដំណើរទៅកាន់ប្រទេសកាណាដាដែលមិនអាចបំភ្លេចបាន។ ស្វែងយល់ពីជួរភ្នំ Rockies ដ៏ស្រស់ស្អាតនៅ Banff ផ្លូវបុរាណបែបបារាំងនៅទីក្រុង Montreal ចាស់ និងទិដ្ឋភាពឆ្នេរសមុទ្រដ៏អស្ចារ្យនៃទីក្រុង Vancouver។',
      image: '/hotel_canada.webp',
      content: [
        'ប្រទេសកាណាដាគឺជាប្រទេសដ៏ធំ និងសម្បូរបែប ដែលមានអច្ឆរិយវត្ថុធម្មជាតិដ៏ស្រស់ស្អាតបំផុតមួយចំនួនរបស់ពិភពលោក រួមជាមួយទីក្រុងដែលមានសុវត្ថិភាព មិត្តភាព និងសម្បូរវប្បធម៌。លាតសន្ធឹងលើតំបន់ម៉ោងចំនួនប្រាំមួយ វាផ្តល់នូវឱកាសមិនចេះចប់សម្រាប់ការផ្សងព្រេងក្រៅផ្ទះ និងការស្វែងយល់ពីទីក្រុង។',
        '១. ឧទ្យានជាតិ Banff (Alberta)៖ ស្ថិតនៅក្នុងបេះដូងនៃជួរភ្នំ Rockies របស់កាណាដា ឧទ្យាន Banff ល្បីល្បាញដោយសារកំពូលភ្នំគ្របដណ្តប់ដោយព្រិល ព្រៃស្រល់ក្រាស់ៗ និងបឹងទឹកកកពណ៌ខៀវថ្លាដូចជា បឹង Louise និងបឹង Moraine។',
        '២. Vancouver & Whistler (British Columbia)៖ ទីក្រុង Vancouver រួមបញ្ចូលគ្នានូវទិដ្ឋភាពទីក្រុងដ៏រស់រវើកជាមួយនឹងការចូលទៅកាន់ធម្មជាតិភ្លាមៗ។ ដើរកម្សាន្តក្នុងឧទ្យាន Stanley ស្វែងយល់ពីកោះ Granville ហើយបន្ទាប់មកធ្វើដំណើរតាមផ្លូវហាយវ៉េ Sea-to-Sky ទៅកាន់ Whistler ដែលជារមណីយដ្ឋានជិះស្គី និងភ្នំល្បីល្បាញលើពិភពលោក។',
        '៣. ទឹកធ្លាក់ Niagara (Ontario)៖ ជាកន្លែងទាក់ទាញធម្មជាតិដ៏ល្បីល្បាញបំផុតមួយរបស់ពិភពលោក ទឹកធ្លាក់ដ៏ធំនេះស្ថិតនៅចន្លោះព្រំដែនអាមេរិក និងកាណាដា។ ជិះទូកកម្សាន្តដើម្បីចូលទៅជិតទឹកធ្លាក់ ឬទស្សនាពីលើប៉ម Skylon។',
        '៤. ទីក្រុងកេបិច និងម៉ុងរ៉េអាល់ (Quebec)៖ ទទួលយកបទពិសោធន៍នៃភាពទាក់ទាញបែបអឺរ៉ុបនៅអាមេរិកខាងជើង។ ដើរតាមដងផ្លូវថ្មប្រវត្តិសាស្ត្រនៃទីក្រុងកេបិចចាស់ និងទស្សនាទីក្រុងម៉ុងរ៉េអាល់ដើម្បីទទួលយកបទពិសោធន៍ម្ហូបអាហារដ៏ល្បីល្បាញ ពិធីបុណ្យផ្សេងៗ និងវប្បធម៌ពីរភាសា។',
        '៥. តំបន់ Maritimes (Atlantic Canada)៖ ស្វែងយល់ពីឆ្នេរសមុទ្រដ៏ស្រស់ស្អាត បង្គោលភ្លើងហ្វារ និងភូមិអ្នកនេសាទនៃ Nova Scotia, New Brunswick និង Prince Edward Island។ ចំណុចលេចធ្លោរួមមានការបើកបរលើផ្លូវ Cabot Trail និងការភ្លក្សរសជាតិបង្គារឡប់ស្ទ័រអាតឡង់ទិកស្រស់ៗ។'
      ]
    },
    {
      id: 'us',
      title: 'មគ្គុទ្ទេសក៍ធ្វើដំណើរចុងក្រោយបង្អស់ទៅអាមេរិក៖ ពីអគារខ្ពស់ៗ រហូតដល់ឧទ្យានជាតិ',
      date: 'June 15, 2026',
      author: 'Travel Specialist',
      summary: 'រៀបចំផែនការធ្វើដំណើរតាមផ្លូវដែកអាមេរិកក្នុងក្តីស្រមៃរបស់អ្នក។ ស្វែងយល់ពីពន្លឺដ៏ស្រស់ស្អាតនៃទីក្រុងញូវយ៉ក អច្ឆរិយវត្ថុភូមិសាស្ត្រនៃ Grand Canyon និងឆ្នេរដែលមានពន្លឺថ្ងៃនៃរដ្ឋកាលីហ្វ័រញ៉ា។',
      image: '/blog_us.png',
      content: [
        'សហរដ្ឋអាមេរិកគឺជាទឹកដីនៃភាពសម្បូរបែបដ៏អស្ចារ្យ ដែលផ្តល់ជូនអ្នកដំណើរនូវអ្វីៗគ្រប់យ៉ាងចាប់ពីអគារខ្ពស់ៗ និងរដ្ឋធានីកម្សាន្ត រហូតដល់ជ្រលងភ្នំជ្រៅ ឆ្នេរខ្សាច់ និងឧទ្យានភ្នំភ្លើងសកម្ម។',
        '១. ទីក្រុងញូវយ៉ក៖ «ទីក្រុងដែលមិនដែលដេកលក់» គឺជាមជ្ឈមណ្ឌលសកលនៃវប្បធម៌ សិល្បៈ ម៉ូដ និងអាហារ។ ចំណុចលេចធ្លោរួមមានការដើរកាត់សួនច្បារ Central Park ទស្សនាការសម្តែងនៅ Broadway ស្វែងយល់ពីសង្កាត់ចម្រុះដូចជា Soho និង Brooklyn និងការទស្សនាវិមានសេរីភាព។',
        '២. ឧទ្យានជាតិ Grand Canyon (Arizona)៖ ជាអច្ឆរិយវត្ថុធម្មជាតិពិតប្រាកដ Grand Canyon គឺជាជ្រលងភ្នំដ៏ធំ និងស្រស់ស្អាតដែលត្រូវបានកាត់ដោយទន្លេ Colorado អស់រយៈពេលរាប់លានឆ្នាំ។ តំបន់ South Rim ផ្តល់នូវទិដ្ឋភាពដ៏ធំល្វឹងល្វើយ ផ្លូវដើរលំហែ និងទិដ្ឋភាពថ្ងៃលិចដ៏ស្រស់ស្អាត។',
        '៣. ឆ្នេរសមុទ្រកាលីហ្វ័រញ៉ា៖ បើកបរលើផ្លូវហាយវ៉េឆ្នេរសមុទ្រប៉ាស៊ីហ្វិកដ៏ល្បីល្បាញ (ផ្លូវលេខ ១) ចាប់ពីទីក្រុងសានហ្វ្រានស៊ីស្កូ—ដែលមានស្ពាន Golden Gate និងរថយន្តខ្សែកាបប្រវត្តិសាស្ត្រ—ចុះទៅទីក្រុងឡូសអាន់ជ័រឡេស និងសានឌីអេហ្គោ ដោយឈប់នៅកន្លែងស្អាតៗដូចជា Big Sur និង Santa Barbara។',
        '៤. ឧទ្យានជាតិ Yellowstone (Wyoming/Montana)៖ ឧទ្យានជាតិដំបូងគេរបស់ពិភពលោកគឺជាកន្លែងភូមិសាស្ត្រដ៏អស្ចារ្យ។ វាស្ថិតនៅលើចំណុចក្តៅនៃភ្នំភ្លើង ហើយមានលក្ខណៈពិសេសភូមិសាស្ត្រកម្តៅរាប់ពាន់ រួមទាំងប្រភពទឹកក្តៅ Old Faithful និងប្រភពទឹកក្តៅពណ៌ស្រស់ស្អាត Grand Prismatic Spring។',
        '៥. ញូអរលីន (Louisiana)៖ ស្គាល់ដោយសារជីវិតពេលរាត្រីដ៏រស់រវើក តន្ត្រីហ្សាសផ្ទាល់ និងបេតិកភណ្ឌម្ហូបអាហារប្លែកគេ ញូអរលីនគឺជាការលាយបញ្ចូលគ្នានៃវប្បធម៌បារាំង អាហ្វ្រិក និងអាមេរិក។ កុំរំលងការទស្សនាសង្កាត់បារាំងប្រវត្តិសាស្ត្រ និងការភ្លក្សរសជាតិបេកណេត (beignets) ក្នុងស្រុកដ៏មានឱជារស។'
      ]
    }
  ],
  zh: [
    {
      id: 'cambodia',
      title: '柬埔寨最值得去的5大景点：奇迹王国之旅',
      date: 'July 12, 2026',
      author: 'Davina Horn',
      summary: '从令人叹为观止的吴哥窟古迹群，到高龙岛的纯净白沙滩，再到金边的历史遗产，为您揭秘最详尽的柬埔寨旅游指南。',
      image: '/hotel_cambodia.webp',
      content: [
        '柬埔寨被称为“奇迹王国”，是能瞬间俘获每位游客心弦的目的地。这里拥有悠久的历史、灿烂的文化和绝美的自然风光，提供从古代考古奇迹到热带海岛度假的多元化体验。',
        '1. 吴哥考古公园（暹粒）：如果不去探索联合国教科文组织世界遗产吴哥窟，您的柬埔寨之旅就不算完整。这座高棉帝国的古代首都占地 400 多平方公里，拥有宏伟的吴哥窟、巴戎寺的石头人脸以及与丛林大树缠绕在一起的塔普伦寺。',
        '2. 金边：这座繁忙的首都坐落在三条河流的交汇处。在这里，游客可以探索华丽的皇宫和银阁寺，在装饰艺术风格的中央市场购物，并在具有历史意义的吐斯廉屠杀博物馆和琼邑克杀戮战场表达敬意。',
        '3. 高龙岛和高龙撒冷岛：对于追寻热带天堂的游客来说，这些位于西哈努克城海岸外的海岛拥有晶莹剔透的绿松石色海水和细软的白沙滩，轻松悠闲的氛围非常适合浮潜、潜水或单纯放松身心。',
        '4. 贡布和白马：贡布以其世界级的黑胡椒而闻名，是一座拥有法国殖民时期建筑的归宿河畔小镇。距离贡布不远处就是白马市，这是一座安静的沿海小城镇，以其美味的蟹市场和风景秀丽的国家公园而闻名。',
        '5. 豆蔻山脉：作为东南亚仅存的最大雨林之一，豆蔻山脉提供生态旅游冒险、社区民宿、在清澈的河流上划皮划艇，以及穿越茂密丛林徒步寻找珍稀野生动物的体验。'
      ]
    },
    {
      id: 'canada',
      title: '探索加拿大：雄伟的群山、充满活力的城市与海岸之美',
      date: 'June 28, 2026',
      author: 'Travel Specialist',
      summary: '开启一段难忘的加拿大之旅。探索班夫令人惊叹的落基山脉、蒙特利尔老城的法式街道以及温哥华壮丽的海岸风光。',
      image: '/hotel_canada.webp',
      content: [
        '加拿大是一个辽阔而多元的国家，拥有世界上最壮观的自然奇观，以及干净、友善且文化丰富的城市。它横跨六个时区，为户外冒险和城市探索提供了无尽的机会。',
        '1. 班夫国家公园（阿尔伯塔省）：班夫坐落在加拿大落基山脉的心脏地带，以其雪峰、松林和冰川融水汇聚而成的绿松石色湖泊（如露易丝湖和梦莲湖）而闻名于世。',
        '2. 温哥华与惠斯勒（不列颠哥伦比亚省）：温哥华将繁华的都市风光与大自然完美结合。您可以漫步于史丹利公园，探索格兰维尔岛，然后沿着风景优美的海天公路前往世界闻名的滑雪与避暑胜地惠斯勒。',
        '3. 尼亚加拉大瀑布（安大略省）：作为世界上最著名的自然景观之一，这座巨大的瀑布横跨美加边界。您可以乘坐游船近距离感受雷霆万钧的水雾，或者从斯凯隆塔上俯瞰壮丽的全景。',
        '4. 魁北克市与蒙特利尔（魁北克省）：在北美感受欧洲的独特魅力。漫步在老魁北克城历史悠久的鹅卵石街道上，探访这座设防的殖民城市；随后访问蒙特利尔，体验其传奇的美食、节日和双语文化。',
        '5. 滨海诸省（大西洋沿岸加拿大）：探索新斯科舍省、新不伦瑞克省和爱动华省崎岖的海岸线、灯塔和渔村。这里的亮点包括沿着风景优美的卡伯特之路驾驶，以及品尝新鲜的大西洋龙虾。'
      ]
    },
    {
      id: 'us',
      title: '美国旅行终极指南：从摩天大楼到国家公园',
      date: 'June 15, 2026',
      author: 'Travel Specialist',
      summary: '规划您梦想中的美国公路旅行。探索纽约市闪耀的霓虹、大峡谷的地理奇观以及加利福尼亚充满阳光的沙滩。',
      image: '/blog_us.png',
      content: [
        '美国是一个多元化的国家，为旅行者提供了一切：从标志性的都市天际线和娱乐之都，到幽深的峡谷、沙滩海岸和活跃的地热公园。',
        '1. 纽约市：“不夜城”是全球文化、艺术、时尚和美食的中心。这里的必去体验包括漫步中央公园、看一场百老汇演出、探索苏豪区和布鲁克林等多元社区，以及参观自由女神像。',
        '2. 大峡谷国家公园（亚利桑那州）：作为一个真正的自然奇迹，大峡谷是一座巨大的、色彩斑斓的峡谷，由科罗拉多河经过数百万年雕琢而成。南缘提供壮丽的鸟瞰全景、徒步小径和美丽的日落景观。',
        '3. 加利福尼亚海岸线：沿着著名的太平洋海岸公路（1号公路）行驶，从拥有金门大桥和历史地表的旧金山，一直开往阳光明媚的洛杉矶和圣地亚哥，途中可在比格苏尔和圣巴巴拉等风景名胜区停留。',
        '4. 黄石国家公园（怀俄明州/蒙大拿州）：世界上第一个国家公园是一个地质奇境。它坐落在一个活火山热点之上，拥有数千个地热奇观，包括老忠实间歇泉和色彩绚丽的大棱镜温泉。',
        '5. 新奥尔良（路易斯安那州）：以其全天候的夜生活、充满活力的爵士乐和独特的饮食遗产而闻名，新奥尔良是法国、非洲和美国文化的熔炉。千万不要错过游览历史优美的法国区和品尝当地美味的法式甜甜圈（beignets）。'
      ]
    }
  ]
}

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
  const [blogs, setBlogs] = useState<BlogPost[]>(() => {
    const stored = localStorage.getItem('lang')
    const initialLang = (stored === 'km' || stored === 'zh') ? stored : 'en'
    return BLOGS_TRANSLATIONS[initialLang] || SAMPLE_BLOGS
  })

  // Multi-language state & helpers
  const [lang, setLang] = useState<'en' | 'km' | 'zh'>(() => {
    const stored = localStorage.getItem('lang')
    if (stored === 'km' || stored === 'zh') return stored
    return 'en'
  })
  const [dbImages, setDbImages] = useState<any[]>([])

  const t = (key: keyof typeof TRANSLATIONS['en']) => {
    return TRANSLATIONS[lang]?.[key] || TRANSLATIONS['en'][key] || ''
  }

  const translateSlideName = (name: string) => {
    if (!name) return ''
    const upper = name.toUpperCase()
    const mapping: Record<string, Record<string, string>> = {
      'CAMBODIA': { km: 'កម្ពុជា', zh: '柬埔寨', en: 'CAMBODIA' },
      'VIETNAM': { km: 'វៀតណាម', zh: '越南', en: 'VIETNAM' },
      'CANADA': { km: 'កាណាដា', zh: '加拿大', en: 'CANADA' },
      'AUSTRALIA': { km: 'អូស្ត្រាលី', zh: '澳大利亚', en: 'AUSTRALIA' },
      'CHINA': { km: 'ចិន', zh: '中国', en: 'CHINA' },
      'SINGAPORE': { km: 'សិង្ហបុរី', zh: '新加坡', en: 'SINGAPORE' }
    }
    return mapping[upper]?.[lang] || name
  }

  const LanguageSelector = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          setDropdownOpen(false)
        }
      }
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const toggleDropdown = () => setDropdownOpen(!dropdownOpen)

    const handleSelect = (l: 'en' | 'km' | 'zh') => {
      setLang(l)
      localStorage.setItem('lang', l)
      setDropdownOpen(false)
    }

    return (
      <div className="lang-selector-wrapper" ref={dropdownRef}>
        <button 
          className="lang-btn" 
          onClick={toggleDropdown}
          aria-label="Select Language"
          aria-haspopup="true"
          aria-expanded={dropdownOpen}
        >
          <Globe size={20} />
        </button>
        {dropdownOpen && (
          <ul className="lang-dropdown">
            <li className={lang === 'km' ? 'active' : ''} onClick={() => handleSelect('km')}>ខ្មែរ</li>
            <li className={lang === 'en' ? 'active' : ''} onClick={() => handleSelect('en')}>English</li>
            <li className={lang === 'zh' ? 'active' : ''} onClick={() => handleSelect('zh')}>中文</li>
          </ul>
        )}
      </div>
    )
  }

  // Update HTML body class dynamically for CSS language overrides
  useEffect(() => {
    document.body.className = `lang-${lang}`
  }, [lang])

  // Combine translations and dynamic Supabase images for blogs
  useEffect(() => {
    const currentLangBlogs = BLOGS_TRANSLATIONS[lang] || SAMPLE_BLOGS
    const updatedBlogs = currentLangBlogs.map(b => {
      const dbMatch = dbImages.find(img => img.section === `blog-${b.id}`)
      return dbMatch ? { ...b, image: dbMatch.image_url } : b
    })
    setBlogs(updatedBlogs)
  }, [lang, dbImages])

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
          setDbImages(data)
          
          const flights = data.filter(img => img.section === 'flights')
          const hotels = data.filter(img => img.section === 'hotels')
          const founder = data.find(img => img.section === 'founder')

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
          setDbImages([])
          setFlightSlides(flightSlidesListDefault)
          setHotelSlides(hotelSlidesListDefault)
          setFounderPortrait('/davina_horn.webp')
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

  const resetScrollToTop = () => {
    const html = document.documentElement
    const body = document.body
    const prevHtmlScroll = html.style.scrollBehavior
    const prevBodyScroll = body.style.scrollBehavior
    
    html.style.scrollBehavior = 'auto'
    body.style.scrollBehavior = 'auto'
    
    window.scrollTo({ top: 0, behavior: 'auto' })
    
    setTimeout(() => {
      html.style.scrollBehavior = prevHtmlScroll
      body.style.scrollBehavior = prevBodyScroll
    }, 50)
  }

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
      
      resetScrollToTop()
      
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
        resetScrollToTop()
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
    
    resetScrollToTop()

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
      resetScrollToTop()
      
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
                <span className="hero-video-tagline">{t('heroTagline')}</span>
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
                <div className="stat-reveal-label">{t('statCountries')}</div>
              </div>
              <div className="stat-reveal-card">
                <div className="stat-reveal-num">{statExpertise >= 22 ? '22+' : statExpertise}</div>
                <div className="stat-reveal-label">{t('statExperience')}</div>
              </div>
              <div className="stat-reveal-card">
                <div className="stat-reveal-num">{statReviews % 1 === 0 ? statReviews : statReviews.toFixed(1)}★</div>
                <div className="stat-reveal-label">{t('statReviews')}</div>
              </div>
            </div>
            
            {/* Our Services Section */}
            <section id="services" className="section">
              <div className="section-header">
                <span className="section-tag">{t('servicesWhatWeDo')}</span>
                <h2 className="section-title">{t('servicesTitle')}</h2>
                <p className="section-desc">
                  {t('servicesDesc')}
                </p>
              </div>

              {/* Service 1: Worldwide Flight Tickets */}
              <div id="services-flights" className="service-block reveal-element">
                <div className="service-row">
                  {/* Left side: Information block */}
                  <div className="service-col-info">
                    <span className="service-block-tag">{t('flightTag')}</span>
                    <h3 className="service-block-title">{t('flightTitle')}</h3>
                    <p className="service-block-text">
                      {t('flightDesc')}
                    </p>
                    <ul className="service-block-list">
                      <li className="service-block-item"><CheckCircle size={16} /> {t('flightItem1')}</li>
                      <li className="service-block-item"><CheckCircle size={16} /> {t('flightItem2')}</li>
                      <li className="service-block-item"><CheckCircle size={16} /> {t('flightItem3')}</li>
                    </ul>
                    <a href="#contact" className="nav-btn" style={{ alignSelf: 'flex-start', display: 'inline-flex', alignItems: 'center', gap: '8px' }} onClick={(e) => { e.preventDefault(); navigate('/', 'contact'); }}>
                      {t('flightBtn')} <ArrowRight size={16} />
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
                                <span className="slideshow-slide-name">{translateSlideName(slide.name)}</span>
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
                                <span className="slideshow-slide-name">{translateSlideName(slide.name)}</span>
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
                    <span className="service-block-tag">{t('hotelTag')}</span>
                    <h3 className="service-block-title">{t('hotelTitle')}</h3>
                    <p className="service-block-text">
                      {t('hotelDesc')}
                    </p>
                    <ul className="service-block-list">
                      <li className="service-block-item"><CheckCircle size={16} /> {t('hotelItem1')}</li>
                      <li className="service-block-item"><CheckCircle size={16} /> {t('hotelItem2')}</li>
                      <li className="service-block-item"><CheckCircle size={16} /> {t('hotelItem3')}</li>
                    </ul>
                    <a href="#contact" className="nav-btn" style={{ alignSelf: 'flex-start', display: 'inline-flex', alignItems: 'center', gap: '8px' }} onClick={(e) => { e.preventDefault(); navigate('/', 'contact'); }}>
                      {t('hotelBtn')} <ArrowRight size={16} />
                    </a>
                  </div>
                </div>
              </div>

              {/* Service 3: Visa & Immigration Services (Unified Block) */}
              <div id="services-visas" className="service-block reveal-element">
                {/* Header inside the box */}
                <div style={{ padding: '0 0 32px 0', borderBottom: '1px solid var(--border-light)' }}>
                  <span className="service-block-tag">{t('visaTag')}</span>
                  <h3 className="service-block-title" style={{ marginTop: '8px' }}>{t('visaTitle')}</h3>
                  <p className="service-block-text" style={{ marginTop: '12px' }}>
                    {t('visaDesc')}
                  </p>
                </div>

                {/* Subsection A: Visa Consultation & Assistance */}
                <div className="visa-subsection" style={{ borderBottom: '1px solid var(--border-light)' }}>
                  <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '22px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '16px' }}>
                    {t('visaSub1Title')}
                  </h4>
                  <p className="service-block-text" style={{ marginBottom: '24px' }}>
                    {t('visaSub1Desc')}
                  </p>
                  <div className="visas-grid-col">
                    <div className="visa-country-card">
                      <h5 className="visa-country-name">{t('visaSub1Canada')}</h5>
                    </div>
                    <div className="visa-country-card">
                      <h5 className="visa-country-name">{t('visaSub1Australia')}</h5>
                    </div>
                    <div className="visa-country-card">
                      <h5 className="visa-country-name">{t('visaSub1US')}</h5>
                    </div>
                  </div>
                </div>

                {/* Subsection B: China & Vietnam Visa Services */}
                <div className="visa-subsection" style={{ borderBottom: '1px solid var(--border-light)' }}>
                  <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '22px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '16px' }}>
                    {t('visaSub2Title')}
                  </h4>
                  <p className="service-block-text" style={{ marginBottom: '20px' }}>
                    {t('visaSub2Desc')}
                  </p>
                  <ul className="service-block-list" style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', padding: 0 }}>
                    <li className="service-block-item" style={{ margin: 0 }}><CheckCircle size={16} /> {t('visaSub2Item1')}</li>
                    <li className="service-block-item" style={{ margin: 0 }}><CheckCircle size={16} /> {t('visaSub2Item2')}</li>
                  </ul>
                </div>

                {/* Subsection C: Cambodian Visa Extensions */}
                <div className="service-cambodian-extensions-section" style={{ borderBottom: '1px solid var(--border-light)' }}>
                  <div className="extensions-left">
                    <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '22px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '16px' }}>
                      {t('visaSub3Title')}
                    </h4>
                    <p className="service-block-text" style={{ marginBottom: '20px' }}>
                      {t('visaSub3Desc')}
                    </p>
                    <ul className="service-block-list">
                      <li className="service-block-item"><CheckCircle size={16} /> {t('visaSub3Item1')}</li>
                      <li className="service-block-item"><CheckCircle size={16} /> {t('visaSub3Item2')}</li>
                    </ul>
                  </div>
                  <div className="extensions-right" style={{ background: 'var(--bg-secondary)' }}>
                    <h5 style={{ fontSize: '16px', marginBottom: '16px', color: 'var(--text-primary)', fontWeight: 600 }}>{t('visaSub3RightTitle')}</h5>
                    <table className="extensions-table">
                      <tbody>
                        <tr>
                          <td style={{ padding: '6px 12px' }}><span className="extensions-badge-duration">{t('duration1Month')}</span></td>
                          <td style={{ padding: '6px 12px' }}>{t('singleExtension')}</td>
                        </tr>
                        <tr>
                          <td style={{ padding: '6px 12px' }}><span className="extensions-badge-duration">{t('duration3Months')}</span></td>
                          <td style={{ padding: '6px 12px' }}>{t('singleExtension')}</td>
                        </tr>
                        <tr>
                          <td style={{ padding: '6px 12px' }}><span className="extensions-badge-duration">{t('duration6Months')}</span></td>
                          <td style={{ padding: '6px 12px' }}>{t('multiExtension')}</td>
                        </tr>
                        <tr>
                          <td style={{ padding: '6px 12px' }}><span className="extensions-badge-duration">{t('duration12Months')}</span></td>
                          <td style={{ padding: '6px 12px' }}>{t('multiExtension')}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Subsection D: Chinese Immigration Assistance */}
                <div className="visa-subsection" style={{ paddingBottom: 0 }}>
                  <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '22px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '16px' }}>
                    {t('visaSub4Title')}
                  </h4>
                  <p className="service-block-text" style={{ marginBottom: '24px' }}>
                    {t('visaSub4Desc')}
                  </p>
                  <a href="#contact" className="nav-btn" style={{ alignSelf: 'flex-start', padding: '10px 20px', fontSize: '14px', display: 'inline-block' }} onClick={(e) => { e.preventDefault(); navigate('/', 'contact'); }}>
                    {t('visaSub4Btn')}
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
                    <p className="about-founder-title">{t('aboutFounderTitle')}</p>
                  </div>
                </div>

                {/* Right Column: Narrative Info */}
                <div 
                  className="homepage-about-text-content"
                  style={{
                    ['--about-progress' as any]: aboutScrollProgress
                  }}
                >
                  <h2 className="section-title">{t('aboutTitle')}</h2>
                  <p className="about-paragraph">
                    {t('aboutPara')}
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
                      {t('aboutReadMore')}
                    </a>
                  </div>
                </div>
              </div>
            </section>

            {/* Latest Blog Summary Section (Between Visa Support and About Partner) */}
            <section className="section reveal-element" id="home-latest-blog" aria-label="Latest Travel Blog Post Summary" style={{ borderTop: '1px solid var(--border-light)', paddingTop: '80px', marginTop: '40px' }}>
              <div className="section-header">
                <span className="section-tag">{t('blogTag')}</span>
                <h2 className="section-title">{t('blogTitle')}</h2>
                <p className="section-desc">
                  {t('blogDesc')}
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
                    <span className="service-block-tag">{t('blogFeatured')} • {blogs[0].date}</span>
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
                        {t('blogReadThis')}
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
                        {t('blogReadMore')}
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
            <span className="section-tag">{t('blogsTag')}</span>
            <h1 className="section-title">{t('blogsTitle')}</h1>
            <p className="section-desc">
              {t('blogsDesc')}
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
                      {blog.date} • {lang === 'km' ? 'ដោយ' : lang === 'zh' ? '作者：' : 'By'} {blog.author}
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
                    {t('blogsReadStory')} <ArrowRight size={16} />
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
              {t('blogsBackHome')}
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
                  <p className="about-founder-title">{t('aboutFounderTitle')}</p>
                </div>
              </div>

              {/* Right Column: Narrative & Biography */}
              <div className="about-text-content">
                <h2 className="section-title">{t('aboutTitle')}</h2>
                
                <p className="about-paragraph">
                  {t('aboutPara')}
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
              {t('blogsBackHome')}
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
              <h2 className="section-title">{t('blogNotFoundTitle')}</h2>
              <p className="section-desc" style={{ marginBottom: '32px' }}>{t('blogNotFoundDesc')}</p>
              <a href="/blogs" className="nav-btn" onClick={(e) => { e.preventDefault(); navigate('/blogs'); }}>{t('blogBackBlogs')}</a>
            </div>
          </div>
        );
      }
      return (
        <div className="container page-container-padding">
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ marginBottom: '32px' }}>
              <span className="section-tag" style={{ marginBottom: '16px' }}>{blog.date} • {lang === 'km' ? 'ដោយ' : lang === 'zh' ? '作者：' : 'By'} {blog.author}</span>
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
                {t('blogBackBlogs')}
              </a>
              <a href="/" className="nav-btn" onClick={(e) => { e.preventDefault(); navigate('/'); }}>
                {t('blogsBackHome')}
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
      <header className={`header ${viewState.currentView === 'home' && !isScrolled && !viewState.isTransitioning ? 'header-transparent' : ''}`}>
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
                  opacity: (viewState.currentView === 'home' && !viewState.isTransitioning) ? Math.min(Math.max((logoTransitionProgress - 0.4) / 0.6, 0), 1) : 1,
                  transform: (viewState.currentView === 'home' && !viewState.isTransitioning) ? `scale(${0.85 + Math.min(Math.max((logoTransitionProgress - 0.4) / 0.6, 0), 1) * 0.15})` : 'scale(1)',
                  transition: 'opacity 0.15s ease-out, transform 0.15s ease-out',
                  willChange: 'opacity, transform'
                }}
              />
            </a>

            {/* Right: Desktop Controls & Menu */}
            <div className="nav-controls">
              <ul className="nav-menu">
                <li>
                  <LanguageSelector />
                </li>
                <li>
                  <a href="#services" className="nav-link" onClick={(e) => { e.preventDefault(); navigate('/', 'services'); }}>
                    {t('navServices')}
                  </a>
                </li>
                <li>
                  <a href="/blogs" className="nav-link" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); navigate('/blogs'); }}>
                    {t('navBlogs')}
                  </a>
                </li>
                <li>
                  <a href="/about" className="nav-link" onClick={(e) => { e.preventDefault(); navigate('/about'); }}>
                    {t('navAbout')}
                  </a>
                </li>
                <li>
                  <a href="#contact" className="nav-link" onClick={(e) => { e.preventDefault(); navigate('/', 'contact'); }}>
                    {t('navContact')}
                  </a>
                </li>
                <li>
                  <a href="#contact" className="nav-btn" onClick={(e) => { e.preventDefault(); navigate('/', 'contact'); }}>
                    {t('navConsultation')}
                  </a>
                </li>
              </ul>

              {/* Mobile Language Selector */}
              <div className="mobile-lang-container">
                <LanguageSelector />
              </div>

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
                  {t('contactDesc')}
                </p>
              </div>

              {/* Contact Information */}
              <div>
                <h4 className="service-title" style={{ marginBottom: '24px', fontSize: '18px' }}>{t('contactGetInTouch')}</h4>
                <ul className="contact-info-list">
                  <li className="contact-info-item">
                    <MapPin size={18} />
                    <span>{t('contactLocation')}</span>
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
                <h4 className="service-title" style={{ marginBottom: '24px', fontSize: '18px' }}>{t('contactQuickNav')}</h4>
                <ul className="contact-links-list">
                  <li>
                    <a href="#services" className="contact-link" onClick={(e) => { e.preventDefault(); navigate('/', 'services-flights'); }}>
                      {t('contactFlights')}
                    </a>
                  </li>
                  <li>
                    <a href="#services" className="contact-link" onClick={(e) => { e.preventDefault(); navigate('/', 'services-hotels'); }}>
                      {t('contactHotels')}
                    </a>
                  </li>
                  <li>
                    <a href="#services" className="contact-link" onClick={(e) => { e.preventDefault(); navigate('/', 'services-visas'); }}>
                      {t('contactVisas')}
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="footer-bottom">
              <p>&copy; {new Date().getFullYear()} {t('footerCopy')}</p>
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
              {t('navServices')}
            </a>
            <a href="/blogs" className="nav-link" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); navigate('/blogs'); }}>
              {t('navBlogs')}
            </a>
            <a href="/about" className="nav-link" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); navigate('/about'); }}>
              {t('navAbout')}
            </a>
            <a href="#contact" className="nav-link" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); navigate('/', 'contact'); }}>
              {t('navContact')}
            </a>
            <a href="#contact" className="nav-btn" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); navigate('/', 'contact'); }}>
              {t('navConsultation')}
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
