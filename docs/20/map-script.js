document.addEventListener('DOMContentLoaded', () => {
    const mapRegions = document.querySelectorAll('.map-region');
    const regionCards = document.querySelectorAll('.region-card');

    // 地図の地域がクリックされたときの処理
    mapRegions.forEach(region => {
        region.addEventListener('click', () => {
            const targetId = region.getAttribute('data-target');
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                // スムーズにスクロール
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
                
                // すべての地域のハイライトをリセット
                mapRegions.forEach(r => r.classList.remove('active'));
                regionCards.forEach(c => c.classList.remove('highlight'));
                
                // クリックされた地域と対応するカードをハイライト
                region.classList.add('active');
                targetSection.classList.add('highlight');

                // 数秒後にハイライトを自動で消す（オプション）
                setTimeout(() => {
                    region.classList.remove('active');
                    targetSection.classList.remove('highlight');
                }, 2000);
            }
        });
    });

    // 都道府県カードにマウスが乗ったときの処理
    regionCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const regionId = card.getAttribute('data-region');
            const targetRegion = document.getElementById(regionId);
            if (targetRegion) {
                targetRegion.classList.add('active'); // 地図をハイライト
            }
        });

        card.addEventListener('mouseleave', () => {
            const regionId = card.getAttribute('data-region');
            const targetRegion = document.getElementById(regionId);
            if (targetRegion) {
                targetRegion.classList.remove('active'); // 地図のハイライトを解除
            }
        });
    });
});