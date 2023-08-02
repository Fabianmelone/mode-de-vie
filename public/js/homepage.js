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
  if (e.key === "Backspace" && element.value.length === 0) {
    element.style.height = element.style.minHeight;
    return;
  }
  element.style.height = "1px";
  element.style.height = 25 + element.scrollHeight + "px";
}

// Like and Save button logic
if (document.querySelector("#like") && document.querySelector("#save")) {
  // not yet done!! we need to click once to add a like, and click again to not like
  document.querySelector("#like").addEventListener("click", async (event) => {
    const likesNum = parseInt(event.target.getAttribute("data-like"));
    const post_id = event.target.getAttribute("data-id");

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
      method: "PUT", // Change to "PUT"
      body: JSON.stringify({ likesNum, post_id, isLiked }), // Include postId in the request body
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
    const post_id = event.target.getAttribute("data-id");
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
      body: JSON.stringify({ isSaved, post_id }),
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

// Page event listeners
if (document.getElementById("home-container") && document.getElementById("post-container")) {
  //event listener for the top users from the page
  document.getElementById("home-container").addEventListener("click", async (event)=> {
    target = event.target;

    if(target.classList.contains("profile")) {
      const username = target.getAttribute("data-name");
      const response = await fetch(`/user/${username}`, {
        method: "GET",
      });
      if(response.ok){
        window.location.replace(`/user/${username}`);
      }
    }

  });
  // top posts
  document.getElementById("posts-container").addEventListener("click", async (event) => {
    const profile = event.target;

    // Check if the clicked element is one of the top post pictures
    if (profile.classList.contains("feature-post--image")) {
      const postID = profile.getAttribute("data-id");

      const response = await fetch(`/posts/${postID}`, {
        method: "GET",
      });

      if (response.ok) {
        window.location.replace(`/posts/${postID}`);
      } else {
        alert("Failed to edit blog");
      }
      // Stop the event from bubbling 
      event.stopImmediatePropagation();
    }
  });
}

// Init
window.onload = () => {
  // #region Rankings Page, if following post # > 6 change styling
  if (document.getElementById("rankings--post-container-following")) {
    const rankingsFollowing = document.getElementById("rankings--post-container-following");
    if (rankingsFollowing.children.length >= 6) {
      rankingsFollowing.style.justifyContent = "space-between";
    } else {
      rankingsFollowing.style.justifyContent = "flex-start";
    }
  }
  // #endregion

  // #region Get the follow button element
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

        window.location.reload()
      } catch (error) {

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
  

        window.location.reload();
      } catch (error) {
        console.error(error);
      }
    });
  }
  // #endregion

  // #region Post button logic
  const createPostForm = document.getElementById("create-post-form");

  if (createPostForm) {
    createPostForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const title = createPostForm.querySelector("#title").value;
      const description = createPostForm.querySelector("#description").value;
      const image_url = createPostForm.querySelector("#image_url").value;

      try {
        const response = await fetch("/api/posts/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, description, image_url }),
        });

        if (response.ok) {
          // Post created successfully, you can redirect or display a message
          console.log("Post created successfully");
        } else {
          // Handle error response
          console.error("Failed to create post");
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    });
  }
  // #endregion
};
