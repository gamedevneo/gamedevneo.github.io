export const CONFIG = {
  defaultLanguage: "en",
  defaultTopic: "blog",
  topics: ["about", "blog", "story", "nationalism"],
  languages: ["en"],
  perPage: 10,
  navOpen: false,

  // ✅ Define behavior per topic
  topicSettings: {
    home: {
      pagination: false,
      fullPosts: true
    },
    about: {
      pagination: false,
      fullPosts: true
    },
    blog: {
      pagination: true,
      fullPosts: false
    },
    story: {
      pagination: true,
      fullPosts: false
    },
    nationalism: {
      pagination: true,
      fullPosts: false
    }

  }
};
