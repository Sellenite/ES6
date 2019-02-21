// 倒计时
class Timer {
    cownDown(endTime, update, finish) {
        const now = +new Date();
        if (now - endTime > 0) {
            finish.call(this);
        } else {
            let ret;
            const DAY = 24 * 60 * 60 * 1000;
            const HOUR = 60 * 60 * 1000;
            const MINUTE = 60 * 1000;
            const SECOND = 1000;

            const left_time = endTime - now;
            const left_days = Math.floor(left_time / DAY);
            const left_hours = Math.floor((left_time - left_days * DAY) / HOUR);
            const left_minutes = Math.floor((left_time - left_days * DAY - left_hours * HOUR) / MINUTE);
            const left_seconds = Math.floor((left_time - left_days * DAY - left_hours * HOUR - left_minutes * MINUTE) / SECOND);

            ret = {
                left_days,
                left_hours,
                left_minutes,
                left_seconds
            };

            update.call(this, ret);

            setTimeout(() => {
                this.cownDown(endTime, update, finish);
            }, SECOND);
        }
    }
}

const timer = new Timer();

timer.cownDown(+new Date('2019/03/22'), timeObj => {
    let str = `${timeObj.left_days}天${timeObj.left_hours}时${timeObj.left_minutes}分${timeObj.left_seconds}秒`;
    let el = document.querySelector('#timer');
    el.innerText = str;
}, () => {
	alert('TimeOut!');
});