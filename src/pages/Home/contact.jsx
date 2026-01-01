import React, { useState, useEffect, useRef  } from 'react';
import { Trophy, Mail, MapPin, Phone, Send, CheckCircle } from 'lucide-react';
import Header from '../../Components/Navbar';
import Footer from '../../Components/Footer';
import Headers from '../../Components/Header';
import { useNavigate } from 'react-router-dom';

const ContactUs = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    if (formRef.current) observer.observe(formRef.current);
    if (contentRef.current) observer.observe(contentRef.current);

    return () => observer.disconnect();
  }, []);

  const navigate = useNavigate()
  const handleClick = () => {
    navigate('/signUp')
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      
      setTimeout(() => setSubmitted(false), 5000);
    }, 1500);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
      <>
      <Header/>
     
    <Headers title={"Let's Connect"} description={"Have questions about tournaments or need assistance? We're here to help you succeed"} button={"GET IN TOUCH"} />
  
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Navbar */}
      {/* <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-orange-500/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
              <Trophy className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-black bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
              Sports Arena
            </span>
          </div>
          <div className="flex items-center space-x-8">
            <a href="/" className="text-gray-300 hover:text-orange-500 transition-colors font-semibold">Home</a>
            <a href="/tournaments" className="text-gray-300 hover:text-orange-500 transition-colors font-semibold">Tournaments</a>
            <a href="/about" className="text-gray-300 hover:text-orange-500 transition-colors font-semibold">About</a>
            <a href="/contact" className="text-orange-500 font-semibold">Contact</a>
          </div>
        </div>
      </nav> */}

      {/* Hero */}
      {/* <section className="pt-32 pb-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
         <div className="inline-block mb-6 px-6 py-2 bg-orange-500/10 border border-orange-500/20 rounded-full animate-bounce-slow">
            <span className="text-orange-500 font-bold text-sm tracking-wider">GET IN TOUCH</span>
          </div>
          <h1 className="text-6xl md:text-7xl font-black mb-6">
            <span className="text-white">Let's</span>
            <br />
            <span className="bg-gradient-to-r from-orange-400 via-red-500 to-orange-400 bg-clip-text text-transparent">
              Connect
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Have questions about tournaments or need assistance? We're here to help you succeed.
          </p>
        </div>
      </section> */}

      {/* Main Content */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-40 items-start">
            
            {/* Left - Content */}
            <div ref={contentRef} className="space-y-8 opacity-0 translate-x-10 transition-all duration-1000">
              <div className="space-y-6">
                <h2 className="text-4xl font-black text-white">
                  We're Here
                  <br />
                  <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                    To Help You
                  </span>
                </h2>
                <p className="text-lg text-gray-400 leading-relaxed">
                  Whether you're organizing a tournament, registering a team, or just have questions about our platform, our dedicated team is ready to assist you every step of the way.
                </p>
              </div>

              {/* Contact Info Cards */}
              <div className="space-y-4">
                {[
                  { icon: Mail, title: 'Email Us', info: 'gathcooley@gmail.com', color: 'from-orange-500 to-red-600' },
                  { icon: Phone, title: 'Call Us', info: '+1 (555) 123-4567', color: 'from-red-500 to-pink-600' },
                  { icon: MapPin, title: 'Visit Us', info: '123 Sports Ave, Arena City', color: 'from-purple-500 to-orange-600' }
                ].map((item, idx) => (
                  <div 
                    key={idx}
                    className="group relative p-6 bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-white/10 rounded-2xl overflow-hidden hover:border-orange-500/30 transition-all duration-500 hover:scale-105"
                    style={{ animationDelay: `${idx * 0.1}s` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative flex items-center space-x-4">
                      <div className={`w-14 h-14 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-500`}>
                        <item.icon className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white mb-1">{item.title}</h3>
                        <p className="text-gray-400">{item.info}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA Box */}
              <div className="relative p-8 bg-gradient-to-br from-orange-500/10 via-red-500/5 to-purple-500/10 border border-orange-500/20 rounded-3xl overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative">
                  <h3 className="text-2xl font-black text-white mb-3">
                    Join Our Community
                  </h3>
                  <p className="text-gray-400 mb-6">
                    Connect with thousands of athletes and participate in exciting tournaments.
                  </p>
                  <button
                  onClick={handleClick}
                   className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold rounded-xl transition-all transform hover:scale-105 shadow-lg">
                    Register Now
                  </button>
                </div>
              </div>
            </div>

            {/* Right - Form */}
            <div ref={formRef} className="opacity-0 -translate-x-10 transition-all duration-1000">
              <div className="relative p-8 md:p-10 bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-white/10 rounded-3xl backdrop-blur-xl shadow-2xl">
                <div className="absolute -top-1 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>
                
                <h3 className="text-3xl font-black text-white mb-8">
                  Send Us a Message
                </h3>

                {submitted ? (
                  <div className="py-12 text-center animate-fade-in">
                    <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                      <CheckCircle className="w-12 h-12 text-white" />
                    </div>
                    <h4 className="text-2xl font-bold text-white mb-3">Message Sent!</h4>
                    <p className="text-gray-400">We'll get back to you shortly.</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="group">
                      <label className="block text-sm font-semibold text-gray-300 mb-2 ml-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full bg-slate-800/50 border border-white/10 text-white rounded-xl py-4 px-4 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all placeholder:text-gray-500"
                      />
                    </div>

                    <div className="group">
                      <label className="block text-sm font-semibold text-gray-300 mb-2 ml-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        className="w-full bg-slate-800/50 border border-white/10 text-white rounded-xl py-4 px-4 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all placeholder:text-gray-500"
                      />
                    </div>

                    <div className="group">
                      <label className="block text-sm font-semibold text-gray-300 mb-2 ml-1">
                        Your Message
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us how we can help..."
                        rows="5"
                        className="w-full bg-slate-800/50 border border-white/10 text-white rounded-xl py-4 px-4 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all placeholder:text-gray-500 resize-none"
                      ></textarea>
                    </div>

                    <button
                      onClick={handleSubmit}
                      disabled={loading}
                      className="group w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold py-4 rounded-xl transition-all transform hover:scale-105 shadow-lg hover:shadow-orange-500/50 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="text-lg">{loading ? 'Sending...' : 'Send Message'}</span>
                      {!loading && <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                    </button>
                  </div>
                )}

                <div className="mt-6 pt-6 border-t border-white/10 text-center text-sm text-gray-400">
                  We typically respond within 24 hours
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
<Footer/>
      <style>{`
        .animate-in {
          opacity: 1 !important;
          transform: translateX(0) !important;
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s infinite;
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-in;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
      </>
  );
};

export default ContactUs;