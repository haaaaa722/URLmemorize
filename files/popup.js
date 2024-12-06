document.addEventListener("DOMContentLoaded", () => {
    const urlbox = document.getElementById("urlbox");
    const addButton = document.getElementById("add");

    // URLリストを読み込む
    function loadURLs() {
        chrome.storage.local.get({ savedURLs: [] }, (data) => {
            const savedURLs = data.savedURLs;

            if (savedURLs.length === 0) {
                urlbox.innerHTML = "<p>保存されたURLはありません。</p>";
            } else {
                urlbox.innerHTML = savedURLs
                    .map(
                        (item, index) => `
                        <div class="url-item">
                            <a class="urls" href="${item.url}" target="_blank">${item.title}</a>
                            <button class="delete-btn" data-index="${index}">-</button>
                        </div>`
                    )
                    .join("");
                
                // 各削除ボタンにイベントを設定
                document.querySelectorAll(".delete-btn").forEach((btn) => {
                    btn.addEventListener("click", (e) => {
                        const index = e.target.dataset.index;
                        deleteURL(index);
                    });
                });
            }
        });
    }

    // 削除処理
    function deleteURL(index) {
        chrome.storage.local.get({ savedURLs: [] }, (data) => {
            const savedURLs = data.savedURLs;
            savedURLs.splice(index, 1); // 指定したURLを削除
            chrome.storage.local.set({ savedURLs }, () => {
                loadURLs(); // 更新されたリストを表示
            });
        });
    }

    // ボタン押下時のイベント処理
    addButton.addEventListener("click", () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const currentTab = tabs[0];
            if (currentTab && currentTab.url) {
                const newEntry = { url: currentTab.url, title: currentTab.title };

                chrome.storage.local.get({ savedURLs: [] }, (data) => {
                    const updatedURLs = [...data.savedURLs, newEntry];
                    chrome.storage.local.set({ savedURLs: updatedURLs }, () => {
                        loadURLs(); // リストを再描画
                    });
                });
            }
        });
    });

    // 初期ロード時にURLを表示
    loadURLs();
});
