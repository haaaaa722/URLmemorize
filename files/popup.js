document.addEventListener("DOMContentLoaded", () => {
    const urlbox = document.getElementById("urlbox");

    chrome.storage.local.get({ savedURLs: [] }, (data) => {
        const savedURLs = data.savedURLs;

        if (savedURLs.length === 0) {
            urlbox.innerHTML = "<p>保存されたURLはありません。</p>";
        } else {
            urlbox.innerHTML = savedURLs
                .map(
                    (item) =>
                        `<p><a href="${item.url}" target="_blank">${item.title}</a></p>`
                )
                .join("");
        }
    });
});
