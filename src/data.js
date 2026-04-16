export const resumeData = {
  name: "TANAY SARKAR",
  title: "Software Engineer",
  contact: {
    location: "Noida, India",
    phone: "+91-9807384413",
    email: "tanay35sarkar44@gmail.com",
    linkedin: "https://linkedin.com/in/tanaysarkar0408",
    leetcode: "https://leetcode.com/tanaysarkar0408",
    github: "https://github.com/tanaysarkar0408"
  },
  summary: "Software Engineer specializing in **AI-powered backend systems and conversational applications**. Experienced in building **LLM-based products**, multi-agent architectures, and scalable APIs with real-world impact. Strong foundation in Data Structures & Algorithms **(Top 7% LeetCode)** and actively mentor students in Python, problem-solving and DSA.",
  experience: [
    {
      id: "samishti",
      title: "Software Engineer",
      company: "Samishti Infotech",
      location: "Noida, India",
      date: "July 2024 -- Present",
      url: "https://samishti.com",
      urlDisplay: "samishti.com › careers",
      points: [
        "Reduced report generation latency from hours to seconds by designing a **scalable Node.js backend** service exposing analytics data via optimized **REST APIs.**",
        "Built a multilingual **Natural Language-to-SQL** engine using **Gemini LLM**, enabling non-technical users to generate queries and **reducing manual reporting effort by 90%.**",
        "Improved query performance by replacing linear search workflows with hash-based indexing, **achieving constant-time O(1) lookups** on large datasets.",
        "Refactored backend architecture using **Clean Architecture and SOLID principles**, decoupling business logic from data layers and improving maintainability for future system scaling."
      ]
    },
    {
      id: "shoshin",
      title: "Software Engineer Intern",
      company: "Shoshin Tech Pvt Ltd",
      location: "Remote",
      date: "March 2024 -- May 2024",
      url: "https://www.shoshin.tech/",
      urlDisplay: "shoshin.tech › team",
      points: [
        "Refactored legacy mobile application modules using **SOLID principles**, improving code maintainability and reducing technical debt.",
        "Developed modular UI components integrated with **REST APIs**, reducing code duplication and **accelerating feature delivery by 20%.**"
      ]
    }
  ],
  skills: [
    {
      id: "ai-systems",
      category: "AI & Conversational Systems",
      details: "LLM Applications, Multi-Agent Systems, Conversational AI"
    },
    {
      id: "languages",
      category: "Languages",
      details: "Python, JavaScript"
    },
    {
      id: "backend",
      category: "Backend",
      details: "Node.js, REST APIs"
    },
    {
      id: "databases",
      category: "Databases",
      details: "PostgreSQL, MongoDB, Redis"
    },
    {
      id: "systems",
      category: "Systems",
      details: "Caching, API Design, Task Scheduling, System Design"
    }
  ],
  projects: [
    {
      id: "whatsapp-bot",
      title: "Multi-Agent WhatsApp Intelligence Bot",
      company: "Personal Project",
      date: "2026",
      url: "https://github.com/tanaysarkar0408/NewsBot",
      urlDisplay: "github.com › tanaysarkar0408 › NewsBot",
      points: [
        "Built a **multi-agent backend system** to deliver personalized news and career insights via WhatsApp using **scheduled autonomous workflows**.",
        "Built a task scheduling system using **APScheduler** to orchestrate independent agents for data retrieval, summarization, and message delivery.",
        "Enabled multi-user personalization by designing a **PostgreSQL schema** storing user preferences and dynamically generating content pipelines.",
        "Split the system into multiple AI agents (News, Career Mentor, Search) coordinated via a central orchestration layer for extensibility.",
        "Architecture: WhatsApp API → Python Orchestrator → Agent Layer → Tools → PostgreSQL"
      ]
    }
  ],
  education: [
    {
      id: "psit",
      degree: "Bachelor of Technology in Electronics & Communication Engineering",
      school: "PSIT Kanpur",
      location: "Kanpur, India",
      date: "2019 -- 2023",
      url: "https://psit.ac.in",
      urlDisplay: "psit.ac.in › alumni"
    }
  ],
  achievements: [
    "**LeetCode** (**Top 7% globally**) with 300+ problems solved, demonstrating strong proficiency in data structures and algorithms.",
    "Mentored 10+ students in Python and DSA, enabling structured problem-solving and interview preparation.",
    "HackerRank **5-star Problem Solver** in Python."
  ]
};
