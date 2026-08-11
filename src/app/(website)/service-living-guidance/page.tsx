import Link from "next/link";

export const metadata = {
  title: "Living Guidance - Mem Connects",
  description: "Mem Connects helps you transition smoothly to life in the UK. We provide guidance on accommodation, banking, healthcare, and settling into your new environment.",
};

export default function LivingGuidancePage() {
  return (
    <main>
      <section className="page-header-bg py-16 text-white text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-white">Living Guidance</h1>
          <p className="mt-3 text-lg text-white/90 max-w-2xl mx-auto">Ensuring a Smooth Transition to Your New Life in the UK</p>
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
                <img src="https://placehold.co/800x450/3B82F6/FFFFFF?text=UK+Living+Guidance" alt="Student settling in UK" className="rounded-xl shadow-lg mb-8" />
                <h2 className="text-3xl font-bold">Your Home Away from Home</h2>
                <p>Moving to a new country for your studies is an exciting adventure, but it also comes with practical challenges. Finding accommodation, figuring out local transport, setting up a bank account, and understanding the healthcare system can be daunting tasks for international students.</p>
                <p>At Mem Connects, our support extends far beyond securing your admission. We provide comprehensive living guidance to ensure your transition to life in the UK is seamless and stress-free. Our goal is to make sure you feel at home so you can focus entirely on your academic journey and personal growth.</p>

                <h3 className="font-bold mt-10">Our Essential Living Support Services</h3>
                <div className="space-y-6 mt-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-lg mr-4">1</div>
                    <div>
                      <h4 className="font-semibold text-lg">Accommodation Assistance</h4>
                      <p className="text-gray-600">Whether you prefer on-campus university halls, private student residences, or shared housing, we help you find safe, affordable, and conveniently located accommodation.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-lg mr-4">2</div>
                    <div>
                      <h4 className="font-semibold text-lg">Pre-Departure Briefings</h4>
                      <p className="text-gray-600">We conduct comprehensive pre-departure sessions covering what to pack, what to expect at UK immigration, and cultural nuances to prepare you for your arrival.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-lg mr-4">3</div>
                    <div>
                      <h4 className="font-semibold text-lg">On-Ground Support (Banking, NHS, Transport)</h4>
                      <p className="text-gray-600">We guide you through the initial setup processes in the UK, including opening a local bank account, registering with a GP (National Health Service), and understanding public transport.</p>
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
                    <li className="flex items-center"><i className="fas fa-check-circle text-green-500 mr-3"></i> Trusted Accommodation Partners</li>
                    <li className="flex items-center"><i className="fas fa-check-circle text-green-500 mr-3"></i> Detailed Pre-Departure Checklist</li>
                    <li className="flex items-center"><i className="fas fa-check-circle text-green-500 mr-3"></i> Airport Pickup Arrangements (Optional)</li>
                    <li className="flex items-center"><i className="fas fa-check-circle text-green-500 mr-3"></i> Welcome Guide to the UK</li>
                    <li className="flex items-center"><i className="fas fa-check-circle text-green-500 mr-3"></i> Ongoing Pastoral Support</li>
                  </ul>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-lg border">
                  <h3 className="font-bold text-xl mb-4">Frequently Asked Questions</h3>
                  <div className="space-y-4 text-sm">
                    <div>
                      <h4 className="font-semibold text-gray-800">When should I book my accommodation?</h4>
                      <p className="text-gray-600 mt-1">We recommend booking your accommodation as soon as you receive an unconditional offer, as places fill up quickly.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Will you pick me up from the airport?</h4>
                      <p className="text-gray-600 mt-1">We can assist in arranging airport pickup services so you arrive safely at your destination.</p>
                    </div>
                  </div>
                </div>
                <div className="cta-gradient-bg text-white p-6 rounded-2xl text-center">
                  <h3 className="font-bold text-xl mb-2">Preparing for Your UK Journey?</h3>
                  <p className="text-sm opacity-90 mb-4">Let us help you plan a stress-free transition. Contact us for living guidance.</p>
                  <Link href="/contact" className="bg-white text-orange-600 font-bold py-2 px-6 rounded-lg hover:bg-gray-200 transition-colors inline-block">Contact Us</Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
