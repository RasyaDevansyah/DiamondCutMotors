document.addEventListener('DOMContentLoaded', function() {

    const form = document.getElementById('register-form');
    const name = document.getElementById('name');
    const phone = document.getElementById('PhoneNumber');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirmPass = document.getElementById('confirmpassword');

    const terms = document.getElementById('terms-conditions');
    const register = document.getElementById('register-button');

    register.addEventListener('click', function(e) {
        console.log(document)
        e.preventDefault();
        if(checkInputs()){
            window.location.replace("index.html");
        }
    });

    function checkInputs()
    {
        let isValid = true;
        validateField(name, name.value.trim() !== '', 'Name cannot be blank' );

        validateField(email, isEmail(email.value.trim()), 'Not a valid email');

        validateField(phone, isPhone(phone.value.trim()), 'Not a valid phone number');

        validateField(password, password.value.trim().length >= 8, 'Must be least 8 characters');

        validateField(confirmPass, confirmPass.value === password.value && password.value != "", 'Password does not match')
        
        validateTermsCondition(terms, terms.checked);

        document.querySelectorAll('.form').forEach((control) => {
            if (control.classList.contains('error')) {
                isValid = false;  
            }
        });

        return isValid;

        function validateTermsCondition(input, condition){
            if(condition){
                setTermSuccess(input);
            }else{
                setTermError(input);
            }
        }
        function setTermSuccess(input){
            const formControl = input.parentElement;
            const label = formControl.querySelector('.agree-text');
            label.className = 'agree-text success'
            formControl.className = 'form terms-conditions success';
            
        }

        function setTermError(input){
            const formControl = input.parentElement;
            const label = formControl.querySelector('.agree-text');
            label.className = 'agree-text error'
            formControl.className = 'register form terms-conditions error';

        }

        function validateField(input, condition, errorMessage){
            if(condition){
                setSuccess(input);
            }else{
                setError(input, errorMessage);
            }
        }

        function setError(input, message){
            const formControl = input.parentElement;
            formControl.className = 'register form error';
            input.placeholder = message;
        }

        function setSuccess(input){
            const formControl = input.parentElement;
            formControl.className = 'register form success';
        }

        function isEmail(email){
            return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email);
        }

        function isPhone(phone){
            return /^\+?(\d.*){3,}$/.test(phone);
        }
    }

});
