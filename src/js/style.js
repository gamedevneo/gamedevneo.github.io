export function injectStyles() {
  const style = document.createElement("style");
  style.textContent = `
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      background-color: black;
      color:white;
      font-family: 'Montserrat', system-ui, sans-serif;
      font-size: 18px;
      line-height: 1.9;
      width: 100%;
      letter-spacing: 0.2px;
    }

    header {
      height: 50px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: linear-gradient(135deg, #e0093e, #480c7a);
      padding: 25px 20px;
      text-align: center;
      color: #fff;
      box-shadow: 0 3px 10px rgba(0, 0, 0, 0.5);
      font-family: 'Montserrat', system-ui, sans-serif;
      font-weight: 600;
      letter-spacing: 0.5px;
    }

    .title {
      font-size: 20px;
    }

    /* Menu toggle for mobile screens */
    .menu-toggle {
      display: flex;
      align-items: center;
      flex-direction: column;
    }

    .menu-toggle > hr {
      border: none;
      height: 2px;
      width: 20px;
      background-color: white;
      margin: 2px;
    }


    nav {
      width: 0;
      position: absolute;
      top: 0;
      left: 0;
      background: #480c7a;
      min-height: 100%;
      overflow-x: hidden;
      overflow-y:auto;
      transition: width 0.5s ease;
      padding-top: 100px;
      padding-bottom:100px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

  
    /* Center the select elements and make them same width */
    nav select, nav button {
      width: 100px;
      height:50px;
      margin: 15px 0;
      padding: 12px;
      background-color: #fff;
      border: 1px solid #ddd;
      border-radius: 5px;
      font-size: 16px;
      color: #333;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
    }

    nav select:hover, nav button:hover {
      box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
      transform: translateY(-2px);
    }

    /* Center the button */
    nav button {
      background: linear-gradient(135deg, #ff512f, #dd2476);
      color: #fff;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-size: 16px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
      transition: all 0.3s ease;
    }

    nav button:hover {
      background: linear-gradient(135deg, #ff6a00, #ff3b67);
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
      transform: translateY(-2px);
    }

    article { padding:20px;}

    .post-card {
      max-width:900px;
      min-height: 250px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      background: linear-gradient(135deg, #e0093e, #480c7a);
      margin: 20px auto;
      padding: 24px;
      border-radius: 12px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.6);
    }

    .post-card h2 {
      color: #fff;
      margin-top: 0;
      font-weight: 700;
      letter-spacing: 0.5px;
    }

    .post-card p {
      color: #fff;
      margin-bottom:10px;
    }

      .post-card button.read,
    .button-container button,
    .back {
      background: linear-gradient(135deg, #ff512f, #dd2476);
      color: #fff;
      border: none;
      padding: 10px 18px;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 600;
      letter-spacing: 0.4px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.35);
      transition: transform 0.25s ease, box-shadow 0.25s ease, opacity 0.2s ease;
    }

    .post-card button.read:hover,
    .button-container button:hover,
    .back:hover {
      opacity: 0.9;
      transform: translateY(-2px);
      box-shadow: 0 6px 14px rgba(0, 0, 0, 0.45);
    }

    .button-container {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 14px;
      padding: 20px;
    }

    .pagination-into {
      color: #ccc;
      font-weight: 600;
      text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    }

   
  `;
  document.head.appendChild(style);
}