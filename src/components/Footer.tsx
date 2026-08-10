import Link from "next/link";

export default function Footer() {
  return (
    <>
      <footer className="bg-[#F8F7FC] text-gray-700 pt-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Column 1: Contact Info */}
            <div className="col-span-1">
              <Link href="/" className="mb-5 inline-block">
                <img src="/img/logo.png" alt="Mem Connects Logo" className="h-14" />
              </Link>
              <p className="text-sm leading-relaxed mb-6 pr-4">
                Mem Connects helps students from all backgrounds start their journey in the UK.
              </p>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <i className="fas fa-map-marker-alt mt-1 text-[#6D5795] flex-shrink-0"></i>
                  <span>Room 12, 4th Floor, Boardman House, 64 Broadway, E15 1NT</span>
                </li>
                <li className="flex items-center gap-3">
                  <i className="fas fa-envelope text-[#6D5795] flex-shrink-0"></i>
                  <a href="mailto:info@memconnects.co.uk" className="hover:text-[#F2852C] break-all">info@memconnects.co.uk</a>
                </li>
                <li className="flex items-center gap-3">
                  <i className="fas fa-phone-alt text-[#6D5795] flex-shrink-0"></i>
                  <a href="tel:+447988138221" className="hover:text-[#F2852C]">+44 7988 138221</a>
                </li>
              </ul>
            </div>

            {/* Column 2: Quick Links */}
            <div className="col-span-1">
              <h4 className="font-bold text-lg mb-5 text-gray-800">Quick Link</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="/about" className="flex items-center gap-2.5 hover:text-[#F2852C] hover:translate-x-1 transition-all"><i className="fas fa-chevron-right text-xs"></i> About Mem Connects</Link></li>
                <li><Link href="/services" className="flex items-center gap-2.5 hover:text-[#F2852C] hover:translate-x-1 transition-all"><i className="fas fa-chevron-right text-xs"></i> Our Services</Link></li>
                <li><Link href="/blogs" className="flex items-center gap-2.5 hover:text-[#F2852C] hover:translate-x-1 transition-all"><i className="fas fa-chevron-right text-xs"></i> Blogs</Link></li>
                <li><Link href="/contact" className="flex items-center gap-2.5 hover:text-[#F2852C] hover:translate-x-1 transition-all"><i className="fas fa-chevron-right text-xs"></i> Contact Us</Link></li>
              </ul>
            </div>

            {/* Column 3: Useful Links */}
            <div className="col-span-1">
              <h4 className="font-bold text-lg mb-5 text-gray-800">Useful Link</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="https://www.gov.uk/student-visa" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 hover:text-[#F2852C] hover:translate-x-1 transition-all"><i className="fas fa-chevron-right text-xs"></i> Gov UK (Student Visa)</a></li>
                <li><a href="https://www.ukcisa.org.uk/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 hover:text-[#F2852C] hover:translate-x-1 transition-all"><i className="fas fa-chevron-right text-xs"></i> UKCISA</a></li>
                <li><a href="https://www.gov.uk/student-finance" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 hover:text-[#F2852C] hover:translate-x-1 transition-all"><i className="fas fa-chevron-right text-xs"></i> Student Finance (SFE)</a></li>
                <li><a href="https://study-uk.britishcouncil.org/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 hover:text-[#F2852C] hover:translate-x-1 transition-all"><i className="fas fa-chevron-right text-xs"></i> British Council</a></li>
                <li><a href="https://uniacco.com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 hover:text-[#F2852C] hover:translate-x-1 transition-all"><i className="fas fa-chevron-right text-xs"></i> UniAcco (Accommodation)</a></li>
              </ul>
            </div>

            {/* Column 4: Newsletter */}
            <div className="col-span-1">
              <h4 className="font-bold text-lg mb-5 text-gray-800">Subscribe to Our Newsletter</h4>
              <p className="text-sm mb-4">Get the latest updates, tips, and news about studying in the UK directly in your inbox.</p>
              <form action="/api/newsletter" method="post" className="flex flex-col gap-3">
                <input type="email" name="email" placeholder="Enter your email" required className="w-full px-4 py-3 text-sm bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#6D5795] focus:border-transparent transition-all" aria-label="Email for newsletter" />
                <button type="submit" name="subscribe_newsletter" className="w-full bg-[#6D5795] text-white font-semibold py-3 rounded-lg hover:bg-[#59457A] transition-colors">
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Copyright & Social Links */}
          <div className="mt-16 py-6 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
            <p className="text-sm text-gray-500 mb-4 sm:mb-0">
              &copy; {new Date().getFullYear()} All Rights Reserved, Mem Connects.
            </p>
            <div className="flex items-center space-x-5">
              <a href="https://www.facebook.com/profile.php?id=61577199817826" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-gray-400 hover:text-[#6D5795] transition-colors"><i className="fab fa-facebook-f"></i></a>
              <a href="https://twitter.com/YOUR_HANDLE" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-gray-400 hover:text-[#6D5795] transition-colors"><i className="fab fa-twitter"></i></a>
              <a href="https://linkedin.com/company/YOUR_COMPANY" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-gray-400 hover:text-[#6D5795] transition-colors"><i className="fab fa-linkedin-in"></i></a>
              <a href="https://instagram.com/YOUR_HANDLE" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-gray-400 hover:text-[#6D5795] transition-colors"><i className="fab fa-instagram"></i></a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col items-center space-y-3">
        <a href="https://wa.me/447988138221" target="_blank" rel="noopener noreferrer" className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-green-600 transition-transform hover:scale-110" aria-label="Chat on WhatsApp">
          <i className="fab fa-whatsapp text-3xl"></i>
        </a>
        <a href="https://www.facebook.com/profile.php?id=61577199817826" target="_blank" rel="noopener noreferrer" className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-blue-700 transition-transform hover:scale-110" aria-label="Find us on Facebook">
          <i className="fab fa-facebook-f text-2xl"></i>
        </a>
      </div>
    </>
  );
}
