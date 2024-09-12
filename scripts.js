document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    let valid = true;

    document.getElementById('emailError').textContent = '';
    document.getElementById('passwordError').textContent = '';

    if (!email) {
        document.getElementById('emailError').textContent = 'Please enter your email';
        valid = false;
    } 
    else if (!isValidEmail(email)) {
        document.getElementById('emailError').textContent = 'Invalid email format';
        valid = false;


    }

    if (!password) {
        document.getElementById('passwordError').textContent = 'Please enter your password';
        valid = false;
    } 
    else if (password.length < 8) {
        document.getElementById('passwordError').textContent = 'Password must be at least 8 characters long';
        valid = false;
    }

    if (valid) {
        document.getElementById('spinner').style.display = 'block';  

 
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: email,
                password: password
            })
        })


        .then(response => response.json())

        .then(data => {

            document.getElementById('spinner').style.display = 'none'; 

            
            document.getElementById('form-container').style.display = 'none';
            document.getElementById('successMessage').style.display = 'flex';
        })


        .catch(error => {
            document.getElementById('spinner').style.display = 'none';  
            document.getElementById('resultMessage').textContent = 'Login failed. Please try again.';
            document.getElementById('resultMessage').style.color = 'red';
            console.error('Error:', error);


        });


    }


});


function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return re.test(email);



}


const passwordField = document.getElementById('password');
const togglePassword = document.getElementById('togglePassword');

togglePassword.addEventListener('click', function() {
    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        togglePassword.textContent = 'Hide';
    } 
    else
     {
        passwordField.type = 'password';
        togglePassword.textContent = 'Show';



    }



});


