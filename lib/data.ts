export const personalInfo = {
  name: "Sahil Nenwani",
  title: "Full Stack Developer",
  tagline: "Backend Specialist | Distributed Systems | Cloud Architecture",
  email: "sahilnenwani03@gmail.com",
  phone: "+923042266591",
  location: "Karachi, Pakistan",
  github: "https://github.com/Sahilnenwani",
  linkedin: "https://www.linkedin.com/in/sahilnenwani/",
  twitter: "https://x.com/NenwaniSah7402",
  medium: "https://medium.com/@SahilNenwani",
  bio: `I'm a Full Stack Developer with over 4 years of experience, specializing in backend systems and distributed architectures. I build and maintain scalable systems using Node.js with NestJS and Express.js, and I have professional experience with Go (Gin framework) for creating fast, performant services.

I enjoy solving complex problems, optimizing performance, and making systems run smoothly under load. From REST & GraphQL APIs to ETL pipelines, Kafka event streaming, and Kubernetes deployments—I love working across the entire stack.`,
};

export const stats = [
  { label: "Years Experience", value: "4+", icon: "clock" },
  { label: "GitHub Repos", value: "50+", icon: "folder" },
  { label: "Companies", value: "3", icon: "building" },
  { label: "Technologies", value: "25+", icon: "code" },
];

export const skills = {
  languages: {
    title: "Languages",
    items: ["JavaScript", "TypeScript", "Go", "Python", "HTML5", "CSS3"],
  },
  frameworks: {
    title: "Frameworks & Libraries",
    items: [
      "Node.js",
      "NestJS",
      "Express.js",
      "React.js",
      "Gin",
      "Typeorm",
      "BullMQ",
    ],
  },
  databases: {
    title: "Databases",
    items: [
      "PostgreSQL",
      "MySQL",
      "MongoDB",
      "Redis",
      "Dgraph",
      "Elasticsearch",
    ],
  },
  cloud: {
    title: "Cloud & DevOps",
    items: [
      "AWS",
      "Docker",
      "Kubernetes",
      "Kafka",
      "Lambda",
      "ECS Fargate",
      "SQS",
    ],
  },
  tools: {
    title: "Tools & Practices",
    items: [
      "Git",
      "REST API",
      "GraphQL",
      "WebSockets",
      "Clean Code",
      "SOLID",
      "OOP",
      "Microservices",
    ],
  },
};

export const experience = [
  {
    id: 1,
    role: "Software Engineer II",
    company: "Rewaa",
    type: "Ecommerce SaaS",
    location: "Pakistan",
    period: "Oct 2024 - Present",
    achievements: [
      {
        title: "Migration of Legacy Service",
        description:
          "Participated in migrating legacy inventory service from AWS Lambda based spaghetti code to a scalable NestJS microservice on AWS ECS Fargate. Re-architected the data layer from per merchant databases to a multi tenant sharded design with tenant based indexing, reducing infrastructure costs.",
      },
      {
        title: "Outbox Pattern Implementation",
        description:
          "Implemented the Outbox pattern to improve reliability and traceability of SQS events, enhancing overall system performance and maintainability.",
      },
      {
        title: "Revamped Import Flow with Go",
        description:
          "Built a new import system using Go, increasing speed by 60 percentage compared to the previous version. Enhanced logging to provide clear diagnostics, pinpointing the exact step where the import failed.",
      },
      {
        title: "Simplified Error Reporting",
        description:
          "Designed a user friendly Excel error report with embedded formulas to identify template or system level issues. Leveraged Go for automated report generation, improving transparency, and significantly reducing resolution time for end users.",
      },
    ],
  },
  {
    id: 2,
    role: "Software Engineer",
    company: "Brandverse",
    type: "Ecommerce SaaS",
    location: "Pakistan",
    period: "March 2023 - Oct 2024",
    achievements: [
      {
        title: "ETL Data Processing Integration",
        description:
          "Worked on the ETL pipeline to load data into the analytics database, enabling deeper insights for the Merchant Analytics dashboard. Leveraged the open source Metabase for internal analysis of merchant data.",
      },
      {
        title: "Optimized Product Search",
        description:
          "Enhanced search functionality with tags, filters, and price range optimization using Elasticsearch.",
      },
      {
        title: "Product Lots Feature",
        description:
          "Introduced a product lots feature, allowing products to be categorized into different lots with unique pricing, tax rates, and expiry dates. This enhancement contributed to a 20% increase in platform orders.",
      },
      {
        title: "Microservices Development",
        description:
          "Enhanced existing microservices by adding new features and optimizing code. Created a new microservice for collecting customer feedback on orders and conducting detailed analysis.",
      },
      {
        title: "Scalability and Reliability",
        description:
          "Collaborated on implementing Kafka for resilient queuing, significantly enhancing the system's scalability and reliability.",
      },
    ],
  },
  {
    id: 3,
    role: "Software Engineer",
    company: "Koderlabs",
    type: "Service Based",
    location: "Pakistan",
    period: "July 2022 - March 2023",
    achievements: [
      {
        title: "Full Stack Development",
        description:
          "Worked on a range of projects, both existing and new, using Node.js, Nest.js, and React.js to build secure and scalable applications.",
      },
      {
        title: "Database Management",
        description:
          "Utilized MongoDB and MySQL databases for efficient data storage and management.",
      },
      {
        title: "Cloud Deployment",
        description:
          "Deployed applications on EC2 instances and used PM2 for process management to ensure stability and reliability.",
      },
    ],
  },
  {
    id: 4,
    role: "Associate Software Engineer",
    company: "Koderlabs",
    type: "Service Based",
    location: "Pakistan",
    period: "April 2022 - July 2022",
    achievements: [
      {
        title: "Tech Stack Experience",
        description:
          "Worked on distinct projects using NodeJS, React JS, Redux, Material UI, TypeScript, JavaScript, Express JS, MongoDB and Nest.",
      },
    ],
  },
];

