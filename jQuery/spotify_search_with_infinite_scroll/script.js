(function() {
    var buttonSearch = $("#btn-search");
    var buttonMore = $("#btn-more");
    var inputValue;
    var typeOfSearch = $(".artist-or-album").val();
    var urlToPass = "https://elegant-croissant.glitch.me/spotify";
    var tempUrl;
    var mainContent = $("main");
    var html = "";
    var htmlHeader = "";
    var inputField = $("[name='user-input']");
    var totalResults = 0;
    var timerID;

    $("footer").hide();

    console.log(
        $(document).scrollTop(),
        $(window).height(),
        $(document).height()
    );

    // $(document).on("keydown", function(event) {
    //     if (event.keyCode == 13) {
    //         html = "";
    //         htmlHeader = "";
    //         mainContent.html("");
    //         inputValue = inputField.val();
    //         // console.log(inputValue, typeOfSearch);
    //         getData(urlToPass);
    //     }
    // });

    buttonSearch.on("click", function() {
        inputValue = inputField.val();
        // html = "";
        // htmlHeader = "";
        // mainContent.html("");
        getData(urlToPass);
    });

    buttonMore.on("click", function() {
        getMoreData(tempUrl);
    });

    function getData(url) {
        // console.log("in function getData, url is", url);
        $.ajax({
            url: url,
            method: "GET",
            data: {
                query: inputValue,
                type: typeOfSearch
            },
            success: function(result) {
                html = "";
                htmlHeader = "";
                mainContent.html("");
                result = result.albums || result.artists;

                if (result.items.length == 0) {
                    htmlHeader = '<h2>No results for "' + inputValue + '"</h2>';
                } else {
                    htmlHeader = '<h2>Results for "' + inputValue + '"</h2>';
                }
                mainContent.html(htmlHeader);

                for (var i = 0; i < result.items.length; i++) {
                    if (result.items[i].images[0] === undefined) {
                        // console.log(i, " is empty");
                        result.items[i].images[0] = [];
                        result.items[i].images[0] = {
                            url: "assets/spoticon.png"
                        };
                    }
                    // console.log(result.items[i].images[0].url);

                    renderIt(
                        result.items[i].name,
                        result.items[i].external_urls.spotify,
                        result.items[i].images[0].url
                    );
                }

                mainContent.append(html);
                // setTimeout(checkScroll, 250);
                totalResults = result.total;
                if (totalResults > 20) {
                    $("footer")
                        .show()
                        .css({
                            display: "flex"
                        });
                    totalResults -= 20;
                    tempUrl =
                        result.next &&
                        result.next.replace(
                            "https://api.spotify.com/v1/search",
                            "https://elegant-croissant.glitch.me/spotify"
                        );
                    timerID = setTimeout(checkScroll, 250);
                    console.log(tempUrl, totalResults);
                } else {
                    $("footer").hide();
                }
            }
        });
    }

    function getMoreData(url) {
        html = "";

        $.ajax({
            url: url,

            success: function(result) {
                clearTimeout(timerID);
                result = result.albums || result.artists;
                for (var i = 0; i < result.items.length; i++) {
                    if (result.items[i].images[0] === undefined) {
                        // console.log(i, " is empty");
                        result.items[i].images[0] = [];
                        result.items[i].images[0] = {
                            url: "assets/spoticon.png"
                        };
                    }
                    // console.log(result.items[i].images[0].url);

                    renderIt(
                        result.items[i].name,
                        result.items[i].external_urls.spotify,
                        result.items[i].images[0].url
                    );
                }
                mainContent.append(html);
                // timerID = setTimeout(checkScroll, 250);

                if (totalResults > 20) {
                    $("footer")
                        .show()
                        .css({
                            display: "flex"
                        });
                    // console.log("change the setting!");
                    // $("footer").css({
                    //     visibility: "visible"
                    // });
                    tempUrl =
                        result.next &&
                        result.next.replace(
                            "https://api.spotify.com/v1/search",
                            "https://elegant-croissant.glitch.me/spotify"
                        );

                    totalResults -= result.limit;
                    console.log(urlToPass, totalResults);
                    timerID = setTimeout(checkScroll, 250);
                } else {
                    $("footer").hide();
                    // $("footer").css({
                    //     visibility: "hidden"
                    // });
                }
            }
        });
    }

    function renderIt(name, spotifyLink, imgLink) {
        html +=
            "<a href=" +
            spotifyLink +
            " target=_blank><div class='resultBox'><img src=" +
            imgLink +
            "></img><p>" +
            name +
            "</p></div></a>";
    }

    function checkScroll() {
        if (location.search.indexOf("scroll=infinite") > -1) {
            buttonMore.hide();
            var scrolledFromTop = $(document).scrollTop();
            var winHeight = $(window).height();
            var docHeight = $(document).height();
            var hasReachedBottom;
            console.log(docHeight - scrolledFromTop - winHeight);
            if (docHeight - scrolledFromTop - winHeight > 200) {
                hasReachedBottom = false;
            } else {
                hasReachedBottom = true;
            }

            if (hasReachedBottom == true) {
                console.log("is called");
                getMoreData(tempUrl);
            } else {
                timerID = setTimeout(checkScroll, 250);
                console.log("there is still place to scroll");
            }
        }
    }
    // console.log(
    //     "scrollTop",
    //     $(document).scrollTop(),
    //     "windowHeight",
    //     $(window).height(),
    //     "docHeight",
    //     $(document).height(),
    //     hasReachedBottom
    // );
})();
