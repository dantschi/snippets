(function() {
    var pictures = document.getElementsByClassName("picture");
    var current = 0;
    var isMoving;
    var timer = setTimeout(movePictures, 5000);

    var circles = document.getElementsByClassName("circle");

    document.addEventListener("transitionend", function(event) {
        if (event.target.classList.contains("exit")) {
            event.target.classList.remove("exit");
            isMoving = false;
            // setting the timer here is essential, otherwise it breaks down!
            timer = setTimeout(movePictures, 5000);
        }
    });

    for (var i = 0; i < circles.length; i++) {
        (function(i) {
            circles[i].addEventListener("click", function() {
                // handling if the circle is clicked which corresponds to the picture
                if (current == i) {
                    return;
                }
                // handling if it is in animation
                if (isMoving) {
                    return;
                }
                //clearing the timeout
                clearTimeout(timer);
                //after that the moving can be called again, with the parameter which circle was clickd
                movePictures(i);
            });
        })(i);
    }

    function movePictures(next) {
        isMoving = true;
        pictures[current].classList.add("exit");
        pictures[current].classList.remove("onscreen");
        circles[current].classList.remove("active");
        console.log(current);

        if (next >= 0) {
            current = next;
        } else {
            current++;
        }
        if (current >= pictures.length) {
            current = 0;
        }
        pictures[current].classList.add("onscreen");
        circles[current].classList.add("active");
    }
})();
