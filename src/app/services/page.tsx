import Link from "next/link";

export const metadata = {
  title: "Our Services - Mem Connects",
  description: "Explore the comprehensive educational services offered by Mem Connects, from university selection and application support to living guidance for students in the UK.",
};

export default function ServicesPage() {
  return (
    <main>
      <section className="page-header-bg py-16 text-white text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-white">Our Services</h1>
          <p className="mt-3 text-lg text-white/90 max-w-2xl mx-auto">Comprehensive Support for Your UK Education Journey</p>
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

      <section id="services" className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800">How We <span className="gradient-text">Help You Succeed</span></h2>
            <p className="mt-4 text-base text-gray-600 max-w-3xl mx-auto">We offer a complete range of services to make your study journey in the UK seamless. Please note, we are an educational consultancy and do not provide visa or immigration advice.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col">
              <div className="w-16 h-16 rounded-xl bg-blue-100 flex items-center justify-center mb-5">
                <i className="fas fa-graduation-cap text-3xl text-blue-500"></i>
              </div>
              <h3 className="font-bold text-xl mb-3">University & Course Selection</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-5 flex-grow">Personalized university recommendations based on your academic profile, preferences, and career goals.</p>
              <ul className="space-y-2 text-sm text-gray-600 mb-6">
                <li className="flex items-center"><i className="fas fa-check-circle text-green-500 mr-2 text-xs"></i> Profile Analysis</li>
                <li className="flex items-center"><i className="fas fa-check-circle text-green-500 mr-2 text-xs"></i> University Matching</li>
                <li className="flex items-center"><i className="fas fa-check-circle text-green-500 mr-2 text-xs"></i> Program Research</li>
              </ul>
              <div className="mt-auto">
                <Link href="/service-university-selection" className="font-semibold text-orange-600 hover:text-orange-800 group inline-flex items-center">Learn More <i className="fas fa-arrow-right ml-1 text-xs transition-transform group-hover:translate-x-1"></i></Link>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col">
              <div className="w-16 h-16 rounded-xl bg-green-100 flex items-center justify-center mb-5">
                <i className="fas fa-file-signature text-3xl text-green-500"></i>
              </div>
              <h3 className="font-bold text-xl mb-3">Application Support</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-5 flex-grow">Complete assistance with applications, essays, and documentation to maximize your chances of getting accepted.</p>
              <ul className="space-y-2 text-sm text-gray-600 mb-6">
                <li className="flex items-center"><i className="fas fa-check-circle text-green-500 mr-2 text-xs"></i> SOP Writing</li>
                <li className="flex items-center"><i className="fas fa-check-circle text-green-500 mr-2 text-xs"></i> Document Review</li>
                <li className="flex items-center"><i className="fas fa-check-circle text-green-500 mr-2 text-xs"></i> Application Tracking</li>
              </ul>
              <div className="mt-auto">
                <Link href="/service-application-support" className="font-semibold text-orange-600 hover:text-orange-800 group inline-flex items-center">Learn More <i className="fas fa-arrow-right ml-1 text-xs transition-transform group-hover:translate-x-1"></i></Link>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col">
              <div className="w-16 h-16 rounded-xl bg-purple-100 flex items-center justify-center mb-5">
                <i className="fas fa-building text-3xl text-purple-500"></i>
              </div>
              <h3 className="font-bold text-xl mb-3">Study & Living Guidance</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-5 flex-grow">Support with accommodation, finances, and adapting to life in the UK for a smooth transition.</p>
              <ul className="space-y-2 text-sm text-gray-600 mb-6">
                <li className="flex items-center"><i className="fas fa-check-circle text-green-500 mr-2 text-xs"></i> Accommodation Help</li>
                <li className="flex items-center"><i className="fas fa-check-circle text-green-500 mr-2 text-xs"></i> Bank Account Setup</li>
                <li className="flex items-center"><i className="fas fa-check-circle text-green-500 mr-2 text-xs"></i> Part-time Job Advice</li>
              </ul>
              <div className="mt-auto">
                <Link href="/service-living-guidance" className="font-semibold text-orange-600 hover:text-orange-800 group inline-flex items-center">Learn More <i className="fas fa-arrow-right ml-1 text-xs transition-transform group-hover:translate-x-1"></i></Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
