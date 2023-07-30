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

// Loads user data from local storage
function loadUserData() {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  document.querySelectorAll(".username").forEach((element) => {
    if (element.textContent && loggedInUser.username) {
      element.textContent = loggedInUser.username;
    }
  })
}

window.onload = () => {
  loadUserData();
}