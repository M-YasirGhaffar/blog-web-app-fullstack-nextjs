# My Next Blog - A Next.js Blog Application

This is a full-featured blog application built with Next.js, Prisma, and Firebase. It includes features like user authentication, post creation, post search, and theme toggling.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- npm
- A Firebase account
- A Google account (for OAuth)
- A GitHub account (for OAuth)

### Installation

1. Clone the repository:

```sh
git clone https://github.com/yourusername/next-blog.git
```

2. Install the dependencies:

```sh
cd next-blog
npm install
```

3. Copy the [``.env.example``](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FC%3A%2FUsers%2FKiteretsu%2FDesktop%2Fnext-blog%2F.env.example%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%5D "c:\Users\Kiteretsu\Desktop\next-blog\.env.example") file to a new file named [``.env``](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FC%3A%2FUsers%2FKiteretsu%2FDesktop%2Fnext-blog%2F.env%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%5D "c:\Users\Kiteretsu\Desktop\next-blog\.env"):

```sh
cp .env.example .env
```

4. Fill in the [``.env``](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FC%3A%2FUsers%2FKiteretsu%2FDesktop%2Fnext-blog%2F.env%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%5D "c:\Users\Kiteretsu\Desktop\next-blog\.env") file with your environment variables:

```env
GOOGLE_ID = <your-google-id>
GOOGLE_SECRET = <your-google-secret>
NEXT_PUBLIC_NEXTAUTH_URL = <your-next-auth-url>
NEXTAUTH_SECRET = <your-next-auth-secret>
DATABASE_URL = <your-database-url>

FIREBASE_API_KEY=<your-firebase-api-key>
FIREBASE_AUTH_DOMAIN=<your-firebase-auth-domain>
FIREBASE_PROJECT_ID=<your-firebase-project-id>
FIREBASE_STORAGE_BUCKET=<your-firebase-storage-bucket>
FIREBASE_MESSAGING_SENDER_ID=<your-firebase-messaging-sender-id>
FIREBASE_APP_ID=<your-firebase-app-id>
FIREBASE_MEASUREMENT_ID=<your-firebase-measurement-id>

GITHUB_ID = <your-github-id>
GITHUB_SECRET = <your-github-secret>
```

5. Run the development server:

```sh
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Features

- User Authentication: Users can log in using Google or GitHub OAuth.
- Post Creation: Authenticated users can create new blog posts.
- Post Search: Users can search for posts by title or content.
- Theme Toggling: Users can switch between light and dark themes.
