const createNewComment = async (event) => {
    event.preventDefault();

    const comment_id = event.target.getAttribute('data-id');
    const contents = document.querySelector('#comment-box').value.trim();

    if (contents) {
        const response = await fetch('/api/posts/comments', {
            method: 'POST',
            body: JSON.stringify({ contents, comment_id }),
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