
// $(".make-comment").on("click", function() {
//     console.log($(this).attr("data-id"))
// })

$(document).on("click", "p", function() {
    console.log("clicked to make a comment")

    var thisId = $(this).attr("data-id");
    console.log(thisId);

    // $.ajax({
    //     method: "GET",
    //     url: "/articles/" + thisId
    // })
    // .then(function(data) {

    // })

})