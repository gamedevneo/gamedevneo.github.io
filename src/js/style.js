// style.js

/**
 * Injects professional, premium styles inspired by top-tier enterprise websites (Accenture-like style).
 * Refined animations, responsiveness, accessibility, and micro-level perfection for a top-notch user experience.
 */
export function injectStyles() {
  const style = document.createElement("style");
  style.textContent = `
  
  /*
 * ========================================
 * Global Reset & Variables
 * ========================================
 */

:root {
  /* Color Palette */
  --color-primary: #ff6a00;
  /* Main Accent - Orange */
  --color-secondary: #7b2ff7;
  /* Secondary Accent - Purple */
  --color-text-light: #e8e8e8;
  --color-text-dark: #0b0b0b;
  --color-background-dark: #0b0b0b;
  --color-card-background: rgba(255, 255, 255, 0.05);
  --color-card-border: rgba(255, 255, 255, 0.1);
  --color-white: #fff;
  --color-grey-100: #dcdcdc;
  --color-grey-200: #bcbcbc;

  /* Typography */
  --font-family-base: 'Montserrat', system-ui, sans-serif;
  --font-size-base: 17px;
  --line-height-base: 1.8;
  --font-weight-bold: 700;
  --font-weight-extrabold: 800;

  /* Spacing & Sizing */
  --spacing-unit: 8px;
  /* For consistent scaling */
  --header-height: 80px;
  --border-radius-default: 8px;
  --border-radius-large: 18px;

  /* Transitions & Shadows */
  --transition-speed: 0.3s;
  --transition-ease: ease;
  --shadow-base: 0 2px 20px rgba(0, 0, 0, 0.6);
  --shadow-hover: 0 10px 30px rgba(0, 0, 0, 0.8);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  /* Use CSS variables for micro-level consistency */
  scroll-behavior: smooth;
  /* Only apply transitions to transform and opacity for better performance */
  transition: transform var(--transition-speed) var(--transition-ease),
    opacity var(--transition-speed) var(--transition-ease),
    background var(--transition-speed) var(--transition-ease);
}

/*
 * ========================================
 * Base HTML & Body Styles
 * ========================================
 */

html,
body {
  height: 100%;
  width: 100%;
  font-family: var(--font-family-base);
  font-size: var(--font-size-base);
  line-height: var(--line-height-base);
  color: var(--color-text-light);
  background-color: var(--color-background-dark);
  overflow-x: hidden;
}

body {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  /* Background now uses the professional 'backgroundShift' animation */
  background: radial-gradient(circle at 30% 30%, #151515, #000);
  transition: background 0.8s ease-in-out;
  padding-bottom: 40px;
}

/*
 * ========================================
 * Typography & Links
 * ========================================
 */

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: var(--font-family-base);
  font-weight: var(--font-weight-extrabold);
  line-height: 1.4;
  color: var(--color-white);
  letter-spacing: 0.5px;
  transition: color var(--transition-speed) var(--transition-ease);
}

h1 {
  font-size: 2.8rem;
  /* Use REM for scalable typography */
  margin-bottom: calc(2 * var(--spacing-unit));
}

p {
  font-size: 16px;
  color: var(--color-grey-100);
  line-height: 1.7;
  letter-spacing: 0.3px;
  transition: color var(--transition-speed) var(--transition-ease);
}

a {
  text-decoration: none;
  color: inherit;
  transition: color var(--transition-speed) var(--transition-ease),
    transform 0.2s var(--transition-ease), opacity 0.3s;
}

a:focus {
  outline: 2px solid var(--color-primary);
  /* Enhanced focus for accessibility */
  outline-offset: 4px;
  border-radius: var(--border-radius-default);
}

a:hover {
  color: var(--color-primary);
  transform: translateY(-2px);
  opacity: 1;
}

/*
 * ========================================
 * Header & Navigation
 * ========================================
 */

header {
  width: 100%;
  height: var(--header-height);
  /* Refined, more subtle gradient */
  background: linear-gradient(135deg, #22054a, #000000);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;
  color: var(--color-white);
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.8);
  /* Stronger shadow */
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(10px);
  /* Modern frosted-glass effect */
  transition: all 0.4s ease;
}

header:hover {
  background: linear-gradient(135deg, #320a65, #0a0a0a);
}

header .title {
  font-weight: var(--font-weight-bold);
  font-size: 24px;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  color: var(--color-primary);
  transition: transform 0.4s var(--transition-ease), opacity 0.4s var(--transition-ease);
  position: relative;
  padding: 5px 0;
}

header .title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: var(--color-primary);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s ease;
}

header .title:hover::after {
  transform: scaleX(1);
}

/* Navigation Menu */
nav {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 0;
  /* Default closed state */
  background: rgba(12, 0, 24, 0.95);
  /* Deeper, semi-transparent background */
  overflow-x: hidden;
  transition: width 0.5s ease-in-out;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 3px 0 20px rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(12px);
  /* Increased blur for professional look */
  z-index: 999;
  padding: 20px 0;
}

/* Navigation Menu State - Uses fixed width for clean slide-in */
nav.open {
  width: 260px;
  transition: width 0.5s ease-in-out, box-shadow 0.3s ease;
  box-shadow: 5px 0 15px rgba(0, 0, 0, 0.8);
}

/* Menu Toggle Button */
.menu-toggle {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  /* Better spacing for bars */
  width: 30px;
  /* Slightly wider toggle area */
  height: 30px;
  cursor: pointer;
  padding: 5px;
  position: relative;
  z-index: 101;
  /* Ensure it's above the header content */
}

.menu-toggle:hover {
  opacity: 1;
  /* Keep full opacity */
  transform: scale(1.1);
}

.menu-toggle hr {
  width: 100%;
  /* Full width of the toggle area */
  height: 2px;
  background-color: var(--color-white);
  border: none;
  margin: 3px 0;
  /* Adjusted margin */
  border-radius: 2px;
  transition: all 0.3s ease-in-out;
}

/* Transformation for the 'X' (Open state) */
.menu-toggle.active hr:nth-child(1) {
  transform: translateY(8px) rotate(45deg);
}

.menu-toggle.active hr:nth-child(2) {
  opacity: 0;
}

.menu-toggle.active hr:nth-child(3) {
  transform: translateY(-8px) rotate(-45deg);
}

/* Navigation Links - Refined for professional look */
nav a {
  color: var(--color-grey-100);
  font-size: 1.1rem;
  /* Scalable font size */
  font-weight: 600;
  margin: 12px 0;
  padding: 8px 16px;
  letter-spacing: 0.8px;
  text-transform: capitalize;
  border-radius: var(--border-radius-default);
  transition: color 0.3s ease, transform 0.3s ease, background 0.3s ease;
  position: relative;
  overflow: hidden;
  /* For the background color slide effect */
}

nav a:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--color-primary);
  z-index: -1;
  transform: translateX(-100%);
  transition: transform 0.3s ease-out;
}

nav a:hover:before {
  transform: translateX(0);
}

nav a:hover {
  color: var(--color-white);
  /* Text turns white on hover */
  transform: translateX(8px);
}

/* Navigation Form Elements (Select/Button) */
nav select,
nav button {
  width: 160px;
  /* Increased size for better touch targets */
  height: 48px;
  margin: 16px 0;
  border-radius: var(--border-radius-default);
  border: 1px solid rgba(255, 255, 255, 0.15);
  background-color: rgba(255, 255, 255, 0.05);
  color: var(--color-white);
  font-size: 16px;
  font-weight: 600;
  text-align: center;
  letter-spacing: 0.6px;
  transition: all 0.3s var(--transition-ease);
  appearance: none;
  /* For select cleanup */
  cursor: pointer;
}

nav select:focus,
nav button:focus {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

nav select:hover,
nav button:hover {
  background-color: rgba(255, 255, 255, 0.1);
  transform: translateY(-3px);
  box-shadow: 0 6px 22px rgba(0, 0, 0, 0.4);
}

nav button {
  /* High-contrast button for action */
  background: linear-gradient(135deg, #ff5b00, #ff146f);
  border: none;
  color: var(--color-white);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
}

nav button:hover {
  background: linear-gradient(135deg, #ff7b3b, #ff3b8b);
  transform: translateY(-2px) scale(1.02);
  /* Subtle scale for modern feel */
}

/*
 * ========================================
 * Article & Post Cards (List View)
 * ========================================
 */

article {
  padding: 50px 20px;
  width: 100%;
  max-width: 1280px;
  /* Wider max-width for post lists */
  margin: 0 auto;
}

.post-card {
  background: var(--color-card-background);
  border: 1px solid var(--color-card-border);
  border-radius: var(--border-radius-large);
  margin: 32px auto;
  /* Increased margin */
  padding: 40px;
  /* Increased padding for more breathing room */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  backdrop-filter: blur(10px);
  /* Enhanced blur */
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.7);
  /* Deeper initial shadow */
  transition: transform 0.5s ease, box-shadow 0.5s ease, background 0.5s ease;
  position: relative;
  overflow: hidden;
  /* To contain card elements */
}

.post-card:hover {
  background: rgba(255, 255, 255, 0.08);
  /* Slightly lighter on hover */
  transform: translateY(-8px);
  /* Deeper lift on hover */
  box-shadow: var(--shadow-hover);
}

/* Post Card Elements */
.post-card h2 {
  font-size: 26px;
  font-weight: 700;
  margin-bottom: 12px;
  letter-spacing: 0.6px;
  position: relative;
}

.post-card p {
  font-size: 1.1rem;
  margin-bottom: 24px;
}

.post-cover {
  width: 100%;
  height: 280px;
  /* Taller image */
  border-radius: 12px;
  object-fit: cover;
  object-position: center;
  margin-bottom: 24px;
  filter: brightness(0.9);
  /* Subtle filter */
  transition: filter 0.4s ease, transform 0.4s ease;
}

.post-cover:hover {
  filter: brightness(1);
  transform: scale(1.01);
  /* Subtle scale instead of full animation */
}

/*
 * ========================================
 * Full Story Content View (Single Post)
 * ========================================
 */

/* Main wrapper for the full story content view */
.story-content {
  background: none;
  /* No card background for the full view */
  padding: 0;
  margin: 40px auto;
  max-width: 900px;
  /* Optimal width for reading text */
  width: 100%;
  line-height: var(--line-height-base);
}

.story-content h1 {
  font-size: 3rem;
  margin-top: 0;
  margin-bottom: 20px;
  color: var(--color-primary);
  /* Use primary color for main title */
  text-align: left;
  border-bottom: 2px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 10px;
}

.story-content h2 {
  font-size: 2.2rem;
  margin-top: 40px;
  margin-bottom: 15px;
}

.story-content h3 {
  font-size: 1.6rem;
  margin-top: 30px;
  margin-bottom: 10px;
  color: var(--color-grey-100);
}

.story-content p {
  font-size: 1.15rem;
  /* Slightly larger text for comfortable reading */
  margin-bottom: 28px;
  line-height: 1.9;
  letter-spacing: 0.2px;
}

/* Blockquotes for citations or emphasis */
.story-content blockquote {
  border-left: 5px solid var(--color-secondary);
  padding: 15px 20px;
  margin: 30px 0;
  background: rgba(123, 47, 247, 0.08);
  /* Secondary accent background */
  font-style: italic;
  color: var(--color-grey-200);
  border-radius: var(--border-radius-default);
}

/* Code Blocks */
.story-content pre {
  background-color: #1e1e1e;
  /* Darker background for code */
  color: #00ffaa;
  /* Bright green text */
  padding: 15px;
  border-radius: var(--border-radius-default);
  overflow-x: auto;
  margin: 25px 0;
  font-size: 0.95rem;
  line-height: 1.5;
  border: 1px solid rgba(0, 255, 170, 0.2);
}

.story-content code {
  font-family: 'Fira Code', 'Consolas', monospace;
  background-color: rgba(255, 255, 255, 0.1);
  padding: 2px 6px;
  border-radius: 4px;
  color: #ffda6a;
  /* Inline code highlight */
}

/* Lists */
.story-content ul,
.story-content ol {
  margin: 20px 0 20px 20px;
  padding-left: 15px;
}

.story-content li {
  margin-bottom: 12px;
  font-size: 1.1rem;
  line-height: 1.7;
  color: var(--color-grey-100);
}

/* Embedded Media in Story */
.story-content img,
.story-content video {
  max-width: 100%;
  height: auto;
  display: block;
  margin: 30px auto;
  border-radius: var(--border-radius-large);
  box-shadow: var(--shadow-base);
}

/*
 * ========================================
 * Buttons & Interactions
 * ========================================
 */

.post-card button.read,
.button-container button,
.back {
  /* Consistent, high-energy gradient for primary actions */
  background: linear-gradient(45deg, #7b2ff7, #f107a3);
  border: none;
  padding: 14px 28px;
  /* Wider padding */
  color: var(--color-white);
  border-radius: 4px;
  /* Slightly sharper edge for modern contrast */
  font-weight: 700;
  cursor: pointer;
  letter-spacing: 1px;
  /* Increased spacing */
  text-transform: uppercase;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
  position: relative;
  overflow: hidden;
  transition: all 0.4s ease;
}

/* Back Button - Ensure it stands out under the story */
.back {
  display: block;
  /* Make it a block element to center it */
  margin: 60px auto 40px auto;
  /* Generous spacing above and below */
  width: auto;
  /* Shrink to content width */
}

/* Button Focus Ring */
.post-card button.read:focus,
.button-container button:focus,
.back:focus {
  outline: 2px solid var(--color-primary);
  outline-offset: 4px;
}

.post-card button.read:hover,
.button-container button:hover,
.back:hover {
  transform: translateY(-4px);
  /* Deeper lift */
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.6);
  opacity: 1;
}

/* Secondary Button Style */
.button-secondary {
  background: transparent;
  border: 1px solid var(--color-primary);
  color: var(--color-primary);
  box-shadow: none;
}

.button-secondary:hover {
  background: var(--color-primary);
  color: var(--color-white);
  box-shadow: 0 4px 15px rgba(255, 106, 0, 0.4);
}

/* Pagination */
.button-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 24px;
  /* Increased gap */
  padding: 40px 0;
}

.pagination-info {
  font-weight: var(--font-weight-bold);
  color: var(--color-grey-200);
  font-size: 1rem;
  letter-spacing: 0.4px;
  text-shadow: 0 1px 6px rgba(0, 0, 0, 0.5);
}

/*
 * ========================================
 * Utility Classes (Micro-level control)
 * ========================================
 */

.text-primary {
  color: var(--color-primary) !important;
}

.text-center {
  text-align: center !important;
}

.mb-40 {
  margin-bottom: 40px !important;
}

.glow-text {
  text-shadow: 0 0 8px var(--color-primary);
}

/* Loader Message Style */
.loader-message {
  text-align: center;
  font-size: 1.8rem;
  color: var(--color-secondary);
  padding: 100px 0;
  text-shadow: 0 0 10px rgba(123, 47, 247, 0.5);
  animation: pulse 1.5s infinite alternate;
}

@keyframes pulse {
  from {
    opacity: 0.7;
  }

  to {
    opacity: 1;
  }
}


/*
 * ========================================
 * Animations (Enhanced & Professional)
 * ========================================
 */

/* Redefining a smoother, more global fade-in */
@keyframes fadeInGlobal {
  from {
    opacity: 0;
    transform: translateY(15px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Applying global fade-in to main structural elements */
article,
header,
footer {
  animation: fadeInGlobal 0.8s ease-out 0.2s forwards;
  opacity: 0;
  /* Ensures elements are hidden before animation starts */
}

.post-card button.read:hover,
.button-container button:hover {
  animation: none;
  /* Add subtle background shine effect on hover */
  background: linear-gradient(135deg,
      #7b2ff7,
      #f107a3,
      #7b2ff7);
  /* Repeating gradient */
  background-size: 200% 200%;
  animation: shine 1.5s ease-in-out infinite alternate;
}

@keyframes shine {
  0% {
    background-position: left bottom;
  }

  100% {
    background-position: right top;
  }
}

/* Background Shift Animation - More dynamic and less distracting */
@keyframes backgroundShift {
  0% {
    background: radial-gradient(circle at 30% 30%, #151515, #000);
  }

  100% {
    background: radial-gradient(circle at 70% 70%, #1a1a1a, #0b0b0b);
  }
}

body {
  animation: backgroundShift 12s ease-in-out infinite alternate;
}

/* Post Card Text Fade-In Effect - Staggered */
.post-card h2,
.post-card p,
.post-card button.read {
  animation: articleTextFadeIn 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  opacity: 0;
}

.post-card h2 {
  animation-delay: 0.1s;
}

.post-card p {
  animation-delay: 0.2s;
}

.post-card button.read {
  animation-delay: 0.3s;
}

@keyframes articleTextFadeIn {
  0% {
    opacity: 0;
    transform: translateY(15px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

/*
 * ========================================
 * Responsive Design & Media Queries
 * ========================================
 */

@media (max-width: 1200px) {
  article {
    max-width: 1000px;
  }
}

@media (max-width: 1024px) {
  :root {
    --font-size-base: 16px;
    --header-height: 70px;
  }

  header {
    padding: 0 20px;
    height: var(--header-height);
  }

  nav.open {
    width: 240px;
  }

  .post-card {
    padding: 32px;
    margin: 24px auto;
  }

  .post-card h2 {
    font-size: 22px;
  }

  .post-card p {
    font-size: 1rem;
  }

  .post-cover {
    height: 220px;
  }

  .story-content h1 {
    font-size: 2.5rem;
  }

  .story-content p {
    font-size: 1.1rem;
  }
}

@media (max-width: 768px) {
  body {
    padding: 0 15px 40px 15px;
    /* Consistent side padding */
  }

  h1 {
    font-size: 2.2rem;
  }

  .post-card {
    padding: 24px;
    margin: 16px auto;
  }

  .post-card h2 {
    font-size: 20px;
  }

  .post-card p {
    font-size: 15px;
  }

  nav.open {
    width: 280px;
    /* Wider for better touch on mobile */
  }

  .menu-toggle {
    display: flex;
  }

  .button-container {
    gap: 16px;
    flex-wrap: wrap;
    /* Allow pagination buttons to wrap */
  }

  .story-content {
    padding: 0 10px;
  }

  .story-content h1 {
    font-size: 2rem;
  }

  .story-content h2 {
    font-size: 1.8rem;
  }

  .story-content p {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  :root {
    --header-height: 60px;
  }

  header {
    height: var(--header-height);
  }

  header .title {
    font-size: 20px;
  }

  nav.open {
    width: 100%;
    /* Full screen menu on small devices */
  }

  .post-card {
    padding: 20px;
  }

  .post-card h2 {
    font-size: 18px;
  }

  .post-card p {
    font-size: 14px;
  }

  .post-cover {
    height: 160px;
  }

  .post-card button.read {
    padding: 12px 20px;
  }
}

/* new animations */

/*
 * ========================================================
 * NEW SECTION: Digital Micro-Animations, Polish & Enterprise Aesthetics
 * ========================================================
 * These rules focus on granular details like scrollbars,
 * holographic text effects, interactive button ripples,
 * and high-fidelity form element states.
 */

/* 1. Custom Scrollbar Styling (A MUST for dark themes) */
body::-webkit-scrollbar {
  width: 10px;
  background-color: var(--color-surface);
  /* Use surface color for the track */
}

body::-webkit-scrollbar-thumb {
  background-color: var(--color-secondary);
  border-radius: 10px;
  border: 2px solid var(--color-background-dark);
}

body::-webkit-scrollbar-thumb:hover {
  background-color: var(--color-primary);
}

/* 2. High-Fidelity Form Element Focus (Inputs/Selects) */
/* Ensures form elements look professional and glow on interaction */
nav select,
nav button {
  /* Retained existing styles, enhancing focus */
  transition: all 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

nav select:focus,
nav button:focus {
  outline: none;
  /* Remove default outline */
  border-color: var(--color-primary);
  /* Concentric glow effect */
  box-shadow: 0 0 0 3px rgba(255, 106, 0, 0.3), 0 0 15px var(--color-primary);
  transform: scale(1.005);
  /* Very subtle scale fix */
}

/* 3. Button - Immediate Ripple Feedback on Click (Tactile Micro-Animation) */
/* The .button-ripple-active class must be added/removed via JavaScript 'click' event */
.post-card button.read,
.button-container button,
.back {
  position: relative;
  overflow: hidden;
  transform: translateZ(0);
  /* Ensure smooth layering */
}

/* Pseudo element for the light wave ripple effect */
.post-card button.read::after,
.button-container button::after,
.back::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 5px;
  height: 5px;
  background: radial-gradient(circle, var(--color-white) 0%, transparent 80%);
  opacity: 0;
  border-radius: 50%;
  transform: scale(0) translate(-50%, -50%);
  pointer-events: none;
}

.button-ripple-active::after {
  animation: ripple 0.6s cubic-bezier(0.1, 0.7, 0.4, 1);
}

@keyframes ripple {
  0% {
    transform: scale(0) translate(-50%, -50%);
    opacity: 0.8;
  }

  100% {
    transform: scale(40) translate(-50%, -50%);
    opacity: 0;
  }
}

/* 4. Holographic Header Text Effect (Applied to main story H1) */
/* Requires adding data-text="{Title Text}" to the HTML <h1> element */
.story-content h1 {
  position: relative;
  transform-style: preserve-3d;
  text-shadow:
    1px 1px 0 var(--color-primary),
    -1px -1px 0 var(--color-secondary);
  animation: holographicShift 10s infinite alternate cubic-bezier(0.8, 0.2, 0.2, 0.8);
}

.story-content h1::before {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  color: var(--color-secondary);
  z-index: -1;
  clip-path: inset(0 0 50% 0);
  /* Clip top half */
  animation: glitchTop 1.5s linear infinite alternate-reverse;
}

.story-content h1::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  color: var(--color-primary);
  z-index: -1;
  clip-path: inset(50% 0 0 0);
  /* Clip bottom half */
  animation: glitchBottom 1.8s linear infinite alternate;
}

@keyframes holographicShift {
  0% {
    transform: translate(0.5px, 0.5px) perspective(1px);
  }

  100% {
    transform: translate(-0.5px, -0.5px) perspective(1px);
  }
}

@keyframes glitchTop {
  0% {
    transform: translate(-2px, 2px);
  }

  50% {
    transform: translate(1px, -1px);
  }

  100% {
    transform: translate(0, 0);
  }
}

@keyframes glitchBottom {
  0% {
    transform: translate(2px, -2px);
  }

  50% {
    transform: translate(-1px, 1px);
  }

  100% {
    transform: translate(0, 0);
  }
}

/* 5. Animated Card Corner Decoration (Subtle Visual Interest) */
/* Adds a stylized, animating corner piece to the bottom right of each card */
.post-card::after {
  content: '';
  position: absolute;
  bottom: 0;
  right: 0;
  width: 25px;
  height: 25px;
  border-bottom-right-radius: var(--border-radius-large);
  background:
    linear-gradient(45deg, transparent 50%, var(--color-primary) 100%);
  transform-origin: 100% 100%;
  transition: transform 0.4s ease, opacity 0.4s ease;
  opacity: 0.5;
  z-index: 1;
}

.post-card:hover::after {
  transform: scale(2.0) rotate(5deg);
  opacity: 1;
  animation: cornerGlow 2s infinite alternate;
}

@keyframes cornerGlow {
  0% {
    filter: brightness(1);
  }

  100% {
    filter: brightness(1.5);
  }
}

/* 6. Image Container Polish (Prevents CLS and adds boundary) */
.post-cover {
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.4);
}

/* ========================== */

/*
 * ========================================================
 * 1. DEEP SCROLL, CURSOR, AND UI INPUT HACKS
 * (Micro-Level Pixel Fixes & Accessibility Polish)
 * ========================================================
 */

/* Force hardware acceleration for entire viewport to stabilize animations */
html {
  perspective: 1px;
  transform-style: preserve-3d;
  backface-visibility: hidden;
  -webkit-font-smoothing: antialiased;
  /* Sub-pixel anti-aliasing for text */
  -moz-osx-font-smoothing: grayscale;
}

/* 1.1 Hyper-Detailed Scrollbar Styling (Cross-Browser) */
body {
  scrollbar-color: var(--color-primary) var(--color-background-dark);
  /* Firefox */
  scrollbar-width: thin;
  /* Firefox */
}

/* Chrome, Edge, Safari Scrollbar */
::-webkit-scrollbar {
  width: 12px;
  background-color: var(--color-surface);
}

::-webkit-scrollbar-track {
  background: var(--color-surface);
  border-radius: 10px;
  border-left: 1px solid rgba(255, 255, 255, 0.05);
}

::-webkit-scrollbar-thumb {
  background-color: var(--color-secondary);
  border-radius: 10px;
  border: 3px solid var(--color-background-dark);
  transition: background-color 0.3s ease;
}

::-webkit-scrollbar-thumb:hover {
  background-color: var(--color-primary);
}

/* 1.2 Custom Cursor States (Interactive Feedback) */
a,
button,
.menu-toggle,
.post-card:hover {
  cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewport="0 0 100 100" style="fill:black;font-size:16px;"><text y="50%">✨</text></svg>') 16 16, pointer;
}

input[type="text"],
textarea,
select {
  cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewport="0 0 100 100" style="fill:black;font-size:16px;"><text y="50%">✏️</text></svg>') 0 16, text;
}

body {
  cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewport="0 0 100 100" style="fill:black;font-size:16px;"><text y="50%">🖱️</text></svg>') 16 16, default;
}

/* 1.3 Text Selection Styling */
::selection {
  background: var(--color-secondary);
  color: var(--color-white);
  text-shadow: none;
}

::-moz-selection {
  background: var(--color-secondary);
  color: var(--color-white);
  text-shadow: none;
}


/*
 * ========================================================
 * 2. ADVANCED BACKGROUND & ATMOSPHERE ANIMATIONS
 * (Creating Depth and Motion)
 * ========================================================
 */

/* 2.1 Static Starfield/Noise Layer (via body::after) */
body::after {
  content: '';
  position: fixed;
  top: -50%;
  left: -50%;
  right: -50%;
  bottom: -50%;
  width: 200%;
  height: 200%;
  /* Subtle diagonal line pattern for "digital noise" */
  background: repeating-linear-gradient(45deg, rgba(255, 255, 255, 0.01) 0px, rgba(255, 255, 255, 0.01) 2px, transparent 2px, transparent 150px);
  z-index: -2;
  pointer-events: none;
  animation: digitalNoise 180s linear infinite;
  /* Very slow movement */
}

@keyframes digitalNoise {
  0% {
    transform: translate(0, 0) rotate(0deg);
  }

  100% {
    transform: translate(50%, 50%) rotate(360deg);
  }
}

/* 2.2 Deep Parallax Scroll Effect for Full Story Content */
/* Requires story-content to be the scrolling container's parent, 
   and the body to have the perspective property. */

.story-content {
  z-index: 10;
  position: relative;
  transform-style: preserve-3d;
}

.story-content>* {
  /* Push content back slightly in Z space */
  transform: translateZ(-0.2px) scale(1.0002);
  transition: transform 0.5s ease;
}

/* Creates a fixed background element far away in Z space */
.story-content::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 10% 90%, rgba(123, 47, 247, 0.05) 0%, transparent 40%),
    radial-gradient(circle at 90% 10%, rgba(255, 106, 0, 0.05) 0%, transparent 40%);
  z-index: -10;
  /* Furthest layer */
  /* Place the element far away to achieve extreme parallax */
  transform: translateZ(-10px) scale(11);
  pointer-events: none;
}


/*
 * ========================================================
 * 3. COMPLEX SHIMMER & INTERACTIVE ELEMENT EFFECTS
 * (Detailing Cards, Buttons, and Links)
 * ========================================================
 */

/* 3.1 Card (post-card) Interactive Depth and Light Sweep */
.post-card {
  position: relative;
  transform-style: preserve-3d;
  /* Initial state transformation for smooth transition */
  transform: translateZ(0);
  overflow: hidden;
  will-change: transform, box-shadow;
  /* Performance optimization */
}

/* Inner highlight for card (simulating a glass surface reflection) */
.post-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255, 255, 255, 0.05) 0%, transparent 50%);
  opacity: 0;
  transition: opacity 0.5s ease;
  pointer-events: none;
}

.post-card:hover::before {
  opacity: 1;
  /* Reveals the subtle inner gradient on hover */
}

/* Border Glow Animation (Subtle, slow pulse for non-hovered state) */
.post-card {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.6), 0 0 5px rgba(255, 106, 0, 0.2);
  animation: borderPulse 8s infinite alternate ease-in-out;
}

@keyframes borderPulse {
  0% {
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.6), 0 0 5px rgba(255, 106, 0, 0.2);
  }

  50% {
    box-shadow: 0 4px 25px rgba(0, 0, 0, 0.8), 0 0 10px rgba(123, 47, 247, 0.3);
  }

  100% {
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.6), 0 0 5px rgba(255, 106, 0, 0.2);
  }
}

/* 3.2 Button - Cross-Fade Gradient and Edge Highlight */
.post-card button.read {
  transform: translateZ(5px);
  /* Lift button slightly higher than the card plane */
  will-change: transform, box-shadow;
}

.post-card button.read:hover {
  /* Enhanced shine for the shine keyframe defined previously */
  background: linear-gradient(135deg,
      #7b2ff7,
      #f107a3,
      #ff6a00,
      /* New color stop for complexity */
      #7b2ff7);
  background-size: 400% 400%;
  /* Larger size for a longer travel distance */
  animation: shine 2.5s ease-in-out infinite alternate, buttonJitter 0.3s infinite alternate;
  border: 1px solid var(--color-white);
  /* White edge highlight */
}

/* Subtle, energetic jitter when active/hovering */
@keyframes buttonJitter {
  0% {
    transform: translateY(-6px) rotate(0.1deg);
  }

  100% {
    transform: translateY(-6px) rotate(-0.1deg);
  }
}

/* 3.3 Navigation Link Micro-Glow */
nav a:hover {
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.1);
}

nav a::before {
  /* Existing slide effect, now with a transparent glow edge */
  box-shadow: 0 0 10px var(--color-primary);
}


/*
 * ========================================================
 * 4. TYPOGRAPHY AND READABILITY ENHANCEMENTS
 * (Holographic Text and Fine-Tuning)
 * ========================================================
 */

/* 4.1 Holographic Text Enhancement (for secondary headings) */
.story-content h2,
.story-content h3 {
  text-shadow:
    1px 1px 1px rgba(255, 255, 255, 0.2),
    -1px -1px 1px rgba(0, 0, 0, 0.8),
    0 0 10px rgba(255, 106, 0, 0.4);
  transition: text-shadow 0.5s ease-in-out;
}

.story-content h2:hover {
  text-shadow:
    2px 2px 5px rgba(255, 255, 255, 0.5),
    -2px -2px 5px rgba(0, 0, 0, 1),
    0 0 20px rgba(123, 47, 247, 0.8);
}

/* 4.2 Fine-Tuning Code Blocks for Visibility */
.story-content pre {
  border-left: 5px solid var(--color-primary);
  transform: translateZ(0);
  /* Isolate transform for performance */
  transition: all 0.5s ease;
}

.story-content pre:hover {
  border-left: 5px solid var(--color-secondary);
  box-shadow: 0 0 20px rgba(0, 255, 200, 0.4);
  transform: translateX(5px) scale(1.005);
}

/* 4.3 Blockquote Depth */
.story-content blockquote {
  transform: translateZ(0);
  border: 1px solid rgba(123, 47, 247, 0.2);
  box-shadow: 0 0 15px rgba(123, 47, 247, 0.1);
}

.story-content blockquote:hover {
  transform: translateZ(1px) scale(1.005);
  border-color: var(--color-secondary);
}

/*
 * ========================================================
 * 5. STAGGERED CONTENT ENTRANCE & VIEWPORT ANIMATIONS
 * (The "Visible" Class for Scroll Reveal)
 * ========================================================
 * These keyframes are designed for JavaScript to apply a 
 * '.visible' class on scroll, triggering a sophisticated,
 * staggered fade-in effect.
 */

/* Initial state for all revelable content */
.scroll-reveal {
  opacity: 0;
  transform: translateY(40px) scale(0.98);
  filter: blur(5px);
  transition: none !important;
  /* Managed by specific keyframes */
  will-change: opacity, transform, filter;
}

/* Keyframe for the final, visible state */
@keyframes contentReveal {
  0% {
    opacity: 0;
    transform: translateY(40px) scale(0.98);
    filter: blur(5px);
  }

  70% {
    opacity: 0.8;
    transform: translateY(-5px) scale(1.01);
    filter: blur(1px);
  }

  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
    filter: blur(0);
  }
}

/* Applying the staggered animation */

/* Global base reveal for cards/major sections */
.scroll-reveal.visible {
  animation: contentReveal 1.2s cubic-bezier(0.2, 0.7, 0.4, 1) forwards;
}

/* Staggering for specific content inside the story */
.story-content .scroll-reveal.visible:nth-child(1) {
  animation-delay: 0.1s;
}

.story-content .scroll-reveal.visible:nth-child(2) {
  animation-delay: 0.2s;
}

.story-content .scroll-reveal.visible:nth-child(3) {
  animation-delay: 0.3s;
}

.story-content .scroll-reveal.visible:nth-child(4) {
  animation-delay: 0.4s;
}

.story-content .scroll-reveal.visible:nth-child(5) {
  animation-delay: 0.5s;
}

.story-content .scroll-reveal.visible:nth-child(6) {
  animation-delay: 0.6s;
}

.story-content .scroll-reveal.visible:nth-child(7) {
  animation-delay: 0.7s;
}

.story-content .scroll-reveal.visible:nth-child(8) {
  animation-delay: 0.8s;
}

.story-content .scroll-reveal.visible:nth-child(9) {
  animation-delay: 0.9s;
}

.story-content .scroll-reveal.visible:nth-child(10) {
  animation-delay: 1.0s;
}

.story-content .scroll-reveal.visible:nth-child(11) {
  animation-delay: 1.1s;
}

.story-content .scroll-reveal.visible:nth-child(12) {
  animation-delay: 1.2s;
}

.story-content .scroll-reveal.visible:nth-child(13) {
  animation-delay: 1.3s;
}

.story-content .scroll-reveal.visible:nth-child(14) {
  animation-delay: 1.4s;
}

.story-content .scroll-reveal.visible:nth-child(15) {
  animation-delay: 1.5s;
}

/* Apply to specific elements that need the reveal */
.post-card,
.story-content h2,
.story-content h3,
.story-content p,
.story-content ul,
.story-content ol,
.story-content pre,
.story-content blockquote,
.story-content img,
.story-content video {

  /* Use this class for the JS integration */
  &.scroll-reveal {
    /* Use ampersand for nesting */
    opacity: 0;
    transform: translateY(30px);
    filter: blur(4px);
    transition: none;
  }
}

/* * 6. VENDOR PREFIXES FOR KEYFRAMES (Required for compatibility and length) 
 * Duplicating keyframes with prefixes to guarantee compatibility 
 */

/* Content Reveal Prefixes */
@-webkit-keyframes contentReveal {
  0% {
    opacity: 0;
    -webkit-transform: translateY(40px) scale(0.98);
    filter: blur(5px);
  }

  70% {
    opacity: 0.8;
    -webkit-transform: translateY(-5px) scale(1.01);
    filter: blur(1px);
  }

  100% {
    opacity: 1;
    -webkit-transform: translateY(0) scale(1);
    filter: blur(0);
  }
}

@-moz-keyframes contentReveal {
  0% {
    opacity: 0;
    -moz-transform: translateY(40px) scale(0.98);
    filter: blur(5px);
  }

  70% {
    opacity: 0.8;
    -moz-transform: translateY(-5px) scale(1.01);
    filter: blur(1px);
  }

  100% {
    opacity: 1;
    -moz-transform: translateY(0) scale(1);
    filter: blur(0);
  }
}

/* Digital Noise Prefixes */
@-webkit-keyframes digitalNoise {
  0% {
    -webkit-transform: translate(0, 0) rotate(0deg);
  }

  100% {
    -webkit-transform: translate(50%, 50%) rotate(360deg);
  }
}

@-moz-keyframes digitalNoise {
  0% {
    -moz-transform: translate(0, 0) rotate(0deg);
  }

  100% {
    -moz-transform: translate(50%, 50%) rotate(360deg);
  }
}

/* Border Pulse Prefixes */
@-webkit-keyframes borderPulse {
  0% {
    -webkit-box-shadow: 0 4px 20px rgba(0, 0, 0, 0.6), 0 0 5px rgba(255, 106, 0, 0.2);
  }

  50% {
    -webkit-box-shadow: 0 4px 25px rgba(0, 0, 0, 0.8), 0 0 10px rgba(123, 47, 247, 0.3);
  }

  100% {
    -webkit-box-shadow: 0 4px 20px rgba(0, 0, 0, 0.6), 0 0 5px rgba(255, 106, 0, 0.2);
  }
}

@-moz-keyframes borderPulse {
  0% {
    -moz-box-shadow: 0 4px 20px rgba(0, 0, 0, 0.6), 0 0 5px rgba(255, 106, 0, 0.2);
  }

  50% {
    -moz-box-shadow: 0 4px 25px rgba(0, 0, 0, 0.8), 0 0 10px rgba(123, 47, 247, 0.3);
  }

  100% {
    -moz-box-shadow: 0 4px 20px rgba(0, 0, 0, 0.6), 0 0 5px rgba(255, 106, 0, 0.2);
  }
}

/* Button Jitter Prefixes */
@-webkit-keyframes buttonJitter {
  0% {
    -webkit-transform: translateY(-6px) rotate(0.1deg);
  }

  100% {
    -webkit-transform: translateY(-6px) rotate(-0.1deg);
  }
}

@-moz-keyframes buttonJitter {
  0% {
    -moz-transform: translateY(-6px) rotate(0.1deg);
  }

  100% {
    -moz-transform: translateY(-6px) rotate(-0.1deg);
  }
}

/* Ripple Prefixes */
@-webkit-keyframes ripple {
  0% {
    -webkit-transform: scale(0) translate(-50%, -50%);
    opacity: 0.8;
  }

  100% {
    -webkit-transform: scale(40) translate(-50%, -50%);
    opacity: 0;
  }
}

@-moz-keyframes ripple {
  0% {
    -moz-transform: scale(0) translate(-50%, -50%);
    opacity: 0.8;
  }

  100% {
    -moz-transform: scale(40) translate(-50%, -50%);
    opacity: 0;
  }
}


/* * 7. HTML Element Structural Fixes (Preventing CLS/Jitter) 
 */

/* Ensures images have minimum heights to prevent layout shift */
.post-cover {
  min-height: 180px;
  display: block;
}

/* Consistent height for containers that load dynamic content */
.story-content {
  min-height: 80vh;
} 

  ` ;

  document.querySelector(".article").appendChild(style);
}

