SecureNote - Private Note Taking Application

    SecureNote is a modern, full-stack web application designed for secure and efficient personal note management. 
    Built with Next.js 15, the platform prioritizes data privacy and seamless user experience. 
    By integrating NextAuth.js for robust authentication and PocketBase for persistent cloud storage, 
    SecureNote ensures that user data is not only protected through HTTPS 
    but also accessible from any device at any time.

This project is the part of "WEB APPLICATION DEVELOPMENT" subject. Created by Wasutorn Tasee (66010758)



Technical Implementation & Web Fundamentals

    This section analyzes how SecureNote assembles fundamental web coding elements into a fully functional and secure application.

    1. JS Engine & Runtime Environment
        The Engine: All JavaScript code is processed by the V8 Engine (developed by Google), which compiles JS into machine code for high-performance execution.

        The Runtimes: Utilize JavaScript across two distinct environments:

            Client-side (Browser): Handles user interactions, UI state management, and the note-taking interface.

            Server-side (Node.js/Vercel): Manages sensitive logic such as Authentication (NextAuth.js) and secure communication with the PocketHost API, ensuring secrets remain hidden from the client.

        Deployment: The project runs on the Vercel Runtime, which provides automatic scalability and managed HTTPS infrastructure.

    2. DOM (Document Object Model) & Seamless UI
    Instead of manual DOM manipulation (which is slow and error-prone), it leverage the power of the React Virtual DOM:

        Efficiency: When a note is added or removed, React creates a Virtual DOM to perform "Diffing" (comparing the new state with the previous one) and updates only the necessary elements in the Real DOM.

        User Experience: This ensures the application remains highly responsive, providing a "Single Page Application" (SPA) feel without full-page reloads.

    3. HTTP/HTTPS & Security Protocol
    Communication between SecureNote and the PocketHost API follows a strict Request-Response Cycle:

        Request: The browser sends JSON data along with an Authorization Header (Bearer Token) to verify the user's identity.

        Importance of HTTPS: As the app handles private notes and credentials, HTTPS (TLS/SSL Encryption) is mandatory. This prevents "Man-in-the-Middle" attacks, ensuring data remains encrypted during transit and unreadable to hackers.

    4. Environment Variables & Configuration
    Configuration details are strictly separated from the source code using .env.local:

        Secrets Protection: Sensitive data like POCKETHOST_URL and NEXTAUTH_SECRET reside only on the server.

        Security Risk Mitigation: By not exposing these keys to the frontend, we prevent unauthorized users from discovering them via "Inspect Element." This architecture ensures that hackers cannot forge session tokens or gain unauthorized API access.



Tech Stack

    Frontend: Next.js 15 (App Router), React 19, Tailwind CSS, shadcn/ui
    Backend & Auth: NextAuth.js, Node.js
    Database: PocketBase (Hosted via PocketHost)
    Deployment: Vercel (HTTPS Enabled)



Bonus Challenges Accomplished

    I have successfully implemented several features to enhance the security, persistence, and user experience of SecureNote, exceeding the core requirements:

    1. Cloud Deployment & HTTPS (+10 Points)
        Implementation: The application is deployed on Vercel, a leading cloud host provider for Next.js.

        The Process: We integrated our GitHub repository with Vercel, which automates the build and deployment process. Every push to the main branch triggers a new deployment.

        HTTPS: By using Vercel, our production environment is automatically served over HTTPS. This is crucial for encrypting data between the client and server, protecting user credentials and notes from interceptors.

    2. Data Persistence (+10 Points)
        Implementation: We achieved data persistence by using a remote database instead of temporary in-memory storage.

        Result: Even if the server restarts or the browser is closed, all notes remain securely stored and available for the user.

    3. PocketHost API Integration (+15 Points)
        Implementation: We utilized the provided PocketHost API (PocketBase) to manage the full CRUD lifecycle of our notes.

        Usage: List/Search: Performed via GET /api/collections/notes/records with specific filters for the logged-in user.

        Create: Performed via POST /api/collections/notes/records when a user saves a new note.

        Update/Delete: Implemented using PATCH and DELETE requests to their respective ID-based endpoints to allow users to manage their data directly.

    4. Loading State Implementation (+5 Points)
        Implementation: To improve user experience, we implemented Loading States throughout the application.

        Visual Feedback: While waiting for the Fetch request to complete (e.g., when the app is fetching notes or verifying a login), we display a custom Minimalist Spinner and Skeleton UI. This prevents the screen from looking empty or broken and informs the user that the request is in progress.