function toggleSidebar() {
  const sidebar = document.querySelector(".sidebar");
  console.log(sidebar);
  sidebar.classList.toggle("closed");
}

async function ImgToSvg(img) {
  const s = document.createElement('div');
  s.innerHTML = await (await fetch(img.src)).text();
  s.firstChild.classList = img.classList;
  img.replaceWith(s.firstChild)
}