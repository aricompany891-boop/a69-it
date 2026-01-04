
import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import ServiceCard from './components/ServiceCard';
import { GoogleGenAI } from "@google/genai";

type Language = 'en' | 'ku';

const translations = {
  en: {
    heroTag: "Pioneering the Digital Frontier",
    heroTitle: "Build the Future with",
    heroSpan: "A69 Technologies",
    heroDesc: "We deliver cutting-edge IT solutions that empower global enterprises to innovate faster, scale smarter, and secure their digital legacy.",
    ctaLaunch: "Launch Your Project",
    ctaSolutions: "View Solutions",
    aiTitle: "A69 AI Platform Analysis",
    aiComputing: "Computing insights...",
    servicesTitle: "Enterprise Grade Services",
    ctaRevolution: "Ready to revolutionize your technology?",
    ctaJoin: "Join the hundreds of forward-thinking companies who have built their digital success stories with A69.",
    ctaConsult: "Book a Consultation",
    ctaSales: "Contact Sales",
    stats: [
      { label: "Active Clients", value: "250+" },
      { label: "Projects Delivered", value: "1.2k" },
      { label: "Uptime SLA", value: "99.99%" },
      { label: "Secured Nodes", value: "10M+" }
    ],
    services: [
      { title: "Cloud Architecture", description: "Scale your business with high-availability multi-cloud strategies.", icon: "fa-cloud" },
      { title: "Cyber Security", description: "Military-grade protection for your data and architectures.", icon: "fa-shield-halved" },
      { title: "Custom Software", description: "Bespoke digital products crafted with latest tech stacks.", icon: "fa-code" },
      { title: "AI & Automation", description: "Harness power of machine learning for workflows.", icon: "fa-brain" },
      { title: "DevOps Solutions", description: "Streamline your development lifecycle with CI/CD.", icon: "fa-infinity" },
      { title: "Data Analytics", description: "Transform raw data into actionable intelligence.", icon: "fa-chart-pie" }
    ]
  },
  ku: {
    heroTag: "پێشەنگی سنوری دیجیتاڵی",
    heroTitle: "داھاتوو دروست بکە لەگەڵ",
    heroSpan: "تەکنەلۆژیای A69",
    heroDesc: "ئێمە نوێترین چارەسەری ئایتی پێشکەش دەکەین کە کۆمپانیا جیهانییەکان بەهێز دەکات بۆ ئەوەی خێراتر بن، زیرەکانەتر گەشە بکەن و میراتی دیجیتاڵییان بپارێزن.",
    ctaLaunch: "پڕۆژەکەت دەستپێبکە",
    ctaSolutions: "چارەسەرەکان ببینە",
    aiTitle: "شیکردنەوەی سەکۆی ژیری دەستکردی A69",
    aiComputing: "خەریکی شیکردنەوەیە...",
    servicesTitle: "خزمەتگوزارییە ئاست بەرزەکان",
    ctaRevolution: "ئامادەی بۆ شۆڕشکردن لە تەکنەلۆژیاکەتدا؟",
    ctaJoin: "پەیوەندی بکە بە سەدان کۆمپانیای پێشکەوتووخواز کە چیرۆکی سەرکەوتنی دیجیتاڵیان لەگەڵ A69 دروست کردووە.",
    ctaConsult: "داوای ڕاوێژکاری بکە",
    ctaSales: "پەیوەندی بە فرۆشتنەوە بکە",
    stats: [
      { label: "کڕیاری چالاک", value: "٢٥٠+" },
      { label: "پڕۆژەی تەواوکراو", value: "١.٢هەزار" },
      { label: "بەردەوامی سیستم", value: "٩٩.٩٩%" },
      { label: "گرێی پارێزراو", value: "١٠ملیۆن+" }
    ],
    services: [
      { title: "تەلارسازی هەور", description: "کارەکەت گەشەپێبدە بە ستراتیژی فرە-هەور بۆ بەرزترین کارایی.", icon: "fa-cloud" },
      { title: "سایبەر سیکیووریتی", description: "پاراستنی زانیارییەکانت بە ئاستی سەربازی و چاودێری بەردەوام.", icon: "fa-shield-halved" },
      { title: "نەرمەکاڵای تایبەت", description: "بەرهەمە دیجیتاڵییەکان بە نوێترین تەکنەلۆژیا دروست دەکەین.", icon: "fa-code" },
      { title: "ژیری دەستکرد", description: "بەکارهێنانی فێربوونی ئامێر بۆ ئۆتۆماتیکردنی کارەکانت.", icon: "fa-brain" },
      { title: "چارەسەری دیڤئۆپس", description: "خێراکردنی خولی گەشەپێدان بە سیستەمی CI/CD.", icon: "fa-infinity" },
      { title: "شیکردنەوەی داتا", description: "گۆڕینی داتاکان بۆ زانیاری بەسوود بۆ بڕیاردان.", icon: "fa-chart-pie" }
    ]
  }
};

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('en');
  const [aiAnalysis, setAiAnalysis] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const t = translations[lang];

  useEffect(() => {
    document.documentElement.dir = lang === 'ku' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    fetchAiInsight();
  }, [lang]);

  const fetchAiInsight = async () => {
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = lang === 'en' 
        ? "Briefly explain why A69 (a fictional futuristic IT company) is the leader in innovation in 3 bullet points."
        : "بە کورتی بە ٣ خاڵ ڕوونی بکەرەوە بۆچی کۆمپانیای A69 پێشەنگە لە داهێنانی تەکنەلۆژیا.";
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
      });
      setAiAnalysis(response.text || 'Insight unavailable.');
    } catch (error) {
      console.error("AI Insight error:", error);
      setAiAnalysis(lang === 'en' ? 'A69 represents the pinnacle of digital evolution.' : 'A69 نوێنەرایەتی لوتکەی پەرەسەندنی دیجیتاڵی دەکات.');
    } finally {
      setLoading(false);
    }
  };

  const toggleLang = () => setLang(prev => prev === 'en' ? 'ku' : 'en');

  return (
    <div className={`min-h-screen ${lang === 'ku' ? 'font-outfit' : ''}`}>
      <Navbar lang={lang} toggleLang={toggleLang} />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden px-4">
        <div className="hero-glow"></div>
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-block px-4 py-1.5 mb-6 glass-card rounded-full border border-indigo-500/30">
            <span className="text-xs md:text-sm font-semibold gradient-text uppercase tracking-widest">{t.heroTag}</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black font-outfit mb-8 tracking-tight leading-tight">
            {t.heroTitle} <br />
            <span className="gradient-text">{t.heroSpan}</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed px-4">
            {t.heroDesc}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4">
            <button className="w-full sm:w-auto gradient-bg px-10 py-4 rounded-full font-bold text-lg hover:shadow-[0_0_30px_rgba(99,102,241,0.5)] transition-all">
              {t.ctaLaunch}
            </button>
            <button className="w-full sm:w-auto glass-card border border-white/20 px-10 py-4 rounded-full font-bold text-lg hover:bg-white/5 transition-all">
              {t.ctaSolutions}
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          {t.stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl md:text-4xl font-bold font-outfit gradient-text mb-2">{stat.value}</div>
              <div className="text-gray-500 uppercase text-xs tracking-widest font-bold">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* AI Insight Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto glass-card p-10 rounded-[2.5rem] border border-indigo-500/20 relative overflow-hidden">
          <div className={`absolute top-0 ${lang === 'ku' ? 'left-0' : 'right-0'} p-6 opacity-10`}>
            <i className="fas fa-microchip text-8xl"></i>
          </div>
          <h2 className="text-2xl font-bold mb-6 font-outfit flex items-center gap-3">
            <i className="fas fa-wand-magic-sparkles text-indigo-400"></i>
            {t.aiTitle}
          </h2>
          {loading ? (
            <div className="flex items-center gap-4 text-gray-400">
              <div className="animate-spin h-5 w-5 border-2 border-indigo-500 border-t-transparent rounded-full"></div>
              {t.aiComputing}
            </div>
          ) : (
            <div className="text-gray-300 leading-relaxed whitespace-pre-wrap">
              {aiAnalysis}
            </div>
          )}
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 px-4 bg-[#080808]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-outfit mb-4">{t.servicesTitle}</h2>
            <div className="w-24 h-1 gradient-bg mx-auto rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.services.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section id="contact" className="py-24 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto relative">
          <div className="gradient-bg rounded-[3rem] p-12 md:p-24 text-center text-white relative z-10">
            <h2 className="text-4xl md:text-6xl font-black font-outfit mb-8">{t.ctaRevolution}</h2>
            <p className="text-indigo-100 text-xl max-w-2xl mx-auto mb-12">
              {t.ctaJoin}
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <button className="bg-white text-indigo-600 px-10 py-4 rounded-full font-bold text-lg hover:shadow-2xl transition-all">
                {t.ctaConsult}
              </button>
              <button className="bg-transparent border-2 border-white/30 px-10 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-all">
                {t.ctaSales}
              </button>
            </div>
          </div>
          <div className={`absolute -bottom-24 ${lang === 'ku' ? '-left-24' : '-right-24'} w-96 h-96 bg-purple-500 rounded-full blur-[100px] opacity-20`}></div>
          <div className={`absolute -top-24 ${lang === 'ku' ? '-right-24' : '-left-24'} w-96 h-96 bg-blue-500 rounded-full blur-[100px] opacity-20`}></div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10 bg-black/50">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <span className="text-3xl font-extrabold font-outfit gradient-text tracking-tighter">A69</span>
            <p className="text-gray-500 mt-2 text-sm">© 2025 A69 Technologies Inc. {lang === 'ku' ? 'هەموو مافەکان پارێزراوە.' : 'All rights reserved.'}</p>
          </div>
          <div className="flex gap-8 text-gray-400">
            <a href="#" className="hover:text-white transition-colors">{lang === 'ku' ? 'سیاسەتی تایبەتمەندی' : 'Privacy Policy'}</a>
            <a href="#" className="hover:text-white transition-colors">{lang === 'ku' ? 'مەرجەکانی بەکارهێنان' : 'Terms of Service'}</a>
          </div>
          <div className="flex gap-6">
            <a href="#" className="text-gray-400 hover:text-indigo-400 transition-all text-xl"><i className="fab fa-twitter"></i></a>
            <a href="#" className="text-gray-400 hover:text-indigo-400 transition-all text-xl"><i className="fab fa-linkedin"></i></a>
            <a href="#" className="text-gray-400 hover:text-indigo-400 transition-all text-xl"><i className="fab fa-github"></i></a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
