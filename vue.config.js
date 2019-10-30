// process.env.NODE_ENV = 'production'
const path = require('path')
// const webpack = require('webpack');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

function resolve(dir) {
    return path.join(__dirname, dir)
}
//__dirname 表示当前文件所在的目录的绝对路径
//__filename 表示当前文件的绝对路径
//module.filename ==== __filename 等价
//process.cwd() 返回运行当前脚本的工作目录的路径
//process.chdir() 改变工作目录
module.exports = {
    // publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
    publicPath: './',
    // 打包文件输出路径，即打包到哪里
    outputDir: 'dist',
    // 静态资源地址
    assetsDir: 'static',
    // eslint-loader 是否在保存的时候检查
    lintOnSave: false,
    // 生产环境是否生成 sourceMap 文件
    productionSourceMap: false,
    //文件hash
    filenameHashing: true,
    // pages:{
    //     home: {
    //         entry: './src/views/Home/home.js', //配置入口js文件
    //         template: './src/views/Home/home.html', //主页面
    //         filename: 'home.html', //打包后的html文件名称
    //         title: 'home',  //打包后的html文件title名称
    //     },
    //     second: {
    //         entry: './src/views/Second/second.js', //配置入口js文件
    //         template: './src/views/Second/second.html', //主页面
    //         filename: 'second.html', //打包后的html文件名称
    //         title: 'second',  //打包后的html文件title名称
    //     },
    //  },

    /*
        chainWebpack 这个库提供了一个 webpack 原始配置的上层抽象，使其可以定义具名的 loader 规则
        和具名插件，可以通过其提供的一些方法链式调用，在cli-service中就使用了这个插件
    */
    chainWebpack: config => {
        // 添加别名  配置import 和 require 等路径别名  通过 resolve.alias 来实现此功能的
        config.resolve.alias
            .set('@', resolve('src'))
            .set('components', resolve('src/components'))
            .set('assets', resolve('src/assets'))
        // config.module
        // .rule('images')
        // .use('image-webpack-loader')
        // .loader('image-webpack-loader')
        // .options({
        //     bypassOnDebug: true
        // })
        // .end()

        // config.module
        //     .rule('images')
        //     .use('image-webpack-loader')
        //     .loader('image-webpack-loader')
        //     .options({
        //         bypassOnDebug: true
        //     })
        //     .end()
        // const svgRule = config.module.rule('svg')
        // svgRule.uses.clear()
        // // 添加要替换的 loader
        // svgRule
        //     .use('vue-svg-loader')
        //     .loader('vue-svg-loader')
    },

    /*
        configureWebpack是调整webpack配置最简单的一种方式，可以新增也可以覆盖cli中的配置。
        可以是一个对象：被 webpack-merge 合并到webpack 的设置中去
        也可以是一个函数：如果你需要基于环境有条件地配置行为，就可以进行一些逻辑处理，可以直接修改或
        新增配置，(该函数会在环境变量被设置之后懒执行)。该方法的第一个参数会收到已经解析好的配置。
        在函数内，你可以直接修改配置，或者返回一个将会被合并的对象。
    */
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'development') {
            config.devtool = 'source-map'
            // mutate config for production...
        } else {}
    },
    // 生产环境是否生成 sourceMap 文件
    productionSourceMap: false,
    // css相关配置
    css: {
        // 是否使用css分离插件 ExtractTextPlugin
        // extract: true,
        // 开启 CSS source maps?
        // sourceMap: false,
        // 启用 CSS modules for all css / pre-processor files.
        // modules: false,
        // css配置项
        loaderOptions: {
            postcss: {
                plugins: [
                    //   require('postcss-pxtorem')({
                    //     rootValue: 100, // 换算的基数
                    //     selectorBlackList: ['el'], // 忽略转换正则匹配项
                    //     propList: ['*']
                    //   })
                    // require('autoprefixer')({
                    //   browsers: ['last 2 versions', '> 1%']
                    // })
                ]
            }
        }
    },
    devServer: {
        port: 8888, // 端口号
        host: '0.0.0.0', // can be overwritten by process.env.HOST
        https: false // https:{type:Boolean}
        // open: true, //配置自动启动浏览器
        // proxy: 'http://localhost:4000' // 配置跨域处理,只有一个代理
        // proxy: {
        //     '/api': {
        //         target: '<url>',
        //         ws: true,
        //         changeOrigin: true
        //     },
        //     '/foo': {
        //         target: '<other_url>'
        //     }
        // },  // 配置多个代理
    },
    configureWebpack: {
        resolve: {
            extensions: ['.js', '.vue', '.json', '.ts']
        },
        // plugins: [
        //     new UglifyJsPlugin({
        //         uglifyOptions: {
        //             compress: {
        //                 // warnings: false,
        //                 drop_debugger: true,
        //                 drop_console: true
        //             },
        //             output: {
        //                 comments: false
        //             }
        //         },
        //         sourceMap: false,
        //         parallel: true //并行
        //     }),
        // new CompressionPlugin({
        //     test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
        //     algorithm: 'gzip',
        //     threshold: 10240,
        //     minRatio: 0.8
        // }),
        // new HtmlWebpackPlugin({
        //     template: './public/index.html',
        //     inject: true,
        //     minify: {
        //         removeComments: true,
        //         collapseWhitespace: true,
        //         removeAttributeQuotes: true
        //     },
        //     chunksSortMode: 'dependency'
        // })
        // ],
        externals: {
            echarts: 'echarts'
        }
    },
    // 第三方插件配置,这是一个不进行任何 schema 验证的对象，因此它可以用来传递任何第三方插件选项。例如
    pluginOptions: {
        foo: {
            // 插件可以作为 `options.pluginOptions.foo` 访问这些选项。
        }
    }
}