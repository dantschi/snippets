(function() {
    Handlebars.templates = Handlebars.templates || {};

    var templates = document.querySelectorAll(
        'script[type="text/x-handlebars-template"]'
    );

    Array.prototype.slice.call(templates).forEach(function(script) {
        Handlebars.templates[script.id] = Handlebars.compile(script.innerHTML);
    });

    //////////////////////////////////////////////////////////////////////////////

    var dataToUseForHandlebar = "";

    //////////////////////////////////////////////////////////////////////////////

    var buttonSearch = $("#btn-search");
    var buttonMore = $("#btn-more");
    var inputValue;
    var typeOfSearch;
    var urlToPass = "https://elegant-croissant.glitch.me/spotify";
    var tempUrl;
    var mainContent = $("#main");
    var html = "";
    var htmlHeader = "";
    var inputField = $("[name='user-input']");
    var totalResults;
    var timerID;

    buttonMore.hide();

    $(document).on("keydown", function(event) {
        if (event.keyCode == 13) {
            inputValue = inputField.val();
            typeOfSearch = $(".artist-or-album").val();
            getData(urlToPass);
        }
    });

    buttonSearch.on("click", function() {
        inputValue = inputField.val();
        typeOfSearch = $(".artist-or-album").val();
        getData(urlToPass);
    });

    buttonMore.on("click", function() {
        getMoreData(tempUrl);
    });

    function getData(url) {
        mainContent.html("");
        html = "";
        dataToUseForHandlebar = "";

        $.ajax({
            url: url,
            method: "GET",
            data: {
                query: inputValue,
                type: typeOfSearch
            },
            success: function(result) {
                result = result.albums || result.artists;
                dataToUseForHandlebar = result;

                if (result.items.length == 0) {
                    htmlHeader = '<h2>No results for "' + inputValue + '"</h2>';
                    $("footer").css({
                        visibility: "hidden"
                    });
                } else {
                    htmlHeader = '<h2>Results for "' + inputValue + '"</h2>';
                }
                mainContent.html(htmlHeader);

                $("#main").append(
                    Handlebars.templates.maincontent({
                        dataToRender: dataToUseForHandlebar
                    })
                );

                checkIfMoreThanTwentyResults(result);
            }
        });
    }

    function getMoreData(url) {
        $.ajax({
            url: url,
            success: function(result) {
                clearTimeout(timerID);
                result = result.albums || result.artists;

                dataToUseForHandlebar = result;
                $("#main").append(
                    Handlebars.templates.maincontent({
                        dataToRender: dataToUseForHandlebar
                    })
                );
                checkIfMoreThanTwentyResults(result);
            }
        });
    }

    // function renderIt(name, spotifyLink, imgLink) {
    //     html +=
    //         "<a href=" +
    //         spotifyLink +
    //         " target=_blank><div class='resultBox'><img src=" +
    //         imgLink +
    //         "></img><p>" +
    //         name +
    //         "</p></div></a>";
    // }

    function checkIfMoreThanTwentyResults(result) {
        totalResults = totalResults || result.total;
        console.log(totalResults, result.limit);
        if (totalResults > 20) {
            buttonMore.show().css({
                display: "flex"
            });

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
            buttonMore.hide();
        }
    }

    function checkScroll() {
        if (location.search.indexOf("scroll=infinite") > -1) {
            buttonMore.hide();
            var scrolledFromTop = $(document).scrollTop();
            var winHeight = $(window).height();
            var docHeight = $(document).height();

            if (docHeight - scrolledFromTop - winHeight > 200) {
                timerID = setTimeout(checkScroll, 250);
            } else {
                getMoreData(tempUrl);
            }
        }
    }
})();
