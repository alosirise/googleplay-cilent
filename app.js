$(function () {
    homePage();

    //top chart
    $('#home').click(function () {
        homePage();
    });

    //category
    $.get("http://localhost:8080/category/all", function (data, status) {
        console.log(status);
        console.log(data.length);
        if (status === "success") {
            data.forEach(element => {
                var item = ` <button class="dropdown-item searchByCat"  id="${element.category}">${element.category}</button>`;

                $("#category").append(item);
            });
        }
    }).then(function () {
        $('.searchByCat').click(function () {
            console.log(":) here your id", this.id);
            var id = this.id;
            $.get(`http://localhost:8080/find/apps/category?category=${this.id}`, function (data, status) {
                console.log(status);
                if (status === "success") {
                    generateApps(data, id);
                }
            }).then(function () {
                generateReviews();
            });
        });
    });

    //app name
    $("#search-by-appname").click(function () {
        var appname = $("#input-appname").val();
        if (appname.length > 0 && appname !== " ") {
            $.get(`http://localhost:8080/find/apps/name?name=${appname}`, function (data, status) {
                console.log(status);

                if (status === "success") {
                    generateApps(data, "Search \"" + appname + '"');
                }
            }).then(function () {
                generateReviews();
            })
        } else {
            var header = `<h1 class="display-5">Not found</h1>`;
            $("#header").html(header);
        }

    });

    //see more download


    //by type
    $.get("http://localhost:8080/type/all", function (data, status) {
        console.log(status);
        console.log(data.length);
        if (status === "success") {
            data.forEach(element => {
                var item = ` <button class="dropdown-item searchByType"  id="${element.type}">${element.type}</button>`;

                $("#type").append(item);
            });
        }
    }).then(function () {
        $('.searchByType').click(function () {
            console.log(":) here your id", this.id);
            var id = this.id;
            $.get(`http://localhost:8080/find/apps/type?type=${this.id}`, function (data, status) {
                console.log(status);
                if (status === "success") {
                    generateApps(data, id);
                }
            }).then(function () {
                generateReviews();
            });
        });
    });


    //Rating
    $('.searchByRating').click(function () {
        var rating = this.id.slice(0, 1);
        var header_label = `Rating ${rating} <i class="fa fa-star" aria-hidden="true"></i>`
        console.log(rating);
        setUrlAndHeaderLabel(`http://localhost:8080/find/apps/rating?start=${rating}`, header_label);
    });

    //Games
    $.get("http://localhost:8080/games/genres/all", function (data, status) {
        console.log(status);
        console.log(data.length);
        if (status === "success") {
            data.forEach(element => {
                if ((element.category).indexOf(';') == -1) {
                    var item = ` <button class="dropdown-item searchByGame"  id="${element.category}">${element.category}</button>`;

                    $("#game").append(item);
                }
            });
        }
    }).then(function () {
        $('.searchByGame').click(function () {
            var genre = this.id;
            var header_label = `Search game by genre "${genre}"`
            console.log(genre);
            setUrlAndHeaderLabel(`http://localhost:8080/find/apps/games/genres?genres=${genre}`, header_label);
        });
    });

    //Content 
    $.get("http://localhost:8080/content_rating/all", function (data, status) {
        console.log(status);
        console.log(data.length);
        if (status === "success") {
            data.forEach(element => {
                var item;
                if ((element.type).indexOf('+') == -1) {
                    item = ` <button class="dropdown-item searchByContentRating"  id="${element.type}">${element.type}</button>`;

                } else {
                    var id = `${element.type.slice(0, element.type.length - 1)}`
                    item = ` <button class="dropdown-item searchByContentRating"  id="${id}">${element.type}</button>`;
                }
                $("#content-rating").append(item);
            });
        }
    }).then(function () {
        $('.searchByContentRating').click(function () {
            var content_rating = this.id;
            var header_label = `Search by content rating "${$(this).text()}"`
            console.log(content_rating);
            setUrlAndHeaderLabel(`http://localhost:8080/find/apps/content_rating?content_rating=${content_rating}`, header_label);
        });
    });



    //gen stars 
    function setTagStar(rating) {
        var tagStar;
        if (rating == 5) {
            tagStar = '<i class="fa fa-star" style="color:gray" aria-hidden="true"></i><i class="fa fa-star" style="color:gray" aria-hidden="true"></i><i class="fa fa-star" style="color:gray" aria-hidden="true"></i><i class="fa fa-star" style="color:gray" aria-hidden="true"></i><i class="fa fa-star" style="color:gray" aria-hidden="true"></i>';
        }
        else if (rating >= 4 && rating < 5) {
            tagStar = '<i class="fa fa-star" style="color:gray" aria-hidden="true"></i><i class="fa fa-star" style="color:gray" aria-hidden="true"></i><i class="fa fa-star" style="color:gray" aria-hidden="true"></i><i class="fa fa-star" style="color:gray" aria-hidden="true"></i><i class="fa fa-star-o" style="color:gray" aria-hidden="true"></i>';

        } else if (rating >= 3 && rating < 4) {
            tagStar = '<i class="fa fa-star" style="color:gray" aria-hidden="true"></i><i class="fa fa-star" style="color:gray" aria-hidden="true"></i><i class="fa fa-star" style="color:gray" aria-hidden="true"></i><i class="fa fa-star-o" style="color:gray" aria-hidden="true"></i><i class="fa fa-star-o" style="color:gray" aria-hidden="true"></i>';

        } else if (rating >= 2 && rating < 3) {
            tagStar = '<i class="fa fa-star" style="color:gray" aria-hidden="true"></i><i class="fa fa-star" style="color:gray" aria-hidden="true"></i><i class="fa fa-star-o" style="color:gray" aria-hidden="true"></i></i><i class="fa fa-star-o" style="color:gray" aria-hidden="true"></i><i class="fa fa-star-o" style="color:gray" aria-hidden="true"></i>';

        } else if (rating >= 1 && rating < 2) {
            tagStar = '<i class="fa fa-star" style="color:gray" aria-hidden="true"></i><i class="fa fa-star-o" style="color:gray" aria-hidden="true"></i><i class="fa fa-star-o" style="color:gray" aria-hidden="true"></i><i class="fa fa-star-o" style="color:gray" aria-hidden="true"></i><i class="fa fa-star-o" style="color:gray" aria-hidden="true"></i>';
        } else {
            tagStar = '';
        }
        return tagStar;
    }

    //gen home
    function homePage() {
        $("#result").empty();
        $("#result-review").empty();
        $("#result-modal").empty();
        $.get(`http://localhost:8080/top/apps/download`, function (data, status) {
            console.log(status);
            if (status === "success") {
                generateAppsForHome(data, "Top Download");
            }
        }).then(function () {
            generateReviews();
        });
        $.get(`http://localhost:8080/top/apps/review`, function (data, status) {
            console.log(status);
            if (status === "success") {
                generateAppsForHome(data, "Top Review");
            }
        }).then(function () {
            generateReviews();
        }).then(function () {
            $('#search-top-download').click(function () {
                $.get(`http://localhost:8080/find/apps/most_download`, function (data, status) {
                    console.log(status);
                    if (status === "success") {
                        generateApps(data, "Top Download");
                    }
                }).then(function () {
                    generateReviews();
                });
            });
            //see more review
            $('#search-top-review').click(function () {
                $.get(`http://localhost:8080/find/apps/most_review`, function (data, status) {
                    console.log(status);
                    if (status === "success") {
                        generateApps(data, "Top Review");
                    }
                }).then(function () {
                    generateReviews();
                });
            });
        });
    }

    //gen apps for home
    function generateAppsForHome(data, header_label) {
        var length = data.length;
        if (length > 0) {
            var header = `<h1 class="display-5">${header_label}</h1>`;
            if (header_label === "Top Review")
                $("#header-review").html(header);
            else
                $("#header").html(header);
            data.forEach(element => {
                var purchase;
                if (element.type === "Free") purchase = `<button type="button" class="btn btn-success">Install</button>`
                else if (element.type === "Paid") purchase = `<button type="button" class="btn btn-success">Purchase in ${element.price}$</button>`
                var item = `
                <div class="card get-reviews" data-toggle="modal" data-target=".bd-modal-lg-${element.id}" id="${element.id}" style="width: 200px;  margin: 8px; height: 220px; ">
                <div class="container">
                        <div class="card-body" style="text-transform: capitalize; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                      
                        <div class="row" style="margin-bottom: 15px;">
                            <img src="icon.png" width="250px" alt="google play's icon" class="center"><br>
                        </div>
                        <div class="row">${element.name}</div>
                        <div class="row center">
                            <small style="color: rgb(90, 90, 90);">${setTagStar(element.rating)}</small>
                        </div>
                            <p class="card-text"></p>
                        </div>
                </div>`;
                var modal = `<div class="modal fade bd-modal-lg-${element.id}" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">${element.name}</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="row">

                                <div class="col-7">
                                    <h6 style="color:green">${element.category}</h6>
                                    <h6><span style="border: 1px solid;">${element.content_rating}</span></h6>

                                    <h6 style="padding-top: 15px">Current Version ${element.current_ver}</h6>
                                    <h6>Android Version ${element.android_ver}</h6>
                                    <h6>Last updated ${element.last_updated} </h6>
                                </div>
                                <div class="col-5">
                                    <h6>${setTagStar(element.rating)} </h6>
                                    <h6>${element.reviews} reviews</h6>
                                    <h6>Installed ${element.installs}</h6>
                                    <div style="padding-top: 8px">${purchase}</div>
                                    <h6 style="font-size:15px; color:gray; padding-top: 5px">Size ${element.size}</h6>
                                </div>
                            </div>
                            <h6 style="padding-top: 15px">Best of Reviews (Positive)+</h6>
                            <div class="overflow-auto" style="height: 300px;" id="reviews-${element.id}"></div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>`;

                $("#result-modal").append(modal);
                if (header_label === "Top Review")
                    $("#result-review").append(item);
                else
                    $("#result").append(item);
            });
            if (header_label === "Top Review")
                $("#result-review").append('<button style="width: 200px; font-size:25px;  margin: 8px; height: 220px; " type="button" class="btn btn-success" id="search-top-review">See more</button>');
            else
                $("#result").append('<button id="search-top-download" style="width: 200px; font-size:25px; margin: 8px; height: 220px; " type="button" class="btn btn-success">See more</button>');
        }
    }


    //gen apps
    function generateApps(data, header_label) {

        $("#result").empty();
        $("#header-review").empty();
        $("#result-review").empty();
        $("#result-modal").empty();
        var length = data.length;
        if (length > 0) {
            var header = `<h1 class="display-5">${header_label}</h1>`;
            $("#header").html(header);
            data.forEach(element => {

                var purchase;
                if (element.type === "Free") purchase = `<button type="button" class="btn btn-success">Install</button>`
                else if (element.type === "Paid") purchase = `<button type="button" class="btn btn-success">Purchase in ${element.price}$</button>`
                var item = `
                <div class="card get-reviews" data-toggle="modal" data-target=".bd-modal-lg-${element.id}" id="${element.id}" style="width: 200px;  margin: 8px; height: 220px; ">
                <div class="container">
                        <div class="card-body" style="text-transform: capitalize; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                      
                        <div class="row" style="margin-bottom: 15px;">
                            <img src="icon.png" width="250px" alt="google play's icon" class="center"><br>
                        </div>
                        <div class="row">${element.name}</div>
                        <div class="row center">
                            <small style="color: rgb(90, 90, 90);">${setTagStar(element.rating)}</small>
                        </div>
                            <p class="card-text"></p>
                        </div>
                </div>`;
                var modal = `<div class="modal fade bd-modal-lg-${element.id}" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">${element.name}</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="row">

                                <div class="col-7">
                                    <h6 style="color:green">${element.category}</h6>
                                    <h6><span style="border: 1px solid;">${element.content_rating}</span></h6>

                                    <h6 style="padding-top: 15px">Current Version ${element.current_ver}</h6>
                                    <h6>Android Version ${element.android_ver}</h6>
                                    <h6>Last updated ${element.last_updated} </h6>
                                </div>
                                <div class="col-5">
                                    <h6>${setTagStar(element.rating)} </h6>
                                    <h6>${element.reviews} reviews</h6>
                                    <h6>Installed ${element.installs}</h6>
                                    <div style="padding-top: 8px">${purchase}</div>
                                    <h6 style="font-size:15px; color:gray; padding-top: 5px">Size ${element.size}</h6>
                                </div>
                            </div>
                            <h6 style="padding-top: 15px">Best of Reviews (Positive)+</h6>
                            <div class="overflow-auto" style="height: 300px;" id="reviews-${element.id}"></div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>`;
                $("#result-modal").append(modal);
                $("#result").append(item);
            });
        } else {
            var header = `<h1 class="display-5">${header_label + " Not Found"}</h1>`;
            $("#header").html(header);
        }

    }

    //gen reviews
    function generateReviews() {
        $(".get-reviews").click(function () {
            console.log(":) i'm reviews", this.id);
            var id = `#reviews-${this.id}`;
            $.get(`http://localhost:8080/reviews?id=${this.id}`, function (data, status) {
                console.log(status);
                var length = data.length;
                console.log(length);
                $(id).empty();
                if (status === "success" && length > 0) {

                    data.forEach(element => {
                        var item = `<div class="card"><div class="card-body"><p class="card-text">${element.translated_review}</p>
                                    </div></div>`;
                        $(id).append(item);
                    });

                } else {
                    var item = `<div class="card"><div class="card-body"><p class="card-text text-center">No reviews now</p>
                            </div></div>`;
                    $(id).append(item);
                }
            });
            var seemore_btn = `<div style="text-align: center; margin: 10px; color: blue;"><button type="button"
                class="btn btn-primary">see more reviews</button></div>`;
        });

    }
    //set url and header label
    function setUrlAndHeaderLabel(url, header_label) {
        $.get(url, function (data, status) {
            console.log(status);
            if (status === "success") {
                generateApps(data, header_label);
            }
        }).then(function () {
            generateReviews();
        });

    }
});

