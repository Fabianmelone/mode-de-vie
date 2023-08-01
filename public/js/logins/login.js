const storeUserData = (data) => {
  localStorage.setItem("loggedInUser", JSON.stringify(data));
}

const loginHandler = async (event) => {
    event.preventDefault();

    //collects user and password value from login form
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    //if both username and password are entered, a post request will be sent to the api
    if(email && password) {
        //in the user-routes.js
        const response = await fetch('/api/users/login', {
          method: 'POST',
          body: JSON.stringify({ email, password }),
          headers: { 'Content-Type': 'application/json' },
        });
    
        if(response.ok) {
          const data = await response.json();
          const user = data.user;

          // Store the user data in local storage
          storeUserData(user);
          
          // if resonse was successful, page will redirect to the homepage
          document.location.replace("/"); //may change the route later.
        } else {
          alert(response.statusText);
      }
    }
};

//if the submit button in the login form is clicked, a request will be posted to the api/users/login route
document.querySelector('#loginBtn').addEventListener('click', loginHandler);
document.querySelector('#signupBtn').addEventListener('click', () => { window.location.replace("/signup"); });
