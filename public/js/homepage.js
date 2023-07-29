function toggleSidebar() {
  const sidebar = document.querySelector(".sidebar");
  console.log(sidebar);
  sidebar.classList.toggle("closed");
}

async function ImgToSvg(img, id) {
  const s = document.createElement('div');
  s.innerHTML = await (await fetch(img.src)).text();
  s.firstChild.classList = img.classList;
  if (id) { s.firstChild.id = id; }
  img.replaceWith(s.firstChild)
}

function textAreaAdjust(e, element) {
  console.log(element.value.length);
  if (e.key === "Backspace" && element.value.length === 0) {
    element.style.height = element.style.minHeight;
    return;
  }
  element.style.height = "1px";
  element.style.height = 25 + element.scrollHeight + "px";
}

// Loads user data
function loadUserData() {
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  
  // Load username
  document.querySelectorAll(".username").forEach((element) => {
    if (element.innerHTML) {
      element.innerHTML = loggedInUser.username;
    }
  });
}


document.querySelector('#like').addEventListener('click', async (event)=> {
  const likesNum = parseInt(event.target.getAttribute('data-like'));
  const postId = event.target.getAttribute('data-id');
  

  const response = await fetch('/api/posts/like', {
    method: 'PUT',  // Change to 'PUT'
    body: JSON.stringify({likesNum, postId}),  // Include postId in the request body
    headers: {'Content-Type': 'application/json'},
  })

  if(response.ok) {
        // Get the new number of likes from the response
        const data = await response.json();
        const newLikes = data.likes;

        // Update the number of likes in the HTML
        event.target.setAttribute('data-like', newLikes);
        event.target.textContent = newLikes;
  } else {
    alert(response.statusText);
  }
})


// Init
window.onload = () => {
  loadUserData();
}