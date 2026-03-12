import { MonitorPlay, Smartphone, BrainCircuit, Code } from 'lucide-react'

export const FEATURED_COURSES = [
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

export const DASHBOARD_COURSES = [
  { id: 1, title: 'Advanced React Patterns & Architecture', progress: 65, totalLessons: 42, completedLessons: 27 },
  { id: 2, title: 'Fullstack Next.js and Prisma', progress: 30, totalLessons: 55, completedLessons: 16 },
  { id: 3, title: 'UI/UX Design Fundamentals', progress: 100, totalLessons: 20, completedLessons: 20 },
];

export const ENROLLED_COURSES = [
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

export const ADMIN_COURSES = [
  { id: 1, title: 'Advanced React Patterns & Architecture', status: 'Published', students: 342, lessons: 42, price: 99 },
  { id: 2, title: 'Fullstack Next.js Masterclass', status: 'Published', students: 289, lessons: 55, price: 149 },
  { id: 3, title: 'UI/UX Design for Developers', status: 'Draft', students: 0, lessons: 12, price: 79 },
  { id: 4, title: 'Go Microservices Boot-camp', status: 'Published', students: 156, lessons: 38, price: 199 },
];

export const TESTIMONIALS = [
  {
    quote: "The attention to detail and engineering quality is simply unmatched. They didn't just build a product; they built a solution that scaled with our vision.",
    author: "Alex Rivera",
    role: "CEO, TechFlow",
    image: ""
  },
  {
    quote: "Working with NK Skilledge was a game-changer for our team. Their approach to modern architecture is world-class.",
    author: "Sarah Chen",
    role: "CTO, InnovateX",
    image: ""
  },
  {
    quote: "The mentorship provided in their courses is unparalleled. I went from basics to building production apps in weeks.",
    author: "David Miller",
    role: "Fullstack Engineer",
    image: ""
  }
];

export const FAQS = [
  {
    question: "How long does a typical project take?",
    answer: "Our delivery timelines vary based on complexity, but most enterprise solutions are delivered within 8-12 weeks. We follow a strict agile methodology with weekly milestones to ensure total transparency."
  },
  {
    question: "What technologies do you specialize in?",
    answer: "We specialize in modern web and mobile stacks, including React, Next.js, Node.js, Go, and high-performance Android development."
  },
  {
    question: "Do you offer post-project support?",
    answer: "Yes, we provide comprehensive maintenance and support packages to ensure your digital ecosystem remains robust and up-to-date."
  },
  {
    question: "Can I enroll in multiple courses at once?",
    answer: "Absolutely! Our platform allows you to manage multiple learning paths simultaneously with a unified dashboard."
  },
  {
    question: "Do you provide industry certifications?",
    answer: "Yes, all our major programs come with industry-backed certifications that are recognized by our partner companies."
  }
];
