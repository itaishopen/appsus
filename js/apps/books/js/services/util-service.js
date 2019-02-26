export default {
    getRandomIntInclusive,
    makeId,
    saveToStorage,
    loadFromStorage
}

function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}
 
function loadFromStorage(key) {
    return JSON.parse(localStorage.getItem(key))
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

function makeId() {
    var length = 6;
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return txt;
}
