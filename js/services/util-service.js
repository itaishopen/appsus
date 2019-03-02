export default {
    getRandomIntInclusive,
    makeId,
    saveToStorage,
    loadFromStorage,
    saveToStorageSync,
    loadFromStorageSync,
    getBrightness,
    getDistance
}

function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
    return Promise.resolve();
}
 
function loadFromStorage(key) {
    return Promise.resolve(JSON.parse(localStorage.getItem(key)));
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

function saveToStorageSync(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}
 
function loadFromStorageSync(key) {
    return JSON.parse(localStorage.getItem(key));
}

function getBrightness(color) {
    let [r, g, b] = [parseInt(color.substring(1, 3), 16),
                     parseInt(color.substring(3, 5), 16),
                     parseInt(color.substring(5, 7), 16)]
    let brightness = (Math.max(r, g, b) + Math.min(r, g, b)) / 5.1
    return brightness;
}

function getDistance(el1, el2) {
    return Math.sqrt((el1.offsetTop - el2.offsetTop) ** 2 + (el1.offsetLeft - el2.offsetLeft) ** 2)
}