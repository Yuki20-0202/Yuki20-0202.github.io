// 1. ジャンルで絞り込む機能
function filterSpots(category) {
    // すべてのカードを取得
    const cards = document.querySelectorAll('.spot-card');

    cards.forEach(card => {
        // カードのカテゴリを取得
        const cardCategory = card.getAttribute('data-category');

        // "all"が選ばれている、またはカテゴリが一致する場合は表示
        if (category === 'all' || cardCategory === category) {
            card.style.display = 'flex'; // デザイン崩れを防ぐためflexを指定
        } else {
            card.style.display = 'none'; // 非表示
        }
    });
}

// 2. 詳細を開閉する機能
function toggleDetail(btn) {
    // ボタンの親要素（.spot-content）の中から .more-info を探す
    // closestだと親の親まで探してしまうので、兄弟要素や親から探すのが安全
    const cardContent = btn.parentElement;
    const info = cardContent.querySelector('.more-info');
    const icon = btn.querySelector('i');

    // 表示・非表示の切り替え
    if (info.style.display === "block") {
        info.style.display = "none";
        btn.innerHTML = '詳しく見る <i class="fa-solid fa-chevron-down"></i>';
        btn.style.backgroundColor = "#1a4a6b"; // 元の色に戻す
        btn.style.color = "#fff";
    } else {
        info.style.display = "block";
        btn.innerHTML = '閉じる <i class="fa-solid fa-chevron-up"></i>';
        btn.style.backgroundColor = "#ccc"; // 閉じる時はグレーなどにすると分かりやすい
        btn.style.color = "#333";
    }
}