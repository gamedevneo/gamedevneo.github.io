// DynamicContentPresenter.js
// -----------------------------------------------------------------------------
// Core Component: Handles the presentation logic, rendering of post lists,
// single stories, and manages all dynamic DOM interactions and pagination.
// Implements explicit cleanup routines for memory efficiency.
// -----------------------------------------------------------------------------

import { CONFIG } from "./config.js";
import Paginator from "./paginator.js";

/**
 * The DynamicContentPresenter is responsible for interpreting application state
 * and post data to render the main content area (loader) and pagination controls.
 * It manages event listeners and post lifecycle within the DOM.
 */
export default class DynamicContentPresenter {
  /**
   * Initializes the presenter with necessary DOM elements and data fetching methods.
   * @param {HTMLElement} contentContainerEl - The primary element where posts/stories are loaded (e.g., #loader).
   * @param {HTMLElement} paginationContainerEl - The element dedicated to hosting pagination controls.
   * @param {Function} dataFetchFunction - A bound function from App to fetch detailed story content by path.
   * @param {number} postsPerPage - The maximum number of posts to display per page.
   */
  constructor(contentContainerEl, paginationContainerEl, dataFetchFunction, postsPerPage) {
    this.contentContainerElement = contentContainerEl;
    this.paginationContainerElement = paginationContainerEl;
    this.storyDataFetcher = dataFetchFunction;
    this.paginator = new Paginator([], postsPerPage);
    this.activeTopic = CONFIG.defaultTopic;
    
    // Explicitly track listeners that are *not* automatically destroyed by innerHTML replacement
    // E.g., listeners attached to the pagination wrapper or the contentContainerElement itself.
    this.managedEventListeners = []; 
  }

  /**
   * -------------------------------------------------------------------------
   * LIFECYCLE & CLEANUP METHODS
   * -------------------------------------------------------------------------
   */

  /**
   * Removes all tracked, dynamically attached event listeners.
   * This is CRITICAL for memory leak prevention when the content changes topic or page.
   */
  cleanupManagedEvents() {
    this.managedEventListeners.forEach(({ element, type, handler }) => {
      // Safely attempt to remove the listener
      try {
        element.removeEventListener(type, handler);
      } catch (error) {
        console.warn('Failed to clean up event listener:', error);
      }
    });
    this.managedEventListeners = []; // Reset the list
    
    // Explicitly clear the DOM to ensure old nodes are garbage collected
    this.contentContainerElement.innerHTML = "";
    this.paginationContainerElement.innerHTML = "";
  }

  /**
   * Attaches an event listener and stores its reference for later explicit removal.
   * @param {HTMLElement} element - The DOM element to attach the listener to.
   * @param {string} type - The event type (e.g., 'click').
   * @param {Function} handler - The handler function.
   */
  attachManagedListener(element, type, handler) {
    element.addEventListener(type, handler);
    this.managedEventListeners.push({ element, type, handler });
  }

  /**
   * Updates the component with new post data, triggers cleanup, and renders the initial list.
   * @param {Array<Object>} newPostList - The full array of posts for the current topic.
   * @param {string} newTopic - The currently active topic identifier.
   */
  setData(newPostList, newTopic = CONFIG.defaultTopic) {
    this.cleanupManagedEvents(); // Ensure old listeners are gone before new render cycle
    
    // IMPORTANT: Clone the array before reversing to preserve immutability outside this function.
    const reversedPosts = [...newPostList].reverse(); 
    
    this.paginator.reset(reversedPosts);
    this.activeTopic = newTopic;
    this.renderPostList();
  }

  /**
   * -------------------------------------------------------------------------
   * RENDERING LOGIC (LIST/PAGINATION)
   * -------------------------------------------------------------------------
   */

