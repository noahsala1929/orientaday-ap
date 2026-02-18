# **App Name**: OrientaDay

## Core Features:

- Secure Student Access & Booking Funnel: Guided flow for students to select their school, authenticate with a PIN, and view available company slots. Students can book one company per time slot, with real-time quota validation and automatic spot release upon cancellation.
- Personalized QR Ticket Generation: Automatically generates a unique, scannable QR code ticket for each student upon successful booking, linked to their Firebase UID for quick and efficient event check-in.
- Teacher Attendance Management Dashboard: A dedicated, secure dashboard for teachers to authenticate with a master PIN, view their registered students, and mark attendance. Marking a student 'Absent' automatically releases their booked spots, making them available for others.
- Company Check-in & Talent Assessment: A tablet-optimized interface for company HR to efficiently check-in students via QR code scan or manual confirmation. This includes functionality to add free-text notes and assign a talent rating (1-5 stars) to each student interaction.
- Role-Based Security & Data Persistence: Robust Firebase Authentication implements secure, persistent session handling for students, teachers, and HR. Firestore Security Rules enforce granular data access control tailored to each user role and data model.

## Style Guidelines:

- Primary brand color: A professional and inspiring medium-saturated blue, signifying innovation and reliability (#2E93F7).
- Background color: A very light, almost white-blue, ensuring a clean and airy feel, enhancing content readability (#ECF3FA).
- Accent color: A deep, rich indigo for strong visual contrast and highlighting important actions or data points (#3D2999).
- Headlines and prominent text will use 'Space Grotesk' (sans-serif) for a modern, tech-forward aesthetic. Body text, descriptions, and data displays will utilize 'Inter' (sans-serif) for its neutrality and excellent legibility across all screen sizes.
- Utilize a consistent set of clean, line-style icons with occasional subtle fills, reflecting a modern and intuitive user experience. Icons should aid navigation and quickly convey meaning without being overly decorative.
- Implement a responsive, modular layout featuring intuitive grid systems for content display (e.g., school selection, company cards). Visual hierarchy will be clear, with particular attention to optimizing the HR/Admin dashboard for tablet use with touch-friendly elements.
- Incorporate subtle, functional animations for state changes (e.g., booking confirmations, attendance updates), form submissions, and navigational transitions to enhance user feedback and overall perceived performance without distraction.