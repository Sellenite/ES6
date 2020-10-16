/**
 * 自动引入当前文件夹下所有module
 * require.context(directory, useSubdirectories = false, regExp = /^.//);
 * @param {String} directory 读取文件的路径
 * @param {Boolean} directory 匹配文件的正则表达式
 * @param {regExp} regExp 读取文件的路径
 */

const modulesFiles = require.context('./include', true, /.js$/);

const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^.\/(.*)\.js/, '$1');
  // require.context是返回读取文件的功能
  // 关键代码。使用了这个才会读取
  const value = modulesFiles(modulePath);
  // 取引入文件的export default的值作为value
  modules[moduleName] = value.default;
  return modules;
}, {});

console.log('<!--------Above is Latest-------->');
console.log('<!--------Below is ASYNC--------->');