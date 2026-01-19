document.addEventListener("DOMContentLoaded", () => {
  const scrollButton = document.querySelector(".scroll-to-post");
  const postSection = document.getElementById("post-request");

  if (scrollButton && postSection) {
    scrollButton.addEventListener("click", () => {
      postSection.scrollIntoView({ behavior: "smooth" });
    });
  }

  window.addEventListener("scroll", () => {
    const menu = document.getElementById("side-menu");
    if (menu && menu.style.left === "0px") {
      menu.style.left = "-250px";
    }
  });
    document.addEventListener("click", (event) => {
      const menu = document.getElementById("side-menu");
  const toggleButton = document.querySelector(".menu-icon"); // ← クラス名を合わせる

      if (
        menu &&
        menu.style.left === "0px" &&
        !menu.contains(event.target) &&
        !(toggleButton && toggleButton.contains(event.target))
      ) {
        menu.style.left = "-250px";
      }
    });
  const input = document.getElementById("search-input"); input.addEventListener("keydown", (event) => { if (event.key === "Enter" && input.value.trim() !== "") { performSearch(); } });
});

function toggleMenu() {
  const menu = document.getElementById("side-menu");
  if (menu) {
    menu.style.left = menu.style.left === "0px" ? "-250px" : "0px";
  }
}

function enableSearch() {
  const input = document.getElementById("search-input");
  const button = document.getElementById("search-button");
  button.disabled = input.value.trim() === "";
}

function performSearch() {
  const keyword = document.getElementById("search-input").value.trim();
  if (!keyword) return;

  // 検索結果ページに遷移（例：search.html?query=温泉）
  window.location.href = `/search-en/search_results-en.html?query=${encodeURIComponent(keyword)}`;
}
