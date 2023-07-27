const signupHandler = async (event) => {
    event.preventDefault();


    //assigns the values of the username, password, email(if using) to constants
    const username = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password').value.trim();
    const email = document.querySelector('#email').value.trim();
}


document.querySelector('#signupBtn').addEventListener('click', signupHandler);