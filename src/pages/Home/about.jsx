import React, { useEffect, useRef } from 'react';
import { Trophy, Target, Users, Award } from 'lucide-react';
import Header from '../../Components/Navbar';
import Footer from '../../Components/Footer';
import Headers from '../../Components/Header';

const AboutPage = () => {
  const heroRef = useRef(null);
  const missionRef = useRef(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    if (heroRef.current) observer.observe(heroRef.current);
    if (missionRef.current) observer.observe(missionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <>
    <Header/>
    <Headers title={"Building Champions , Creating Legends"} description={"Sports Arena is your ultimate destination for competitive sports tournaments. We bring together athletes, teams, and communities to celebrate the spirit of competition and excellence."} button={"ABOUT"} />
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">


      {/* Hero Section */}
      {/* <section ref={heroRef} className="pt-32 pb-20 px-6 opacity-0 translate-y-10 transition-all duration-1000">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-block mb-6 px-6 py-2 bg-orange-500/10 border border-orange-500/20 rounded-full">
            <span className="text-orange-500 font-bold text-sm tracking-wider">ABOUT US</span>
          </div>
          <h1 className="text-6xl md:text-7xl font-black mb-6">
            <span className="bg-gradient-to-r from-orange-400 via-red-500 to-orange-400 bg-clip-text text-transparent">
              Building Champions,
            </span>
            <br />
            <span className="text-white">Creating Legends</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Sports Arena is your ultimate destination for competitive sports tournaments. We bring together athletes, teams, and communities to celebrate the spirit of competition and excellence.
          </p>
        </div>
      </section> */}

      {/* Mission Section */}
      <section ref={missionRef} className="py-20 px-6 opacity-0 translate-y-10 transition-all duration-1000 delay-300">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="inline-block px-6 py-2 bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-full">
                <span className="text-orange-500 font-bold text-sm tracking-wider">OUR MISSION</span>
              </div>
              <h2 className="text-5xl font-black text-white leading-tight">
                Empowering Athletes
                <br />
                <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                  Across The Globe
                </span>
              </h2>
              <p className="text-lg text-gray-400 leading-relaxed">
                We're dedicated to providing world-class tournament experiences that inspire athletes to push their limits and achieve greatness. Our platform connects passionate competitors with opportunities to showcase their skills, build lasting friendships, and create unforgettable memories.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="group p-6 bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-orange-500/10 rounded-2xl hover:border-orange-500/30 transition-all duration-300 hover:scale-105">
                  <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform">
                    <Trophy className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-black text-white mb-2">50+</div>
                  <div className="text-sm text-gray-400 font-semibold">Tournaments Hosted</div>
                </div>
                <div className="group p-6 bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-orange-500/10 rounded-2xl hover:border-orange-500/30 transition-all duration-300 hover:scale-105">
                  <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-black text-white mb-2">500+</div>
                  <div className="text-sm text-gray-400 font-semibold">Happy Athletes</div>
                </div>
              </div>
            </div>

            {/* Right Feature Cards */}
            <div className="space-y-6">
              {[
                {
                  icon: Target,
                  title: 'Our Vision',
                  desc: 'To become the leading platform for sports tournaments worldwide, fostering a community where every athlete has the opportunity to compete, grow, and succeed.'
                },
                {
                  icon: Award,
                  title: 'Our Values',
                  desc: 'Excellence, integrity, and sportsmanship guide everything we do. We believe in fair play, community support, and celebrating every victory, big or small.'
                }
              ].map((item, idx) => (
                <div 
                  key={idx}
                  className="group relative p-8 bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-white/10 rounded-3xl overflow-hidden hover:border-orange-500/30 transition-all duration-500 hover:scale-105"
                  style={{ animationDelay: `${idx * 0.2}s` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-500">
                      <item.icon className="w-9 h-9 text-white" />
                    </div>
                    <h3 className="text-2xl font-black text-white mb-4">{item.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="relative p-12 bg-gradient-to-br from-orange-500/10 via-red-500/5 to-purple-500/10 border border-orange-500/20 rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utb3BhY2l0eT0iLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L2c+PC9zdmc+')] opacity-50"></div>
            <div className="relative text-center">
              <h3 className="text-4xl font-black text-white mb-4">
                Join Our Growing Community
              </h3>
              <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
                Be part of something bigger. Register your team today and compete in tournaments that matter.
              </p>
              <button className="group px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-orange-500/50">
                <span className="flex items-center space-x-2">
                  <span>Get Started</span>
                  <Trophy className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

<Footer/>

      <style jsx>{`
        .animate-in {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>
    </div>
    </>
  );
};

export default AboutPage;
