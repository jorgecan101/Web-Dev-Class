//Jorge Cancino - JYC170000

window.onload = function(){

    //there will be one span element for each input field
    // when the page is loaded, we create them and append them to corresponding input elements 
	// they are initially empty and hidden

	var email = document.getElementById("email");
    var span1 = document.createElement("span");
	span1.style.display = "none"; //hide the span element
    email.parentNode.appendChild(span1);

    var pwd = document.getElementById("pwd");
    var span2 = document.createElement("span");
    span2.style.display = "none";
    pwd.parentNode.appendChild(span2);

    var confirm = document.getElementById("confirm");
    var span3 = document.createElement("span");
    span3.style.display = "none";
    confirm.parentNode.appendChild(span3);

    email.onfocus = function(){
    	span1.style.display = 'block';
        span1.innerHTML = "Email must be in a valid form (i.e. abc@xyz.com) and alphanumeric only.";
        email.className = "form-control";
    }

    email.onblur = function(){
        span1.style.display = 'none';
    }

    pwd.onfocus = function(){
        span2.style.display = 'block';
        span2.innerHTML = "Password must contain at least six characters, one uppercase letter, one number, and one special character(!,@,#,$,%,^,&,*,+)."
        pwd.className = "form-control";
    }

    pwd.onblur = function() {
        span2.style.display = 'none';
    }

    confirm.onfocus = function(){
        span3.style.display = 'block';
        span3.innerHTML = "Password and Confirm Password fields must match.";
        confirm.className = "form-control";
    }

    confirm.onblur = function() {
        span3.style.display = 'none';
    }
    
    var form = document.getElementById("myForm");
    form.onsubmit = function(e){
        //validation for email
        if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.(?:[a-zA-Z0-9-]+)*$/.test(email.value)){
            span1.style.display = 'block';
            span1.innerHTML = "Invalid Email Entered.";
            email.className = "error";
            e.preventDefault();
        }
        //validation for password
        //should contain at least six characters, one uppercase, one number, and one special character (!,@,#,$,%,^,&,*,+) 
        if (!/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*+])[a-zA-Z\d!@#$%^&*+]{6,}$/.test(pwd.value)) {
            span2.style.display = 'block';
            span2.innerHTML = "Invalid Password Entered.";
            pwd.className = "error";
            e.preventDefault();
        }
        //validation for password confirmation
        //just check if they match
        if (confirm.value != pwd.value) {
            span3.style.display = 'block';
            span3.innerHTML = "Passwords do not match.";
            pwd.className = "error";
            confirm.className = "error";
            e.preventDefault();
        }
    }
}