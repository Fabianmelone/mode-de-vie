function toggleSidebar() {
  const sidebar = document.querySelector(".sidebar");
  console.log(sidebar);
  sidebar.classList.toggle("closed");
}

async function ImgToSvg(img, id) {
  const s = document.createElement("div");
  s.innerHTML = await (await fetch(img.src)).text();
  s.firstChild.classList = img.classList;
  if (id) {
    s.firstChild.id = id;
  }
  img.replaceWith(s.firstChild);
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
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  console.log(loggedInUser);

  // Load Username
  document.querySelectorAll(".username").forEach((element) => {
    if (element.textContent) {
      element.textContent = loggedInUser.username;
    }
  });

  // Load Following
  document.querySelectorAll(".following-counter").forEach((element) => {
    if (element.textContent) {
      element.textContent = loggedInUser.following;
    }
  });

  // Load Followers
  document.querySelectorAll(".followers-counter").forEach((element) => {
    if (element.textContent) {
      element.textContent = loggedInUser.followers;
    }
  });
}

if (document.querySelector("#like") && document.querySelector("#save")) {
  // not yet done!! we need to click once to add a like, and click again to not like
  document.querySelector("#like").addEventListener("click", async (event) => {
    const likesNum = parseInt(event.target.getAttribute("data-like"));
    const postId = event.target.getAttribute("data-id");

    const likesCounter = document.querySelector(`#likes-counter`);

    var isLiked;

    // toggles if button has been clicked or not
    if (event.target.getAttribute("data-click") === "not-liked") {
      isLiked = false;
      event.target.setAttribute("data-click", "liked");
    } else if (event.target.getAttribute("data-click") === "liked") {
      isLiked = true;
      event.target.setAttribute("data-click", "not-liked");
    }

    const response = await fetch("/api/posts/like", {
      method: "PUT", // Change to 'PUT'
      body: JSON.stringify({ likesNum, postId, isLiked }), // Include postId in the request body
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      // Get the new number of likes from the response
      const data = await response.json();
      const newLikes = data.likes;

      // Update the number of likes in the HTML
      event.target.setAttribute("data-like", newLikes);
      likesCounter.textContent = newLikes;
    } else {
      alert(response.statusText);
    }
  });

  document.querySelector("#save").addEventListener("click", async (event) => {
    const postId = event.target.getAttribute("data-id");
    var isSaved;

    if (event.target.getAttribute("data-saved") === "false") {
      isSaved = false;
      event.target.setAttribute("data-saved", true);
    } else if (event.target.getAttribute("data-saved") === "true") {
      isSaved = true;
      event.target.setAttribute("data-saved", false);
    }

    const response = await fetch("/api/posts/save", {
      method: "POST",
      body: JSON.stringify({ isSaved, postId }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      // render css to show if saved or not
    } else {
      alert(response.statusText);
    }
  });
}

// Init
window.onload = () => {
  loadUserData();
};
