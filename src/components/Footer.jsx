import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full bg-base-100 border-t-1 border-rose-500 bg-gradient-to-tl from-purple-600/15 text-neutral-content px-4 py-6   fixed bottom-0 p-4">
      
      {/* Top Left - Copyright */}
      <div className="absolute top-2 left-4 font-light text-sm md:text-base">
        © {new Date().getFullYear()}Togetha. All rights reserved.
      </div>

      {/* Center - Main Lines */}
      <div className="flex flex-col items-center justify-center text-center space-y-1 mt-4 mb-1 md:mt-1 md:mb-1 ">
       
        <p className="text-sm opacity-80">
           Built with <i className="ri-heart-3-fill text-rose-500 md:text-sm text-sm "></i> in Mumbai by  <a href="https://rohit-mali-portfolio.vercel.app/"><span className='text-pink-400 font-semibold font-sans ' > This guy</span></a>
        </p>
         
      </div>

      {/* Social Links */}
      <nav
        className={`
          absolute bottom-0
          ${window.innerWidth < 740 ? 'right-4' : 'left-4'}
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
