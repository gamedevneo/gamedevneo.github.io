// ApplicationKernel.js
// -----------------------------------------------------------------------------
// The central controller for the entire application. Manages state, data fetching,
// and delegates rendering to the DynamicContentPresenter. Modernized with private
// class fields for improved encapsulation and security enhancements.
// -----------------------------------------------------------------------------

import { CONFIG } from "./config.js";
import { AppState } from "./state.js";
import DynamicContentPresenter from "./DynamicContentPresenter.js";
import { injectStyles } from "./style.js";

/**
 * @typedef {Object} StoryContent
 * @property {string} id
 * @property {string} title
 * // ... other story properties
 */

/**
 * The core application class, responsible for initialization and control flow.
 */
class ApplicationKernel {
  // Use private class fields for true encapsulation (Modern JS)
  /** @type {AppState} */
  #applicationState;
  /** @type {HTMLElement | null} */
  #mainContentDisplayElement;
  /** @type {DynamicContentPresenter} */
  #contentPresentationEngine;

  constructor() {
    // 1. Core State Management
    this.#applicationState = new AppState(CONFIG);

    // 2. DOM Element References (Use querySelector for flexibility)
    // Coalesce to a temporary div if elements are missing, preventing runtime errors.
    this.#mainContentDisplayElement = document.getElementById("loader") ?? document.createElement('div');
    const paginationControlArea = document.getElementById("pagination") ?? document.createElement('div');

    // 3. Presentation Layer Delegation
    // Use an arrow function for the callback to implicitly bind 'this' without .bind()
    this.#contentPresentationEngine = new DynamicContentPresenter(
      this.#mainContentDisplayElement,
      paginationControlArea,
      (storyPath) => this.#retrieveDetailedStoryContent(storyPath),
      CONFIG.perPage
    );

