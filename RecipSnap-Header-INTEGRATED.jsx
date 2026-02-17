// RecipSnap Header Component - INTEGRATED MOBILE NAVIGATION FIX
// This shows the mobile navigation solution integrated into RecipSnap's header

import React, { useState, useEffect } from 'react';
import Link from 'next/link'; // Assuming RecipSnap uses Next.js
import './RecipSnap-Styles-INTEGRATED.css';

const RecipSnapHeader = () => {
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

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  const handleLinkClick = () => setMobileMenuOpen(false);
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="recipsnap-header">
        <div className="recipsnap-header-container">

          {/* Logo - Same as before */}
          <Link href="/" className="recipsnap-logo">
            <span className="logo-recip">Recip</span>
            <span className="logo-snap">Snap</span>
          </Link>

          {/* Desktop Navigation - HIDDEN ON MOBILE NOW */}
          <nav className="recipsnap-desktop-nav" aria-label="Main navigation">
            <Link href="/">Home</Link>
            <Link href="/discover">Discover</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
          </nav>

          {/* Header Actions */}
          <div className="recipsnap-header-actions">

            {/* Sign In - Always visible */}
            <Link href="/signin" className="recipsnap-btn-signin">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              Sign in
            </Link>

            {/* Mobile Menu Button - NEW, only visible on mobile */}
            <button
              className="recipsnap-mobile-menu-button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                // Close icon
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              ) : (
                // Hamburger icon
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay - NEW */}
      <div
        className={`recipsnap-mobile-overlay ${mobileMenuOpen ? 'open' : ''}`}
        onClick={handleBackdropClick}
        aria-hidden={!mobileMenuOpen}
      />

      {/* Mobile Menu Drawer - NEW */}
      <nav className={`recipsnap-mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <Link href="/" onClick={handleLinkClick}>Home</Link>
        <Link href="/discover" onClick={handleLinkClick}>Discover</Link>
        <Link href="/blog" onClick={handleLinkClick}>Blog</Link>
        <Link href="/about" onClick={handleLinkClick}>About</Link>
        <Link href="/contact" onClick={handleLinkClick}>Contact</Link>
      </nav>
    </>
  );
};

export default RecipSnapHeader;

/*
INTEGRATION NOTES:
==================

1. REPLACE YOUR CURRENT HEADER:
   - Find your current Header component (likely in components/Header.jsx)
   - Replace it with this component
   - Update the CSS imports

2. CSS INTEGRATION:
   - Use RecipSnap-Styles-INTEGRATED.css
   - Or copy the styles into your existing stylesheet

3. WHAT CHANGED:
   ✅ Added mobile menu state management
   ✅ Added hamburger button (hidden on desktop)
   ✅ Added mobile navigation drawer
   ✅ Desktop nav now hidden on mobile
   ✅ Sign in button always visible
   ✅ Keyboard support (Escape to close)
   ✅ Body scroll lock

4. TESTING:
   - Test on screens < 768px (should see hamburger)
   - Test on screens ≥ 768px (should see desktop nav)
   - Test all navigation links work
   - Test on real devices

5. NO BREAKING CHANGES:
   - Desktop experience unchanged
   - All links still work
   - Sign in button still accessible
   - Only mobile UX improved
*/
