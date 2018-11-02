module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:1338',
        ws: true,
        changeOrigin: true
      }
    }
  }
}
