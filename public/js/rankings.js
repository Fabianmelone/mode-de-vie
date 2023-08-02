


//event listener for the top users from the page
document.body.addEventListener('click', async (event)=> {
    target = event.target;
  
    if(target.classList.contains('post')) {
      const postID = target.getAttribute('data-id');
      const response = await fetch(`/user/${postID}`, {
        method: 'GET',
      });
      if(response.ok){
        window.location.replace(`/posts/${postID}`);
      }
    }
  });