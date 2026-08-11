import Link from "next/link";

export const metadata = {
  title: "Application Support - Mem Connects",
  description: "Mem Connects offers comprehensive application support, including personal statement writing, document review, and UCAS form assistance to maximize your chances of acceptance.",
};

export default function ApplicationSupportPage() {
  return (
    <main>
      <section className="page-header-bg py-16 text-white text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-white">Application Support</h1>
          <p className="mt-3 text-lg text-white/90 max-w-2xl mx-auto">Crafting a Compelling Application That Stands Out</p>
          <nav className="flex justify-center mt-6" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2">
              <li className="inline-flex items-center">
                <Link href="/" className="inline-flex items-center text-sm font-medium text-white/80 hover:text-white">
                  <i className="fas fa-home mr-2.5"></i> Home
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <i className="fas fa-chevron-right text-white/50 mx-2 text-xs"></i>
                  <span className="text-sm font-medium text-white">Services</span>
                </div>
              </li>
            </ol>
          </nav>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div className="prose max-w-none">
                <img src="https://placehold.co/800x450/4ADE80/FFFFFF?text=Application+Review" alt="Consultant reviewing an application form with a student" className="rounded-xl shadow-lg mb-8" />
                <h2 className="text-3xl font-bold">Maximizing Your Admission Success</h2>
                <p>A well-prepared application is your gateway to your dream university. It's more than just filling out forms; it's about presenting your unique story, skills, and potential in the most compelling way. Our dedicated team at Mem Connects provides end-to-end support to ensure your application is flawless, professional, and submitted on time, significantly increasing your chances of acceptance.</p>
                <p>We understand the nuances of the UK university admissions process and work closely with you to highlight the aspects of your profile that admissions tutors value most. From the initial draft of your personal statement to the final submission click, we've got you covered.</p>

                <h3 className="font-bold mt-10">Our Application Support Workflow</h3>
                <div className="space-y-6 mt-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-bold text-lg mr-4">1</div>
                    <div>
                      <h4 className="font-semibold text-lg">Personal Statement & SOP Guidance</h4>
                      <p className="text-gray-600">We help you brainstorm, structure, and write a powerful Statement of Purpose (SOP) or personal statement that effectively showcases your strengths, motivations, and suitability for the course.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-bold text-lg mr-4">2</div>
                    <div>
                      <h4 className="font-semibold text-lg">Meticulous Document Review</h4>
                      <p className="text-gray-600">Our experts review all your documents, including academic transcripts, Letters of Recommendation (LORs), and your CV, to ensure they are complete, accurate, and meet university standards.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-bold text-lg mr-4">3</div>
                    <div>
                      <h4 className="font-semibold text-lg">UCAS & Direct Application Submission</h4>
                      <p className="text-gray-600">We provide step-by-step guidance through the complexities of the UCAS platform and direct university application portals, ensuring every detail is correct before submission.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <aside className="lg:col-span-1">
              <div className="sticky top-24 space-y-8">
                <div className="bg-white p-6 rounded-2xl shadow-lg border">
                  <h3 className="font-bold text-xl mb-4">Service Highlights</h3>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center"><i className="fas fa-check-circle text-green-500 mr-3"></i> Expert Personal Statement Editing</li>
                    <li className="flex items-center"><i className="fas fa-check-circle text-green-500 mr-3"></i> Unlimited Document Revisions</li>
                    <li className="flex items-center"><i className="fas fa-check-circle text-green-500 mr-3"></i> Deadline Management & Tracking</li>
                    <li className="flex items-center"><i className="fas fa-check-circle text-green-500 mr-3"></i> Direct Communication with Universities</li>
                    <li className="flex items-center"><i className="fas fa-check-circle text-green-500 mr-3"></i> Scholarship Application Support</li>
                  </ul>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-lg border">
                  <h3 className="font-bold text-xl mb-4">Frequently Asked Questions</h3>
                  <div className="space-y-4 text-sm">
                    <div>
                      <h4 className="font-semibold text-gray-800">What is a personal statement?</h4>
                      <p className="text-gray-600 mt-1">It's a crucial part of your application where you explain why you're suitable for the course and university. We help you make it perfect.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Do you fill out the application for me?</h4>
                      <p className="text-gray-600 mt-1">We guide you through every step and review the entire application, but you will be the one to fill it out to ensure all information is accurate.</p>
                    </div>
                  </div>
                </div>
                <div className="cta-gradient-bg text-white p-6 rounded-2xl text-center">
                  <h3 className="font-bold text-xl mb-2">Need Help With Your Application?</h3>
                  <p className="text-sm opacity-90 mb-4">Let us make your application stand out. Get professional help today!</p>
                  <Link href="/contact" className="bg-white text-orange-600 font-bold py-2 px-6 rounded-lg hover:bg-gray-200 transition-colors inline-block">Apply Now</Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
