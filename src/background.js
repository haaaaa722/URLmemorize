// コンテキストメニューを作成
const parent = chrome.contextMenus.create({
    id:"memorize",
    title:"URLを保存",
    contexts:["all"],
})

// コンテキストメニューがクリックされたときの処理
chrome.contextMenus.onClicked.addListener((info,tab)=>{
    chrome.scripting.executeScript({
        target:{tabId:tab.id},
        function:URL,
    })
})
function URL(){
    element = location.href;
    
}