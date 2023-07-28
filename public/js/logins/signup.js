const signupHandler = async (event) => {
    event.preventDefault();


    //assigns the values of the username, password, email(if using) to constants
    const user_name = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password').value.trim();
    
    if (username && password) {    //if there is a username, password AND email, a post request will be posted to api/users/signup with its body as the username, password, and email

        const response = await fetch('api/users/signup', {
            method: 'POST',
            body: JSON.stringify({user_name, password}),
            headers: {'Content-Type': 'application/json'},
        });

        if(response.ok) {   //if response from the api was a success, window will render the default route. iof not, it will show an error
            window.location.replace('/');
        } else {
            alert(response.statusText);
        }
    }
}


document.querySelector('#signupBtn').addEventListener('click', signupHandler);