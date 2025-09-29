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

    // Create post cards
    pageData.forEach(post => {
      const card = document.createElement("div");
      card.className = "post-card";
      card.innerHTML = `
      <div class="text-content">
        <h2>${post.title}</h2>
        <p>${post.description}</p>
      </div>
        <button class="read">Read More</button>
      `;
      card.querySelector(".read").onclick = () => this.renderStory(post.path);
      this.loader.appendChild(card);
    });

    this.renderPagination();
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
    info.className = "pagination-into";
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

    // Render story content
    Object.entries(data).forEach(([tag, content]) => {
      const el =
        tag === "script"
          ? Object.assign(document.createElement("script"), { textContent: content })
          : Object.assign(document.createElement(tag), { innerHTML: content });

      this.loader.appendChild(el);
    });

    this.appendBackButton();
  }

  /**
   * Display a "not found" message when story fails to load
   */
  renderNotFound() {
    const card = document.createElement("div");
    card.className = "post-card";
    card.innerHTML = `
    <div class="text-content">
      <h2>Story Not Found</h2>
      <p>Sorry, the requested story could not be loaded. It may have been removed or is unavailable.</p>
    </div>
      `;
    this.loader.appendChild(card);
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