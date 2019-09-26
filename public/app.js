
// $(".make-comment").on("click", function() {
//     console.log($(this).attr("data-id"))
// })

var viewNews = function() {
    location.assign("/news")
}

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

// document.getElementById("#comment-form").onsubmit = function(data) {
//     console.log("submitted form")
//     console.log(data)

// }


$(document).on("submit", "#comment-form", function(data){
    event.preventDefault();
    // console.log(event);
    console.log(data)
    console.log("click")
    console.log($(this).val())
    console.log($(this).username)
})

$(document).on("click", "button", function(event){
    console.log("you've clicked the delete button")
    console.log($(this).val())
    thisId = $(this).val()


    $.ajax({
        method: "PUT",
        url: "/comment/delete/" + thisId 
    })
        .then(function(data) {

            // console.log(data);
            location.reload();
        })
})

$("#delete-comment").on("click", function(event) {
    event.preventDefault();
    console.log("click")
})

// document.getElementById("comment-form").onsubmit = function(){

//     console.log("you submitted this form")
// }