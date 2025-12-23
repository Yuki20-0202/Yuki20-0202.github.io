const slides = document.querySelectorAll('.slide');
const dotsContainer = document.querySelector('.dots');
let index = 0;
let startX = 0;
let endX = 0;

// ドット生成
slides.forEach((_, i) => {
  const dot = document.createElement('div');
  dot.classList.add('dot');
  if (i === 0) dot.classList.add('active');
  dot.addEventListener('click', () => goToSlide(i));
  dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.dot');

// スライド切り替え
function showSlide() {
  slides.forEach(s => {
    s.classList.remove('show');
  });

  slides[index].classList.add('show');

  dots.forEach(d => d.classList.remove('active'));
  dots[index].classList.add('active');
}

function nextSlide() {
  index = (index + 1) % slides.length;
  showSlide();
}

function prevSlide() {
  index = (index - 1 + slides.length) % slides.length;
  showSlide();
  resetTimer();
}

function goToSlide(i) {
  index = i;
  showSlide();
  resetTimer();
}

// ✅ 自動スライド（タイマーを変数にする）
let slideTimer = setInterval(nextSlide, 5000);

// ✅ タイマーリセット関数
function resetTimer() {
  clearInterval(slideTimer);
  slideTimer = setInterval(nextSlide, 5000);
}

// スワイプ対応
document.querySelector('.slider').addEventListener('touchstart', e => {
  startX = e.touches[0].clientX;
});

document.querySelector('.slider').addEventListener('touchend', e => {
  endX = e.changedTouches[0].clientX;
  const diff = endX - startX;

  if (diff > 50) {
    prevSlide();
    resetTimer();
  }
  if (diff < -50) {
    nextSlide();
    resetTimer();
  }
});

// 初期表示
showSlide();
