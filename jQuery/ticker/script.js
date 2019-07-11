(function() {
    var headlines = $("#headlines");
    var leftPos = headlines.offset().left;
    // var links = headlines.find("a");

    console.log(leftPos);

    var animId;
    function moving() {
        var links = headlines.find("a");
        var firstInTheLine = links.eq(0);
        var linkLength = firstInTheLine.outerWidth();

        var temp;

        leftPos--;

        if (leftPos <= -linkLength) {
            leftPos += linkLength;
            temp = firstInTheLine.remove();
            headlines.append(temp);
        }
        headlines.css({
            left: leftPos + "px"
        });

        animId = requestAnimationFrame(moving);
    }

    headlines.on("mouseenter", function() {
        cancelAnimationFrame(animId);
    });

    headlines.on("mouseleave", function() {
        moving();
    });

    moving();
})();
