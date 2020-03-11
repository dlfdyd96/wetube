const path = require("path");   // == import path from "path"
const ExtractCSS = require("extract-text-webpack-plugin");
const autoprefixer = require("autoprefixer");
const MODE = process.env.WEBPACK_ENV;
const ENTRY_FILE = path.resolve(__dirname, "assets", "js", "main.js");
const OUTPUT_DIR = path.join(__dirname, "static");


const config = {
    entry: ["@babel/polyfill", ENTRY_FILE],
    mode: MODE,
    module: {   // module을 반견할때마다
        rules: [    // rule을 따르라.
            {
                test: /\.(js)$/,
                use: [
                    {
                        loader: 'babel-loader'
                    }
                ]
            },
            {
                test: /\.(scss|sass)$/, // scss로 끝나는 거
                use: ExtractCSS.extract([   //plugin 사용
                    {
                        loader: "css-loader"    //
                    },
                    {
                        loader: "postcss-loader",    // css를 받아서, 우리가 얘한테 주는 plugin을 가지고 css를 변환해 줄거야.
                        options: {
                            plugins() {
                                return [autoprefixer({ browsers: "cover 99.5%" })]
                            }
                        }
                    },
                    {
                        loader: "sass-loader"   // sass, scss를 받아서 일반 css 로바 꾼다.
                    }
                ])
            }
        ]
    },
    output: {
        path: OUTPUT_DIR,
        filename: "[name].js"
    },
    plugins: [new ExtractCSS("styles.css")]
};

module.exports = config; 