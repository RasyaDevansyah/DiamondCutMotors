document.addEventListener('DOMContentLoaded', function() {

    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const register = document.getElementById('login-button');

    const invalidText = document.querySelector('.invalid');

    register.addEventListener('click', function(e) {
        console.log(document)
        e.preventDefault();
        if(checkInputs()){
            invalidText.className = "invalid"
            window.location.replace("index.html");
        }
    });

    function checkInputs()
    {
        let isValid = true;

        validateField(email, isEmail(email.value.trim()), 'Not a valid email');

        validateField(password, password.value.trim().length >= 8, 'Must be least 8 characters');


        document.querySelectorAll('.form').forEach((control) => {
            if (control.classList.contains('error')) {
                isValid = false;  
                invalidText.className = "invalid error"
            }
        });

        return isValid;


        function validateField(input, condition, errorMessage){
            if(condition){
                setSuccess(input);
            }else{
                setError(input, errorMessage);
            }
        }

        function setError(input){
            const formControl = input.parentElement;
            formControl.className = 'form error';
        }

        function setSuccess(input){
            const formControl = input.parentElement;
            formControl.className = 'form success';
        }

        function isEmail(email){
            return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email);
        }

    }

});
