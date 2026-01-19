document.addEventListener("DOMContentLoaded", () => {
  const scrollButton = document.querySelector(".scroll-to-post");
  const postSection = document.getElementById("post-request");
  const topButton = document.querySelector(".scroll-to-top");
  const searchInput = document.getElementById("job-search");
  const searchButton = document.getElementById("search-button");
  const jobCards = document.querySelectorAll(".job-card");
  const filterCheckboxes = document.querySelectorAll(".filter-checkbox");
  const startTimeSelect = document.getElementById("start-time");
  const endTimeSelect = document.getElementById("end-time");
  const startMonthSelect = document.getElementById("start-month");
  const endMonthSelect = document.getElementById("end-month");
  const startYearSelect = document.getElementById("start-year");
  const endYearSelect = document.getElementById("end-year");
  const filterPanel = document.getElementById("filter-panel");
  const filterToggleButton = document.getElementById("filter-toggle-button");

  // スクロールボタン
  if (scrollButton && postSection) {
    scrollButton.addEventListener("click", () => {
      postSection.scrollIntoView({ behavior: "smooth" });
    });
  }

  // トップに戻るボタン
  if (topButton) {
    topButton.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    window.addEventListener("scroll", () => {
      topButton.style.display = window.scrollY > 400 ? "block" : "none";
    });
  }

  // フィルターパネル開閉
  if (filterToggleButton && filterPanel) {
    filterToggleButton.addEventListener("click", () => {
      filterPanel.style.display = filterPanel.style.display === "none" ? "block" : "none";
    });
  }

  // 月名 → 数値変換マップ（英語対応）
  const monthNameToNumber = {
    january: 1, february: 2, march: 3, april: 4, may: 5, june: 6,
    july: 7, august: 8, september: 9, october: 10, november: 11, december: 12
  };

  // フィルター処理
  const applyFilters = () => {
    const keyword = searchInput.value.trim().toLowerCase();
    const selectedFilters = Array.from(filterCheckboxes)
      .filter(cb => cb.checked)
      .map(cb => cb.value.toLowerCase());

    const selectedStart = parseInt(startTimeSelect?.value, 10);
    const selectedEnd = parseInt(endTimeSelect?.value, 10);
    const selectedStartMonth = parseInt(startMonthSelect?.value, 10);
    const selectedEndMonth = parseInt(endMonthSelect?.value, 10);
    const selectedStartYear = parseInt(startYearSelect?.value, 10);
    const selectedEndYear = parseInt(endYearSelect?.value, 10);

    let matchCount = 0;

    jobCards.forEach(card => {
      const text = card.innerText.toLowerCase();
      const keywordMatch = text.includes(keyword) || keyword === "";
      const filterMatch = selectedFilters.every(filter => text.includes(filter));

      // 時間帯フィルター
      const timeText = card.querySelector(".job-info li")?.innerText || "";
      const timeMatchData = timeText.match(/(\d{1,2}):\d{2}\s*[〜\-–]\s*(\d{1,2}):\d{2}/);
      let timeMatch = true;
      if (timeMatchData && !isNaN(selectedStart) && !isNaN(selectedEnd)) {
        const jobStart = parseInt(timeMatchData[1], 10);
        const jobEnd = parseInt(timeMatchData[2], 10);
        timeMatch = jobStart >= selectedStart && jobEnd <= selectedEnd;
      }

      // 期間フィルター（日本語 or 英語）
      const periodText = card.querySelector(".job-info li:nth-child(3)")?.innerText.toLowerCase() || "";
      let monthMatch = true;

      const jpMatch = periodText.match(/(\d{4})年(\d{1,2})月.*?(\d{4})年(\d{1,2})月/);
      const enMatch = periodText.match(/([a-z]+)\s+(\d{4}).*?([a-z]+)\s+(\d{4})/i);

      if (
        !isNaN(selectedStartYear) && !isNaN(selectedStartMonth) &&
        !isNaN(selectedEndYear) && !isNaN(selectedEndMonth)
      ) {
        let jobStart, jobEnd;

        if (jpMatch) {
          jobStart = new Date(parseInt(jpMatch[1]), parseInt(jpMatch[2]) - 1);
          jobEnd = new Date(parseInt(jpMatch[3]), parseInt(jpMatch[4]) - 1);
        } else if (enMatch) {
          const startMonth = monthNameToNumber[enMatch[1].toLowerCase()];
          const startYear = parseInt(enMatch[2]);
          const endMonth = monthNameToNumber[enMatch[3].toLowerCase()];
          const endYear = parseInt(enMatch[4]);
          if (!isNaN(startMonth) && !isNaN(endMonth)) {
            jobStart = new Date(startYear, startMonth - 1);
            jobEnd = new Date(endYear, endMonth - 1);
          }
        }

        if (jobStart && jobEnd) {
          const selectedStartDate = new Date(selectedStartYear, selectedStartMonth - 1);
          const selectedEndDate = new Date(selectedEndYear, selectedEndMonth - 1);
          monthMatch = jobStart >= selectedStartDate && jobEnd <= selectedEndDate;
        }
      }

      const isVisible = keywordMatch && filterMatch && timeMatch && monthMatch;
      card.style.display = isVisible ? "block" : "none";
      if (isVisible) matchCount++;
    });

    // 結果が0件のときのメッセージ表示
    let noResult = document.getElementById("no-result-message");
    if (!noResult) {
      noResult = document.createElement("p");
      noResult.id = "no-result-message";
      noResult.textContent = "No matching job listings found.";
      noResult.style.textAlign = "center";
      noResult.style.marginTop = "20px";
      noResult.style.display = "none";
      document.querySelector("main section").appendChild(noResult);
    }
    noResult.style.display = matchCount === 0 ? "block" : "none";
  };

  // イベント設定
  if (searchButton) {
    searchButton.addEventListener("click", applyFilters);
  }

  if (searchInput) {
    searchInput.addEventListener("keydown", e => {
      if (e.key === "Enter") applyFilters();
    });
  }

  filterCheckboxes.forEach(cb => cb.addEventListener("change", applyFilters));
  [startTimeSelect, endTimeSelect, startMonthSelect, endMonthSelect, startYearSelect, endYearSelect]
    .forEach(el => el?.addEventListener("change", applyFilters));
});
