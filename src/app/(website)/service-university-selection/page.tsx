import Link from "next/link";

export const metadata = {
  title: "University & Course Selection - Mem Connects",
  description: "Mem Connects provides expert guidance on university and course selection for students aspiring to study in the UK. Our personalized process ensures you find the perfect fit.",
};

export default function UniversitySelectionPage() {
  return (
    <main>
      <section className="page-header-bg py-16 text-white text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-white">University & Course Selection</h1>
          <p className="mt-3 text-lg text-white/90 max-w-2xl mx-auto">Navigating Your Path to the Perfect UK University</p>
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
                <img src="/img/university_course_selection.png" alt="University Selection Counselor" className="rounded-xl shadow-lg mb-8 w-full object-cover max-h-[450px]" />
                <h2 className="text-3xl font-bold">Why the Right Choice Matters</h2>
                <p>Choosing the right university and course is the most critical decision in your academic career. It not only defines your next few years but also sets the foundation for your future profession. With thousands of courses available across hundreds of UK universities, making this choice can be overwhelming.</p>
                <p>At Mem Connects, we simplify this process. Our experienced counselors provide personalized, data-driven guidance to help you make an informed decision that aligns perfectly with your academic background, interests, and career aspirations. We ensure that you don't just choose a university, but you choose the right future for yourself.</p>

                <h3 className="font-bold mt-10">Our Step-by-Step Selection Process</h3>
                <div className="space-y-6 mt-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold text-lg mr-4">1</div>
                    <div>
                      <h4 className="font-semibold text-lg">In-Depth Profile Analysis</h4>
                      <p className="text-gray-600">We start with a comprehensive assessment of your academic records, test scores (like IELTS), and extracurricular activities to understand your unique strengths.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold text-lg mr-4">2</div>
                    <div>
                      <h4 className="font-semibold text-lg">Career & Goal Alignment</h4>
                      <p className="text-gray-600">We discuss your long-term career goals to help you choose a course that offers a high return on investment and aligns with your passion and the current job market.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold text-lg mr-4">3</div>
                    <div>
                      <h4 className="font-semibold text-lg">Curated University Shortlisting</h4>
                      <p className="text-gray-600">Based on our analysis, we provide a curated list of top UK universities that are the best fit for you, considering factors like rankings, location, and course content.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <aside className="lg:col-span-1">
              <div className="sticky top-24 space-y-8">
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                  <h3 className="font-bold text-xl mb-4">Service Highlights</h3>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center"><i className="fas fa-check-circle text-green-500 mr-3"></i> Access to 100+ UK Universities</li>
                    <li className="flex items-center"><i className="fas fa-check-circle text-green-500 mr-3"></i> One-on-One Counseling Sessions</li>
                    <li className="flex items-center"><i className="fas fa-check-circle text-green-500 mr-3"></i> Data-Driven Course Matching</li>
                    <li className="flex items-center"><i className="fas fa-check-circle text-green-500 mr-3"></i> Up-to-date Scholarship Information</li>
                  </ul>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                  <h3 className="font-bold text-xl mb-4">Frequently Asked Questions</h3>
                  <div className="space-y-4 text-sm">
                    <div>
                      <h4 className="font-semibold text-gray-800">How do you choose the right university for me?</h4>
                      <p className="text-gray-600 mt-1">We consider your academic profile, budget, career goals, and preferred location to create a personalized list of universities.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Can you help if my grades are not very high?</h4>
                      <p className="text-gray-600 mt-1">Yes, we specialize in finding pathway programs and universities with flexible entry requirements that match your profile.</p>
                    </div>
                  </div>
                </div>
                <div className="cta-gradient-bg text-white p-6 rounded-2xl text-center">
                  <h3 className="font-bold text-xl mb-2 text-white">Ready to Find Your Perfect University?</h3>
                  <p className="text-sm text-white/90 mb-4">Let our experts guide you. Book a free consultation today!</p>
                  <Link href="/contact" className="bg-white text-orange-600 font-bold py-2 px-6 rounded-lg hover:bg-gray-200 transition-colors inline-block">Book Now</Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
