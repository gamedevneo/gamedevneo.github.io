import App from "./app.js";

const app = new App();

try {
    app.start();
} catch (error) {
    console.error("App failed to start:", error);
}
