export default function Topbar() {
  return (
    <div className="bg-white text-gray-600 hidden md:block border-b border-gray-200">
      <div className="container mx-auto px-6 py-2 flex justify-between items-center text-sm">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <i className="fas fa-envelope text-[#6D5795]"></i>
            <a href="mailto:info@memconnects.co.uk" className="hover:text-[#F2852C] transition-colors">info@memconnects.co.uk</a>
          </div>
          <div className="flex items-center space-x-2">
            <i className="fas fa-phone-alt text-[#6D5795]"></i>
            <a href="tel:+447988138221" className="hover:text-[#F2852C] transition-colors">+44 7988 138221</a>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <a href="https://www.facebook.com/profile.php?id=61577199817826" aria-label="Facebook" className="hover:text-[#F2852C] transition-colors"><i className="fab fa-facebook-f"></i></a>
          <a href="https://twitter.com/" aria-label="Twitter" className="hover:text-[#F2852C] transition-colors"><i className="fab fa-twitter"></i></a>
          <a href="https://linkedin.com/" aria-label="LinkedIn" className="hover:text-[#F2852C] transition-colors"><i className="fab fa-linkedin-in"></i></a>
          <a href="https://instagram.com/" aria-label="Instagram" className="hover:text-[#F2852C] transition-colors"><i className="fab fa-instagram"></i></a>
        </div>
      </div>
    </div>
  );
}
