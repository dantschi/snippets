## Left rotate array. The second argument defines how many steps is done

```js
function rotLeft(a, d) {
  for (var i = 0; i < d; i++) {
    a.push(a.shift());
  }
  return a;
}

rotLeft([1, 2, 3, 4, 5], 4); // ==> [5, 1, 2, 3, 4]
```
