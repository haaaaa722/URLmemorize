// コンテキストメニューを作成
chrome.runtime.onInstalled.addListener(function(details){
    chrome.contextMenus.create({
        id: "memorize",
        title: "URLを保存",
        contexts: ["all"],
    });
})

// コンテキストメニューがクリックされたときの処理
chrome.contextMenus.onClicked.addListener((info,tab) => {
    chrome.scripting.executeScript({
        target:{tabId:tab.id},
        function:saveURL,
    });
});

function saveURL(){
    const url = location.href;
    const title = document.title;

    chrome.runtime.sendMessage({url,title});
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if(message.url && message.title){
        chrome.storage.local.get({savedURLs:[]},(data) => {
            const savedURLs = data.savedURLs;
            savedURLs.push({url:message.url, title:message.title});

            chrome.storage.local.set({savedURLs},() => {
                console.log("URLが保存されました",message);
                sendResponse({status:"success"});
            });
        });

        return true;
    }
});