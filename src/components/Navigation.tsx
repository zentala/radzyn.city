"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const currentPath = usePathname();

  const navigation = [
    { name: 'Strona główna', href: '/' },
    { name: 'O mieście', href: '/city' },
    { name: 'Powiat', href: '/county' },
    { name: 'Wydarzenia', href: '/events' },
    { name: 'Kontakt', href: '/contact' },
  ];

  // Handle scroll event to add background on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    
    // Initial check
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile menu when changing route
  useEffect(() => {
    setIsMenuOpen(false);
  }, [currentPath]);

  const isActive = (path: string) => currentPath === path;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${
      isScrolled ? 'bg-primary shadow-md' : 'bg-primary/90'
    } text-white`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-4">
            <Link href="/" className="font-bold text-xl md:text-2xl hover:opacity-90 transition">
              Radzyń Podlaski
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`${
                  isActive(item.href) 
                    ? 'font-bold border-b-2 border-white' 
                    : 'hover:border-b-2 border-white/50'
                } hover:text-gray-200 transition py-1`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white focus:outline-none p-2"
              aria-label={isMenuOpen ? "Zamknij menu" : "Otwórz menu"}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile navigation - slide down animation */}
        <div 
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="pt-2 pb-4 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block py-3 px-4 rounded-md text-center ${
                  isActive(item.href) 
                    ? 'bg-white/20 font-bold' 
                    : 'hover:bg-white/10'
                } transition-colors active:bg-white/30 touch-manipulation`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}