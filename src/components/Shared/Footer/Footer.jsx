import React from "react";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-[#1b1416] to-[#120d0f] text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-14">
        {/* Main Grid */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start text-2xl font-bold mb-4">
              <span className="text-white text-4xl">
                Drop<span className="text-[#F43F5E]">Links</span>
              </span>
            </div>
            <p className="text-md text-white/60 font-light leading-relaxed">
              Connecting donors with those in need. <br />
              Every drop counts.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center sm:text-left">
            <h4 className="text-white font-medium text-xl mb-4">Quick Links</h4>
            <ul className="space-y-3 text-white/60 text-md font-light">
              <li>
                <Link to="/" className="hover:text-red-500 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-red-500 transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/search-donors"
                  className="hover:text-red-500 transition"
                >
                  Search Donors
                </Link>
              </li>
              <li>
                <Link
                  to="/donation-requests"
                  className="hover:text-red-500 transition"
                >
                  Donation Requests
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="text-center sm:text-left">
            <h4 className="text-white font-medium text-xl mb-4">Resources</h4>
            <ul className="space-y-3 text-white/60 text-md font-light">
              <li>
                <Link to="/contact" className="hover:text-red-500 transition">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/give-fund" className="hover:text-red-500 transition">
                  Fund Raise
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-red-500 transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-red-500 transition">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
<div className="text-center sm:text-left">
  <h4 className="text-white font-medium text-xl mb-4">
    Follow Us
  </h4>

  <div className="flex flex-wrap justify-center sm:justify-start gap-3">
    <a
      href="#"
      aria-label="Facebook"
      className="px-4 py-2 text-sm font-medium text-white rounded-full
                 bg-white/10 hover:bg-[#F43F5E] transition"
    >
      Facebook
    </a>

    <a
      href="#"
      aria-label="LinkedIn"
      className="px-4 py-2 text-sm font-medium text-white rounded-full
                 bg-white/10 hover:bg-[#F43F5E] transition"
    >
      LinkedIn
    </a>

    <a
      href="#"
      aria-label="Instagram"
      className="px-4 py-2 text-sm font-medium text-white rounded-full
                 bg-white/10 hover:bg-[#F43F5E] transition"
    >
      Instagram
    </a>
  </div>
</div>

        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 mt-12 pt-6 text-center text-sm text-white/60 font-light">
          © 2024 Droplinks. All rights reserved. Saving lives together.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
