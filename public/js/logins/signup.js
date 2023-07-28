const signupHandler = async (event) => {
    event.preventDefault();

    alert('hi')

    //assigns the values of the username, password, email(if using) to constants
    const username = document.querySelector('#name-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    const email = document.querySelector('#email-signup').value.trim();
    
    if (username && password && email) {    //if there is a username, password AND email, a post request will be posted to api/users/signup with its body as the username, password, and email

        alert(username);
        const response = await fetch('api/users/signup', {
            method: 'POST',
            body: JSON.stringify({username, password, email}),
            headers: {'Content-Type': 'application/json'},
        });

        if(response.ok) {   //if response from the api was a success, window will render the default route. iof not, it will show an error
            window.location.replace('/');
        } else {
            alert(response.statusText);
            console.log('error')
        }
    }
}
document.querySelector('#signupbtn').addEventListener('click', signupHandler);