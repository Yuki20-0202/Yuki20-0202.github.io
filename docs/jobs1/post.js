document.addEventListener("DOMContentLoaded", () => {
  const jobTypeSelect = document.getElementById("job-type");
  const jobTypeOtherInput = document.getElementById("job-type-other");
  const labelJobTypeOther = document.getElementById("label-job-type-other");
  const asteriskJobTypeOther = document.getElementById("asterisk-job-type-other");

  jobTypeSelect.addEventListener("change", () => {
    const show = jobTypeSelect.value === "その他" || jobTypeSelect.value === "Other";
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
    const show = jobWageSelect.value === "条件付き" || jobWageSelect.value === "Other";
    jobWageOtherInput.style.display = show ? "block" : "none";
    jobWageOtherInput.required = show;
    labelJobWageOther.style.display = show ? "block" : "none";
    asteriskJobWageOther.style.display = show ? "inline" : "none";
  });

  // 初期状態の反映（ページ読み込み時に既存選択を反映）
  const initTypeShow = jobTypeSelect.value === "その他" || jobTypeSelect.value === "Other";
  jobTypeOtherInput.style.display = initTypeShow ? "block" : "none";
  jobTypeOtherInput.required = initTypeShow;
  labelJobTypeOther.style.display = initTypeShow ? "block" : "none";
  asteriskJobTypeOther.style.display = initTypeShow ? "inline" : "none";

  const initWageShow = jobWageSelect.value === "条件付き" || jobWageSelect.value === "Other";
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

  // 募集時間の選択肢を 0:00〜24:00 で生成する
  function populateHourOptions() {
    const startSelect = document.getElementById("job-hours-start");
    const endSelect = document.getElementById("job-hours-end");
    if (!startSelect || !endSelect) return;
    // 0:00 から 24:00 までの1時間刻み
    for (let h = 0; h <= 24; h++) {
      const label = `${h}:00`;
      const opt1 = document.createElement('option');
      opt1.value = label;
      opt1.textContent = label;
      startSelect.appendChild(opt1);
      const opt2 = document.createElement('option');
      opt2.value = label;
      opt2.textContent = label;
      endSelect.appendChild(opt2);
    }
  }

  const form = document.getElementById("job-form");
  const contactInput = document.getElementById("contact");
  const jobHoursStart = document.getElementById("job-hours-start");
  const jobHoursEnd = document.getElementById("job-hours-end");
  const workHoursSelect = document.getElementById("work-hours");
  const overtimeCheckbox = document.getElementById("overtime-allowed");

  // ページ読み込み時に時刻選択肢を生成
  populateHourOptions();

  function computeDuration() {
    const startVal = jobHoursStart ? jobHoursStart.value.trim() : '';
    const endVal = jobHoursEnd ? jobHoursEnd.value.trim() : '';
    if (!startVal || !endVal) return null;
    const sHour = parseInt(startVal.split(':')[0], 10);
    const eHour = parseInt(endVal.split(':')[0], 10);
    let duration = eHour - sHour;
    if (duration < 0) duration = 0;
    return duration;
  }

  function updateWorkHours() {
    if (!workHoursSelect) return;
    const duration = computeDuration();
    if (duration === null) return;
    if (duration <= 4) workHoursSelect.value = "<=4";
    else if (duration <= 6) workHoursSelect.value = "4-6";
    else if (duration <= 8) workHoursSelect.value = "6-8";
    else workHoursSelect.value = ">8";
  }

  // 初期化
  updateWorkHours();

  // 残業同意関連要素
  const overtimeConsent = document.getElementById('overtime-consent');
  const overtimeAgree = document.getElementById('overtime-agree');

  if (overtimeCheckbox) {
    // ページ読み込み時に表示を反映
    overtimeConsent && (overtimeConsent.style.display = overtimeCheckbox.checked ? 'block' : 'none');
    overtimeCheckbox.addEventListener('change', () => {
      if (overtimeConsent) overtimeConsent.style.display = overtimeCheckbox.checked ? 'block' : 'none';
      if (!overtimeCheckbox.checked && overtimeAgree) overtimeAgree.checked = false;
    });
  }

  form.addEventListener("submit", (e) => {
    // 「その他条件」が選択されている場合は入力必須にする
    if (jobWageSelect.value === "条件付き" || jobWageSelect.value === "Other") {
      const wageOtherValue = jobWageOtherInput.value.trim();
      if (wageOtherValue === "") {
        e.preventDefault();
        alert(document.documentElement.lang === 'en' ? "Please specify 'Other conditions'." : "「その他条件」を入力してください。");
        jobWageOtherInput.focus();
        return;
      }
    }

    const contactValue = contactInput.value.trim();
    const phonePattern = /^0\d{9,10}$/; // 10桁または11桁の数字（例：0312345678, 09012345678）

    if (!phonePattern.test(contactValue)) {
      e.preventDefault();
      alert(document.documentElement.lang === 'en' ? "Please enter a phone number without dashes (e.g., 09012345678)." : "連絡先はハイフンなしの電話番号（例：09012345678）を入力してください。");
      contactInput.focus();
      return;
    }

    // 募集時間の入力チェック（開始・終了）
    const startVal = jobHoursStart ? jobHoursStart.value.trim() : '';
    const endVal = jobHoursEnd ? jobHoursEnd.value.trim() : '';
    if (!startVal || !endVal) {
      e.preventDefault();
      alert(document.documentElement.lang === 'en' ? "Please select recruitment hours (start and end)." : "募集時間（開始・終了）を選択してください。");
      if (!startVal && jobHoursStart) jobHoursStart.focus();
      else if (!endVal && jobHoursEnd) jobHoursEnd.focus();
      return;
    }

    const sHour = parseInt(startVal.split(':')[0], 10);
    const eHour = parseInt(endVal.split(':')[0], 10);
    if (sHour > eHour) {
      e.preventDefault();
      alert(document.documentElement.lang === 'en' ? "Start time must be before or equal to end time." : "開始時間は終了時間以前にしてください。");
      if (jobHoursStart) jobHoursStart.focus();
      return;
    }

    // 労働時間（法定8時間超過）の検証
    const duration = computeDuration();
    if ((workHoursSelect && workHoursSelect.value === ">8") || (duration !== null && duration > 8)) {
      if (!overtimeCheckbox || !overtimeCheckbox.checked) {
        e.preventDefault();
        alert(document.documentElement.lang === 'en' ? "Working hours exceed statutory hours (over 8 hours per day). Please check 'Overtime allowed'." : "労働時間が法定労働時間（1日8時間）を超えています。必ず「残業あり」にチェックしてください。");
        return;
      }
    }

    // 残業ありの場合は同意チェックが必要
    if (overtimeCheckbox && overtimeCheckbox.checked) {
      if (!overtimeAgree || !overtimeAgree.checked) {
        e.preventDefault();
        alert(document.documentElement.lang === 'en' ? "Please confirm and agree to the Labor Standards Act excerpts when overtime is allowed." : "残業ありの場合、労働基準法に関する同意が必要です。上の同意欄にチェックしてください。");
        return;
      }
    }
const longTermSelect = document.getElementById("long-term");
  if (!longTermSelect.value) {
    e.preventDefault();
    alert("長期雇用の希望を選択してください。");
    longTermSelect.focus();
    return;
  }

    // バリデーション成功 → 送信完了ページへ遷移
    e.preventDefault();
    window.location.href = 'post-success.html';
  });
});
const workHoursSelect = document.getElementById("work-hours");
const overtimeConsent = document.getElementById("overtime-consent");

if (workHoursSelect) {
  workHoursSelect.addEventListener("change", () => {
    const isOvertime = workHoursSelect.value === ">8";
    overtimeConsent.style.display = isOvertime ? "block" : "none";
    if (!isOvertime) {
      document.getElementById("overtime-agree").checked = false;
    }
  });
}

