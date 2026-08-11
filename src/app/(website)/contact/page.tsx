"use client";

import Link from "next/link";
import { useState } from "react";
import { submitContactForm } from "@/actions/contactAction";
import MathCaptcha from "@/components/MathCaptcha";

export default function ContactPage() {
  const [status, setStatus] = useState<{ success: boolean; message: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCaptchaValid, setIsCaptchaValid] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isCaptchaValid) return;
    
    setIsSubmitting(true);
    setStatus(null);

    const formData = new FormData(e.currentTarget);
    const result = await submitContactForm(formData);
    
    setStatus(result);
    setIsSubmitting(false);

    if (result.success) {
      (e.target as HTMLFormElement).reset();
    }
  };

  return (
    <main>
      <section className="page-header-bg py-20 text-white text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl lg:text-5xl font-bold text-white">Get In Touch</h1>
          <p className="mt-3 text-lg text-white/90 max-w-2xl mx-auto">We're here to help. Reach out with your questions, and we'll get back to you shortly.</p>
        </div>
      </section>

      <section className="py-20 hero-bg">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 text-center">
            <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 mx-auto bg-purple-100 text-[#6D5795] rounded-full flex items-center justify-center text-2xl mb-4">
                <i className="fas fa-map-marker-alt"></i>
              </div>
              <h4 className="font-bold text-lg">Our Office</h4>
              <p className="text-gray-600 text-sm">Room 12, 4th Floor, Boardman House, 64 Broadway, E15 1NT</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 mx-auto bg-orange-100 text-[#F2852C] rounded-full flex items-center justify-center text-2xl mb-4">
                <i className="fas fa-envelope-open-text"></i>
              </div>
              <h4 className="font-bold text-lg">Email Us</h4>
              <a href="mailto:info@memconnects.co.uk" className="text-gray-600 hover:text-[#F2852C] text-sm break-all">info@memconnects.co.uk</a>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 mx-auto bg-green-100 text-green-600 rounded-full flex items-center justify-center text-2xl mb-4">
                <i className="fas fa-phone-alt"></i>
              </div>
              <h4 className="font-bold text-lg">Call Us</h4>
              <a href="tel:+447988138221" className="text-gray-600 hover:text-[#F2852C] text-sm">+44 7988 138221</a>
            </div>
          </div>

          <div className="grid lg:grid-cols-5 gap-12">
            <div className="lg:col-span-3 bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
              <h3 className="text-2xl font-bold mb-6">Send Us a Message</h3>

              {status && (
                <div className={`p-4 rounded-md mb-6 border-l-4 ${status.success ? 'bg-green-100 border-green-400 text-green-700' : 'bg-red-100 border-red-400 text-red-700'}`}>
                  <div className="flex items-center">
                    <i className={`fas ${status.success ? 'fa-check-circle' : 'fa-exclamation-triangle'} mr-3 text-lg`}></i>
                    <p className="font-medium">{status.message}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                {/* Honeypot */}
                <div style={{ position: "absolute", left: "-5000px" }} aria-hidden="true">
                  <label htmlFor="website_url">Website URL</label>
                  <input type="text" name="website_url" id="website_url" tabIndex={-1} autoComplete="off" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label htmlFor="contact_name" className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                    <input type="text" name="contact_name" id="contact_name" className="form-input-premium" required />
                  </div>
                  <div>
                    <label htmlFor="contact_email" className="block text-sm font-medium text-gray-700 mb-2">Your Email</label>
                    <input type="email" name="contact_email" id="contact_email" className="form-input-premium" required />
                  </div>
                </div>

                <div className="mb-5">
                  <label htmlFor="contact_subject" className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                  <input type="text" name="contact_subject" id="contact_subject" className="form-input-premium" required />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label htmlFor="latest_degree" className="block text-sm font-medium text-gray-700 mb-2">Latest Academic Degree</label>
                    <input type="text" name="latest_degree" id="latest_degree" className="form-input-premium" placeholder="e.g., BSc in CSE" />
                  </div>
                  <div>
                    <label htmlFor="cgpa" className="block text-sm font-medium text-gray-700 mb-2">CGPA</label>
                    <input type="text" name="cgpa" id="cgpa" className="form-input-premium" placeholder="e.g., 3.80 out of 4.00" />
                  </div>
                </div>

                <div className="mb-5">
                  <label htmlFor="interested_program" className="block text-sm font-medium text-gray-700 mb-2">Interested Academic Program</label>
                  <input type="text" name="interested_program" id="interested_program" className="form-input-premium" placeholder="e.g., MSc in Data Science" />
                </div>

                <div className="mb-6">
                  <label htmlFor="contact_message" className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea name="contact_message" id="contact_message" rows={5} className="form-input-premium" required></textarea>
                </div>

                <MathCaptcha onVerify={setIsCaptchaValid} />

                <div>
                  <button type="submit" disabled={isSubmitting || !isCaptchaValid} className="w-full bg-[#6D5795] text-white font-bold py-3.5 px-6 rounded-lg hover:bg-[#59457A] transition-all duration-300 transform hover:scale-105 disabled:opacity-50">
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>
                </div>
              </form>
            </div>

            <div className="lg:col-span-2 rounded-2xl shadow-xl overflow-hidden h-full min-h-[400px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2481.797036735409!2d-0.005393923678531113!3d51.53488800843654!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8a776142753b7%3A0x85f390f75743455a!2sBoardman%20House%2C%2064%20Broadway%2C%20London%20E15%201NT%2C%20UK!5e0!3m2!1sen!2sbd!4v1718816823573!5m2!1sen!2sbd"
                width="100%" height="100%" style={{ border: 0 }} allowFullScreen={false} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
