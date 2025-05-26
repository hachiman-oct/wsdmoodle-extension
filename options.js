const defaultSettings = {
  changeHeader: true,
  hideUnusedLink: true,
  moodleDlBtn: true,
  alertVideoStatus: true,
  hideEmptyCourseIndex: true,
  hideEmptySections: true,
  autoClickLogin: true,
  setHomePage: true,
};

const labels = {
  changeHeader: "ヘッダー変更",
  hideUnusedLink: "不要リンク非表示",
  moodleDlBtn: "一括ダウンロードボタン",
  alertVideoStatus: "動画視聴アラート",
  hideEmptyCourseIndex: "空のコースインデックス非表示",
  hideEmptySections: "空のセクション非表示",
  autoClickLogin: "ログイン自動クリック",
  setHomePage: "ホームページ自動遷移",
};

window.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("settingsForm");
  form.innerHTML = "";
  Object.keys(defaultSettings).forEach((key) => {
    const label = document.createElement("label");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = key;
    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(" " + (labels[key] || key)));
    form.appendChild(label);
    form.appendChild(document.createElement("br"));
  });

  chrome.storage.local.get(defaultSettings, (settings) => {
    Object.keys(settings).forEach((key) => {
      const checkbox = form.querySelector(`input[name="${key}"]`);
      if (checkbox) checkbox.checked = settings[key];
    });
  });

  document.getElementById("saveBtn").addEventListener("click", () => {
    const newSettings = {};
    Object.keys(defaultSettings).forEach((key) => {
      const checkbox = form.querySelector(`input[name="${key}"]`);
      newSettings[key] = checkbox.checked;
    });
    chrome.storage.local.set(newSettings, () => {
      document.getElementById("status").textContent = "保存しました";
      setTimeout(() => {
        document.getElementById("status").textContent = "";
      }, 1000);
    });
  });
});