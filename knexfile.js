// Update with your config settings.

module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./data/posts.db3"
    },
    useNullAsDefault: true
  }
};
