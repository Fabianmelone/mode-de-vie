function toggleSidebar() {
  const spacer = document.querySelector(".sidebar-spacer");
  const sidebar = document.querySelector(".sidebar");

  spacer.classList.toggle("closed");
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
};




  document.getElementById("rankings-container").addEventListener("click", function(event) {
    const profile = event.target;
  
    // Check if the clicked element is one of the profile pictures
    if (profile.classList.contains("feature-user--pfp")) {
      const userId = profile.getAttribute('data-id');
      alert(`Image with user ID ${userId} was clicked!`);
      // Stop the event from bubbling 
      event.stopImmediatePropagation();

    }
  });



















// Init
window.onload = () => {
  loadUserData();

  const rankingsFollowing = document.getElementById("rankings--post-container-following");
  if (rankingsFollowing.children.length >= 6) {
    rankingsFollowing.style.justifyContent = "space-between";
  } else {
    rankingsFollowing.style.justifyContent = "flex-start";
  }

  // Get the follow button element
  const followButton = document.getElementById("follow-btn");
  const unfollowButton = document.getElementById("unfollow-btn");

  if (followButton) {
    followButton.addEventListener("click", async () => {
      try {
        const username = followButton.dataset.username;
  
        const response = await fetch(`/api/users/follow/${username}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        if (!response.ok) {
          throw new Error("Failed to follow user.");
        }
  
        const data = await response.json();
        console.log(data); // Process the response data if needed

        window.location.reload()
      } catch (error) {
        console.log("Error : ");
        console.error(error);
      }
    });
  }

  if (unfollowButton) {
    unfollowButton.addEventListener("click", async () => {
      try {
        const username = unfollowButton.dataset.username;
  
        const response = await fetch(`/api/users/unfollow/${username}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        if (!response.ok) {
          throw new Error("Failed to unfollow user.");
        }
  
        const data = await response.json();
        console.log(data); // Process the response data if needed

        window.location.reload();
      } catch (error) {
        console.log("Error : ");
        console.error(error);
      }
    });
  }
};
