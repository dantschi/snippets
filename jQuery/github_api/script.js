(function() {
    //////////////////////////////////////////////////////////////////////////
    Handlebars.templates = Handlebars.templates || {};

    var templates = document.querySelectorAll(
        'script[type="text/x-handlebars-template"]'
    );

    Array.prototype.slice.call(templates).forEach(function(script) {
        Handlebars.templates[script.id] = Handlebars.compile(script.innerHTML);
    });

    //////////////////////////////////////////////////////////////////////////

    var dataFromRequest;
    var dataForCommits;

    //////////////////////////////////////////////////////////////////////////
    var buttonSearch = $("#btn-search");
    var userName;
    var userToSearch;
    var repoCommits;
    var boxes;
    var rootUrl = "https://api.github.com";
    var repoFullName;

    buttonSearch.on("click", function() {
        userName = $("input[name='username']").val();
        var userPwd = $("input[name='password']").val();
        userToSearch = $("input[name='usertosearch']").val();

        // var endPoint = "/users/:username/repos"; :username must be replaced with the username we search. it is a kind of placeholder
        var endPoint = "/users/" + userToSearch + "/repos";

        console.log(rootUrl + endPoint);

        $.ajax({
            url: rootUrl + endPoint,
            headers: {
                Authorization: "Basic " + btoa(userName + ":" + userPwd)
            },
            method: "GET",

            success: function(responseForTheRequest) {
                console.log(responseForTheRequest);
                dataFromRequest = responseForTheRequest;

                $("#main").html(
                    Handlebars.templates.maintemplate({
                        dataToRender: dataFromRequest
                    })
                );
                repoFullName = dataFromRequest.full_name;
                // console.log(dataFromRequest[0].name);

                //the property "full_name" is important
                //the property avatar_url is important. this is the profile picture
                //use handlebars to render the render full_name and avatar_url

                // by clicking on the repository, fetch the 10 most popular commits
                // ==> by clicking a new ajax request must be done, very similar to the first one, the endpoint is different
                // /repos/:owner/:repo/commits
                boxes = $(".content-box");
                console.log(boxes);

                boxes.on("click", function(e) {
                    var repoId = e.currentTarget.id;
                    console.log(repoId);
                    var endPointCommits =
                        "/repos/" +
                        userToSearch +
                        "/" +
                        repoId +
                        // "/" +
                        // repoId +
                        "/commits?per_page=10";
                    repoCommits = null;

                    console.log($(e.currentTarget).find("ul").length);

                    if ($(e.currentTarget).find("ul").length > 0) {
                        $(e.currentTarget)
                            .find("ul")
                            .slideToggle(200);
                        // if ($(".list").is(":hidden")) {
                        //     $(".list").css({
                        //         visibility: "visible"
                        //     });
                        // } else {
                        //     $(".list").css({
                        //         visibility: "hidden"
                        //     });
                        // }
                    } else {
                        $.ajax({
                            // url: rootUrl + endPointCommits,
                            url: rootUrl + endPointCommits,
                            headers: {
                                Authorization:
                                    "Basic " + btoa(userName + ":" + userPwd)
                            },
                            success: function(repoResult) {
                                dataForCommits = repoResult;
                                dataForCommits.length = 10;
                                // dataForCommits.length = 10;
                                console.log(dataForCommits);
                                $(e.currentTarget)
                                    .find(".commitbox")
                                    .append(
                                        Handlebars.templates.committemplate({
                                            dataToRender2: dataForCommits
                                        })
                                    );
                                $(e.currentTarget)
                                    .find("ul")
                                    .show(100);
                            }
                        });
                    }
                });
            }
        });
    });
})();
