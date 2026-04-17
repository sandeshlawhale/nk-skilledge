import { MonitorPlay, Smartphone, BrainCircuit, Code } from 'lucide-react'

export const SITE_SETTINGS = {
  whatsappNumber: "+917498784109",
  phoneNumber: "+919356049629",
  contactEmail: "hmendhe72@gmail.com",
  address: "Near Gobade Hospital, Sakoli, Maharashtra, India - 441105",
}

export const FEATURED_TRAINING = [
  {
    id: 'fullstack-dev',
    title: 'Full-Stack Development',
    description: 'Master frontend and backend with modern industry tools.',
    duration: '12 Weeks',
    price: '₹29,999',
    rating: '4.8',
    category: 'Development',
    img: '/brain/4cabaed3-a5e4-41df-bbd0-4b795a90aa25/full_stack_course_1773318774799.png'
  },
  {
    id: 'android-dev',
    title: 'Android App Development',
    description: 'Build high-performance native Android applications.',
    duration: '10 Weeks',
    price: '₹24,999',
    rating: '4.9',
    category: 'Mobile',
    img: '/brain/4cabaed3-a5e4-41df-bbd0-4b795a90aa25/mobile_app_course_1773318791972.png'
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX Design Masterclass',
    description: 'Design stunning user interfaces and seamless experiences.',
    duration: '8 Weeks',
    price: '₹19,999',
    rating: '4.7',
    category: 'Design',
    img: '/brain/4cabaed3-a5e4-41df-bbd0-4b795a90aa25/ui_ux_course_1773318812721.png'
  },
  {
    id: 'data-science',
    title: 'Data Science with Python',
    description: 'Unlock insights from data using Python and AI.',
    duration: '14 Weeks',
    price: '₹34,999',
    rating: '4.9',
    category: 'Data',
    img: '/brain/4cabaed3-a5e4-41df-bbd0-4b795a90aa25/data_science_course_1773318830386.png'
  },
];

export const SERVICES = [
  {
    id: "web-development",
    title: "Website Development",
    description:
      "Professional, responsive, and SEO-optimized websites tailored to your business needs. From landing pages to complex web applications, we deliver excellence.",
    icon: "globe",
    highlight: false,
    price: "Starting from ₹15,000",
    features: [
      "Custom Design & Development",
      "E-commerce Solutions",
      "API & Payment Gateway Integrations",
      "AI Integration",
      "CMS Integration",
      "Admin Panels",
      "Landing Pages",
      "Maintenance & Support",
    ],
    style: "default",
  },
  {
    id: "application-development",
    title: "Application Development",
    description:
      "Native and cross-platform mobile applications that deliver seamless user experiences. Turn your ideas into powerful digital products.",
    icon: "mobile",
    highlight: true,
    badge: "Most Popular",
    price: "Starting from ₹25,000",
    features: [
      "iOS & Android Apps",
      "Cross-Platform Development",
      "API Integration",
      "App Store Deployment",
    ],
    style: "featured",
  },
  {
    id: "social-media-services",
    title: "Social Media Services",
    description:
      "Boost your online presence with strategic social media marketing, content creation, and brand management services.",
    icon: "megaphone",
    highlight: false,
    price: "Starting from ₹8,000/month",
    features: [
      "Social Media Strategy",
      "Content Creation & Posting",
      "Paid Advertising Campaigns",
      "Analytics & Reporting",
    ],
    style: "default",
  },
];;

export const SERVICES_STATS = [
  { label: 'Projects Delivered', value: '50+' },
  { label: 'Happy Clients', value: '30+' },
  { label: 'Active Projects', value: '15+' },
  { label: 'Upcomming Projects', value: '10+' },
];

