const container = document.querySelector('#pie_container');
const canvas = document.querySelector('#pie_canvas');

const { width, height } = container.getBoundingClientRect();

canvas.width = width;
canvas.height = height;

const ctx = canvas.getContext('2d');

const centerX = width / 2;
const centerY = height / 2;

ctx.translate(centerX, centerY);

const radius = Math.min(width, height) / 2 * 0.9;

const data = [
  {
    name: '测试1',
    num: 10,
    color: '#9287E7'
  },
  {
    name: '测试2',
    num: 25,
    color: '#FF7B7B'
  },
  {
    name: '测试3',
    num: 60,
    color: '#FEB64D'
  },
  {
    name: '测试4',
    num: 15,
    color: '#49D6A5'
  }
];

let curTotalAngle = 0;
let r = Math.PI / 180; // 用于弧度转换
let total = 0;
let curHoverIndex;

data.forEach((item, index) => {
  total += Number(item.num);
})

data.forEach((item, index) => {
  let curAngle = (item.num / total) * 360;
  let curEndAngle = curTotalAngle + curAngle;
  item.angle = [curTotalAngle, curEndAngle]; // 角度
  item.radian = [curTotalAngle * r, curEndAngle * r]; // 弧度
  curTotalAngle += curAngle;
});

// 起始弧度和结束弧度都减了Math.PI/2，是因为0弧度是在x轴的正方向，也就是右边，
// 但是一般我们认为的起点在顶部，所以减掉1/4圆让它的起点移到顶部 x+π/2=已知，所以是x=已知-π/2，是减法
function renderPie(checkHover, x, y) {
  let hoverIndex = null; // ++
  data.forEach((item, index) => {
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.fillStyle = item.color;
    let startRadian = item.radian[0] - (Math.PI / 2);
    let endRadian = item.radian[1] - (Math.PI / 2);
    ctx.arc(0, 0, radius, startRadian, endRadian);
    // ctx.fill(); --
    // ++
    if (checkHover) {
      if (hoverIndex === null && ctx.isPointInPath(x, y)) {
        hoverIndex = index;
      }
    } else {
      ctx.fill();
    }
  });
  // ++
  if (checkHover) {
    return hoverIndex;
  }
}

// 动画曲线函数，更多函数可参考：http://robertpenner.com/easing/
/**
 * t: 动画已经执行的时间（实际上时执行多少次/帧数）
 * b: 起始位置
 * c: 终止位置
 * d: 从起始位置到终止位置的经过时间（实际上时执行多少次/帧数）
 */
Math.easeInOutQuad = function(t, b, c, d) {
  t /= d / 2
  if (t < 1) {
    return c / 2 * t * t + b
  }
  t--
  return -c / 2 * (t * (t - 2) - 1) + b
}

/*
  动画函数
  from：起始值
  to：目标值
  dur：过渡时间，ms
  callback：实时回调函数
  done：动画结束的回调函数
*/
function move(from, to, dur = 500, callback = () => {}, done = () => {}) {
  let difference = to - from;
  let startTime = Date.now();
  let timer = null;
  let run = () => {
    let curTime = Date.now();
    let durationTime = curTime - startTime;
    // 调用缓动函数来计算当前的比例
    let radio = Math.easeInOutQuad(durationTime, 0, 1, dur);
    radio = radio > 1 ? 1 : radio;
    let step = difference * radio + from;
    callback && callback(step);
    if (radio < 1) {
      timer = window.requestAnimationFrame(run)
    } else {
      done && done();
    }
  }
  run();
}

// 从-0.5到1.5的原因和上面绘制扇形时减去Math.PI/2一样
move(-0.5, 1.5, 1000, (cur) => {
  ctx.save();
  // 绘制扇形剪切路径
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.arc(
    0,
    0,
    radius,
    -0.5 * Math.PI,
    cur * Math.PI // 结束圆弧不断变大
  );
  ctx.closePath();
  // 剪切完后进行绘制
  ctx.clip();
  renderPie();
  ctx.restore();
});

function onCanvasMousemove(e) {
  let rect = canvas.getBoundingClientRect();
  let x = e.clientX - rect.left;
  let y = e.clientY - rect.top;
  curHoverIndex = getHoverAngleIndex(x, y);
  if (curHoverIndex) {
    console.log(curHoverIndex)
  }
}

function getHoverAngleIndex(x, y) {
  ctx.save();
  let index = renderPie(true, x, y);
  ctx.restore();
  return index;
}

canvas.addEventListener('mousemove', onCanvasMousemove);