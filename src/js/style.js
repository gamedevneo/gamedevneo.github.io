// style.js

/**
 * Injects professional, premium styles inspired by top-tier enterprise websites (Accenture-like style).
 * Refined animations, responsiveness, accessibility, and micro-level perfection for a top-notch user experience.
 */
export function injectStyles() {
  const style = document.createElement("style");
  style.textContent = `
    /* --- Global Reset and Foundation --- */
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      scroll-behavior: smooth;
      transition: all 0.3s ease;
    }

    html, body {
      height: 100%;
      width: 100%;
      font-family: 'Montserrat', system-ui, sans-serif;
      font-size: 17px;
      line-height: 1.8;
      color: #e8e8e8;
      background-color: #0b0b0b;
      overflow-x: hidden;
    }

    body {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      background: radial-gradient(circle at 30% 30%, #151515, #000);
      transition: background 0.8s ease-in-out;
      padding-bottom: 40px;
    }

    /* --- Typography --- */
    h1, h2, h3, h4, h5, h6 {
      font-family: 'Montserrat', system-ui, sans-serif;
      font-weight: 800;
      line-height: 1.4;
      color: #fff;
      letter-spacing: 0.5px;
      transition: color 0.3s ease;
    }

    p {
      font-size: 16px;
      color: #dcdcdc;
      line-height: 1.7;
      letter-spacing: 0.3px;
      transition: color 0.3s ease;
    }

    a {
      text-decoration: none;
      color: inherit;
      transition: color 0.3s ease, transform 0.2s ease;
    }

    a:hover {
      color: #ff6a00;
      transform: translateY(-2px);
    }

    /* --- Header --- */
    header {
      width: 100%;
      height: 80px;
      background: linear-gradient(135deg, #7c19ff, #e0093e);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 30px;
      color: #fff;
      box-shadow: 0 2px 20px rgba(0, 0, 0, 0.6);
      position: sticky;
      top: 0;
      z-index: 100;
      transition: all 0.4s ease;
    }

    header:hover {
      background: linear-gradient(135deg, #a639ff, #ff256f);
    }

    header .title {
      font-weight: 700;
      font-size: 24px;
      letter-spacing: 0.8px;
      transition: transform 0.4s ease, opacity 0.4s ease;
    }

    header .title:hover {
      opacity: 0.9;
      transform: translateY(-3px);
    }

    /* --- Navigation Menu --- */
    nav {
      position: fixed;
      top: 0;
      left: 0;
      height: 100%;
      width: 0;
      background: #1c0033;
      overflow: hidden;
      transition: width 0.5s ease-in-out;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      box-shadow: 3px 0 20px rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(6px);
      z-index: 999;
    }


    nav select,
    nav button {
      width: 100px;
      height: 50px;
      margin: 16px 0;
      border-radius: 8px;
      border: 1px solid rgba(255, 255, 255, 0.15);
      background-color: rgba(255, 255, 255, 0.05);
      color: #fff;
      font-size: 16px;
      font-weight: 600;
      text-align: center;
      letter-spacing: 0.6px;
      transition: all 0.3s ease;
    }

    nav select:hover,
    nav button:hover {
      background-color: rgba(255, 255, 255, 0.1);
      transform: translateY(-3px);
      box-shadow: 0 6px 22px rgba(0, 0, 0, 0.4);
    }

    nav button {
      background: linear-gradient(135deg, #ff5b00, #d91480);
      border: none;
      color: #05194eff;
      font-weight: 700;
      text-transform: uppercase;
      cursor: pointer;
      letter-spacing: 1px;
    }

    nav button:hover {
      background: linear-gradient(135deg, #ff7b3b, #ff3b8b);
      transform: translateY(-2px) scale(1.05);
    }

    /* --- Menu Toggle Button --- */
    .menu-toggle {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .menu-toggle:hover {
      opacity: 0.85;
      transform: scale(1.1);
    }

    .menu-toggle hr {
      width: 20px;
      height: 2px;
      background-color: #fff;
      border: none;
      margin: 2px;
      border-radius: 2px;
      transition: all 0.3s ease;
    }

    /* --- Article & Post Cards --- */
    article {
      padding: 50px 20px;
      width: 100%;
      max-width: 1200px;
    }

    .post-card {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 18px;
      margin: 24px auto;
      padding: 36px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-start;
      backdrop-filter: blur(8px);
      box-shadow: 0 2px 24px rgba(0, 0, 0, 0.7);
      transition: transform 0.5s ease, box-shadow 0.5s ease, background 0.5s ease;
    }

    .post-card:hover {
      background: rgba(255, 255, 255, 0.1);
      transform: translateY(-4px) scale(1.03);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.8);
    }

    .post-card h2 {
      color: #fff;
      font-size: 24px;
      font-weight: 700;
      margin-bottom: 16px;
      letter-spacing: 0.6px;
      transition: color 0.3s ease;
    }

    .post-card p {
      color: #dcdcdc;
      font-size: 18px;
      margin-bottom: 24px;
    }

    .post-cover {
      width: 100%;
      height: 240px;
      border-radius: 10px;
      object-fit: cover;
      object-position: center;
      margin-bottom: 20px;
      filter: brightness(0.85);
      transition: filter 0.4s ease;
    }

    .post-cover:hover {
      filter: brightness(1);
    }

    /* --- Buttons --- */
    .post-card button.read,
    .button-container button,
    .back {
      background: linear-gradient(135deg, #7b2ff7, #f107a3);
      border: none;
      padding: 14px 24px;
      color: #ffffffff;
      border-radius: 8px;
      font-weight: 700;
      cursor: pointer;
      letter-spacing: 0.5px;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.35);
      transition: all 0.4s ease;
    }

    .post-card button.read:hover,
    .button-container button:hover,
    .back:hover {
      transform: translateY(-3px) scale(1.05);
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.45);
      opacity: 0.95;
    }

    /* --- Pagination --- */
    .button-container {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 18px;
      padding: 30px 0;
    }

    .pagination-into {
      font-weight: 700;
      color: #bcbcbc;
      font-size: 16px;
      letter-spacing: 0.4px;
      text-shadow: 0 1px 6px rgba(0, 0, 0, 0.5);
    }

    /* --- Animations --- */
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }

    article, .post-card, header, nav, button {
      animation: fadeIn 0.6s ease forwards;
    }

    /* --- Responsiveness --- */
    @media (max-width: 1024px) {
      header {
        padding: 0 20px;
      }

      nav.open {
        width: 220px;
      }

      .post-card {
        padding: 28px;
        margin: 18px auto;
      }

      .post-card h2 {
        font-size: 22px;
      }

      .post-card p {
        font-size: 15px;
      }

      .post-cover {
        height: 200px;
      }

      .button-container {
        padding: 20px 0;
      }
    }

    @media (max-width: 768px) {
      body {
        padding-left: 20px;
        padding-right: 20px;
      }

      .post-card {
        padding: 24px;
        margin: 16px auto;
      }

      .post-card h2 {
        font-size: 20px;
      }

      .post-card p {
        font-size: 14px;
      }

      nav.open {
        width: 200px;
      }

      .menu-toggle {
        display: flex;
      }
    }

    @media (max-width: 480px) {
      header {
        height: 70px;
      }

      .menu-toggle hr {
        width: 20px;
      }

      nav {
        width: 0;
      }

      .post-card {
        padding: 20px;
      }

      .post-card h2 {
        font-size: 18px;
      }

      .post-card p {
        font-size: 12px;
      }

      .post-cover {
        height: 180px;
      }
    }
  `;
  document.head.appendChild(style);
}

