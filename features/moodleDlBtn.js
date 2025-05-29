export function moodleDlBtn() {
    // セクションがまだ描画されていない場合は、MutationObserverで監視
    const courseContent = document.querySelector(".course-content");
    if (!courseContent) {
        setTimeout(moodleDlBtn, 1000);
        return;
    }

    let activitiesToObserve = [];
    let shouldPause = false;
    let shouldResume = false;

    // ボタンのスタイル
    const dlBtnUnDoneClassList = [
        "btn", "btn-outline-secondary", "btn-sm", "text-nowrap"
    ];
    const dlBtnDoneClassList = [
        "btn", "btn-success", "btn-sm", "text-nowrap"
    ];
    const dlBtnUnDoneId = "dlbtn";
    const dlBtnDoneId = "dlbtn-complete";
    const dlBtnUnDoneText = "Download all uncompleted files in this section";
    const dlBtnDoneText = "All files downloaded!";

    // セクションが既にあればボタン設置
    const secs = courseContent.querySelectorAll('[data-for="section"][role="region"]');
    secs.forEach(sec => {
        displayBtn(sec);
    });

    // セクション追加を監視
    const sectionObserver = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList) {
            mutation.addedNodes.forEach(node => {
                if (node.nodeType === 1 && node.classList.contains("course-section")) {
                    displayBtn(node);
                }
            });
        }
    });
    sectionObserver.observe(courseContent, { childList: true, subtree: true });

    observeBtnChanges();

    function displayBtn(section) {
        let links = [];
        let actsHasResource = [];
        const acts = section.querySelectorAll('.modtype_resource[data-for="cmitem"]');
        acts.forEach(act => {
            const btn = act.querySelector("button");
            if (!btn) return;

            const link = btn.dataset.toggletype == "manual:mark-done" ? act.querySelector("a") : undefined;
            actsHasResource.push(act);
            if (!link) return;

            links.push(link);
        });

        if (actsHasResource.length === 0) return;

        activitiesToObserve.push(actsHasResource);
        const skipDl = links.length === 0;

        // 前のボタンの削除
        const oldbtn = section.querySelector("#dlbtn-container");
        if (oldbtn) oldbtn.remove();

        // ボタンの設置
        const container = document.createElement("div");
        container.className = "activity-item";
        container.id = "dlbtn-container";

        const inner = document.createElement("div");
        inner.className = "activity-completion";
        inner.style.textAlign = "right";

        const dlBtn = document.createElement("button");
        const btnId = skipDl ? dlBtnDoneId : dlBtnUnDoneId;
        if (btnId) dlBtn.id = btnId;

        const targetClassList = skipDl ? dlBtnDoneClassList : dlBtnUnDoneClassList;
        if (targetClassList.length > 0) dlBtn.classList.add(...targetClassList);

        const text = skipDl ? dlBtnDoneText : dlBtnUnDoneText;
        if (text) dlBtn.textContent = text;

        inner.appendChild(dlBtn);
        container.appendChild(inner);

        const target = section.querySelector(".sectionbody") || section.querySelector(".content");
        if (target) {
            target.insertBefore(container, target.firstChild);
        }

        const style = document.createElement('style');
        // style.textContent = btnCss;
        document.head.appendChild(style);

        if (skipDl) return;

        dlBtn.addEventListener("click", async () => {
            shouldPause = true;
            for (const link of links) {
                window.location.href = link.href;
                clickCompleteBtn(link);
                await delay(3000);
            }

            const newBtn = dlBtn.cloneNode(true);
            newBtn.textContent = dlBtnDoneText;
            newBtn.classList.add(...dlBtnDoneClassList);
            dlBtn.replaceWith(newBtn);

            shouldResume = true;
            resumeObserver(activitiesToObserve);
        });
    }

    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    function observeBtnChanges() {
        const observerConfig = { childList: true, subtree: true };
        const observer = new MutationObserver((mutationsList) => {
            if (shouldPause) return;
            for (const mutation of mutationsList) {
                const act = mutation.target;
                const section = act.closest('[data-for="section"][role="region"]');
                if (!section) return;
                displayBtn(section);
            }
        });
        const flatActivities = activitiesToObserve
            .filter(section => Array.isArray(section))
            .flat();
        flatActivities.forEach(act => {
            observer.observe(act, observerConfig);
        });
    }

    function resumeObserver() {
        if (shouldResume) {
            shouldPause = false;
            shouldResume = false;
            observeBtnChanges();
        }
    }

    function clickCompleteBtn(el) {
        const act = el.closest(".activity-grid");
        const btn = act?.querySelector("button");
        if (!btn) return;
        const isSuccess = btn.classList.contains("btn-success");
        if (!isSuccess) btn.click();
    }
}