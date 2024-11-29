$(document).ready(function() {
    $("#addBtn").click(function() {
        location.href = "/users/add";
    })

    $("#searchBtn").click(function() {
        let text = $("#searchTxt").val();
        alert(text);
        location.href = `/users?searchTxt=${text}`;
    })
})