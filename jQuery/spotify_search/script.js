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

    $(document).on("keydown", function(event) {
        if (event.keyCode == 13) {
            html = "";
            htmlHeader = "";
            mainContent.html("");
            inputValue = inputField.val();
            // console.log(inputValue, typeOfSearch);
            getData(urlToPass);
        }
    });

    buttonSearch.on("click", function() {
        inputValue = inputField.val();
        html = "";
        htmlHeader = "";
        mainContent.html("");
        getData(urlToPass);
    });

    buttonMore.on("click", function() {
        getMoreData(tempUrl);
    });

    function getMoreData(url) {
        html = "";
        $.ajax({
            url: url,

            success: function(result) {
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
                if (totalResults > 20) {
                    $("footer").show();
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
                } else {
                    $("footer").hide();
                    // $("footer").css({
                    //     visibility: "hidden"
                    // });
                }
            }
        });
    }

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
                result = result.albums || result.artists;

                if (result.items.length == 0) {
                    htmlHeader = '<h2>No results for "' + inputValue + '"</h2>';
                    $("footer").css({
                        visibility: "hidden"
                    });
                } else {
                    htmlHeader = '<h2>Results for "' + inputValue + '"</h2>';
                }
                mainContent.append(htmlHeader);

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
                totalResults = result.total;
                if (totalResults > 20) {
                    $("footer").css({
                        visibility: "visible"
                    });
                    totalResults -= 20;
                    tempUrl =
                        result.next &&
                        result.next.replace(
                            "https://api.spotify.com/v1/search",
                            "https://elegant-croissant.glitch.me/spotify"
                        );
                    console.log(tempUrl, totalResults);
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
})();
