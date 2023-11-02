module.exports = {
  entry: {
    main: "./app/static/js/main.js",
    preload: "./app/static/js/preload.js",
    template: "./app/static/js/src/increaseEvalNum.js"
  },
  output: {
    filename: "[name].compiled.js",
    path: `${__dirname}/app/static/js/bundle`,
    library: 'yourLibName',
    // libraryTarget: 'commonjs'
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        // use: {
        //   loader: 'babel-loader' // Babelを使用してトランスパイル
        // },
        resolve: {
          fullySpecified: false, // 비활성화
        }
      },
    ],
  },
};

// module.exports = {
//     entry: {
//         main: "./main.js",
//         preload: "./preload.js",
//         template: "./src/increaseEvalNum.js"
//     },

//     experiments: {
//       outputModule: true,
//     },
  
//     output: {
//     filename: "[name].compiled.js",
//     path: `${__dirname}/app/static/js/bundle`,
//     library: {
//       type: "module",
//     },
//   },
//   };