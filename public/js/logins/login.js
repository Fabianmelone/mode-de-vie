
const loginHandler = async (event) => {
    event.preventDefault();

    //collects user and password value from login form
    const user_name = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    //if both username and password are entered, a post request will be sent to the api
    if(user_name && password) {
        //in the user-routes.js
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ user_name, password }),
            headers: { 'Content-Type': 'application/json' },
          });
        if(response.ok) {
            // if resonse was successful, page will redirect to the homepage
            document.location.replace('/');     //may change the route later.
        } else {
            alert(response.statusText);
        }
    }
};

//if the submit button in the login form is clicked, a request will be posted to the api/users/login route
document.querySelector('.login-form').addEventListener('submit', loginHandler);