var path = require("path");
var webpack = require("webpack");
var extractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: ["babel-polyfill", "whatwg-fetch", "./src/client.js"],
  output: {
    path: path.resolve(__dirname, "./static"),
    publicPath: "/static/",
    filename: "client.js"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: extractTextPlugin.extract({
          fallback: "vue-style-loader",
          use: "css-loader"
        })
      },
      {
        test: /\.scss$/,
        use: ["vue-style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.sass$/,
        use: ["vue-style-loader", "css-loader", "sass-loader?indentedSyntax"]
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          extractCSS: true,
          loaders: {
            scss: extractTextPlugin.extract({
              use: "css-loader!sass-loader",
              fallback: "vue-style-loader"
            }),
            sass: extractTextPlugin.extract({
              use: "css-loader!sass-loader?indentedSyntax",
              fallback: "vue-style-loader"
            }),
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
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true,
    proxy: {
      "**": {
        target: {
          host: "localhost",
          protocol: "http:",
          port: 5050
        },
        ignorePath: false,
        changeOrigin: true,
        secure: false
      }
    }
  },
  performance: {
    hints: false
  },
  devtool: "#eval-source-map",
  plugins: [new extractTextPlugin("styles.css")]
};

if (process.env.NODE_ENV === "production") {
  module.exports.devtool = "#source-map";
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ]);
}