export const TESTIMONIALS = [
  {
    "id": 1,
    "company": "Mahalakshmi Retail Pvt Ltd",
    "location": "Mumbai, India",
    "project": "E-Commerce Marketplace Development",
    "testimonial": "NKSKILLEDGE Pvt Ltd delivered an excellent e-commerce platform for our retail business. The website is fast, secure and easy to manage. Special thanks to Kartik Mendhe for providing great support and understanding our business requirements.",
    "clientName": "Rajesh Sharma",
    "designation": "Director"
  },
  {
    "id": 2,
    "company": "SpeedX Logistics Solutions",
    "location": "Pune, India",
    "project": "Logistics & Delivery Tracking Platform",
    "testimonial": "We are very satisfied with the logistics tracking system developed by NKSKILLEDGE Pvt Ltd. The admin panel and shipment tracking features improved our operations significantly. Kartik Mendhe and his team provided timely delivery and professional service.",
    "clientName": "Rohit Mehta",
    "designation": "Operations Manager"
  },
  {
    "id": 3,
    "company": "UrbanNest Developers Pvt Ltd",
    "location": "Bengaluru, India",
    "project": "Real Estate Property Management Platform",
    "testimonial": "NKSKILLEDGE Pvt Ltd created a modern property listing website for our company. The CRM integration and inquiry system helped us manage leads efficiently. We appreciate the hard work of Kartik Mendhe and the development team.",
    "clientName": "Amit Kapoor",
    "designation": "Managing Director"
  },
  {
    "id": 4,
    "company": "TechNova Solutions Inc.",
    "location": "San Francisco, USA",
    "project": "Custom CRM & Business Automation Software",
    "testimonial": "Working with NKSKILLEDGE Pvt Ltd was a great experience. They developed a reliable CRM system that improved our internal workflow. Kartik Mendhe ensured smooth communication and delivered the project on time.",
    "clientName": "Michael Johnson",
    "designation": "CTO"
  },
  {
    "id": 5,
    "company": "SkyBridge E-Commerce LLC",
    "location": "New York, USA",
    "project": "Multi-Vendor E-Commerce Platform",
    "testimonial": "The multi-vendor marketplace developed by NKSKILLEDGE Pvt Ltd works perfectly for our online business. The platform is scalable and user-friendly. Special thanks to Kartik Mendhe for his technical expertise and dedication.",
    "clientName": "Sarah Williams",
    "designation": "Founder"
  },
  {
    "id": 6,
    "company": "Apex Logistics Corporation",
    "location": "Chicago, USA",
    "project": "Logistics Tracking & Fleet Management System",
    "testimonial": "NKSKILLEDGE Pvt Ltd delivered a powerful fleet management and tracking solution for our company. The system improved our delivery efficiency. Kartik Mendhe and his team provided excellent technical support throughout the project.",
    "clientName": "David Anderson",
    "designation": "Logistics Director"
  }
];

export const TIMELINE_DATA = [
  {
    "year": "2023",
    "title": "Founded NK SkillEdge",
    "description": "Started with a mission to provide practical tech education."
  },
  {
    "year": "2024",
    "title": "Expanded Services",
    "description": "Introduced real-world project-based learning."
  },
  {
    "year": "2025",
    "title": "Community Growth",
    "description": "Reached hundreds of learners and developers."
  },
  {
    "year": "2026",
    "title": "Training",
    "description": "Keep the Promise to change the entire education system, started here"
  }
];

export const TEAM = [
  {
    name: "Mr. Kartik Mendhe",
    role: "CEO & Founder",
    description: "Leading the company with vision, innovation, and strong technical expertise. Ex-Intern at The DataStack.",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kartik",
    socials: { linkedin: "#", twitter: "#" }
  },
  {
    name: "Mr. Ayush Bhendarkar",
    role: "Director & Co-Founder",
    description: "Brings strategic vision and operational excellence. Focused on business development and leadership.",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ayush",
    socials: { linkedin: "#", twitter: "#" }
  },
  {
    name: "Mr. Madhusudan Madankar",
    role: "Technical Planning",
    description: "Heads technical planning, development, and implementation while ensuring innovation and system reliability.",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Madhusudan",
    socials: { linkedin: "#" }
  },
  {
    name: "Mr. Harsh Sagare",
    role: "Social Media Manager",
    description: "Handles social media platforms, creating content, managing campaigns, and boosting engagement.",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Harsh",
    socials: { linkedin: "#", instagram: "#" }
  },
  {
    name: "Mr. Harshal Mendulkar",
    role: "Technical Strategy",
    description: "Leads technical strategy, product development, and innovation initiatives.",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Harshal",
    socials: { linkedin: "#" }
  },
  {
    name: "Mr. Sandesh Lawhale",
    role: "Web Developer",
    description: "Full-stack developer focused on building practical, real-world applications that solve actual problems.",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sandesh",
    socials: { linkedin: "#", github: "#" }
  },
  {
    name: "Mr. Sujal Dhoke",
    role: "Security Researcher",
    description: "specialized computer expert who analyzes systems, software, and networks to identify, document, and report unknown vulnerabilities.",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sujal",
    socials: { linkedin: "#" }
  }
];

export const FAQS = [
  {
    "question": "What does NK SkillEdge specialize in?",
    "answer": "NK SkillEdge provides industry-focused technology training and builds digital solutions for businesses, including websites, mobile applications, and custom software platforms."
  },
  {
    "question": "Do your training programs include practical projects?",
    "answer": "Yes. All courses are designed with hands-on learning and real-world projects to help students gain practical experience with modern tools and technologies."
  },
  {
    "question": "Who can enroll in NK SkillEdge training?",
    "answer": "Students, beginners, and professionals who want to build practical tech skills in areas like full-stack development, Android development, UI/UX design, and data science can enroll."
  },
  {
    "question": "Does NK SkillEdge provide development services for businesses?",
    "answer": "Yes. We build custom websites, applications, and digital platforms for startups and businesses, tailored to their specific requirements."
  },
  {
    "question": "What technologies do you work with?",
    "answer": "Our team works with modern technologies including React, Node.js, Android, UI/UX tools, and other industry-standard development frameworks."
  },
  {
    "question": "How can businesses start a project with NK SkillEdge?",
    "answer": "Businesses can contact us through the website to discuss their requirements, and our team will guide them through the planning, development, and deployment process."
  },
  {
    "question": "Do students get exposure to real-world development?",
    "answer": "Yes. Students often work on real project scenarios and industry-style assignments to understand how professional development environments work."
  },
  {
    "question": "How can I get in touch with NK SkillEdge?",
    "answer": "You can reach us through the contact form on our website or connect with our team directly for course inquiries or development projects."
  }
];

