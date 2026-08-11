# Mem Connects - Education Consultancy Platform

A modern, fully-featured education consultancy platform built with Next.js, replacing the legacy PHP application. The platform provides a beautiful frontend for students and a comprehensive admin dashboard for managing applications, content, and communications.

## 🚀 Tech Stack

- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS
- **Database**: SQLite (managed via Prisma ORM)
- **Icons**: React Icons & FontAwesome
- **Components**: SweetAlert2 (for modals & alerts), TinyMCE (for rich text editing)

## ✨ Features

### Frontend (Student Portal)
- **Responsive Modern UI**: Beautiful, mobile-friendly design with smooth animations.
- **Dynamic Services**: Detailed pages for Application Support, Living Guidance, University Selection, and PhD Applications.
- **Application System**: Multi-step, comprehensive application form for students to submit their details and documents safely.
- **Blog & News**: Dynamic blog section with rich text content and thumbnail images.
- **Testimonials**: Interactive slider showcasing student success stories.
- **Contact System**: Secure contact form with Math Captcha protection to prevent spam.

### Admin Dashboard (`/secure_portal_99`)
- **Secure Authentication**: Protected admin portal requiring credentials to access.
- **Applications Management**: Review student applications, download uploaded documents, and update application statuses (Pending, Approved, Rejected).
- **Testimonials Management**: Add, edit, and delete student testimonials using a rich text editor. Testimonials sync directly with the frontend slider.
- **Blog Management**: Full CMS for writing, editing, and publishing blog posts with image upload support.
- **Messages**: Dedicated inbox to view and manage contact form submissions.
- **Settings**: Manage global site settings and configurations.

## 🛠 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm, yarn, or pnpm

### Installation

1. Clone the repository and navigate to the project directory:
   ```bash
   cd memconnects/next-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Setup the database (Prisma):
   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## 📁 Project Structure

- `/src/app/(website)`: Contains all public-facing pages (Home, About, Services, Blogs, etc.)
- `/src/app/secure_portal_99`: Contains the Admin Dashboard and all its management routes.
- `/src/components`: Reusable UI components (Header, Footer, Buttons, Modals, etc.)
- `/src/app/actions`: Server actions handling database operations and form submissions.
- `/public/uploads`: Directory where user-uploaded files (images, PDFs) are securely stored.

## 🔒 Security
- All sensitive admin actions are protected by Next.js Server Actions and session verification.
- Forms are protected using custom Math Captchas to prevent bot submissions.
- Secure HTML sanitization and entity parsing for rich text content.
