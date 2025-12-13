document.addEventListener("DOMContentLoaded", () => {
  const scrollButton = document.querySelector(".scroll-to-post");
  const postSection = document.getElementById("post-request");
  const topButton = document.querySelector(".scroll-to-top");
  const menuIcon = document.getElementById("menu-icon");
  const menu = document.getElementById("side-menu");

  // 求人掲載セクションへスクロール
  if (scrollButton && postSection) {
    scrollButton.addEventListener("click", () => {
      postSection.scrollIntoView({ behavior: "smooth" });
    });
  }

  // ページ最上部へ戻る（scrollIntoViewではなく scrollTo を使用）
  if (topButton) {
    topButton.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    window.addEventListener("scroll", () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      topButton.style.display = scrollY > 400 ? "block" : "none";
    });
  }

  // メニュー開閉
  if (menuIcon && menu) {
    menuIcon.addEventListener("click", () => {
      const currentLeft = window.getComputedStyle(menu).left;
      menu.style.left = currentLeft === "0px" ? "-250px" : "0px";
    });

    window.addEventListener("scroll", () => {
      const currentLeft = window.getComputedStyle(menu).left;
      if (currentLeft === "0px") {
        menu.style.left = "-250px";
      }
    });
  }
});
