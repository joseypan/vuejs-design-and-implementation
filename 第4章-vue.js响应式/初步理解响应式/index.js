// import { effect, ref } from "vue";
// let a = ref(10);

// let b = a.value + 10;

// console.log("b1", b);
// effect(() => {
//   b = a.value + 10;
// });

// a.value = 20;

// console.log("b", b);
// 通过上述vue的实现效果来说，来实现自己的响应式效果
// 模拟ref声明了一个MyRef类，通过MyRef类我们对value进行存值和取值的劫持
class MyRef {
  constructor(value) {
    this._value = value;
  }
  get value() {
    // 由于我们会涉及到b=a.value+10,触发取值的操作，所以再次进行依赖收集

    return this._value;
  }
  set value(newVal) {
    console.log("set", newVal);
  }
}
const myRef = (value) => {
  const ref = new MyRef(value);
  return ref;
};
let data = myRef(123);
console.log("data", data);
console.log(data.value);
data.value = 20;
