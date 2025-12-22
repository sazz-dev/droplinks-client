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
              <span>
                Drop<span className="text-red-500">Links</span>
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
            <h4 className="text-white font-medium text-xl mb-4">Follow Us</h4>
            <div className="flex flex-col justify-center sm:justify-start gap-4">
              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-red-500 hover:text-white transition"
                aria-label="Discord"
              >
                Facebook
              </a>
              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-red-500 hover:text-white transition"
                aria-label="Instagram"
              >
                Linkdin
              </a>
              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-red-500 hover:text-white transition"
                aria-label="Telegram"
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
