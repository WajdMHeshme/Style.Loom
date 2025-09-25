import React, { useState } from "react";
import SuccessMessage from "../../utils/SuccessMessage";



const ContactSection: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const validateEmail = (em: string) => /^\S+@\S+\.\S+$/.test(em);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) return setError("Name is required");
    if (!email.trim()) return setError("Email is required");
    if (!validateEmail(email)) return setError("Please enter a valid email");
    if (!message.trim()) return setError("Message is required");

    try {
      setLoading(true);
      // محاكاة إرسال محلي — لاحقًا يمكن ربط EmailJS أو API حقيقي
      await new Promise((res) => setTimeout(res, 700));

      // عرض البوب اب الأنيمي
      setShowSuccess(true);

      // تفريغ الحقول
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (err) {
      console.error(err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full 2xl:px-[162px] md:px-[80px] px-[16px] pt-[200px]">
      <div className="w-full font-sans">
        <div
          className="w-full rounded-t-lg border-2 border-dashed border-black15 relative overflow-hidden
                     md:pr-[18rem] pr-[20px] md:pl-[80px] pl-[20px] pt-[80px] pb-[80px] bg-gradient-to-br from-black06/60 to-[#111111]/60"
        >
          {/* decorative image (md+) */}
          <img
            src="/assets/imgs/Vector.png"
            alt=""
            aria-hidden="true"
            className="hidden md:block pointer-events-none absolute top-0 right-0 translate-x-[10%] -translate-y-[5%] max-w-[18rem] md:max-w-[22rem]"
          />

          {/* header */}
          <h2 className="text-[28px] md:text-4xl xl:text-5xl text-white uppercase mb-4">Contact Us</h2>
          <p className="text-lg text-gray40 mb-8">Have a question or want to collaborate? Send us a message.</p>

          {/* form */}
          <div className="w-full max-w-3xl">
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && <div className="text-sm text-red-400 bg-[#2b1510] p-2 rounded">{error}</div>}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-2 text-brown60" htmlFor="name">Name</label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-[#121212] text-white placeholder-[#7e7e7e] outline-none border border-[#1e1e1e] focus:border-brown60 focus:ring-2 focus:ring-brown60/20 transition"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-2 text-brown60" htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-[#121212] text-white placeholder-[#7e7e7e] outline-none border border-[#1e1e1e] focus:border-brown60 focus:ring-2 focus:ring-brown60/20 transition"
                    placeholder="example@domain.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm mb-2 text-brown60" htmlFor="subject">Subject (optional)</label>
                <input
                  id="subject"
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-[#121212] text-white placeholder-[#7e7e7e] outline-none border border-[#1e1e1e] focus:border-brown60 focus:ring-2 focus:ring-brown60/20 transition"
                  placeholder="Subject"
                />
              </div>

              <div>
                <label className="block text-sm mb-2 text-brown60" htmlFor="message">Message</label>
                <textarea
                  id="message"
                  rows={6}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-[#121212] text-white placeholder-[#7e7e7e] outline-none border border-[#1e1e1e] focus:border-brown60 focus:ring-2 focus:ring-brown60/20 transition resize-none"
                  placeholder="Write your message here"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="py-3 w-full sm:w-auto rounded-lg text-black font-semibold shadow-sm bg-gradient-to-r from-[#ae9b84] via-[#90715b] to-[#ae9b84] bg-[length:300%_100%] bg-left transition-all duration-700 hover:bg-right hover:shadow-xl disabled:opacity-60 cursor-pointer px-6"
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>

                <div className="text-sm text-[#7a7470]">We usually reply within 1-2 business days.</div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* success popup */}
      <SuccessMessage isVisible={showSuccess} onClose={() => setShowSuccess(false)} />
    </section>
  );
};

export default ContactSection;
