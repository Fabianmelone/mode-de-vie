
const logoutHandler = async (event) => {
    
    const response = await fetch('/api/users/logout', {
        method: 'Post',
        headers: {'Content-Type': 'application/js'},
    })
}



document.querySelector('#logoutBtn').addEventListener('click', logoutHandler);