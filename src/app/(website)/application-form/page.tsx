import ApplicationForm from "@/components/ApplicationForm";
import Link from "next/link";

export const metadata = {
  title: "Application Form - Mem Connects",
  description: "Apply for universities in the UK with Mem Connects. Fill out our comprehensive application form to start your journey.",
};

export default function ApplicationFormPage() {
  return (
    <main className="bg-gray-50 min-h-screen">
      <section className="page-header-bg py-16 text-white text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-white">Application Form</h1>
          <p className="mt-3 text-lg text-white/90 max-w-2xl mx-auto">Start your study abroad journey by submitting your details below.</p>
          <nav className="flex justify-center mt-6" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2">
              <li className="inline-flex items-center">
                <Link href="/" className="inline-flex items-center text-sm font-medium text-white/80 hover:text-white">
                  <i className="fas fa-home mr-2.5"></i> Home
                </Link>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <i className="fas fa-chevron-right text-white/50 mx-2 text-xs"></i>
                  <span className="ml-1 text-sm font-medium text-white md:ml-2">Apply</span>
                </div>
              </li>
            </ol>
          </nav>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
          <ApplicationForm />
        </div>
      </section>
    </main>
  );
}
