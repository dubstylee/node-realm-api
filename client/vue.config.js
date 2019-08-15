module.exports = {
  devServer: {
    port: 3000,
    proxy: {
      "/api": {
        target: "http://localhost:1338",
        ws: true,
        changeOrigin: true
      }
    }
  }
};
