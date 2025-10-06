import { CONFIG } from "./config.js";
import { AppState } from "./state.js";
import StoryManager from "./storyManager.js";
// import { injectStyles } from "./style.js";

class App {
  constructor() {
    this.state = new AppState(CONFIG);
    this.loaderElement = document.getElementById("loader");
    this.paginationElement = document.getElementById("pagination");
    this.storyManager = new StoryManager(
      this.loaderElement,
      this.paginationElement,
      this.fetchStory.bind(this),
      CONFIG.perPage
    );

    // injectStyles();
    this.initEventListeners();
  }

  async start() {
    await this.loadLatest();
  }

  async fetchStory(path) {
    const { language } = this.state;
    const url = `/cloud/${language}/${path}`;

    try {
      const response = await fetch(url);

      // If the response isn't OK, return a notfound object
      if (!response.ok) return { notfound: true };

      const raw = await response.text();

      // Check if the response contains a valid JavaScript 'data' object
      if (raw.includes("const data")) {
        // Safely extract 'data' from JS file
        const wrapped = `(function(){ let data; ${raw.replace("const data", "data")} return data; })()`;
        const story = Function('"use strict"; return ' + wrapped)();
        return story;
      } else {
        console.error(`Unexpected content in response: ${raw}`);
        return { notfound: true };
      }

    } catch (error) {
      console.error("Error fetching story:", error);
      return { notfound: true };
    }
  }


  showLoaderMessage(message) {
    this.loaderElement.innerHTML = `<div class="loader-message">${message}</div>`;
  }

  loadLatest = async () => {
    const { topic, language } = this.state;
    const topicMetaUrl = `/cloud/${language}/${topic}/${topic}.json`;
    this.showLoaderMessage("Loading posts...");

    try {
      const topicMeta = await this.fetchData(topicMetaUrl);
      if (!topicMeta) {
        // pass topic so StoryManager knows which topic this is
        this.storyManager.setData([], topic);
        return this.showLoaderMessage("No posts available for this topic.");
      }

      const postsFound = await this.loadPosts(topicMeta, language, topic);
      if (!postsFound) {
        // pass topic here as well
        this.storyManager.setData([], topic);
        this.showLoaderMessage("No posts available for this topic.");
      }
    } catch (error) {
      console.error("Error loading latest posts:", error);
      // fallback: pass the current state topic
      this.storyManager.setData([], this.state.topic);
      this.showLoaderMessage("Failed to load posts. Please try again later.");
    }
  };

  loadPosts = async (topicMeta, language, topic) => {
    const years = Object.keys(topicMeta).sort((a, b) => b - a);
    for (const year of years) {
      const months = topicMeta[year];
      for (const month of months.reverse()) {
        const indexUrl = `/cloud/${language}/${topic}/${year}/${month}/index.json`;
        const posts = await this.fetchData(indexUrl);
        if (posts?.length > 0) {
          // pass the active topic to StoryManager
          this.storyManager.setData(posts, topic);
          return true;
        }
      }
    }
    return false;
  };


  changeTopic = async (newTopic) => {
    if (CONFIG.topics.includes(newTopic)) {
      this.state.setTopic(newTopic);
      await this.loadLatest();
    }
  };

  changeLanguage = async (newLanguage) => {
    if (CONFIG.languages.includes(newLanguage)) {
      this.state.setLanguage(newLanguage);
      await this.loadLatest();
    }
  };

  initEventListeners = () => {
    document.getElementById("topic-selector")?.addEventListener("change", (e) => this.changeTopic(e.target.value));
    document.getElementById("language-selector")?.addEventListener("change", (e) => this.changeLanguage(e.target.value));
    this.initMenuToggleListener();
  };

  initMenuToggleListener = () => {
    const menuButton = document.querySelector(".menu-toggle");
    const closeButton = document.querySelector(".close-nav");
    const navMenu = document.querySelector("nav");

    const toggleNavMenu = () => {
      const isNavOpen = this.state.getNavState();
      this.state.setNavState(!isNavOpen);
      navMenu.style.width = isNavOpen ? "0%" : "100%";
    };

    menuButton?.addEventListener("click", toggleNavMenu);
    closeButton?.addEventListener("click", toggleNavMenu);
  };

  async fetchData(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${url}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  }
}

export default App;
