import $ from 'jquery';

class Client {
    constructor(host = '') {
        /*        
            location /server/{
                // 后台应用服务器地址
                proxy_pass http://localhost:3000/;
            }
        */
        // nginx反向代理时会配置的上述的配置，host就赋值为/server
        this.host = host;
    }

    request(url = '', data = {}) {
        const _this = this;
        return new Promise((resolve, reject) => {
            $.ajax({
                type: 'post',
                url: this.host + url,
                dataType: 'json',
                data,
                // xhrFields: {
                //     withCredentials: true // 被调用方时开启携带跨域cookie
                // },
                beforeSend(xhr) {
                    // 添加自定义头
                    xhr.setRequestHeader('Token', 'DQQWUYSDIWOIS');
                },
                // 发送json，模拟非简单请求
                contentType: 'appliation/json;charset=utf-8',
                success(res) {
                    console.log(`request ${_this.host + url}`)
                    typeof resolve === 'function' && resolve(res);
                },
                error(err) {
                    typeof reject === 'function' && reject(err);
                }
            })
        });
    }
}

// 反向代理时统一添加的前缀host
let client = new Client('');

window.client = client;