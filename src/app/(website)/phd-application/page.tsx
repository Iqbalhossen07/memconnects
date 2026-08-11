import Link from "next/link";
import { MdSettings } from "react-icons/md";

export const metadata = {
  title: "PhD Application Portal - Mem Connects",
  description: "Dedicated support for your doctoral research ambitions.",
};

export default function PhdApplicationPage() {
  return (
    <main className="bg-gray-50 min-h-screen pb-20">
      <section className="bg-[#6D5795] py-20 text-white text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 text-white">PhD Application Portal</h1>
          <p className="mt-3 text-lg text-white/90 max-w-2xl mx-auto">Dedicated support for your doctoral research ambitions.</p>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <div className="flex justify-center items-center gap-2 mb-8 text-[#F2852C]">
            <MdSettings className="text-6xl animate-spin" style={{ animationDuration: '3s' }} />
            <MdSettings className="text-4xl animate-spin" style={{ animationDirection: 'reverse', animationDuration: '3s' }} />
          </div>
          
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 tracking-tight">Our Dedicated PhD Portal is Coming Soon!</h2>
          <p className="text-lg text-gray-600 mb-10 leading-relaxed max-w-2xl mx-auto">
            We are working hard to launch a new, dedicated application portal specifically for our PhD candidates. In the meantime, please contact our specialist team directly for personalized guidance.
          </p>
          
          <Link href="/contact" className="inline-block bg-[#F2852C] hover:bg-[#D9721B] text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
            Contact a PhD Advisor
          </Link>
        </div>
      </section>
    </main>
  );
}
