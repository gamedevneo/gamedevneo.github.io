import ApplicationKernel from './app.js';

/**
 * The main entry point for the application.
 * It waits for the DOM content to be fully loaded before initiating the
 * primary application boot sequence.
 */
document.addEventListener('DOMContentLoaded', () => {
    // Instantiate the core application controller (Kernel)
    const kernel = new ApplicationKernel();

    // Start the application's primary loading sequence.
    // This method handles state initialization, loading, and initial rendering.
    kernel.initializeApplicationBootSequence();
});
