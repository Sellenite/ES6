/*
 * @Author: yuuhei 
 * @Date: 2018-01-11 13:46:05 
 * @Last Modified by: yuuhei
 * @Last Modified time: 2018-01-11 13:48:50
 */
{
    let arr = [23, 1, 6, 78, 9, 22, 3, 100]
    let ret = []
    arr.every((item) => {
        ret.push(item)
        return item % 11 !== 0
    })
    console.log(ret)
}

{
    let arr = [2, 4, 6]
    for (let i of arr) {
        console.log(i)
    }
}