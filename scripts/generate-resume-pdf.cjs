const fs = require('fs');
const path = require('path');

function createPdf() {
  const pages = [
    // Page 1
    {
      lines: [
        { text: "ANKITH MAHINDRAKAR", font: "F2", size: 20, x: 50, y: 780 },
        { text: "whoisanki@gmail.com   |   +91 8088906764   |   Hyderabad   |   https://whoisanki.github.io/", font: "F1", size: 9, x: 50, y: 760 },
        { type: "line", x1: 50, y1: 750, x2: 560, y2: 750 },
        
        { text: "SUMMARY", font: "F2", size: 12, x: 50, y: 732 },
        { text: "Solution-driven Full stack Mobile application developer adept at contributing to a highly collaborative work", font: "F1", size: 9.5, x: 50, y: 716 },
        { text: "environment, finding solutions and determining customer satisfaction. Proven experience developing consumer-focused", font: "F1", size: 9.5, x: 50, y: 704 },
        { text: "mobile apps like Mobicure, Derwent and Connect, with 5+ years of experience.", font: "F1", size: 9.5, x: 50, y: 692 },

        { text: "EDUCATION", font: "F2", size: 12, x: 50, y: 668 },
        { text: "Dayananda Sagar College of Engineering", font: "F2", size: 10, x: 50, y: 652 },
        { text: "Bachelor of Engineering (Electrical & Electronics) • 8.5 CGPA", font: "F1", size: 9.5, x: 280, y: 652 },
        { text: "Bengaluru, India", font: "F1", size: 9, x: 50, y: 640 },
        { text: "June 2016 - May 2019", font: "F1", size: 9, x: 460, y: 640 },

        { text: "EXPERIENCE", font: "F2", size: 12, x: 50, y: 616 },
        { text: "Publicis Sapient", font: "F2", size: 11, x: 50, y: 598 },
        { text: "Hyderabad, India", font: "F1", size: 9.5, x: 480, y: 598 },
        { text: "Senior Developer Mobile Solutions", font: "F3", size: 10, x: 50, y: 585 },
        { text: "June 2024 - Present", font: "F1", size: 9.5, x: 470, y: 585 },

        { text: "Dollar Tree / Family Dollar (E-Commerce)", font: "F2", size: 10, x: 50, y: 565 },
        { text: "Senior Mobile Developer - React Native", font: "F3", size: 9.5, x: 50, y: 552 },
        { text: "• Led the end-to-end development of Product Details Page (PDP) and Product Listing Page (PLP) in React Native,", font: "F1", size: 9, x: 60, y: 538 },
        { text: "  improving overall shopping experience and customer engagement.", font: "F1", size: 9, x: 68, y: 526 },
        { text: "• Designed and implemented a responsive and scalable UI architecture ensuring consistent multi-device behavior.", font: "F1", size: 9, x: 60, y: 512 },
        { text: "• Built advanced server-driven product filtering and selection capabilities to enhance product discovery.", font: "F1", size: 9, x: 60, y: 498 },
        { text: "• Optimized rendering and state management to improve responsiveness across large product catalogs.", font: "F1", size: 9, x: 60, y: 484 },
        { text: "• Collaborated closely with product, design, and backend teams to deliver high-quality customer experiences.", font: "F1", size: 9, x: 60, y: 470 },
        { text: "• Improved component reusability and maintainability by introducing modular UI patterns.", font: "F1", size: 9, x: 60, y: 456 },
        { text: "• Enhanced application performance contributing to a 12% increase in sales following the new UI rollout.", font: "F1", size: 9, x: 60, y: 442 },
        { text: "• Participated in release planning, code reviews, testing strategy, and production support for stable delivery.", font: "F1", size: 9, x: 60, y: 428 },

        { text: "Abu Dhabi Commercial Bank (FSI)", font: "F2", size: 10, x: 50, y: 404 },
        { text: "Senior Mobile Developer - React Native / Tamagui", font: "F3", size: 9.5, x: 50, y: 391 },
        { text: "• Developed and delivered multiple payment journeys: Domestic Transfer, WPS, and VAT/Pension Transfer modules.", font: "F1", size: 9, x: 60, y: 377 },
        { text: "• Architected and implemented a shared UI and business logic layer for Web & Mobile using React Native + Tamagui.", font: "F1", size: 9, x: 60, y: 363 },
        { text: "• Built scalable, reusable payment components supporting multiple transfer types and configurable workflows.", font: "F1", size: 9, x: 60, y: 349 },
        { text: "• Implemented Approval Workflow functionality enabling multi-stage transaction authorization.", font: "F1", size: 9, x: 60, y: 335 },
        { text: "• Developed Standing Instructions / Recurring Payments capability allowing users to automate scheduled transfers.", font: "F1", size: 9, x: 60, y: 321 },
        { text: "• Optimized transaction flows and improved usability through performance enhancements and streamlined forms.", font: "F1", size: 9, x: 60, y: 307 },
        { text: "• Contributed to business growth, helping achieve a 22% increase in Domestic Transfer adoption and usage.", font: "F1", size: 9, x: 60, y: 293 },
      ]
    },
    // Page 2
    {
      lines: [
        { text: "ANKITH MAHINDRAKAR - CURRICULUM VITAE (PAGE 2)", font: "F2", size: 11, x: 50, y: 780 },
        { type: "line", x1: 50, y1: 770, x2: 560, y2: 770 },

        { text: "Mashreq Bank (FSI) (Current Project)", font: "F2", size: 10.5, x: 50, y: 748 },
        { text: "Senior Mobile Developer - React Native", font: "F3", size: 9.5, x: 50, y: 735 },
        { text: "• Leading development of Internal Fund Transfer journeys with focus on secure, high-performance transactions.", font: "F1", size: 9, x: 60, y: 720 },
        { text: "• Building and enhancing a Beneficiary Management System (creation, validation, management & integration).", font: "F1", size: 9, x: 60, y: 706 },
        { text: "• Developing Liquidity Management capabilities for Sweeps and Pools, enabling efficient fund movements.", font: "F1", size: 9, x: 60, y: 692 },
        { text: "• Designing reusable, scalable mobile components and shared business logic across financial modules.", font: "F1", size: 9, x: 60, y: 678 },
        { text: "• Collaborating with backend and architecture teams to integrate secure APIs and improve reliability.", font: "F1", size: 9, x: 60, y: 664 },
        { text: "• Driving performance optimization, state management improvements, and responsive UI for enterprise banking.", font: "F1", size: 9, x: 60, y: 650 },
        { text: "• Participating in technical design discussions, code reviews, and engineering best practices.", font: "F1", size: 9, x: 60, y: 636 },

        { text: "Accellor", font: "F2", size: 11, x: 50, y: 606 },
        { text: "Hyderabad, India", font: "F1", size: 9.5, x: 480, y: 606 },
        { text: "Software Engineer 2", font: "F3", size: 10, x: 50, y: 593 },
        { text: "April 2021 - June 2024", font: "F1", size: 9.5, x: 460, y: 593 },

        { text: "Mobicure - Patient and Doctor Consultant Application", font: "F2", size: 10, x: 50, y: 573 },
        { text: "• Collaborated with designers to deliver 15+ responsive mobile screens, reducing turnaround by 20%.", font: "F1", size: 9, x: 60, y: 558 },
        { text: "• Integrated Azure Calling Services to enable secure doctor-patient video consultations (1,000+ monthly calls).", font: "F1", size: 9, x: 60, y: 544 },
        { text: "• Built a responsive home screen optimized across Android/iOS, reducing rendering time by ~25%.", font: "F1", size: 9, x: 60, y: 530 },
        { text: "• Integrated real-time chat functionality using Gifted Chat for seamless doctor-patient communication.", font: "F1", size: 9, x: 60, y: 516 },
        { text: "• Developed an in-app prescription PDF viewer, eliminating external dependencies for 100% of records.", font: "F1", size: 9, x: 60, y: 502 },
        { text: "• Developed and maintained 20+ REST and GraphQL endpoints using NestJS, TypeORM and PostgreSQL.", font: "F1", size: 9, x: 60, y: 488 },
        { text: "• Designed GraphQL APIs using NestJS, reducing data over-fetching and improving API efficiency by ~30%.", font: "F1", size: 9, x: 60, y: 474 },
        { text: "• Designed microservices architecture that reduced inter-module dependency and improved response time by 35%.", font: "F1", size: 9, x: 60, y: 460 },

        { text: "Derwent London - Meeting Room Booking Application", font: "F2", size: 10, x: 50, y: 436 },
        { text: "• Developed guest booking workflows for meeting rooms across multiple corporate office locations.", font: "F1", size: 9, x: 60, y: 421 },
        { text: "• Implemented high-performance Reanimated-based UI interactions, maintaining consistent 60 FPS animations.", font: "F1", size: 9, x: 60, y: 407 },
        { text: "• Built Events module enabling employees to discover workplace activities and register seamlessly.", font: "F1", size: 9, x: 60, y: 393 },
        { text: "• Developed 25+ reusable UI components, reducing duplicate code by ~35% and accelerating feature delivery.", font: "F1", size: 9, x: 60, y: 379 },
        { text: "• Upgraded React Native and supporting libraries across multiple releases with zero production regressions.", font: "F1", size: 9, x: 60, y: 365 },
        { text: "• Developed interactive office space views allowing employees to browse building facilities & workspaces.", font: "F1", size: 9, x: 60, y: 351 },
        { text: "• Implemented dynamic deep linking, reducing navigation steps by 50% and boosting user onboarding.", font: "F1", size: 9, x: 60, y: 337 },
      ]
    },
    // Page 3
    {
      lines: [
        { text: "ANKITH MAHINDRAKAR - TECHNICAL SKILLS & CERTIFICATIONS", font: "F2", size: 11, x: 50, y: 780 },
        { type: "line", x1: 50, y1: 770, x2: 560, y2: 770 },

        { text: "TECHNICAL SKILLS MATRIX", font: "F2", size: 12, x: 50, y: 745 },
        { text: "Mobile & Core:", font: "F2", size: 9.5, x: 50, y: 725 },
        { text: "React Native, React.js, JavaScript (ES6+), TypeScript, Expo, iOS, Android, Xcode, Android Studio", font: "F1", size: 9.5, x: 140, y: 725 },

        { text: "State & Architecture:", font: "F2", size: 9.5, x: 50, y: 705 },
        { text: "Redux, Redux Toolkit, React Query, Context API, Mobile Architecture, Performance Optimization", font: "F1", size: 9.5, x: 160, y: 705 },

        { text: "Backend & APIs:", font: "F2", size: 9.5, x: 50, y: 685 },
        { text: "NestJS, GraphQL, REST API, TypeORM, PostgreSQL, Firebase, Microservices Architecture", font: "F1", size: 9.5, x: 140, y: 685 },

        { text: "UI & Animations:", font: "F2", size: 9.5, x: 50, y: 665 },
        { text: "Tamagui, React Native Reanimated 3, Gesture Handler, Tailwind CSS, Three.js, Accessibility", font: "F1", size: 9.5, x: 140, y: 665 },

        { text: "Testing & DevOps:", font: "F2", size: 9.5, x: 50, y: 645 },
        { text: "Jest, React Native Testing Library, Agile / Scrum, CI/CD, Git, Native Modules Integration", font: "F1", size: 9.5, x: 140, y: 645 },

        { type: "line", x1: 50, y1: 625, x2: 560, y2: 625 },

        { text: "PROFESSIONAL CERTIFICATIONS", font: "F2", size: 12, x: 50, y: 600 },
        { text: "• Microsoft Azure AI-900", font: "F2", size: 10, x: 60, y: 580 },
        { text: "  Issued by Microsoft Corporation", font: "F1", size: 9, x: 70, y: 568 },

        { text: "• Generative AI by Microsoft and LinkedIn", font: "F2", size: 10, x: 60, y: 545 },
        { text: "  Issued by Microsoft & LinkedIn Learning", font: "F1", size: 9, x: 70, y: 533 },

        { text: "• Microsoft Azure DP-200 (Implementing an Azure Data Solution)", font: "F2", size: 10, x: 60, y: 510 },
        { text: "  Issued by Microsoft Corporation", font: "F1", size: 9, x: 70, y: 498 },

        { type: "line", x1: 50, y1: 475, x2: 560, y2: 475 },

        { text: "LANGUAGES", font: "F2", size: 12, x: 50, y: 450 },
        { text: "English (Fluent), Hindi (Fluent), Kannada (Native), Telugu (Conversational), Marathi (Conversational)", font: "F1", size: 10, x: 60, y: 430 },

        { type: "line", x1: 50, y1: 395, x2: 560, y2: 395 },

        { text: "PERSONAL INTERESTS & HIGHLIGHTS", font: "F2", size: 12, x: 50, y: 370 },
        { text: "• Numismatics: Curator of a private international coin archive featuring coins from 26+ countries since age 12.", font: "F1", size: 9.5, x: 60, y: 350 },
        { text: "• 3D WebGL & Creative Tech: Experimentation with Three.js, React Three Fiber, and interactive web experiences.", font: "F1", size: 9.5, x: 60, y: 335 },
        { text: "• Tech Mentorship: Passionate about sharing mobile architecture best practices, tech talks, and clean UI.", font: "F1", size: 9.5, x: 60, y: 320 },
      ]
    }
  ];

  function escapePdfText(str) {
    return str.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
  }

  const pageIds = [6, 7, 8];
  const contentIds = [9, 10, 11];


  let pdfOutput = "%PDF-1.4\n%âãÏÓ\n";
  const offsets = [];

  function recordObject(content) {
    offsets.push(pdfOutput.length);
    pdfOutput += content + "\n";
  }

  // 1 0 obj: Catalog
  recordObject(`1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj`);

  // 2 0 obj: Pages
  recordObject(`2 0 obj\n<< /Type /Pages /Kids [6 0 R 7 0 R 8 0 R] /Count 3 >>\nendobj`);

  // Fonts
  recordObject(`3 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj`);
  recordObject(`4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>\nendobj`);
  recordObject(`5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Oblique >>\nendobj`);

  // Page Objs (6, 7, 8)
  for (let i = 0; i < pages.length; i++) {
    const pageId = pageIds[i];
    const contentId = contentIds[i];
    recordObject(`${pageId} 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 842] /Resources << /Font << /F1 3 0 R /F2 4 0 R /F3 5 0 R >> >> /Contents ${contentId} 0 R >>\nendobj`);
  }

  // Content Stream Objs (9, 10, 11)
  for (let i = 0; i < pages.length; i++) {
    const contentId = contentIds[i];
    const pageData = pages[i];

    let stream = "BT\n";
    for (const item of pageData.lines) {
      if (item.type === "line") {
        // Draw horizontal rule
        stream += `ET\n0.7 0.7 0.7 RG\n1 w\n${item.x1} ${item.y1} m ${item.x2} ${item.y2} l S\nBT\n`;
      } else {
        stream += `/${item.font} ${item.size} Tf\n`;
        stream += `1 0 0 1 ${item.x} ${item.y} Tm\n`;
        stream += `(${escapePdfText(item.text)}) Tj\n`;
      }
    }
    stream += "ET\n";

    const streamLength = Buffer.byteLength(stream, 'latin1');
    recordObject(`${contentId} 0 obj\n<< /Length ${streamLength} >>\nstream\n${stream}endstream\nendobj`);
  }

  const startXref = pdfOutput.length;
  pdfOutput += "xref\n";
  pdfOutput += `0 ${offsets.length + 1}\n`;
  pdfOutput += "0000000000 65535 f \n";
  for (const offset of offsets) {
    pdfOutput += String(offset).padStart(10, '0') + " 00000 n \n";
  }

  pdfOutput += "trailer\n";
  pdfOutput += `<< /Size ${offsets.length + 1} /Root 1 0 R >>\n`;
  pdfOutput += "startxref\n";
  pdfOutput += `${startXref}\n`;
  pdfOutput += "%%EOF";

  const publicDir = path.resolve(__dirname, '../public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const filePath = path.join(publicDir, 'Ankith_Mahindrakar_Resume.pdf');
  fs.writeFileSync(filePath, pdfOutput, 'latin1');
  console.log('Successfully generated:', filePath);
}

createPdf();
