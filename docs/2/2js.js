document.addEventListener("DOMContentLoaded", () => {
  const scrollButton = document.querySelector(".scroll-to-post");
  const postSection = document.getElementById("post-request");

  if (scrollButton && postSection) {
    scrollButton.addEventListener("click", () => {
      postSection.scrollIntoView({ behavior: "smooth" });
    });
  }
   // スクロール時にメニューを閉じる処理を追加
  let lastScrollTop = 0;
  window.addEventListener("scroll", () => {
    const menu = document.getElementById("side-menu");
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    // スクロール量が変化したらメニューを閉じる
    if (menu.style.left === "0px") {
      menu.style.left = "-250px";
    }

    lastScrollTop = currentScroll;
  });
});
function toggleMenu() {
  const menu = document.getElementById("side-menu");
  if (menu.style.left === "0px") {
    menu.style.left = "-250px"; // 閉じる
  } else {
    menu.style.left = "0px"; // 開く
  }
}
function goToPage(path) {
  window.location.href = path;
}
