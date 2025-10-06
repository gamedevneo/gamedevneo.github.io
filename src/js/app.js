// ApplicationKernel.js
// -----------------------------------------------------------------------------
// The central controller for the entire application. It manages state changes,
// handles communication with the data fetching layer, and delegates rendering
// tasks to the DynamicContentPresenter.
// -----------------------------------------------------------------------------

import { CONFIG } from "./config.js";
import { AppState } from "./state.js";
import DynamicContentPresenter from "./DynamicContentPresenter.js";
import { injectStyles } from "./style.js";
/**
 * The core application class, responsible for initialization and control flow.
 */
class ApplicationKernel {
  constructor() {
    // Core State Management
    this.applicationState = new AppState(CONFIG);

    // DOM Element References (renamed for explicit clarity)
    this.mainContentDisplayElement = document.getElementById("loader");
    this.paginationControlArea = document.getElementById("pagination");

    // Presentation Layer Delegation
    this.contentPresentationEngine = new DynamicContentPresenter(
      this.mainContentDisplayElement,
      this.paginationControlArea,
      this.retrieveDetailedStoryContent.bind(this),
      CONFIG.perPage
    );

    // Initialization sequence
    this.registerGlobalInteractionHandlers();
    injectStyles();
  }

  /**
   * -------------------------------------------------------------------------
   * LIFECYCLE MANAGEMENT
   * -------------------------------------------------------------------------
   */

  /**
   * Initiates the primary application boot sequence.
   */
  async initializeApplicationBootSequence() {
    console.info("ApplicationKernel: Starting up and attempting to load default content.");
    await this.fetchAndRenderLatestContent();
  }

  /**
   * -------------------------------------------------------------------------
   * DATA FETCHING & PARSING
   * -------------------------------------------------------------------------
   */

  /**
   * Fetches detailed story content from a remote JS file path.
   * This is delegated to by the Content Presentation Engine for 'Read More' actions.
   * @param {string} storyPath - The relative path to the story file (e.g., '2024/05/post-a.js').
   * @returns {Promise<Array<Object> | {notfound: boolean}>} Structured story data or a failure object.
   */
  async retrieveDetailedStoryContent(storyPath) {
    const { language } = this.applicationState;
    const contentUrl = `/cloud/${language}/${storyPath}`;
    console.debug(`Attempting to retrieve detailed content: ${contentUrl}`);

    try {
      const response = await fetch(contentUrl);
      if (!response.ok) {
        console.warn(`Content not found or inaccessible: ${contentUrl}`);
        return { notfound: true };
      }

      const rawJsContent = await response.text();

      // SECURITY & ROBUSTNESS: Safely extract 'data' from the external JavaScript file
      if (rawJsContent.includes("const data")) {
        // Wrap the content into an immediately invoked function to execute and return the 'data' variable.
        const wrappedExecution = `(function(){ let data; ${rawJsContent.replace("const data", "data")} return data; })()`;

        // Use Function constructor for sandboxing data execution.
        // NOTE: This assumes content from /cloud/ is trusted.
        const structuredData = Function('"use strict"; return ' + wrappedExecution)();

        if (Array.isArray(structuredData)) {
          return structuredData;
        } else {
          console.error("Parsed content is not a valid array structure.");
          return { notfound: true };
        }
      } else {
        console.error(`Story content file missing 'const data' definition: ${contentUrl}`);
        return { notfound: true };
      }

    } catch (error) {
      console.error(`Severe error during story content retrieval (${contentUrl}):`, error);
      return { notfound: true };
    }
  }

