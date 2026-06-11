Internal Ticket System

This Internal Ticket Management System project was built as part of a Frontend Intern Assignment. The system allows users to simulate a login, view ticket lists, create new tickets, view details, update status, and post comments.

Setup Instructions

To run this project on your local machine, please follow these steps:

Clone the repository:

git clone [https://github.com/PhuocPNCE180232/internal-ticket-system.git](https://github.com/PhuocPNCE180232/internal-ticket-system.git)
cd internal-ticket-system


Install the necessary dependencies:

npm install


Start the development server:

npm run dev


Access the application:
Open your browser and navigate to http://localhost:3000.
Note: You can enter any valid email address (e.g., admin@teknix.com) and a password of 6 or more characters to bypass the mocked login screen.

Architecture & Tech Stack

The project is structured in a modular way, clearly separating the user interface (UI) and data fetching logic, adhering strictly to Clean Code requirements.

Framework: Next.js (App Router) with React 18.

Language: TypeScript (Strict mode, completely removing any types).

State Management & Data Fetching: TanStack Query (React Query) v5.

Reason: Optimizes caching, completely eliminates redundant useState/useEffect, and supports seamless automatic UI refresh (invalidateQueries) upon state updates or new comments.

UI Components: shadcn/ui combined with Tailwind CSS.

Reason: Ensures design consistency, provides rapid development, and includes built-in Accessibility (a11y) support.

Forms & Validation: React Hook Form combined with Zod.

Mock API: Uses an Axios instance combined with a module-level array to simulate network delays and handle data flow without a real backend.

Authentication: Implements Next.js Middleware to protect the /tickets routes using mocked HTTP cookies.

Main Directory Structure

/app: Contains UI routes and the security middleware.

/components: Contains reusable UI components (Skeleton, ErrorCard, CommentSection, etc.).

/hooks: Contains custom hooks encapsulating data logic (e.g., useTicket.ts).

/lib: Configures Axios, the Mock API, and Zod validation schemas.

/types: Defines global TypeScript interfaces for the entire project.