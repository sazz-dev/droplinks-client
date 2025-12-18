import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-[#1b1416] to-[#120d0f] text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Brand */}
          <div>
            <div className="flex items-center text-2xl font-bold mb-4">
              <span className="bg-red-500 text-white rounded-md px-2 py-1 mr-2">
                A
              </span>
              <span>
                drop<span className="text-red-500">Link</span>
              </span>
            </div>
            <p className="text-md text-white/60 font-light leading-relaxed">
              Connecting donors with those in need. <br />
              Every drop counts.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-medium text-2xl mb-4">Quick Links</h4>
            <ul className="space-y-3 text-white/60  text-md font-light">
              <li><a href="/" className="hover:text-red-500 transition">Home</a></li>
              <li><a href="/about" className="hover:text-red-500 transition">About Us</a></li>
              <li><a href="/search" className="hover:text-red-500 transition">Search Donors</a></li>
              <li><a href="/requests" className="hover:text-red-500 transition">Donation Requests</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-medium text-2xl mb-4">Resources</h4>
             <ul className="space-y-3 text-white/60  text-md font-light">
              <li><a href="/contact" className="hover:text-red-500 transition">Contact Us</a></li>
              <li><a href="/fundraise" className="hover:text-red-500 transition">Fund Raise</a></li>
              <li><a href="/privacy" className="hover:text-red-500 transition">Privacy Policy</a></li>
              <li><a href="/terms" className="hover:text-red-500 transition">Terms of Service</a></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-white font-medium text-2xl mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-gray-400 hover:text-red-500 transition text-xl"
                aria-label="Discord"
              >
               
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-red-500 transition text-xl"
                aria-label="Instagram"
              >
              
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-red-500 transition text-xl"
                aria-label="Telegram"
              >
           
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-[#2a2225] mt-12 pt-6 text-center font-light text-md text-white/60  ">
          © 2024 Droplinks. All rights reserved. Saving lives together.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
