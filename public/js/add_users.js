$(document).ready(function() {
    $("#backBtn").click(function() {
        location.href = "/users";
    })
    $("#userForm").submit(function(e) {
        e.preventDefault();
        let firstName = $("#fName").val();
        let lastName = $("#lName").val();
        let emailId = $("#email").val();
        let pwd1 = $("#pwd1").val();
        let pwd2 = $("#pwd2").val();

        if (pwd1 != pwd2) {
            alert("Password and confirm password must be same");
            return;
        }
        
        $.ajax({
            url: "/api/users",
            type: "POST",
            data: {
                first_name: firstName,
                last_name: lastName,
                email_id: emailId,
                password: pwd1
            },
            success: function(result) {
                alert(result);
                location.href = "/users";
            },
            error: function(error) {
                alert(error);
            }
        })
    })
})