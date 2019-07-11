(function() {
    var posX;
    var clicked = false;
    var barToMove = $(".bar");
    var diff;
    var containerWidth = $(".container").width();
    var barWidth = $(".bar").width();
    var containerPosition = $(".container").position().left;
    var picPerc = ($("#top-pic").width() / containerWidth) * 100;

    barToMove.on("mousedown", function(event) {
        event.preventDefault();
        posX = event.clientX;
        clicked = true;
    });

    barToMove.on("mousemove", function(event) {
        console.log(containerWidth, picPerc);
        if (clicked == true) {
            posX = event.clientX - containerPosition - barWidth / 2;
            diff = posX - containerWidth / 2;
            if (
                diff <= containerWidth / 2 - barWidth &&
                diff >= -containerWidth / 2
            ) {
                barToMove.css({
                    transform: "translateX(" + diff + "px)"
                });
                $("#top-pic").css({
                    width: picPerc + diff / (containerWidth / 100) + "%"
                });
            }
        }
    });

    $("body").on("mouseup", function(event) {
        clicked = false;
    });
})();
