const signupHandler = async (event) => {
    event.preventDefault();

    alert('Signing up...')

    //assigns the values of the username, password, email(if using) to constants
    const username = document.getElementById('name-signup').value.trim();
    const password = document.getElementById('password-signup').value.trim();

    const email = document.getElementById('email-signup').value.trim();
    
    if (username && password && email) {    //if there is a username, password AND email, a post request will be posted to api/users/signup with its body as the username, password, and email
        alert(username);
        const response = await fetch('api/users/signup', {
            method: 'POST',
            body: JSON.stringify({username, password, email}),
            headers: {'Content-Type': 'application/json'},
        });

        if (document.getElementById("password-signup").value.length < 8) {
          return alert("Please enter a password longer than 8 characters.");
        }

        if(response.ok) {   //if response from the api was a success, window will render the default route. iof not, it will show an error
            window.location.replace('/');
        } else {
          console.log('error')
        }
    }
}
document.querySelector('#signupbtn').addEventListener('click', signupHandler);