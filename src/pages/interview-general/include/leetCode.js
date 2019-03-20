{
    // 利用栈特性匹配括号，以下括号均合法
    // {{}[][[[]]]}，()[]{}，{[]}，()
    const str = '{{}[][[[]]]}';

    const isValid = function(str) {
        let map = {
            '(': -1,
            '[': -2,
            '{': -3,
            ')': 1,
            ']': 2,
            '}': 3
        }
        let stack = [];
        for (let i = 0; i < str.length; i++) {
            if (map[str[i]] < 0) {
                stack.push(str[i]);
            } else {
                let last = stack.pop();
                // 对称
                if (map[last] + map[str[i]] !== 0) return false;
            }
        }
        // 有多余的左括号
        if (stack.length > 0) return false;
        return true;
    }

    console.log(isValid(str));
};

{
    // 冒泡排序
    const arr = [37, 1, 15, 48, 22, 9, 87];

    const bubble = function(arr) {
    	arr = arr.slice();
    	const len = arr.length;
        for (let i = 0; i < len - 1; i++) {
            for (let j = 0; j < len - i - 1; j++) {
            	console.log(arr[j]);
                if (arr[j] > arr[j + 1]) {
                	// 解构赋值对换
					[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                }
            }
        }
        return arr;
    }

    let retArr = bubble(arr);
    console.log(retArr);
};