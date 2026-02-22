import React from 'react';
import './App.css';

const App = () => {
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-purple-500/30">
      
      {/* Glass Navbar */}
      <nav className="fixed top-0 w-full z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center backdrop-blur-md bg-white/5 border border-white/10 px-6 py-3 rounded-2xl">
          <h1 className="text-xl font-bold tracking-tighter">SR.</h1>
          <div className="hidden md:flex gap-8 text-sm uppercase tracking-widest text-gray-400">
            <a href="#home" className="hover:text-white transition-colors">Home</a>
            <a href="#work" className="hover:text-white transition-colors">Work</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </div>
          <button className="bg-white text-black px-5 py-2 rounded-full text-sm font-medium hover:bg-gray-200 transition-all">
            Hire Me
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Decorative Background Glows */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-blue-600/10 rounded-full blur-[100px] -z-10" />

        <div className="max-w-7xl mx-auto text-center md:text-left flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-2/3">
            <h2 className="text-gray-400 text-lg md:text-xl font-medium mb-4">
              Hello, I'm Surakshya Ratna
            </h2>
            <h1 className="text-5xl md:text-8xl font-extrabold mb-6 leading-tight tracking-tight">
              Fullstack <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
                Developer.
              </span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed">
              I build scalable web applications with a focus on high-performance 
              architecture and seamless user experiences. Turning complex problems 
              into elegant, functional code.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button className="px-8 py-4 bg-white text-black font-bold rounded-xl hover:scale-105 transition-transform">
                View My Work
              </button>
              <button className="px-8 py-4 border border-white/20 backdrop-blur-sm hover:bg-white/5 rounded-xl transition-all">
                Download CV
              </button>
            </div>
          </div>

          {/* Abstract Glass Card/Image Placeholder */}
          <div className="mt-16 md:mt-0 md:w-1/3 flex justify-center">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <div className="relative w-64 h-80 md:w-80 md:h-[450px] bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl flex items-center justify-center overflow-hidden">
                <span className="text-gray-600 italic">Portrait or Tech Stack Illustration</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills/Tech Section (Minimalist) */}
      <footer className="py-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-8 opacity-50 grayscale hover:grayscale-0 transition-all">
          <span>React</span>
          <span>Node.js</span>
          <span>PostgreSQL</span>
          <span>Tailwind</span>
          <span>TypeScript</span>
        </div>
      </footer>
    </div>
  );
};

export default App;