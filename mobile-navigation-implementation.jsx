// RecipSnap Mobile Navigation - React Implementation
// This shows the complete solution for the mobile navigation issue

import React, { useState, useEffect } from 'react';
import './mobile-navigation-styles.css';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [mobileMenuOpen]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Close menu when clicking a link
  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  // Close menu when clicking backdrop
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      <header className="site-header">
        <div className="header-container">
          {/* Logo */}
          <a href="/" className="logo" aria-label="RecipSnap Home">
            <span className="logo-recip">Recip</span>
            <span className="logo-snap">Snap</span>
          </a>

          {/* Desktop Navigation - Hidden on Mobile */}
          <nav className="desktop-nav" aria-label="Main navigation">
            <a href="/">Home</a>
            <a href="/discover">Discover</a>
            <a href="/blog">Blog</a>
            <a href="/about">About</a>
            <a href="/contact">Contact</a>
          </nav>

          {/* Right side - Sign In + Mobile Menu */}
          <div className="header-actions">
            {/* Sign In Button - Always visible */}
            <a href="/signin" className="btn-signin">
              Sign in
            </a>

            {/* Mobile Menu Button - Only visible on mobile */}
            <button
              className="mobile-menu-button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {mobileMenuOpen ? (
                // Close Icon (X)
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              ) : (
                // Hamburger Icon (☰)
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <div
        className={`mobile-menu-overlay ${mobileMenuOpen ? 'open' : ''}`}
        onClick={handleBackdropClick}
        aria-hidden={!mobileMenuOpen}
      >
        <nav
          id="mobile-menu"
          className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}
          aria-label="Mobile navigation"
        >
          <a href="/" onClick={handleLinkClick}>
            Home
          </a>
          <a href="/discover" onClick={handleLinkClick}>
            Discover
          </a>
          <a href="/blog" onClick={handleLinkClick}>
            Blog
          </a>
          <a href="/about" onClick={handleLinkClick}>
            About
          </a>
          <a href="/contact" onClick={handleLinkClick}>
            Contact
          </a>
        </nav>
      </div>
    </>
  );
};

export default Header;

// Alternative: If using Next.js with App Router
// 'use client';
// at the top of the file

// Alternative: If using vanilla JavaScript
/*
class MobileNavigation {
  constructor() {
    this.menuButton = document.querySelector('.mobile-menu-button');
    this.mobileMenu = document.querySelector('.mobile-menu');
    this.overlay = document.querySelector('.mobile-menu-overlay');
    this.isOpen = false;

    this.init();
  }

  init() {
    // Toggle menu on button click
    this.menuButton?.addEventListener('click', () => this.toggleMenu());

    // Close menu on overlay click
    this.overlay?.addEventListener('click', (e) => {
      if (e.target === this.overlay) {
        this.closeMenu();
      }
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.closeMenu();
      }
    });

    // Close menu on link click
    const links = this.mobileMenu?.querySelectorAll('a');
    links?.forEach(link => {
      link.addEventListener('click', () => this.closeMenu());
    });
  }

  toggleMenu() {
    if (this.isOpen) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  }

  openMenu() {
    this.isOpen = true;
    this.mobileMenu?.classList.add('open');
    this.overlay?.classList.add('open');
    document.body.style.overflow = 'hidden';
    this.menuButton?.setAttribute('aria-expanded', 'true');
  }

  closeMenu() {
    this.isOpen = false;
    this.mobileMenu?.classList.remove('open');
    this.overlay?.classList.remove('open');
    document.body.style.overflow = '';
    this.menuButton?.setAttribute('aria-expanded', 'false');
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new MobileNavigation();
});
*/
