function toggleMenu() {
  const menu = document.getElementById('menu-links');
  const expanded = menu.classList.toggle('is-open');

  // アクセシビリティ対応
  const toggleButton = document.querySelector('.menu-toggle');
  if (toggleButton) {
    toggleButton.setAttribute('aria-expanded', expanded);
  }
}

// サイドメニューの開閉
document.getElementById('menu-icon').addEventListener('click', function () {
  const sideMenu = document.getElementById('side-menu');
  if (sideMenu.style.left === '0px') {
    sideMenu.style.left = '-250px';
  } else {
    sideMenu.style.left = '0px';
  }
});

// スクロールで両方のメニューを閉じる
let lastScrollTop = 0;
const menuLinks = document.getElementById("menu-links");
const sideMenu = document.getElementById("side-menu");

window.addEventListener("scroll", function () {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > lastScrollTop) {
    // 下にスクロール → 両方のメニューを閉じる
    menuLinks.classList.remove("is-open");
    document.querySelector(".menu-toggle").setAttribute("aria-expanded", false);
    sideMenu.style.left = "-250px";
  }

  lastScrollTop = scrollTop;
});


