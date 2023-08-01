const createNewComment = async (event) => {
    event.preventDefault();

    const post_id = event.target.getAttribute('data-id');
    const message = document.querySelector('#comment-box').value.trim();

    if (message) {
        const response = await fetch('/api/posts/comments', {
            method: 'POST',
            body: JSON.stringify({ message, post_id }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(response.ok) {
            window.location.replace(`/`);
        } else {
            alert(response.statusText);
        }
    }
};

document.querySelector('#comment-box-send-button').addEventListener('click', createNewComment);