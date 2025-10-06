export default class Paginator {
  constructor(data = [], perPage = 10) {
    this.perPage = Math.max(1, perPage); // never allow 0 or negative
    this.reset(data);
  }

  /**
   * Reset paginator with a new data set
   * Always resets to the first page
   */
  reset(data = []) {
    this.data = Array.isArray(data) ? data : [];
    this.page = 1;
    this.totalPages = Math.max(1, Math.ceil(this.data.length / this.perPage));
  }

  /**
   * Return the items for the current page
   */
  get slice() {
    const start = (this.page - 1) * this.perPage;
    return this.data.slice(start, start + this.perPage);
  }

  /**
   * Go to the next page if possible
   */
  next() {
    if (this.page < this.totalPages) {
      this.page++;
    }
  }

  /**
   * Go to the previous page if possible
   */
  prev() {
    if (this.page > 1) {
      this.page--;
    }
  }

  /**
   * Jump directly to a specific page
   */
  goTo(page) {
    const target = Math.min(Math.max(1, page), this.totalPages);
    this.page = target;
  }

  /**
   * Check if we are on the first or last page
   */
  get isFirstPage() {
    return this.page === 1;
  }

  get isLastPage() {
    return this.page === this.totalPages;
  }
}
