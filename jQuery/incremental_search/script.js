(function(countries) {
    var input = $("#input");
    // var inputText = input.val().toLowerCase();
    var results = [];
    var resultsDiv = $("#results");

    input.on("input focus", function() {
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
    });

    input.on("keydown", function(event) {
        var index = $(".selected").index();
        var results = $(".result");
        // console.log(index);

        if (event.which == 40) {
            event.preventDefault();

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
})([
    "Afghanistan",
    "Albania",
    "Algeria",
    "American Samoa",
    "Angola",
    "Anguilla",
    "Antigua",
    "Argentina",
    "Armenia",
    "Aruba",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bermuda",
    "Bhutan",
    "Bolivia",
    "Bonaire (Netherlands Antilles)",
    "Bosnia Herzegovina",
    "Botswana",
    "Brazil",
    "British Virgin Islands",
    "Brunei",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Cape Verde",
    "Cayman Islands",
    "Central African Republic",
    "Chad",
    "Chile",
    "China",
    "Colombia",
    "Comoros",
    "Congo",
    "Congo, The Democratic Republic of",
    "Cook Islands",
    "Costa Rica",
    "Croatia",
    "Curacao (Netherlands Antilles)",
    "Cyprus",
    "Czech Republic",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Ethiopia",
    "Fiji",
    "Finland",
    "France",
    "French Guiana",
    "French Polynesia",
    "Gabon",
    "Gambia",
    "Georgia",
    "Germany",
    "Ghana",
    "Gibraltar",
    "Greece",
    "Grenada",
    "Guadeloupe",
    "Guam",
    "Guatemala",
    "Guinea",
    "Guinea Bissau",
    "Guyana",
    "Haiti",
    "Honduras",
    "Hong Kong",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iraq",
    "Ireland (Republic of)",
    "Israel",
    "Italy",
    "Ivory Coast",
    "Jamaica",
    "Japan",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "Kosovo",
    "Kosrae Island",
    "Kuwait",
    "Kyrgyzstan",
    "Laos",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Lithuania",
    "Luxembourg",
    "Macau",
    "Macedonia (FYROM)",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Marshall Islands",
    "Martinique",
    "Mauritania",
    "Mauritius",
    "Mayotte",
    "Mexico",
    "Moldova",
    "Mongolia",
    "Montenegro",
    "Montserrat",
    "Morocco",
    "Mozambique",
    "Namibia",
    "Nepal",
    "Netherlands",
    "New Caledonia",
    "New Zealand",
    "Nicaragua",
    "Niger",
    "Nigeria",
    "Northern Mariana Islands",
    "Norway",
    "Oman",
    "Pakistan",
    "Palau",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines",
    "Poland",
    "Ponape",
    "Portugal",
    "Puerto Rico",
    "Qatar",
    "Reunion",
    "Romania",
    "Rota",
    "Russia",
    "Rwanda",
    "Saba (Netherlands Antilles)",
    "Saipan",
    "Samoa",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Slovakia",
    "Slovenia",
    "Solomon Islands",
    "South Africa",
    "South Korea",
    "Spain",
    "Sri Lanka",
    "St. Barthelemy",
    "St. Croix",
    "St. Eustatius (Netherlands Antilles)",
    "St. John",
    "St. Kitts and Nevis",
    "St. Lucia",
    "St. Maarten (Netherlands Antilles)",
    "St. Thomas",
    "St. Vincent and the Grenadines",
    "Suriname",
    "Swaziland",
    "Sweden",
    "Switzerland",
    "Syria",
    "Taiwan",
    "Tajikistan",
    "Tanzania",
    "Thailand",
    "Tinian",
    "Togo",
    "Tonga",
    "Tortola",
    "Trinidad and Tobago",
    "Truk",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Turks and Caicos",
    "Tuvalu",
    "US Virgin Islands",
    "Uganda",
    "Ukraine",
    "Union Island",
    "United Arab Emirates",
    "United Kingdom",
    "United States",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Venezuela",
    "Vietnam",
    "Virgin Gorda",
    "Wallis and Futuna",
    "Yap",
    "Yemen",
    "Zambia",
    "Zimbabwe"
]);