export const education = [
  {
    degree: "BS in Computer Science",
    institution: "Karachi Institute of Economics and Technology University",
    period: "August 2022",
    location: "Karachi",
    cgpa: "3.13 / 4.0",
  },
  {
    degree: "Intermediate",
    institution: "Allama Iqbal Govt(Boys) Degree College",
    period: "2016 - 2018",
    location: "Karachi",
  },
];

export const certifications = [
  {
    name: "AWS Cloud Practitioner Essentials",
    date: "Dec 2023",
    validity: "Valid Indefinitely",
  },
  {
    name: "Certificate of Participation in Codegoda 2023",
    date: "April 2023",
    validity: "Valid Indefinitely",
  },
];

export const projects = [
  {
    id: 1,
    name: "Face Mask Detection",
    description:
      "A computer vision project that detects whether a person is wearing a face mask using deep learning and image processing techniques.",
    tech: ["Python", "OpenCV", "TensorFlow", "Deep Learning"],
    github: "https://github.com/Sahilnenwani/Face_Mask_detection",
    stars: 1,
    featured: true,
  },
  {
    id: 2,
    name: "Travel Companion App",
    description:
      "A React.js travel companion application integrated with Google Maps API for discovering restaurants, hotels, and attractions around any location.",
    tech: ["React.js", "Google Maps API", "JavaScript", "Material UI"],
    github:
      "https://github.com/Sahilnenwani/Travel-Companion-app-in-ReatJS-using-google-maps-API",
    featured: true,
  },
  {
    id: 3,
    name: "Library Management System",
    description:
      "A comprehensive library management system built using design patterns for efficient book tracking, member management, and lending operations.",
    tech: ["Design Patterns", "OOP", "Java"],
    github: "https://github.com/Sahilnenwani/library-management-system",
    stars: 1,
    featured: true,
  },
  {
    id: 4,
    name: "Firebase Authentication",
    description:
      "A login authentication system implemented using Firebase for secure user authentication and session management.",
    tech: ["HTML", "JavaScript", "Firebase", "Authentication"],
    github: "https://github.com/Sahilnenwani/login-authentication-firebase",
    featured: true,
  },
];

export const blogPosts = [
  {
    slug: "medium-articles",
    title: "Read My Articles on Medium",
    excerpt:
      "Explore my technical articles on backend development, distributed systems, microservices architecture, and cloud solutions.",
    date: new Date().toISOString().split("T")[0],
    readTime: "Various",
    tags: ["Medium", "Articles", "Technical Writing"],
    type: "medium",
    url: "https://medium.com/@SahilNenwani",
  },
  {
    slug: "twitter-highlights",
    title: "Follow My Tech Insights on Twitter",
    excerpt:
      "Get quick tips, learnings, and thoughts on backend engineering, system design, and the latest in distributed systems.",
    date: new Date().toISOString().split("T")[0],
    readTime: "Quick reads",
    tags: ["Twitter", "Tech Tips", "Insights"],
    type: "twitter",
    url: "https://x.com/NenwaniSah7402",
  },
];

export const navLinks = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Blog", href: "#blog" },
  { name: "Contact", href: "#contact" },
];

export const interests = [
  "Gaming",
  "History",
  "Sports",
  "Yoga",
  "Artificial Intelligence",
];
