(function(countries) {
    var input = $("#input");
    // var inputText = input.val().toLowerCase();
    var results = [];
    var resultsDiv = $("#results");

    input.on("input focus", function() {
        timer(gettingData(), 250);
    });

	/////////////////////////////////////////////////
	/////////////////////////////////////////////////
	// THROTTLE
	/////////////////////////////////////////////////

    var lastCall = null;
    function timer(fn, timeInMs) {
        var now = +new Date();

        console.log(now, lastCall, now - lastCall);
        // var timerId;

        if (now - lastCall > timeInMs) {
        	console.log("if block is there, time was bigger than 250ms, function is called again",now - lastCall)
            fn;
            lastCall = now;
        } else {
        		console.log("if block is there, time was LESS than 250ms, function is not called again",now - lastCall)
            lastCall = now;
        }
    }

	/////////////////////////////////////////////////
	// THROTTLE END
	/////////////////////////////////////////////////

    function gettingData() {
        var inputInside = input.val();
        $.ajax({
            url: "https://flame-egg.glitch.me/",
            method: "GET",
            data: {
                q: input.val()
            },
            success: function(data) {
                if (input.val() == inputInside) {
                    console.log(data);
                    handleInputs(data);
                } else {
                    return;
                }
                // console.log(data);
            }
        });
    }

    function handleInputs(countries) {
        resultsDiv.html("");
        results = [];
        var htmlToAdd = "";

        if (input.val().length == 0) {
            resultsDiv.hide();
        } else {
            for (var i = 0; i < countries.length; i++) {
                if (
                    countries[i]
                        .toLowerCase()
                        .indexOf(input.val().toLowerCase()) == 0
                ) {
                    results.push(countries[i]);
                    if (results.length == 4) {
                        break;
                    }
                    // console.log(results);
                }
            }
            if (results.length == 0) {
                resultsDiv.html("");
                htmlToAdd += '<div class="result noresult">No results</div>';
            } else {
                for (var j = 0; j < results.length; j++) {
                    htmlToAdd += '<div class="result">' + results[j] + "</div>";
                }
            }
            resultsDiv.append(htmlToAdd);
            resultsDiv.show();
        }
        $("input").blur(function() {
            resultsDiv.hide();
        });

        $(".result").on("mouseenter", function(event) {
            for (var i = 0; i < results.length; i++) {
                if ($(event.target).hasClass("noresult")) {
                    $(".result")
                        .eq(i)
                        .removeClass("selected");
                }
                if (
                    $(".result")
                        .eq(i)
                        .hasClass("selected") == true
                ) {
                    $(".result")
                        .eq(i)
                        .removeClass("selected");
                }
                $(event.target).addClass("selected");
            }
        });

        $(".result").on("mouseleave", function(event) {
            $(event.target).removeClass("selected");
        });

        $(".result").on("mousedown", function(event) {
            if ($("input").val() == "") {
                resultsDiv.hide();
            }
            console.log(event);
            if ($(event.target).hasClass("noresult")) {
                return;
            }
            $("input").val(event.target.innerHTML);
        });
    }

    input.on("keydown", function(event) {
        var index = $(".selected").index();
        var results = $(".result");
        // console.log(index);

        if (event.which == 40) {
            event.preventDefault();
            // console.log($(".result").index("selected"));
            if (index < 0) {
                results.eq(0).addClass("selected");
            } else if (index < $(".result").length - 1) {
                results.eq(index).removeClass("selected");
                results
                    .eq(index)
                    .next()
                    .addClass("selected");
            }
        }
        if (event.which == 38) {
            // console.log(index);
            event.preventDefault();
            console.log("index", index);
            if (index > 0) {
                results.eq(index).removeClass("selected");
                results
                    .eq(index)
                    .prev()
                    .addClass("selected");
            } else if (index == -1) {
                results.eq(results.length - 1).addClass("selected");
            }
        }
        if (event.which == 13) {
            // console.log(input.val($(".selected").eq(0)));
            // event.preventDefault();
            input.val($(".selected").text());
            resultsDiv.hide();
        }
    });
})();
