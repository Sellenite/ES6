const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 处理公共entry，以根目录的路径来做相对位置
const commonEntry = ['./src/common/index.js'];
const PAGES_DIR = './src/pages';
let entry = {};
let plugins = [];

// 遍历页面目录
const getPages = () => {
    // item，文件夹名
    return fs.readdirSync(PAGES_DIR).filter(item => {
        // ../src/pages/DOM/index.js
        let filepath = path.join(PAGES_DIR, item, 'index.js');
        if (!fs.existsSync(filepath)) {
            return false;
        } else {
            return true;
        }
    });
};

// 修改entry，多页面
getPages().forEach(file => {
    // 文件夹名
    const name = path.basename(file);
    entry[name] = [...commonEntry, `${PAGES_DIR}/${file}/index`]
});

// 修改plugins
getPages().forEach(file => {
    const name = path.basename(file);
    file = `${PAGES_DIR}/${file}/index.html`;
    const chunks = [`runtime~${name}`, name];
    plugins.push(
        new HtmlWebpackPlugin({
            template: file, // 模板文件
            filename: `view/${name}.html`, // 输出文件
            title: name,
            favicon: './favicon.ico',
            inject: true,
            chunks
        })
    )
});

module.exports = {
    entry,
    plugins
}