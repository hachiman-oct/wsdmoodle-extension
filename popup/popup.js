import { defaultSettings, labels } from "../settings.js";

window.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("settingsForm");
  form.innerHTML = "";
  Object.keys(defaultSettings).forEach((key) => {
    const label = document.createElement("label");
    label.className = "checkbox-label";

    const text = document.createElement("span");
    text.className = "checkbox-text";
    text.textContent = labels[key];

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "checkbox-input";
    checkbox.name = key;

    const slider = document.createElement("span");
    slider.className = "checkbox-slider";

    label.appendChild(checkbox);
    label.appendChild(text);
    label.appendChild(checkbox);
    label.appendChild(slider);

    form.appendChild(label);
  });

  chrome.storage.local.get(defaultSettings, (settings) => {
    Object.keys(settings).forEach((key) => {
      const checkbox = form.querySelector(`input[name="${key}"]`);
      if (checkbox) checkbox.checked = settings[key];
    });
  });

  // ここから自動保存機能
  form.addEventListener("change", (e) => {
    if (e.target.classList.contains("checkbox-input")) {
      const newSettings = {};
      Object.keys(defaultSettings).forEach((key) => {
        const checkbox = form.querySelector(`input[name="${key}"]`);
        newSettings[key] = checkbox.checked;
      });
      chrome.storage.local.set(newSettings);
    }
  });
});