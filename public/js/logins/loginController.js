const  loginHandler = async () => {

    window.location.replace('/login');
}

const  signupHandler = async () => {

    window.location.replace('/signup');
}

document.querySelector('#logninBtn').addEventListener('click', loginHandler);

document.querySelector('#signupBtn').addEventListener('click', signupHandler);