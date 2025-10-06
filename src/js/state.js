export class AppState {
  constructor(config) {
    this.language = config.defaultLanguage;
    this.topic = config.defaultTopic;
    this.navOpen = config.navOpen;
    this.config = config; // Store the config for later use
  }

  getLanguage() {
    return this.language;
  }

  getTopic() {
    return this.topic;
  }

  getNavState() {
    return this.navOpen;
  }

  setLanguage(lang) {
    if (this.config.languages.includes(lang)) {
      this.language = lang;
    } else {
      console.warn(`Invalid language: ${lang}`);
    }
  }

  setTopic(topic) {
    if (this.config.topics.includes(topic)) {
      this.topic = topic;
    } else {
      console.warn(`Invalid topic: ${topic}`);
    }
  }

  setNavState(isOpen) {
    this.navOpen = isOpen;
  }
}
