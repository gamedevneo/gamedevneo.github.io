import Paginator from "./paginator.js";

export default class StoryManager {
  constructor(loaderEl, pagerEl, fetchFn, perPage) {
    this.loader = loaderEl;
    this.pager = pagerEl;
    this.fetchFn = fetchFn;
    this.paginator = new Paginator([], perPage);
  }

  /**
   * Reset the paginator with new posts and render the first page
   */
  setData(posts) {
    this.paginator.reset(posts);
    this.renderList();
  }

  /**
   * Remove all content from loader and pager containers
   */
  clear() {
    this.loader.innerHTML = "";
    this.pager.innerHTML = "";
  }

  /**
   * Render a list of post previews with pagination
   */
  renderList() {
    this.clear();
    const pageData = this.paginator.slice;

    pageData.forEach(post => {
      const card = this.createPostCard(post);
      this.loader.appendChild(card);
    });

    this.renderPagination();
  }

  /**
   * Create a post preview card for the list view
   */
  createPostCard(post) {
    const card = document.createElement("div");
    card.className = "post-card";

    const title = document.createElement("h2");
    title.textContent = post.title;

    const description = document.createElement("p");
    description.textContent = post.description;

    // Check if the post has a cover image or video
    if (post.cover && post.cover.src) {
      const cover = document.createElement(post.cover.type === "video" ? "video" : "img");

      cover.className = "post-cover";
      cover.src = post.cover.src;

      // For video, set it to autoplay or loop if needed
      if (post.cover.type === "video") {
        cover.setAttribute("autoplay", "true");
        cover.setAttribute("loop", "true");
        cover.setAttribute("muted", "true");
      }

      card.appendChild(cover);
    }

    const readMoreButton = document.createElement("button");
    readMoreButton.className = "read";
    readMoreButton.textContent = "Read More";
    readMoreButton.onclick = () => this.renderStory(post.path);

    card.appendChild(title);
    card.appendChild(description);
    card.appendChild(readMoreButton);

    return card;
  }


  /**
   * Render pagination controls
   */
  renderPagination() {
    const wrapper = document.createElement("div");
    wrapper.className = "button-container";

    const prevBtn = this.createButton("Prev", this.paginator.page === 1, () => {
      this.paginator.prev();
      this.renderList();
    });

    const info = document.createElement("div");
    info.className = "pagination-info";
    info.textContent = `${this.paginator.page} / ${this.paginator.totalPages}`;

    const nextBtn = this.createButton(
      "Next",
      this.paginator.page === this.paginator.totalPages,
      () => {
        this.paginator.next();
        this.renderList();
      }
    );

    wrapper.append(prevBtn, info, nextBtn);
    this.pager.appendChild(wrapper);
  }

  /**
   * Helper to create a styled button
   */
  createButton(label, disabled, onClick) {
    const btn = document.createElement("button");
    btn.textContent = label;
    btn.disabled = disabled;
    btn.onclick = onClick;
    return btn;
  }

  /**
   * Fetch and display a single story
   */
  async renderStory(path) {
    this.clear();
    const data = await this.fetchFn(path);

    if (data.notfound) {
      this.renderNotFound();
      return;
    }

    const contentContainer = document.createElement("div");
    contentContainer.className = "story-content";

    // Iterate over the array of data
    data.forEach(item => {
      const element = this.createElement(item);
      contentContainer.appendChild(element);
    });

    this.loader.appendChild(contentContainer);
    this.appendBackButton();
  }

  /**
   * Create an HTML element based on the provided data
   */
  createElement(item) {
    const element = document.createElement(item.el);

    if (Array.isArray(item.content)) {
      item.content.forEach(subItem => {
        const listItem = document.createElement("li");
        listItem.textContent = subItem;
        element.appendChild(listItem);
      });
    } else {
      element.textContent = item.content;
    }

    if (item.props && item.props.length > 0) {
      item.props.forEach(prop => {
        Object.keys(prop).forEach(key => {
          element.setAttribute(key, prop[key]);
        });
      });
    }

    return element;
  }

  /**
   * Display a "not found" message when the story fails to load
   */
  renderNotFound() {
    const notFoundCard = document.createElement("div");
    notFoundCard.className = "post-card";
    notFoundCard.innerHTML = `
      <div class="text-content">
        <h2>Story Not Found</h2>
        <p>Sorry, the requested story could not be loaded. It may have been removed or is unavailable.</p>
      </div>
    `;
    this.loader.appendChild(notFoundCard);
    this.appendBackButton();
  }

  /**
   * Add a back button to return to the list view
   */
  appendBackButton() {
    const backBtn = this.createButton("Back", false, () => this.renderList());
    backBtn.className = "back";
    this.loader.appendChild(backBtn);
  }
}
