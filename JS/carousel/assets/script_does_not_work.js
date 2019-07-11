// !!!!!THIS FILE IS NOT LINKED!!!!!
(function() {
    var current = 0;
    var kitties = document.getElementsByClassName("kitty");
    console.log("here we are");
    setTimeout(moveKitties, 2000);

    document.addEventListener("transitionend", function(event) {
        if (event.target.classList.contains("exit")) {
            event.target.classList.remove("exit");
            setTimeout(moveKitties, 5000);
        }
    });

    function moveKitties() {
        console.log("the current one is " + current);
        //remove onscreen class from element thatcurrently
        // add exit class
        kitties[current].classList.remove("onscreen");
        kitties[current].classList.add("exit");

        kitties[current + 1].classList.add("onscreen");
        current++;
        if (current >= kitties.length) {
            current = 0;
        }
        //add onscreen class to the next one
        setTimeout(moveKitties, 2000);
    }
});
