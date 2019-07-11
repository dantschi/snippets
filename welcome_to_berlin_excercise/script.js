(function() {
    $("#welcome-close").on("click", function() {
        $(".welcome-overlay").css({
            display: "none"
        });
    });

    setTimeout(function() {
        $(".welcome-overlay").css({
            "z-index": "1001"
        });
        $(".welcome-overlay").addClass("fadein");
    }, 700); //fadein takes 0.3 seconds, that is the reason why 700

    console.log("you are amazing!!!");

    var asideMenu = document.getElementById("asidebar");
    var topBarMenuImage = document.getElementById("topbar-menu-image");
    var overlayer = document.getElementById("overlayer");
    var closeX = document.getElementById("closeIt");

    function hideIt() {
        asideMenu.classList.remove("onscreen");
        overlayer.classList.remove("overlayer");
    }

    closeX.addEventListener("click", function() {
        hideIt();
    });

    topBarMenuImage.addEventListener("click", function() {
        asideMenu.classList.add("onscreen");
        overlayer.classList.add("overlayer");
    });

    overlayer.addEventListener("click", function() {
        hideIt();
    });
})();
