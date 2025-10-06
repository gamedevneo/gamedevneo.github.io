// storyManager.js
// -----------------------------------------------------------------------------
// Professional version of StoryManager
// Handles rendering of deeply nested structured story data with props, events,
// and styles at any depth level. Supports pagination and full post rendering.
// -----------------------------------------------------------------------------

import { CONFIG } from "./config.js";
import Paginator from "./paginator.js";

export default class StoryManager {
  constructor(loaderEl, pagerEl, fetchFn, perPage) {
    this.loader = loaderEl;
    this.pager = pagerEl;
    this.fetchFn = fetchFn;
    this.paginator = new Paginator([], perPage);
    this.topic = CONFIG.defaultTopic;
  }

  /**
   * Load posts and render
   */
  setData(posts, topic = CONFIG.defaultTopic) {
    const reversed = posts.reverse();
    this.paginator.reset(reversed);
    this.topic = topic;
    this.renderList();
  }

  /**
   * Clear DOM containers
   */
  clear() {
    this.loader.innerHTML = "";
    this.pager.innerHTML = "";
  }

  /**
   * Render a paginated list or full posts
   */
  renderList() {
    this.clear();
    const pageData = this.paginator.slice;
    const settings = CONFIG.topicSettings?.[this.topic] || {};

    pageData.forEach(post => {
      const card = this.createPostCard(post, settings);
      this.loader.appendChild(card);
    });

    if (settings.pagination) {
      this.pager.style.display = "block";
      this.renderPagination();
    } else {
      this.pager.style.display = "none";
    }
  }

  /**
   * Create a post card based on topic settings
   */
  createPostCard(post, settings) {
    const card = document.createElement("div");
    card.className = "post-card";

    // Hide title/description for full posts or missing values
    if (!settings.fullPosts) {
      if (post.title) {
        const title = document.createElement("h2");
        title.textContent = post.title;
        card.appendChild(title);
      }
      if (post.description) {
        const desc = document.createElement("p");
        desc.textContent = post.description;
        card.appendChild(desc);
      }
    }

    // Cover image/video
    if (post.cover?.src) {
      const cover = document.createElement(
        post.cover.type === "video" ? "video" : "img"
      );
      cover.className = "post-cover";
      cover.src = post.cover.src;

      if (post.cover.type === "video") {
        Object.assign(cover, { autoplay: true, loop: true, muted: true });
      }

      card.appendChild(cover);
    }

    // Full or preview rendering
    if (settings.fullPosts) {
      this.renderFullPost(card, post);
    } else {
      const btn = document.createElement("button");
      btn.className = "read";
      btn.textContent = "Read More";
      btn.onclick = () => this.renderStory(post.path);
      card.appendChild(btn);
    }

    return card;
  }

  /**
   * Pagination rendering
   */
  renderPagination() {
    const wrapper = document.createElement("div");
    wrapper.className = "button-container";

    const prev = this.createButton("Prev", this.paginator.isFirstPage, () => {
      this.paginator.prev();
      this.renderList();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    const info = document.createElement("div");
    info.className = "pagination-info";
    info.textContent = `${this.paginator.page} / ${this.paginator.totalPages}`;

    const next = this.createButton("Next", this.paginator.isLastPage, () => {
      this.paginator.next();
      this.renderList();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    wrapper.append(prev, info, next);
    this.pager.appendChild(wrapper);
  }

  createButton(label, disabled, onClick) {
    const btn = document.createElement("button");
    btn.textContent = label;
    btn.disabled = disabled;
    btn.onclick = onClick;
    return btn;
  }

  /**
   * Load and render a full story (navigated from "Read More")
   */
  async renderStory(path) {
    this.clear();
    const data = await this.fetchFn(path);

    if (data.notfound) {
      this.renderNotFound();
      return;
    }

    const container = document.createElement("div");
    container.className = "story-content";

    data.forEach(item => container.appendChild(this.createElement(item)));

    this.loader.appendChild(container);
    this.appendBackButton();
  }

  /**
   * Inline full post rendering
   */
  async renderFullPost(container, post) {
    const data = await this.fetchFn(post.path);

    if (data.notfound) {
      const err = document.createElement("p");
      err.textContent = "Failed to load post.";
      container.appendChild(err);
      return;
    }

    const wrapper = document.createElement("div");
    wrapper.className = "full-post-content";

    data.forEach(item => wrapper.appendChild(this.createElement(item)));

    container.appendChild(wrapper);
  }

  /**
   * Core recursive element creator
   * Handles:
   *  - props (attributes)
   *  - styles (object or string)
   *  - events (function or inline string)
   *  - deeply nested content
   */
  createElement(item) {
    if (!item || typeof item !== "object") return document.createTextNode("");

    const elName = item.el || "div";
    const el = document.createElement(elName);

    // ✅ Apply props (attributes)
    if (Array.isArray(item.props)) {
      item.props.forEach(prop =>
        Object.entries(prop).forEach(([key, val]) => {
          el.setAttribute(key, val);
        })
      );
    }

    // ✅ Apply style
    if (item.style) {
      if (typeof item.style === "string") {
        el.style.cssText = item.style;
      } else if (typeof item.style === "object") {
        Object.assign(el.style, item.style);
      }
    }

    // ✅ Apply events
    if (Array.isArray(item.events)) {
      item.events.forEach(eventObj => {
        Object.entries(eventObj).forEach(([eventName, handler]) => {
          try {
            if (typeof handler === "function") {
              el.addEventListener(eventName, handler);
            } else if (typeof handler === "string") {
              const fn = new Function("event", handler);
              el.addEventListener(eventName, fn);
            }
          } catch (err) {
            console.warn(`Failed to bind event "${eventName}"`, err);
          }
        });
      });
    }

    // ✅ Handle nested or text content
    const content = item.content || item.conten || null;

    if (Array.isArray(content)) {
      content.forEach(child => {
        const childEl = this.createElement(child);
        el.appendChild(childEl);
      });
    } else if (typeof content === "object" && content !== null) {
      el.appendChild(this.createElement(content));
    } else if (typeof content === "string") {
      el.textContent = content;
    }

    return el;
  }

  renderNotFound() {
    const nf = document.createElement("div");
    nf.className = "post-card";
    nf.innerHTML = `
      <div class="text-content">
        <h2>Story Not Found</h2>
        <p>Sorry, this story could not be loaded. It might have been removed or unavailable.</p>
      </div>
    `;
    this.loader.appendChild(nf);
    this.appendBackButton();
  }

  appendBackButton() {
    const backBtn = this.createButton("Back", false, () => this.renderList());
    backBtn.className = "back";
    this.loader.appendChild(backBtn);
  }
}
