
const logoutHandler = async (event) => {
    
    const response = await fetch('/api/users/logout', {
        method: 'Post',
        headers: {'Content-Type': 'application/js'},
    });

    //if response from the fetch api is a success, the window will be directed to the default route ('/')
    if(response.ok) {
        window.location.replace('/');
    } else {
        alert('failed to logout');
    }
}


// calls the logoutHandler when #logoutBtn is clicked
document.querySelector('#logoutBtn').addEventListener('click', logoutHandler);