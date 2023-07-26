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