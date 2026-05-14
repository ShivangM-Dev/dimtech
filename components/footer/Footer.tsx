import React from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  // --- MODULAR DATA ---
  const quickLinks = [
    { name: 'About Us', href: '/about_us' },
    { name: 'Career @ DIMTECH', href: '/career' },
    { name: 'FAQs', href: '/faqs' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'Campus Tour', href: '/campus-tour' },
    { name: 'Anti-Ragging Policy', href: '/anti-ragging' },
  ];

  const programs = [
    { name: 'Management @ DIMTECH', href: '/management' },
    { name: 'MBA @ DIMTECH', href: '/MBA' },
    { name: 'MCA @ DIMTECH', href: '/MCA' },
    { name: 'BBA @ DIMTECH', href: '/BBA' },
    { name: 'BCA @ DIMTECH', href: '/BCA' },
  ];

  const admission = [
    { name: 'Selection Process', href: '/admission/selection-process' },
    { name: 'Fee Structure', href: '/admission/fee-structure' },
    { name: 'Education Loan', href: '/admission/education-loan' },
    { name: 'Admission Form', href: '/admission/apply' },
    { name: 'Eligibility Criteria', href: '/admission/eligibility' },
    { name: 'Scholarships', href: '/admission/scholarships' },
  ];

  return (
    <footer className="w-full bg-[#1e1e1e] font-sans text-slate-300">
      {/* Main Footer Content */}
      <div className="mx-auto max-w-[90rem] px-4 py-16 sm:px-8 lg:px-24">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          
          {/* Column 1: QUICK LINKS */}
          <div className="flex flex-col">
            <h3 className="mb-6 text-lg font-bold uppercase tracking-wider text-white underline decoration-slate-500 decoration-2 underline-offset-8">
              QUICK LINKS
            </h3>
            <ul className="flex flex-col space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="inline-block text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 hover:text-primary"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: PROGRAMS */}
          <div className="flex flex-col">
            <h3 className="mb-6 text-lg font-bold uppercase tracking-wider text-white underline decoration-slate-500 decoration-2 underline-offset-8">
              PROGRAMS
            </h3>
            <ul className="flex flex-col space-y-3">
              {programs.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="inline-block text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 hover:text-primary"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: ADMISSION */}
          <div className="flex flex-col">
            <h3 className="mb-6 text-lg font-bold uppercase tracking-wider text-white underline decoration-slate-500 decoration-2 underline-offset-8">
              ADMISSION
            </h3>
            <ul className="flex flex-col space-y-3">
              {admission.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="inline-block text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 hover:text-primary"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: CONTACT US */}
          <div className="flex flex-col">
            <h3 className="mb-6 text-lg font-bold uppercase tracking-wider text-white underline decoration-slate-500 decoration-2 underline-offset-8">
              CONTACT US
            </h3>
            <ul className="flex flex-col space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-slate-400" />
                <a href="tel:18002707021" className="text-sm font-medium transition-colors hover:text-primary">
                  1800 270 7021
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-slate-400" />
                <a href="tel:01204908596" className="text-sm font-medium transition-colors hover:text-primary">
                  0120 490 8596
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-slate-400" />
                <a href="mailto:info@dimtech.org" className="text-sm font-medium transition-colors hover:text-primary">
                  info@dimtech.org
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-1 h-6 w-6 shrink-0 text-slate-400" />
                <span className="text-sm font-medium leading-relaxed">
                  Plot No. 30/5 & 30/6,<br />
                  Knowledge Park-III, Greater<br />
                  Noida, GB Nagar, Uttar<br />
                  Pradesh (201308)
                </span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="w-full border-t border-slate-800 bg-black py-6 text-center">
        <p className="px-4 text-sm font-medium text-slate-400">
          Copyright © {new Date().getFullYear()} Divine Institute of Management & Technology (DIMTECH)
        </p>
      </div>
    </footer>
  );
};

export default Footer;