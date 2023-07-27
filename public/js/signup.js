const signupHandler = async (event) => {
    event.preventDefault();


    //assigns the values of the username, password, email(if using) to constants
    const username = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password').value.trim();
    const email = document.querySelector('#email').value.trim();

    if (username && password && email) {    //if there is a username, password AND email, a post request will be posted to api/users/signup with its body as the username, password, and email

        const response = await fetch('api/users/signup', {
            method: 'POST',
            body: JSON.stringify({username, password, email}),
            headers: {'Content-Type': 'application/json'},
        });

        if(response.ok) {
            
        }
    }
}


document.querySelector('#signupBtn').addEventListener('click', signupHandler);