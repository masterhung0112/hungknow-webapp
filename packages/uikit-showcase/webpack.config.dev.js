const path = require('path')

module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    // Serve index.html as the base
    // contentBase: path.join(__dirname, "dist"),
    // static: {
    //     directory: path.join(__dirname, './dist'),
    // },

    // Enable compression
    compress: true,

    // Enable hot reloading
    // hot: true,

    // host,

    port: 3000,

    // Public path is root of content base
    // publicPath: "/",
  },
};
