document.addEventListener("DOMContentLoaded", () => {
  const jobTypeSelect = document.getElementById("job-type");
  const jobTypeOtherInput = document.getElementById("job-type-other");
  const labelJobTypeOther = document.getElementById("label-job-type-other");
  const asteriskJobTypeOther = document.getElementById("asterisk-job-type-other");

  jobTypeSelect.addEventListener("change", () => {
    const show = jobTypeSelect.value === "その他";
    jobTypeOtherInput.style.display = show ? "block" : "none";
    jobTypeOtherInput.required = show;
    labelJobTypeOther.style.display = show ? "block" : "none";
    asteriskJobTypeOther.style.display = show ? "inline" : "none";
  });

  // 時給の「その他条件」用入力
  const jobWageSelect = document.getElementById("job-wage");
  const jobWageOtherInput = document.getElementById("job-wage-other");
  const labelJobWageOther = document.getElementById("label-job-wage-other");
  const asteriskJobWageOther = document.getElementById("asterisk-job-wage-other");

  jobWageSelect.addEventListener("change", () => {
    const show = jobWageSelect.value === "条件付き";
    jobWageOtherInput.style.display = show ? "block" : "none";
    jobWageOtherInput.required = show;
    labelJobWageOther.style.display = show ? "block" : "none";
    asteriskJobWageOther.style.display = show ? "inline" : "none";
  });

  // 初期状態の反映（ページ読み込み時に既存選択を反映）
  const initTypeShow = jobTypeSelect.value === "その他";
  jobTypeOtherInput.style.display = initTypeShow ? "block" : "none";
  jobTypeOtherInput.required = initTypeShow;
  labelJobTypeOther.style.display = initTypeShow ? "block" : "none";
  asteriskJobTypeOther.style.display = initTypeShow ? "inline" : "none";

  const initWageShow = jobWageSelect.value === "条件付き";
  jobWageOtherInput.style.display = initWageShow ? "block" : "none";
  jobWageOtherInput.required = initWageShow;
  labelJobWageOther.style.display = initWageShow ? "block" : "none";
  asteriskJobWageOther.style.display = initWageShow ? "inline" : "none";

  // 地方と都道府県の連動
  const regionArea = document.getElementById("region-area");
  const regionPref = document.getElementById("region-pref");

  const regionMap = {
    "北海道・東北": ["北海道", "青森県", "岩手県", "宮城県", "秋田県", "山形県", "福島県"],
    "関東": ["東京都", "神奈川県", "千葉県", "埼玉県", "茨城県", "栃木県", "群馬県"],
    "中部": ["新潟県", "富山県", "石川県", "福井県", "山梨県", "長野県", "岐阜県", "静岡県", "愛知県"],
    "近畿": ["大阪府", "京都府", "兵庫県", "滋賀県", "奈良県", "和歌山県", "三重県"],
    "中国": ["岡山県", "広島県", "山口県", "鳥取県", "島根県"],
    "四国": ["徳島県", "香川県", "愛媛県", "高知県"],
    "九州・沖縄": ["福岡県", "佐賀県", "長崎県", "熊本県", "大分県", "宮崎県", "鹿児島県", "沖縄県"]
  };

  regionArea.addEventListener("change", () => {
    const selected = regionArea.value;
    regionPref.innerHTML = '<option value="">選択してください</option>';

    if (regionMap[selected]) {
      regionMap[selected].forEach(pref => {
        const option = document.createElement("option");
        option.value = pref;
        option.textContent = pref;
        regionPref.appendChild(option);
      });
    }
  });
  const form = document.getElementById("job-form");
  const contactInput = document.getElementById("contact");

  form.addEventListener("submit", (e) => {
    // 「その他条件」が選択されている場合は入力必須にする
    if (jobWageSelect.value === "条件付き") {
      const wageOtherValue = jobWageOtherInput.value.trim();
      if (wageOtherValue === "") {
        e.preventDefault();
        alert("「その他条件」を入力してください。");
        jobWageOtherInput.focus();
        return;
      }
    }

    const contactValue = contactInput.value.trim();
    const phonePattern = /^0\d{9,10}$/; // 10桁または11桁の数字（例：0312345678, 09012345678）

    if (!phonePattern.test(contactValue)) {
      e.preventDefault();
      alert("連絡先はハイフンなしの電話番号（例：09012345678）を入力してください。");
      contactInput.focus();
      return;
    }

    // バリデーション成功 → 送信完了ページへ遷移
    e.preventDefault();
    window.location.href = 'post-success.html';
  });
});
