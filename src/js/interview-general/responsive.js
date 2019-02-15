let data = {
    name: 'yuuhei',
    sub: {
        a: 1,
        b: 2,
        subin: {
            c: 3
        }
    }
};

// 通过 Dep 解耦属性的依赖和更新操作
class Dep {
    constructor() {
        this.subs = []
    }
    // 添加依赖
    addSub(sub) {
        this.subs.push(sub);
    }
    // 更新
    notify() {
        this.subs.forEach(sub => {
            sub.update();
        })
    }
}
// 全局属性，通过该属性配置Watcher
Dep.target = null;

class Watcher {
    constructor(obj, key, cb) {
        // 将 Dep.target 指向自己
        // 然后触发属性的 getter 添加监听
        // 最后将 Dep.target 置空
        Dep.target = this;
        this.obj = obj;
        this.key = key;
        this.cb = cb;
        this.value = obj[key];
        Dep.target = null;
    }

    update() {
        // 获得新值
        this.value = this.obj[this.key];
        // 调用回调
        this.cb(this.value, this.key);
    }
}

function observe(obj) {
    if (!obj || typeof obj !== 'object') {
        return;
    }

    Object.keys(obj).forEach(key => {
        defineReactive(obj, key, obj[key]);
    });
}

function defineReactive(obj, key, val) {
    let dp = new Dep();
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: function reactiveGetter() {
            console.log(`get ${key}`);
            // 将 Watcher 添加到订阅
            if (Dep.target) {
                dp.addSub(Dep.target);
            }
            return val;
        },
        set: function reactiveSetter(newVal) {
            console.log(`${key} set to ${newVal}`);
            val = newVal;
            // 执行watcher的update方法
            dp.notify();
        }
    });
    // 递归子属性
    observe(val);
}

observe(data);

let name = data.name;

function update(value, from) {
    let container = document.querySelector('#responsive');
    let para = document.createElement('p');
    para.innerText = `attr ${from} set to ${value}`;
    container.appendChild(para);
}

// 模拟解析到 `{{name}}` 等触发的操作
new Watcher(data, 'name', update);
new Watcher(data.sub.subin, 'c', update);

// update Dom innerText
data.name = 'satellite';
data.sub.subin.c = '011';