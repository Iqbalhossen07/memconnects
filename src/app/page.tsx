import Link from "next/link";
import prisma from "@/lib/prisma";
import Image from "next/image";
import TestimonialSlider from "@/components/TestimonialSlider";

export default async function Home() {
  // Fetch testimonials mapping to introspected schema
  const testimonialsData = await prisma.testimonials.findMany({
    orderBy: { id: "desc" },
    take: 10,
  });

  // Fetch blogs mapping to introspected schema
  const blogsData = await prisma.blogs.findMany({
    orderBy: { created_at: "desc" },
    take: 3,
  });

  return (
    <main>
      {/* ======== HERO SECTION ======== */}
      <section id="home" className="hero-bg overflow-hidden py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8 grid md:grid-cols-2 items-center gap-12">
          {/* Left Column (Text) */}
          <div className="text-center md:text-left animate-fade-in-left">
            <div className="inline-block text-sm font-semibold text-gray-500 tracking-wider mb-2">
              CHANGE YOUR FUTURE
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 leading-tight mb-4">
              Your Journey to <span className="gradient-text">Global Study</span> Starts Here.
            </h1>
            <p className="text-base text-gray-600 mb-8 max-w-xl mx-auto md:mx-0">
              We provide a comprehensive, end-to-end service to make your dream of studying abroad a reality. From course selection to visa approval, we are with you.
            </p>
            <div className="flex justify-center md:justify-start">
              <Link href="/contact" className="bg-[#6D5795] text-white font-semibold px-8 py-3 rounded-lg hover:bg-[#59457A] transition-all duration-300 transform hover:scale-105 shadow-lg shadow-[#6D5795]/30">
                Get Free Counselling
              </Link>
            </div>
          </div>

          {/* Right Column (Video) */}
          <div className="relative animate-fade-in-right">
            <div className="w-full aspect-video bg-black rounded-2xl shadow-2xl overflow-hidden border-4 border-white relative">
              <video className="w-full h-full object-cover" controls autoPlay muted loop playsInline poster="/img/video-poster.jpg">
                <source src="/videos/promo.webm" type="video/webm" />
                <source src="/videos/promo.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block bg-purple-100 text-[#6D5795] text-sm font-semibold px-4 py-1 rounded-full mb-3">
              FEATURES
            </span>
            <h2 className="text-4xl font-bold text-gray-800">
              <span className="feature-gradient-text">End-to-End</span> Support
            </h2>
            <p className="mt-3 text-base text-gray-600 max-w-2xl mx-auto">
              From initial thoughts to your first day at university and beyond, we offer a complete range of services to ensure a smooth journey.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="feature-box bg-[#FFF7F0]">
              <div className="icon-wrapper bg-[#FFEEE0]"><i className="fas fa-lightbulb text-[#FA9943]"></i></div>
              <span className="font-semibold text-gray-700">Career Exploration</span>
            </div>
            <div className="feature-box bg-[#F4F2F8]">
              <div className="icon-wrapper bg-[#E9E4F0]"><i className="fas fa-book-open text-[#8169A9]"></i></div>
              <span className="font-semibold text-gray-700">University Selection</span>
            </div>
            <div className="feature-box bg-[#FEF2F4]">
              <div className="icon-wrapper bg-[#FDE5E9]"><i className="fas fa-file-alt text-[#E86A83]"></i></div>
              <span className="font-semibold text-gray-700">Application Guidance</span>
            </div>
            <div className="feature-box bg-[#FFF9F2]">
              <div className="icon-wrapper bg-[#FFF1E3]"><i className="fas fa-file-invoice text-[#F2A451]"></i></div>
              <span className="font-semibold text-gray-700">SOP & Documents</span>
            </div>
            <div className="feature-box bg-[#F0F5FD]">
              <div className="icon-wrapper bg-[#E2ECFC]"><i className="fas fa-paper-plane text-[#4B88E4]"></i></div>
              <span className="font-semibold text-gray-700">Flight & Travel</span>
            </div>
            <div className="feature-box bg-[#FDEEEF]">
              <div className="icon-wrapper bg-[#FBE0E3]"><i className="fas fa-home text-[#D96375]"></i></div>
              <span className="font-semibold text-gray-700">Accommodation Support</span>
            </div>
            <div className="feature-box bg-[#FAF6EE]">
              <div className="icon-wrapper bg-[#F5ECDA]"><i className="fas fa-users text-[#B89658]"></i></div>
              <span className="font-semibold text-gray-700">Orientation & Integration</span>
            </div>
            <div className="feature-box bg-[#F9F2FD]">
              <div className="icon-wrapper bg-[#F3E6FC]"><i className="fas fa-briefcase text-[#B072D4]"></i></div>
              <span className="font-semibold text-gray-700">Career & Job Support</span>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="bg-white py-20 lg:py-28">
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="relative w-full h-[500px] rounded-l-[120px] rounded-r-[40px] overflow-hidden shadow-2xl">
              <img src="https://images.pexels.com/photos/3184328/pexels-photo-3184328.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Group of happy students" className="w-full h-full object-cover" />
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
              <Link href="/about" className="bg-[#6D5795] text-white font-semibold px-6 py-3 rounded-xl hover:bg-[#59457A] transition-colors flex items-center gap-2">
                About Us <i className="fas fa-arrow-right text-sm"></i>
              </Link>
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

      {/* Why Choose Section */}
      <section id="why-choose-us" className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <span className="font-semibold text-[#F2852C]">Our Commitment</span>
              <h2 className="text-4xl font-bold text-gray-800 mt-2 mb-4">Why Choose Us for Your Journey Abroad?</h2>
              <p className="text-gray-600 leading-relaxed mb-8">
                We go beyond just applications. Our mission is to provide you with unwavering support, expert knowledge, and a personalized roadmap to ensure your academic success in a new country.
              </p>
              <Link href="/contact" className="bg-[#6D5795] text-white font-semibold px-8 py-3 rounded-lg hover:bg-[#59457A] transition-all duration-300 transform hover:scale-105 shadow-lg shadow-[#6D5795]/30">
                Get Free Counselling
              </Link>
            </div>

            <div className="flex flex-col gap-6">
              <div className="bg-white p-6 rounded-2xl border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-start gap-5">
                <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <i className="fas fa-user-tie text-2xl text-orange-500"></i>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Expert Counselors</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    10+ years of experience and deep knowledge of international education systems.
                  </p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-start gap-5">
                <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <i className="fas fa-stamp text-2xl text-purple-500"></i>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">98% Success Rate</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Proven track record with complete visa assistance and high success rates.
                  </p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-start gap-5">
                <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <i className="fas fa-check-circle text-2xl text-green-500"></i>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Trusted Global Network</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Direct partnerships with 50+ universities for the best opportunities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="trusted-stats" className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="trusted-section-bg text-white rounded-2xl p-10 md:p-12">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div className="grid grid-cols-2 gap-4 lg:order-1">
                <div className="bg-white/10 border border-white/20 p-4 rounded-xl text-center transform hover:scale-105 transition-transform duration-300">
                  <p id="stat-success" className="text-3xl font-bold">98%</p>
                  <p className="mt-1 text-sm font-medium">Success Rate</p>
                </div>
                <div className="bg-white/10 border border-white/20 p-4 rounded-xl text-center transform hover:scale-105 transition-transform duration-300">
                  <p id="stat-universities" className="text-3xl font-bold">50+</p>
                  <p className="mt-1 text-sm font-medium">Partner Universities</p>
                </div>
                <div className="bg-white/10 border border-white/20 p-4 rounded-xl text-center transform hover:scale-105 transition-transform duration-300">
                  <p id="stat-countries" className="text-3xl font-bold">5+</p>
                  <p className="mt-1 text-sm font-medium">Countries</p>
                </div>
                <div className="bg-white/10 border border-white/20 p-4 rounded-xl text-center transform hover:scale-105 transition-transform duration-300">
                  <p id="stat-students" className="text-3xl font-bold">1000+</p>
                  <p className="mt-1 text-sm font-medium">Students Helped</p>
                </div>
              </div>
              <div className="lg:order-2">
                <h2 className="text-3xl font-bold mb-3 text-white font-serif">Trusted by Students Worldwide</h2>
                <p className="mb-6 opacity-90 max-w-lg text-sm">Our commitment to excellence and student success has made us the preferred choice for international education consulting.</p>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center">
                    <i className="fas fa-users mr-3 text-yellow-300"></i>
                    <p className="font-medium text-sm">Student Community: <span className="opacity-80">100+ alumni network.</span></p>
                  </div>
                </div>
                <Link href="/about" className="bg-white text-gray-800 font-bold py-2.5 px-5 rounded-lg hover:bg-gray-200 transition-colors duration-300 inline-flex items-center group text-sm">
                  Learn More About Us <i className="fas fa-arrow-right ml-2 text-[#F2852C] transition-transform group-hover:translate-x-1"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 hero-bg">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block bg-purple-100 text-[#6D5795] text-sm font-semibold px-4 py-1 rounded-full mb-3">Our Services</span>
            <h2 className="text-4xl font-bold text-gray-800">Complete <span className="gradient-text">End-to-End</span> Support</h2>
            <p className="mt-3 text-base text-gray-600 max-w-2xl mx-auto">From university selection to post-arrival support, we provide comprehensive services to ensure your study abroad journey is smooth and successful.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col">
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4"><i className="fas fa-graduation-cap text-xl text-blue-500"></i></div>
              <h3 className="font-bold text-lg mb-2">University Selection</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">Personalized university recommendations based on your profile, preferences, and career goals.</p>
              <hr className="my-4 border-gray-100" />
              <ul className="space-y-2 text-sm text-gray-600 flex-grow">
                <li className="flex items-center"><i className="fas fa-check-circle text-green-500 mr-2 text-xs"></i> Profile Analysis</li>
                <li className="flex items-center"><i className="fas fa-check-circle text-green-500 mr-2 text-xs"></i> University Matching</li>
                <li className="flex items-center"><i className="fas fa-check-circle text-green-500 mr-2 text-xs"></i> Program Research</li>
              </ul>
              <div className="mt-5"><Link href="/service-university-selection" className="font-semibold text-[#F2852C] hover:text-[#D9721B] text-sm group inline-flex items-center">Learn More <i className="fas fa-arrow-right ml-1 text-xs transition-transform group-hover:translate-x-1"></i></Link></div>
            </div>
            
            <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col">
              <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center mb-4"><i className="fas fa-file-alt text-xl text-green-500"></i></div>
              <h3 className="font-bold text-lg mb-2">Application Support</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">Complete assistance with applications, essays, and documentation to maximize your chances.</p>
              <hr className="my-4 border-gray-100" />
              <ul className="space-y-2 text-sm text-gray-600 flex-grow">
                <li className="flex items-center"><i className="fas fa-check-circle text-green-500 mr-2 text-xs"></i> SOP Writing</li>
                <li className="flex items-center"><i className="fas fa-check-circle text-green-500 mr-2 text-xs"></i> Document Review</li>
                <li className="flex items-center"><i className="fas fa-check-circle text-green-500 mr-2 text-xs"></i> Application Tracking</li>
              </ul>
              <div className="mt-5"><Link href="/service-application-support" className="font-semibold text-[#F2852C] hover:text-[#D9721B] text-sm group inline-flex items-center">Learn More <i className="fas fa-arrow-right ml-1 text-xs transition-transform group-hover:translate-x-1"></i></Link></div>
            </div>
            
            <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col">
              <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center mb-4"><i className="fas fa-building text-xl text-purple-500"></i></div>
              <h3 className="font-bold text-lg mb-2">Study & Living Guidance</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">Support with accommodation, finances, and adapting to life in the UK.</p>
              <hr className="my-4 border-gray-100" />
              <ul className="space-y-2 text-sm text-gray-600 flex-grow">
                <li className="flex items-center"><i className="fas fa-check-circle text-green-500 mr-2 text-xs"></i> Accommodation Help</li>
                <li className="flex items-center"><i className="fas fa-check-circle text-green-500 mr-2 text-xs"></i> Bank Account Setup</li>
                <li className="flex items-center"><i className="fas fa-check-circle text-green-500 mr-2 text-xs"></i> Part-time Job Advice</li>
              </ul>
              <div className="mt-5"><Link href="/service-living-guidance" className="font-semibold text-[#F2852C] hover:text-[#D9721B] text-sm group inline-flex items-center">Learn More <i className="fas fa-arrow-right ml-1 text-xs transition-transform group-hover:translate-x-1"></i></Link></div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-16 hero-bg">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block bg-purple-100 text-[#6D5795] text-sm font-semibold px-4 py-1 rounded-full mb-3">TESTIMONIALS</span>
            <h2 className="text-4xl font-bold text-gray-800">What Our <span className="gradient-text">Students Say</span></h2>
          </div>
          <TestimonialSlider testimonials={testimonialsData} />
        </div>
      </section>

      {/* Blogs Section */}
      <section id="blog" className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block bg-purple-100 text-[#6D5795] text-sm font-semibold px-4 py-1 rounded-full mb-3">OUR BLOG</span>
            <h2 className="text-4xl font-bold text-gray-800">Latest News <span className="gradient-text">& Articles</span></h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogsData.length > 0 ? (
              blogsData.map((post) => {
                const imagePath = post.image ? `/uploads/${post.image}` : 'https://placehold.co/600x400/f0f0f0/ccc?text=No+Image';
                return (
                  <div key={post.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden group hover:shadow-lg transition-all duration-300">
                    <div className="relative overflow-hidden h-48">
                      <Link href={`/blogs/${post.id}`}>
                        <img src={imagePath} alt={post.name} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                      </Link>
                      <span className="absolute top-3 left-3 bg-[#6D5795] text-white text-xs font-semibold px-2.5 py-1 rounded-full">{post.category || 'Blog'}</span>
                    </div>
                    <div className="p-5">
                      <div className="flex items-center text-xs text-gray-500 mb-2">
                        <span><i className="far fa-calendar-alt mr-1.5"></i>{new Date(post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                      <h3 className="font-bold text-lg mb-2 text-gray-800 group-hover:text-[#F2852C] transition-colors">
                        <Link href={`/blogs/${post.id}`}>{post.name}</Link>
                      </h3>
                      <Link href={`/blogs/${post.id}`} className="font-semibold text-[#F2852C] text-sm hover:text-[#D9721B] group-inner flex items-center">
                        Read More <i className="fas fa-arrow-right ml-1 text-xs transition-transform group-inner-hover:translate-x-1"></i>
                      </Link>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="col-span-full text-center text-gray-500">No recent blog posts found.</p>
            )}
          </div>
        </div>
      </section>

      {/* CTA Contact Section */}
      <section id="contact" className="bg-[#2D233F] py-20">
        <div className="container mx-auto px-4 text-center flex flex-col items-center">
          <span className="inline-block bg-[#F2852C]/10 text-[#F2852C] text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            Don't Wait, Act Now
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight max-w-3xl">
            Ready to Take the First Step Towards Your Future?
          </h2>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl">
            Our expert counselors are here to guide you. Book a free, no-obligation consultation today and let's map out your journey to success.
          </p>
          <Link href="/contact" className="mt-8 bg-[#F2852C] text-white font-bold text-lg px-10 py-4 rounded-full hover:bg-[#D9721B] transition-transform duration-300 transform hover:scale-105 shadow-2xl shadow-[#F2852C]/20">
            Book a Free Consultation
          </Link>
          <div className="mt-8 bg-yellow-400/10 border border-yellow-400/30 text-yellow-300 p-3 rounded-lg text-sm max-w-2xl">
            <p><i className="fas fa-stopwatch mr-2"></i><strong>Limited Time Offer:</strong> Book your consultation this week and receive a complimentary guide on writing a winning personal statement!</p>
          </div>
          <div className="mt-10 text-gray-400 text-sm">
            <span>Have more questions? </span>
            <a href="mailto:info@memconnects.co.uk" className="font-semibold text-white hover:underline">Email Us</a>
            <span className="mx-2">|</span>
            <a href="tel:+447988138221" className="font-semibold text-white hover:underline">Call Us directly</a>
          </div>
        </div>
      </section>
    </main>
  );
}
