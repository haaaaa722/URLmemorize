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
                        (item) =>
                            `<p><a class="urls" href="${item.url}" target="_blank">${item.title}</a></p>`
                    )
                    .join("");
            }
        });
    }

    // ボタン押下時のイベント処理
    addButton.addEventListener("click", () => {
        // 現在のタブ情報を取得
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const currentTab = tabs[0];
            if (currentTab && currentTab.url) {
                const newEntry = { url: currentTab.url, title: currentTab.title };

                // Chromeストレージに保存
                chrome.storage.local.get({ savedURLs: [] }, (data) => {
                    const updatedURLs = [...data.savedURLs, newEntry];
                    chrome.storage.local.set({ savedURLs: updatedURLs }, () => {
                        loadURLs(); // リストを再読み込み
                    });
                });
            }
        });
    });

    // 初期ロード時にURLを表示
    loadURLs();
});
