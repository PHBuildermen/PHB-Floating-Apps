if (!localStorage.getItem("wikiPages")) {
  localStorage.setItem("wikiPages", JSON.stringify([]));
}

function savePage(title, content) {
  let pages = JSON.parse(localStorage.getItem("wikiPages"));

  pages.push({
    title,
    content,
    author: getCurrentUser(),
    date: new Date().toLocaleString()
  });

  localStorage.setItem("wikiPages", JSON.stringify(pages));
  loadPages();
}

function loadPages() {
  let pages = JSON.parse(localStorage.getItem("wikiPages"));
  let container = document.getElementById("pages");

  container.innerHTML = "";

  pages.forEach((p, i) => {
    container.innerHTML += `
      <div class="card">
        <h3><a href="#" onclick="openPage(${i})">${p.title}</a></h3>
        <small>by ${p.author}</small>
      </div>
    `;
  });
}

function openPage(index) {
  let pages = JSON.parse(localStorage.getItem("wikiPages"));
  localStorage.setItem("openPage", JSON.stringify(pages[index]));
  window.location.href = "wiki.html";
}
