var path = require("path");
var fs = require("fs");
var webpack = require("webpack");
var nodeExternals = require("webpack-node-externals");

module.exports = {
  entry: ["babel-polyfill", "./src/server.js"],
  node: {
    __dirname: true
  },
  target: "node",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "server.js"
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["vue-style-loader", "css-loader"]
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          loaders: {
            postcss: [require("postcss-cssnext")()]
          }
        }
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]?[hash]"
        }
      }
    ]
  },
  resolve: {
    alias: {
      vue$: "vue/dist/vue.esm.js"
    },
    extensions: ["*", ".js", ".vue", ".json"]
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: '"development"',
        PORT: (process.env.PORT || 5050).toString()
      }
    })
  ]
};

if (process.env.NODE_ENV === "production") {
  module.exports.devtool = "#source-map";
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: '"production"'
      }
    })
  ]);
}
