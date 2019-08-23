**Left rotate array. The second argument defines how many steps are done**

```js
function rotLeft(a, d) {
  for (var i = 0; i < d; i++) {
    a.push(a.shift());
  }
  return a;
}

rotLeft([1, 2, 3, 4, 5], 4); // ==> [5, 1, 2, 3, 4]

// but it mutates the original array!!!
```

---

**descending sort array and keep the values if already exists**

```js
var sortedArray = notSortedArray.sort((a, b) => {
  return a < b ? 1 : a > b ? -1 : 0;
});
```
