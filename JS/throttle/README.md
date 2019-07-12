## simple throttle function

```js
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// THROTTLE
/////////////////////////////////////////////////

var lastCall = null;
function timer(fn, timeInMs) {
    var now = +new Date();

    if (now - lastCall > timeInMs) {
        console.log(
            "IF block, time is bigger than 250ms, function is called again",
            now - lastCall
        );
        fn;
        lastCall = now;
    } else {
        console.log(
            "ELSE block, time is LESS than 250ms, function is not called again",
            now - lastCall
        );
        lastCall = now;
    }
}

/////////////////////////////////////////////////
// THROTTLE END
/////////////////////////////////////////////////
```

the function can be called afterwards in the code with the needed time in milliseconds, i.e.:

```js
timer(getMoreData(), 250);
```
