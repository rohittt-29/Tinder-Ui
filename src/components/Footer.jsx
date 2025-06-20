import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full bg-base-100  bg-gradient-to-tl from-purple-600/10 text-neutral-content px-4 py-6   fixed bottom-0 p-4">
      
      {/* Top Left - Copyright */}
      <div className="absolute top-2 left-4 font-semibold text-sm md:text-base">
        © {new Date().getFullYear()}Togetha. All rights reserved.
      </div>

      {/* Center - Main Lines */}
      <div className="flex flex-col items-center justify-center text-center space-y-1 mt-4 mb-1 md:mt-1 md:mb-1 ">
       
        <p className="text-sm opacity-80">
           Brought to you from Mumbai with <i className="ri-heart-3-fill text-red-400 md:text-xl text-sm animate-pulse drop-shadow-[0_0_5px_red]"></i> by <strong>Rohit Mali</strong>.
        </p>
        <p className="text-pink-400 font-medium italic"> Let’s get Togetha...</p>
      </div>

      {/* Social Links */}
      <nav
        className={`
          absolute bottom-2
          ${window.innerWidth < 640 ? 'right-4' : 'left-4'}
          flex gap-4 text-lg text-gray-400
        `}
      >
        <a href="https://www.linkedin.com/in/rohit-mali-163267257/overlay/contact-info/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
          <i className="ri-linkedin-box-fill"></i>
        </a>
        <a href="https://github.com/rohittt-29" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
          <i className="ri-github-fill"></i>
        </a>
        <a href="https://x.com/rohittt_mali?t=RhZUcrMBKhNQMrZbRtJt5A&s=09" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
          <i className="ri-twitter-x-line"></i>
        </a>
      </nav>
    </footer>
  );
};

export default Footer;
