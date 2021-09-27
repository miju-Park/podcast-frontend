module.exports = {
  client: {
    includes: ["./src/**/*.tsx"],
    tagName: "gql",
    service: {
      name: "podcast",
      url: "https://toy-podcast.herokuapp.com/graphql",
    },
  },
};
