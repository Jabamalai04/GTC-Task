$(document).ready(function() {
    $("#registerBtn").click(function() {
        if(!$("#userName").val()) {
            alert("Please Enter the UserName");
            return;
        }
        
        if(!$("#pwd1").val()) {
            alert("Please Enter the Password");
            return;
        }

        if($("#pwd1").val()!= $("#pwd2").val()) {
            alert("Both Password and Re-entered password should be same");
        }

        window.open("/users");
    })
})