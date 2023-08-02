const createNewComment = async (event) => {
    event.preventDefault();
    const post_id = document.querySelector('#comment-box-send-button').getAttribute('data-id');
    const message = document.querySelector('#comment-box').value.trim();
        console.log(post_id);
    if (message) {

        const response = await fetch('/api/posts/comments', {
            method: 'POST',
            body: JSON.stringify({ message, post_id }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        alert(response);
        if(response.ok) {
            window.location.replace(`/posts/${post_id}`);
        } else {
            alert(response.statusText);
        }
    }
};

document.querySelector('#comment-box-send-button').addEventListener('click', createNewComment);