  /**
   * Generic function to fetch and parse JSON data from a URL.
   */
  async fetchJsonData(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch JSON: ${url} (Status: ${response.status})`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching JSON data:", error);
      return null;
    }
  }

  /**
   * -------------------------------------------------------------------------
   * CONTENT LOADING & DELEGATION
   * -------------------------------------------------------------------------
   */

  /**
   * Displays a temporary informative message in the main content area.
   */
  showLoaderMessage(message) {
    this.mainContentDisplayElement.innerHTML = `<div class="loader-message">${message}</div>`;
  }

  /**
   * Orchestrates the process of fetching the metadata, locating the latest post index,
   * and initiating the rendering process via the Content Presenter.
   */
  fetchAndRenderLatestContent = async () => {
    const { topic, language } = this.applicationState;
    const topicMetaUrl = `/cloud/${language}/${topic}/${topic}.json`;
    this.showLoaderMessage(`Fetching metadata for topic: "${topic}"...`);

    try {
      const topicMetadata = await this.fetchJsonData(topicMetaUrl);

      if (!topicMetadata || Object.keys(topicMetadata).length === 0) {
        this.contentPresentationEngine.setData([], topic);
        return this.showLoaderMessage(`No index structure found for topic: "${topic}".`);
      }

      const postList = await this.locateAndDisplayRecentPosts(topicMetadata, language, topic);

      if (!postList || postList.length === 0) {
        this.contentPresentationEngine.setData([], topic);
        this.showLoaderMessage(`No posts available for topic: "${topic}".`);
      }

    } catch (error) {
      console.error("Critical error during content loading cycle:", error);
      this.contentPresentationEngine.setData([], this.applicationState.topic);
      this.showLoaderMessage("A critical error occurred while loading content.");
    }
  };

  /**
   * Iterates through the topic metadata (years/months) to find the most recent
   * available post index file and extracts the list of posts.
   */
  locateAndDisplayRecentPosts = async (topicMeta, language, topic) => {
    const sortedYears = Object.keys(topicMeta).sort((a, b) => b - a);

    for (const year of sortedYears) {
      const months = topicMeta[year];
      // Iterate months in descending order (assuming index is latest-first)
      for (const month of [...months].reverse()) {
        const indexUrl = `/cloud/${language}/${topic}/${year}/${month}/index.json`;
        const posts = await this.fetchJsonData(indexUrl);

        if (posts?.length > 0) {
          // Delegation: Pass the data and the active topic to the Presentation Layer
          this.contentPresentationEngine.setData(posts, topic);
          return posts;
        }
      }
    }
    return null; // Indicates no posts were found across all indexed locations
  };


  /**
   * -------------------------------------------------------------------------
   * USER INTERACTION HANDLERS
   * -------------------------------------------------------------------------
   */

  /**
   * Updates the application state with a new topic and refreshes content.
   */
  updateTopicAndRefreshContent = async (newTopicIdentifier) => {
    if (CONFIG.topics.includes(newTopicIdentifier)) {
      this.applicationState.setTopic(newTopicIdentifier);
      await this.fetchAndRenderLatestContent();
    } else {
      console.warn(`Attempted to switch to invalid topic: ${newTopicIdentifier}`);
    }
  };

  /**
   * Updates the application state with a new language and refreshes content.
   */
  updateLanguageAndRefreshContent = async (newLanguageCode) => {
    if (CONFIG.languages.includes(newLanguageCode)) {
      this.applicationState.setLanguage(newLanguageCode);
      await this.fetchAndRenderLatestContent();
    } else {
      console.warn(`Attempted to switch to invalid language: ${newLanguageCode}`);
    }
  };

  /**
   * Sets up all necessary DOM event listeners for global controls.
   */
  registerGlobalInteractionHandlers = () => {
    document.getElementById("topic-selector")?.addEventListener("change", (e) =>
      this.updateTopicAndRefreshContent(e.target.value)
    );
    document.getElementById("language-selector")?.addEventListener("change", (e) =>
      this.updateLanguageAndRefreshContent(e.target.value)
    );
    this.setupNavigationToggleControl();
  };

  /**
   * Manages the click handler for the hamburger menu (menu-toggle).
   */
  setupNavigationToggleControl = () => {
    const menuButton = document.querySelector(".menu-toggle");
    const closeButton = document.querySelector(".close-nav");
    const navigationMenu = document.querySelector("nav");

    const handleNavigationToggle = () => {
      const isCurrentlyOpen = this.applicationState.getNavState();
      const newState = !isCurrentlyOpen;

      this.applicationState.setNavState(newState);

      // Utilize CSS classes for animated transitions and styling
      navigationMenu?.classList.toggle("open", newState);
      navigationMenu?.classList.toggle("close", !newState);
      menuButton?.classList.toggle("active", newState);

      // A11Y Improvement: Update ARIA attribute for screen readers
      menuButton?.setAttribute("aria-expanded", newState ? "true" : "false");
    };

    menuButton?.addEventListener("click", handleNavigationToggle);
    closeButton?.addEventListener("click", handleNavigationToggle);
  };
}

export default ApplicationKernel;