export const TRAINING_STATS = [
  {
    number: "200+",
    label: "Students Trained",
    description: "Students empowered with practical tech skills through hands-on learning."
  },
  {
    number: "50+",
    label: "Successful Placements",
    description: "Students placed in companies after completing industry-ready training."
  },
  // {
  //   number: "30+",
  //   label: "Happy Clients",
  //   description: "Businesses and startups trust us for reliable digital solutions."
  // },
  // {
  //   number: "50+",
  //   label: "Projects Delivered",
  //   description: "Websites, applications, and digital products built for real-world needs."
  // },
  // {
  //   number: "10+",
  //   label: "Upcoming Projects",
  //   description: "New innovative digital solutions currently under development."
  // },
  {
    number: "100%",
    label: "Youth Led",
    description: "Driven by a passionate team of young innovators and developers."
  }
];

export const TRUSTED_COMPANIES = [
  { name: "DataStack Technologies", logo: "/companies/DataStack.png" },
  { name: "CodeNest Solutions", logo: "/companies/CodeNest.png" },
  { name: "CloudBridge Systems", logo: "/companies/CloudBridge.png" },
  { name: "NextByte Technologies", logo: "/companies/NextByte.png" },
];


export const DASHBOARD_TRAINING = [
  { id: 1, title: 'Advanced React Patterns & Architecture', progress: 65, totalLessons: 42, completedLessons: 27 },
  { id: 2, title: 'Fullstack Next.js and Prisma', progress: 30, totalLessons: 55, completedLessons: 16 },
  { id: 3, title: 'UI/UX Design Fundamentals', progress: 100, totalLessons: 20, completedLessons: 20 },
];

export const ENROLLED_TRAINING = [
  {
    id: 'course-1',
    title: 'Advanced React Patterns & Architecture',
    instructor: 'Sarah Jenkins',
    progress: 35,
    totalLessons: 42,
    completedLessons: 15,
    lastAccessed: '2 hours ago',
    image: 'https://placehold.co/600x400/e2e8f0/4f46e5?text=React+Pro'
  },
  {
    id: 'course-2',
    title: 'Fullstack Next.js Masterclass',
    instructor: 'Michael Chen',
    progress: 8,
    totalLessons: 55,
    completedLessons: 4,
    lastAccessed: '3 days ago',
    image: 'https://placehold.co/600x400/e2e8f0/f97316?text=Next.js+Pro'
  },
  {
    id: 'course-4',
    title: 'Go Microservices Boot-camp',
    instructor: 'David Kim',
    progress: 100,
    totalLessons: 38,
    completedLessons: 38,
    lastAccessed: '1 week ago',
    image: 'https://placehold.co/600x400/e2e8f0/10b981?text=Go+Bootcamp'
  }
];

export const ADMIN_STUDENTS = [
  { id: 1, name: 'Alex Johnson', email: 'alex@example.com', enrolled: 4, status: 'Active', joined: '2023-10-12' },
  { id: 2, name: 'Sarah Miller', email: 'sarah@example.com', enrolled: 2, status: 'Active', joined: '2023-11-05' },
  { id: 3, name: 'Michael Chen', email: 'michael@example.com', enrolled: 5, status: 'Inactive', joined: '2023-08-22' },
  { id: 4, name: 'Emily Davis', email: 'emily@example.com', enrolled: 1, status: 'Active', joined: '2024-01-15' },
  { id: 5, name: 'James Wilson', email: 'james@example.com', enrolled: 3, status: 'Active', joined: '2023-09-30' },
];

export const ADMIN_TRAINING = [
  { id: 1, title: 'Advanced React Patterns & Architecture', status: 'Published', students: 342, lessons: 42, price: 99 },
  { id: 2, title: 'Fullstack Next.js Masterclass', status: 'Published', students: 289, lessons: 55, price: 149 },
  { id: 3, title: 'UI/UX Design for Developers', status: 'Draft', students: 0, lessons: 12, price: 79 },
  { id: 4, title: 'Go Microservices Boot-camp', status: 'Published', students: 156, lessons: 38, price: 199 },
];
