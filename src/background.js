// コンテキストメニューを作成
const parent = chrome.contextMenus.create({
    id:"memorize",
    title:"URLを保存",
    contexts:["all"],
})