  /**
   * Renders the current page's list of posts or a full content view based on topic settings.
   */
  renderPostList() {
    this.cleanupManagedEvents();
    
    const postsToRender = this.paginator.slice;
    const activeTopicSettings = CONFIG.topicSettings?.[this.activeTopic] || {};

    const fragment = document.createDocumentFragment();

    postsToRender.forEach(postData => {
      const postCardElement = this.buildPostCard(postData, activeTopicSettings);
      fragment.appendChild(postCardElement);
    });

    this.contentContainerElement.appendChild(fragment);

    // Render pagination controls if configured for the current topic
    if (activeTopicSettings.pagination) {
      this.paginationContainerElement.style.display = "flex";
      this.renderPaginationControls();
    } else {
      this.paginationContainerElement.style.display = "none";
    }
    
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  /**
   * Constructs a single post card element.
   */
  buildPostCard(post, settings) {
    const cardElement = document.createElement("div");
    cardElement.className = "post-card";

    // --- 1. Title, Description, and Media ---
    if (!settings.fullPosts) {
      if (post.title) {
        const title = document.createElement("h2");
        title.textContent = post.title;
        cardElement.appendChild(title);
      }
      if (post.description) {
        const desc = document.createElement("p");
        desc.textContent = post.description;
        cardElement.appendChild(desc);
      }
    }

    if (post.cover?.src) {
      const isVideo = post.cover.type === "video";
      const mediaElement = document.createElement(isVideo ? "video" : "img");
      mediaElement.className = "post-cover";
      mediaElement.src = post.cover.src;
      
      // PERFORMANCE: Lazy load media to reduce initial bandwidth
      mediaElement.setAttribute('loading', 'lazy');

      if (isVideo) {
        Object.assign(mediaElement, { autoplay: true, loop: true, muted: true, playsinline: true });
      }

      cardElement.appendChild(mediaElement);
    }
    
    // --- 2. Action Button or Inline Content ---
    if (settings.fullPosts) {
      // Renders the full post content immediately inside the card
      this.renderInlinePostContent(cardElement, post);
    } else {
      // Renders a "Read More" button to navigate to the single story view
      const readMoreButton = this.createActionButton("Read More", false, () => 
        this.renderSingleStoryView(post.path)
      );
      readMoreButton.className = "read";
      cardElement.appendChild(readMoreButton);
    }

    return cardElement;
  }

  /**
   * Renders the Prev/Next buttons and page information.
   */
  renderPaginationControls() {
    this.paginationContainerElement.innerHTML = ''; // Clear previous controls
    
    const wrapper = document.createElement("div");
    wrapper.className = "button-container";
    
    // Previous Button
    const previousButton = this.createActionButton("Prev", this.paginator.isFirstPage, () => {
      this.paginator.prev();
      this.renderPostList();
    });

    // Page Info
    const infoDisplay = document.createElement("div");
    infoDisplay.className = "pagination-info";
    infoDisplay.textContent = `${this.paginator.page} / ${this.paginator.totalPages}`;

    // Next Button
    const nextButton = this.createActionButton("Next", this.paginator.isLastPage, () => {
      this.paginator.next();
      this.renderPostList();
    });

    wrapper.append(previousButton, infoDisplay, nextButton);
    this.paginationContainerElement.appendChild(wrapper);
  }

  /**
   * Helper function to create interactive buttons and manage their listeners.
   */
  createActionButton(label, isDisabled, clickHandler) {
    const buttonElement = document.createElement("button");
    buttonElement.textContent = label;
    buttonElement.disabled = isDisabled;
    
    // Attach and manage listener to ensure cleanup on re-render
    this.attachManagedListener(buttonElement, 'click', clickHandler);
    
    return buttonElement;
  }


  /**
   * -------------------------------------------------------------------------
   * SINGLE STORY RENDERING LOGIC
   * -------------------------------------------------------------------------
   */
  
  /**
   * Loads and renders a single, full story into the main content area.
   * This is typically triggered by clicking 'Read More'.
   */
  async renderSingleStoryView(path) {
    this.cleanupManagedEvents(); // Remove all list-based events
    this.paginationContainerElement.style.display = "none";

    // Display a loader message while data is being fetched
    this.contentContainerElement.innerHTML = '<div class="loader-message">Loading story content...</div>';
    
    const storyData = await this.storyDataFetcher(path);

    this.contentContainerElement.innerHTML = ''; // Clear loader
    
    if (storyData.notfound) {
      this.renderErrorState("Story Not Found", "Sorry, this story could not be loaded or accessed.");
      return;
    }

    const storyContentWrapper = document.createElement("div");
    storyContentWrapper.className = "story-content";

    storyData.forEach(item => storyContentWrapper.appendChild(this.recursivelyCreateElement(item)));

    this.contentContainerElement.appendChild(storyContentWrapper);
    this.appendBackButton();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  /**
   * Loads and renders a full post's content directly into its card (for static pages).
   */
  async renderInlinePostContent(container, post) {
    container.innerHTML = '<h2>Loading Post...</h2>'; // Temporary inline loader
    
    const postData = await this.storyDataFetcher(post.path);
    
    container.innerHTML = ''; // Clear inline loader

    if (postData.notfound) {
      container.innerHTML = '<p class="error-text">Failed to load content for this section.</p>';
      return;
    }

    // Append content directly to the card container
    postData.forEach(item => container.appendChild(this.recursivelyCreateElement(item))); 
  }

  /**
   * -------------------------------------------------------------------------
   * CORE STRUCTURED DATA PROCESSOR
   * -------------------------------------------------------------------------
   */
  
  /**
   * Core recursive function to convert structured JSON/JS data into DOM elements.
   * This method handles dynamic properties, styles, and event binding for complex content.
   * @param {Object} item - The structured data object for a single element.
   * @returns {HTMLElement|Text} The created DOM node.
   */
  recursivelyCreateElement(item) {
    if (!item || typeof item !== "object") {
        return document.createTextNode(item !== null ? String(item) : "");
    }

    const elementName = item.el || "div";
    const newElement = document.createElement(elementName);

    // Apply props (attributes)
    if (Array.isArray(item.props)) {
      item.props.forEach(prop =>
        Object.entries(prop).forEach(([key, val]) => newElement.setAttribute(key, val))
      );
    }

    // Apply style (object or string)
    if (item.style) {
      if (typeof item.style === "string") {
        newElement.style.cssText = item.style;
      } else if (typeof item.style === "object") {
        Object.assign(newElement.style, item.style);
      }
    }

    // Apply events
    if (Array.isArray(item.events)) {
      item.events.forEach(eventObject => {
        Object.entries(eventObject).forEach(([eventName, handler]) => {
          try {
            if (typeof handler === "function") {
              this.attachManagedListener(newElement, eventName, handler);
            } else if (typeof handler === "string") {
              // SECURITY WARNING: new Function() executes arbitrary strings as code.
              // This feature relies on the content being trusted.
              const dynamicFunction = new Function("event", handler); 
              this.attachManagedListener(newElement, eventName, dynamicFunction);
            }
          } catch (error) {
            console.error(`Dynamic Event Binding Failed for "${eventName}"`, error);
          }
        });
      });
    }

    // Handle nested content or final text
    const contentPayload = item.content || null; 

    if (Array.isArray(contentPayload)) {
      contentPayload.forEach(child => newElement.appendChild(this.recursivelyCreateElement(child)));
    } else if (typeof contentPayload === "object" && contentPayload !== null) {
      newElement.appendChild(this.recursivelyCreateElement(contentPayload));
    } else if (typeof contentPayload === "string" || typeof contentPayload === "number") {
      newElement.textContent = String(contentPayload);
    }

    return newElement;
  }

  /**
   * -------------------------------------------------------------------------
   * UTILITY METHODS
   * -------------------------------------------------------------------------
   */

  /**
   * Renders a generic error message and a back button.
   */
  renderErrorState(title, message) {
    const errorCard = document.createElement("div");
    errorCard.className = "post-card error-card";
    errorCard.innerHTML = `
      <div class="text-content">
        <h2>${title}</h2>
        <p>${message}</p>
      </div>
    `;
    this.contentContainerElement.appendChild(errorCard);
    this.appendBackButton();
  }

  /**
   * Appends the 'Back' button, which returns the user to the list view.
   */
  appendBackButton() {
    const backButton = this.createActionButton("Back to List", false, () => this.renderPostList());
    backButton.className = "back";
    this.contentContainerElement.appendChild(backButton);
  }
}
