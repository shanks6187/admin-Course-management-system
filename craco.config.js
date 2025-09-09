const path = require("path");

module.exports = {
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
    // 添加webpack模块规则配置
    module: {
      rules: [
        {
          test: /\.js$/,
          enforce: "pre", // 前置执行（在其他loader处理前执行）
          use: ["source-map-loader"],
          // 关键：忽略leancloud-storage的source map解析
          exclude: /node_modules\/leancloud-storage/,
        },
      ],
    },
  },
};
