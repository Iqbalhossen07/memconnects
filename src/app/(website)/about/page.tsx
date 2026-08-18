import Link from "next/link";

export const metadata = {
  title: "About Us - Mem Connects",
  description: "Learn more about Mem Connects, our mission, vision, and our commitment to helping students achieve their dreams of studying in the UK.",
};

export default function AboutPage() {
  return (
    <main>
      <section className="page-header-bg py-16 text-white">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-white">About Mem Connects</h1>
          <p className="mt-2 text-white/90 text-lg">
            <Link href="/" className="hover:underline">Home</Link> / <span className="font-semibold">About Us</span>
          </p>
        </div>
      </section>

      <section id="about" className="bg-white py-20 lg:py-28">
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="relative w-full h-[500px] rounded-l-[120px] rounded-r-[40px] overflow-hidden shadow-2xl">
              <img src="https://images.pexels.com/photos/3184328/pexels-photo-3184328.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Group of happy students"
                className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-8 -left-8 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-4">
              <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center text-3xl">
                <i className="fas fa-shield-alt"></i>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">5+</p>
                <p className="text-sm text-gray-500">Years of experience</p>
              </div>
            </div>
            <div className="absolute top-10 -right-8 bg-white p-3 rounded-2xl shadow-xl flex items-center gap-3">
              <div className="flex -space-x-3">
                <img className="w-9 h-9 rounded-full border-2 border-white object-cover" src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="Student 1" />
                <img className="w-9 h-9 rounded-full border-2 border-white object-cover" src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="Student 2" />
                <img className="w-9 h-9 rounded-full border-2 border-white object-cover" src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="Student 3" />
              </div>
              <div>
                <p className="font-bold text-gray-800">1000+</p>
                <p className="text-xs text-gray-500">Students</p>
              </div>
            </div>
          </div>

          <div className="pr-0 lg:pr-10">
            <span className="font-semibold text-[#6D5795] tracking-wider">ABOUT MEM CONNECTS</span>
            <h2 className="mt-3 text-3xl lg:text-4xl font-extrabold text-gray-800 leading-tight">
              Empowering Students To
              <span className="relative inline-block mx-2">
                Succeed
                <svg className="absolute -bottom-2 left-0 w-full h-auto" viewBox="0 0 158 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.18958 15.7725C26.1073 9.03099 55.832 -2.18434 85.8773 4.2233C115.923 10.631 140.239 12.112 156.746 11.4889" stroke="#F2852C" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </span>
              In The UK From Start To Settlement
            </h2>
            <p className="mt-5 text-gray-600 leading-relaxed">
              At Mem Connects, we support students from the very beginning of their UK education journey.
            </p>

            <ul className="mt-6 space-y-3 text-gray-700">
              <li className="flex items-start"><i className="fas fa-check-circle text-green-500 mt-1 mr-3"></i><span>University selection tailored to your goals</span></li>
              <li className="flex items-start"><i className="fas fa-check-circle text-green-500 mt-1 mr-3"></i><span>Full support with SOP writing and all required documents</span></li>
              <li className="flex items-start"><i className="fas fa-check-circle text-green-500 mt-1 mr-3"></i><span>Pre-departure travel guidance and preparation</span></li>
              <li className="flex items-start"><i className="fas fa-check-circle text-green-500 mt-1 mr-3"></i><span>Airport pickup and private taxi arrangement</span></li>
              <li className="flex items-start"><i className="fas fa-check-circle text-green-500 mt-1 mr-3"></i><span>Finding safe and affordable student accommodation</span></li>
              <li className="flex items-start"><i className="fas fa-check-circle text-green-500 mt-1 mr-3"></i><span>Help setting up bank accounts, SIM cards, NHS and GP registration</span></li>
              <li className="flex items-start"><i className="fas fa-check-circle text-green-500 mt-1 mr-3"></i><span>Assistance in finding part-time job opportunities</span></li>
            </ul>

            <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="flex items-center gap-3">
                <a href="tel:+447988138221" className="w-12 h-12 bg-orange-100 text-[#F2852C] rounded-full flex items-center justify-center text-xl hover:bg-orange-200 transition-colors">
                  <i className="fas fa-phone-alt"></i>
                </a>
                <div>
                  <span className="text-sm text-gray-500">Call Us Now</span>
                  <p className="font-bold text-gray-800">+44 7988 138221</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="hero-bg py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center transform hover:-translate-y-2 transition-transform duration-300">
              <i className="fas fa-bullseye text-5xl text-[#F2852C] mb-4"></i>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">To simplify the path to international education by providing transparent, comprehensive, and personalized guidance that empowers students to achieve their academic and career goals abroad.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center transform hover:-translate-y-2 transition-transform duration-300">
              <i className="fas fa-eye text-5xl text-[#6D5795] mb-4"></i>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">To be the world's most trusted and respected educational consultancy, renowned for creating success stories and empowering the next generation of global leaders and innovators.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800">Our Core Aims</h2>
            <p className="mt-3 text-gray-600 max-w-2xl mx-auto">The principles that drive our unwavering commitment to you.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="text-center p-6 rounded-xl border border-gray-100 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 mx-auto rounded-full bg-orange-100 flex items-center justify-center mb-4"><i className="fas fa-shield-alt text-2xl text-orange-500"></i></div>
              <h3 className="font-bold text-lg mb-2">Integrity & Transparency</h3>
              <p className="text-gray-600 text-sm">We operate with complete honesty and provide clear, straightforward advice at every step of your journey.</p>
            </div>
            <div className="text-center p-6 rounded-xl border border-gray-100 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 mx-auto rounded-full bg-purple-100 flex items-center justify-center mb-4"><i className="fas fa-users text-2xl text-purple-500"></i></div>
              <h3 className="font-bold text-lg mb-2">Student-Centric Approach</h3>
              <p className="text-gray-600 text-sm">Your goals are our priority. We dedicate ourselves to understanding and fulfilling your unique aspirations.</p>
            </div>
            <div className="text-center p-6 rounded-xl border border-gray-100 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 mx-auto rounded-full bg-green-100 flex items-center justify-center mb-4"><i className="fas fa-star text-2xl text-green-500"></i></div>
              <h3 className="font-bold text-lg mb-2">Commitment to Excellence</h3>
              <p className="text-gray-600 text-sm">We strive for the highest standards in our counseling, ensuring quality and success for our students.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="bg-[#2D233F] py-20">
        <div className="container mx-auto px-4 text-center flex flex-col items-center">
          <span className="inline-block bg-[#F2852C]/10 text-[#F2852C] text-sm font-semibold px-4 py-1.5 rounded-full mb-4">Don't Wait, Act Now</span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight max-w-3xl">Ready to Take the First Step Towards Your Future?</h2>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl">Our expert counselors are here to guide you. Book a free, no-obligation consultation today and let's map out your journey to success.</p>
          <Link href="/application-form" className="mt-8 bg-[#F2852C] text-white font-bold text-lg px-10 py-4 rounded-full hover:bg-[#D9721B] transition-transform duration-300 transform hover:scale-105 shadow-2xl shadow-[#F2852C]/20">Book a Free Consultation</Link>
        </div>
      </section>
    </main>
  );
}
