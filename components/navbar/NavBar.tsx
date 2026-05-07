"use client";

import { useState } from "react";
import Link from "next/link";
import navItems from "@/utils/data/nav.json";
import Image from "next/image";

type NavItem = {
  label: string;
  href?: string;
  children?: { label: string; href: string }[];
};

const NAV_ITEMS = navItems as NavItem[];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Track desktop dropdowns
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  // Track mobile dropdowns (kept separate so resizing the window doesn't cause glitches)
  const [activeMobileDropdown, setActiveMobileDropdown] = useState<string | null>(null);

  const toggleDropdown = (label: string) => {
    if (activeDropdown === label) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(label);
    }
  };

  const toggleMobileDropdown = (label: string) => {
    if (activeMobileDropdown === label) {
      setActiveMobileDropdown(null);
    } else {
      setActiveMobileDropdown(label);
    }
  };

  return (
    <>
      <nav className="sticky top-0 z-50 w-full border-b border-border bg-background shadow-sm transition-colors duration-300">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
       <div className="flex h-24      justify-between items-center">

           

            {/* Logo / Brand Image */}

            <Link href="/" className="flex flex-shrink-0 items-center">

              <Image
                src="/images/logo.png"
                alt="DIMTECH Logo"
                width={300}
                height={300}
                className="sm:h-10 md:h-auto w-auto  pt-10"
                priority
              />
                          </Link> 

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:space-x-8">
              {NAV_ITEMS.map((item) => (
                <div key={item.label} className="relative">
                  {item.children ? (
                    <div>
                      <button 
                        onClick={() => toggleDropdown(item.label)}
                        onBlur={() => setTimeout(() => setActiveDropdown(null), 200)}
                        className="flex items-center text-sm font-medium text-foreground transition-colors hover:text-primary focus:outline-none"
                      >
                        {item.label}
                        <svg className={`ml-1 h-4 w-4 transition-transform ${activeDropdown === item.label ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      
                      {activeDropdown === item.label && (
                        <div className="absolute left-0 mt-2 w-48 origin-top-left rounded-md bg-card ring-1 ring-border shadow-lg focus:outline-none">
                          <div className="py-1">
                            {item.children.map((child) => (
                              <Link 
                                key={child.label} 
                                href={child.href} 
                                className="block px-4 py-2 text-sm text-foreground transition-colors hover:bg-muted hover:text-primary"
                              >
                                {child.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link 
                      href={item.href || "#"} 
                      className="text-sm font-medium text-foreground transition-colors hover:text-primary"
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}

              <Link href="/apply" className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90">
                Apply Now
              </Link>
            </div>

            {/* Mobile Toggle Button (Hamburger Menu) */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center rounded-md p-2 text-foreground transition-colors hover:bg-muted hover:text-primary focus:outline-none"
              >
                <span className="sr-only">Open main menu</span>
                {isMobileMenuOpen ? (
                  <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                ) : (
                  <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="border-b border-border bg-background md:hidden">
            <div className="space-y-1 px-4 pb-4 pt-2">
              {NAV_ITEMS.map((item) => (
                <div key={item.label}>
                  {item.children ? (
                    /* INTERACTIVE MOBILE DROPDOWN */
                    <div className="flex flex-col">
                      <button 
                        onClick={() => toggleMobileDropdown(item.label)}
                        className="flex w-full items-center justify-between rounded-md px-3 py-2 text-base font-medium text-foreground transition-colors hover:bg-muted hover:text-primary"
                      >
                        {item.label}
                        <svg className={`ml-1 h-4 w-4 transition-transform ${activeMobileDropdown === item.label ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      
                      {/* Only render children if this specific dropdown is active */}
                      {activeMobileDropdown === item.label && (
                        <div className="mt-1 space-y-1 bg-muted/50 rounded-md py-2">
                          {item.children.map((child) => (
                            <Link 
                              key={child.label} 
                              href={child.href} 
                              className="block rounded-md pl-8 pr-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-primary" 
                              onClick={() => {
                                setIsMobileMenuOpen(false);
                                setActiveMobileDropdown(null); // Reset dropdown on navigation
                              }}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    /* STANDARD MOBILE LINK */
                    <Link 
                      href={item.href || "#"} 
                      className="block rounded-md px-3 py-2 text-base font-medium text-foreground transition-colors hover:bg-muted hover:text-primary" 
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}

              <div className="pt-4">
                 <Link 
                  href="/apply" 
                  className="block w-full rounded-full bg-primary px-4 py-3 text-center text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90" 
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Apply Now
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}