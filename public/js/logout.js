
const logoutHandler = async (event) => {
    
    const response = await fetch('/api/users/logout', {
        method: 'Post',
        headers: {'Content-Type': 'application/js'},
    });

    if(response.ok) {
        window.location.replace('/');
    } else {
        alert('failed to logout');
    }
}



document.querySelector('#logoutBtn').addEventListener('click', logoutHandler);