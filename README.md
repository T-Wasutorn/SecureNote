# SecureNote - Private Notebook App

## How to Install and Run Locally

### 1. Clone the repository
```bash
git clone <URL-ของ-Repo-คุณ>
cd secure-note
```

### 2. Install Dependencies
npm install

### 3. Environment Variables
Create a .env.local file in the root directory and add the following:

POCKETHOST_URL=your_pockethost_url
POCKETHOST_API_URL=your_pockethost_api
NEXTAUTH_SECRET=your_random_secret_string
NEXTAUTH_URL=http://localhost:xxxx

### 4. Run the Application
pnpm next dev

Open http://localhost:xxxx with your browser to see the result.