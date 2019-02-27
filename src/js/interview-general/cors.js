// let url = 'http://localhost:3000/users';
// 使用nginx的vhost
let url = '/users';

let data = {
	a: 1,
	b: 2
}

// 注意，这里由于后台应用服务器获取的只能是被调用方域名下的cookie
client.request(url, data).then(res => {
	// 后端获取了name属性，就将跨域获取的cookie写到客户端
	console.log(JSON.stringify(res));
}).catch(err => {
	console.log(err);
});