    // 4. Initialization sequence
    this.#registerGlobalInteractionHandlers();
    injectStyles();
  }

  // --- LIFECYCLE MANAGEMENT ---

  /**
   * Initiates the primary application boot sequence.
   * @returns {Promise<void>}
   */
  async initializeApplicationBootSequence() {
    console.info("ApplicationKernel: Starting up and attempting to load default content. 🚀");
    await this.fetchAndRenderLatestContent();
  }

  // --- DATA FETCHING & PARSING (Private Methods for Logic) ---

  /**
   * SECURITY IMPROVEMENT: This function now expects to fetch a standard JSON file.
   * It is highly recommended to transition the remote story files from insecure
   * `.js` with `const data = ...` to a simple, standard, secure `.json` file.
   *
   * Fetches detailed story content from a remote file path.
   * @param {string} storyPath - The relative path to the story file (e.g., '2024/05/post-a.json').
   * @returns {Promise<StoryContent[] | null>} Structured story data or null on failure.
   */
  async #retrieveDetailedStoryContent(storyPath) {
    const { language } = this.#applicationState;
    // Assume .json extension for security and simplicity. Change this if the path includes the extension.
    const contentUrl = `/cloud/${language}/${storyPath}`;
    console.debug(`Attempting to retrieve detailed content: ${contentUrl}`);

    try {
      /** @type {StoryContent[]} */
      const structuredData = await this.#fetchJsonData(contentUrl);

      if (Array.isArray(structuredData) && structuredData.length > 0) {
        return structuredData;
      }

      console.warn(`Content retrieved was not a valid array structure or was empty: ${contentUrl}`);
      return null;

    } catch (error) {
      // #fetchJsonData already logs the error, here we return a clean failure.
      return null;
    }
  }

  /**
   * Generic, robust, and reusable function to fetch and parse JSON data from a URL.
   * @private
   * @param {string} url - The URL to fetch.
   * @returns {Promise<any | null>} Parsed JSON data or null on error.
   */
  async #fetchJsonData(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        // Use a single throw for clean error handling flow
        throw new Error(`Failed to fetch: ${url} (Status: ${response.status})`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching JSON data from ${url}:`, error);
      return null; // Return null on any fetch or parsing error
    }
  }

  // --- CONTENT LOADING & DELEGATION (Private Methods) ---

  /**
   * Displays a temporary informative message in the main content area.
   * @private
   * @param {string} message - The message to display.
   */
  #showLoaderMessage(message) {
    this.#mainContentDisplayElement.innerHTML = `<div class="loader-message">${message}</div>`;
  }

  /**
   * Orchestrates the entire content fetching and rendering process.
   * This is an arrow function to maintain 'this' context if passed as a callback.
   * @returns {Promise<void>}
   */
  fetchAndRenderLatestContent = async () => {
    const { topic, language } = this.#applicationState;
    const topicMetaUrl = `/cloud/${language}/${topic}/${topic}.json`;
    this.#showLoaderMessage(`Fetching metadata for topic: "${topic}"...`);

    try {
      const topicMetadata = await this.#fetchJsonData(topicMetaUrl);

      if (!topicMetadata || Object.keys(topicMetadata).length === 0) {
        this.#contentPresentationEngine.setData([], topic);
        return this.#showLoaderMessage(`No index structure found for topic: "${topic}".`);
      }

      const postList = await this.#locateAndDisplayRecentPosts(topicMetadata, language, topic);

      if (!postList || postList.length === 0) {
        this.#contentPresentationEngine.setData([], topic);
        this.#showLoaderMessage(`No posts available for topic: "${topic}". 🙁`);
      }

    } catch (error) {
      console.error("Critical error during content loading cycle:", error);
      this.#contentPresentationEngine.setData([], topic); // Clear content on error
      this.#showLoaderMessage("A critical error occurred while loading content.");
    }
  };

  /**
   * Finds the latest index file and delegates post list to the presentation layer.
   * @private
   * @param {Object<string, string[]>} topicMeta - Metadata object {year: [months]}.
   * @param {string} language
   * @param {string} topic
   * @returns {Promise<Object[] | null>} The list of posts found, or null.
   */
  async #locateAndDisplayRecentPosts(topicMeta, language, topic) {
    const sortedYears = Object.keys(topicMeta).sort((a, b) => Number(b) - Number(a));

    for (const year of sortedYears) {
      const months = topicMeta[year];
      // Iterate months in descending order
      for (const month of [...months].reverse()) {
        const indexUrl = `/cloud/${language}/${topic}/${year}/${month}/index.json`;
        const posts = await this.#fetchJsonData(indexUrl);

        if (posts?.length > 0) {
          // Delegation: Pass the data to the Presentation Layer
          this.#contentPresentationEngine.setData(posts, topic);
          return posts;
        }
      }
    }
    return null; // No posts were found
  }

  // --- USER INTERACTION HANDLERS (Private Methods) ---

  /**
   * Updates the application state with a new topic and refreshes content.
   * @private
   * @param {string} newTopicIdentifier
   * @returns {Promise<void>}
   */
  async #updateTopicAndRefreshContent(newTopicIdentifier) {
    if (CONFIG.topics.includes(newTopicIdentifier)) {
      this.#applicationState.setTopic(newTopicIdentifier);
      await this.fetchAndRenderLatestContent();
    } else {
      console.warn(`Attempted to switch to invalid topic: ${newTopicIdentifier}`);
    }
  }

  /**
   * Updates the application state with a new language and refreshes content.
   * @private
   * @param {string} newLanguageCode
   * @returns {Promise<void>}
   */
  async #updateLanguageAndRefreshContent(newLanguageCode) {
    if (CONFIG.languages.includes(newLanguageCode)) {
      this.#applicationState.setLanguage(newLanguageCode);
      await this.fetchAndRenderLatestContent();
    } else {
      console.warn(`Attempted to switch to invalid language: ${newLanguageCode}`);
    }
  }

  /**
   * Sets up all necessary DOM event listeners for global controls.
   * @private
   */
  #registerGlobalInteractionHandlers() {
    // Use optional chaining for safe access
    document.getElementById("topic-selector")?.addEventListener("change", (e) =>
      this.#updateTopicAndRefreshContent(/** @type {HTMLSelectElement} */ (e.target).value)
    );
    document.getElementById("language-selector")?.addEventListener("change", (e) =>
      this.#updateLanguageAndRefreshContent(/** @type {HTMLSelectElement} */ (e.target).value)
    );
    this.#setupNavigationToggleControl();
  }

  /**
   * Manages the click handler for the navigation toggle.
   * @private
   */
  #setupNavigationToggleControl = () => {
    const menuButton = document.querySelector(".menu-toggle");
    const closeButton = document.querySelector(".close-nav");
    const navigationMenu = document.querySelector("nav");

    const handleNavigationToggle = () => {
      // Use destructuring for cleaner state access
      const isCurrentlyOpen = this.#applicationState.getNavState();
      const newState = !isCurrentlyOpen;

      this.#applicationState.setNavState(newState);

      // Clean, single toggle call
      navigationMenu?.classList.toggle("open", newState);
      menuButton?.classList.toggle("active", newState);
      
      // A11Y Improvement
      menuButton?.setAttribute("aria-expanded", newState.toString());
    };

    menuButton?.addEventListener("click", handleNavigationToggle);
    closeButton?.addEventListener("click", handleNavigationToggle);
  };
}

export default ApplicationKernel;