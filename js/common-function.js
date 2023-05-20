
function findUserLogin (itemList) {
    let item = itemList.find(item => {
       return item.item.user.isLogin === true;
    });

    return item;
}

function getDataFromLocalStorage() {
    // get listItem from localStorage (JSON)
    return JSON.parse(localStorage.getItem("itemList")) ? JSON.parse(localStorage.getItem("itemList")) : [];
}

function  storeDataToLocalStorage(itemList){
    let itemListString = JSON.stringify(itemList);
    localStorage.setItem('itemList', itemListString);
}