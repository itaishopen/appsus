import utilService from './util-service.js'

export default {
    login,
    logOut,
    signIn,
    getUserPreferences,
    setUserPreferences,
    checkLoggedUser,
    createPreferences
}

var dummyUsers = [
    {userName: 'yanai_avnet', password: 'Yanai1', preferences: {fullName: 'Yanai Avnet', avatarSrc: 'https://api.adorable.io/avatars/285/yanai_avnet.png'}},
    {userName: 'itai_shopen', password: 'Itai1', preferences: {fullName: 'Itai Shopen', avatarSrc: 'https://api.adorable.io/avatars/285/itai_shopen.png'}}
]

_createUsers();

function _createUsers() {
    let savedUsers = utilService.loadFromStorageSync('users');
    if (!savedUsers) utilService.saveToStorageSync('users', dummyUsers) 
}

function login(userName, password) {
    userName = userName.toLowerCase();
    return utilService.loadFromStorage('users')
        .then(users => {
            let user = users.find(user => user.userName.toLowerCase() === userName);            
            if (!user) return 'noUser';
            if (user.password !== password) return 'wrongPassword';
            utilService.saveToSessionStorage('loggedUser', user);
            return 'Logged Succesfully';
        })
}

function logOut() {
    utilService.saveToSessionStorage('loggedUser', null);
}

function signIn(userName, password, fullName) {
    return utilService.loadFromStorage('users')
        .then(users => {
            if (users.some(user => user.userName === userName)) return 'User Name Unavailabe';
            let user = {userName, password, preferences: {fullName, avatarSrc: `https://api.adorable.io/avatars/285/${userName}.png`}};
            users.push(user);
            utilService.saveToSessionStorage('loggedUser', user);
            return _saveUsers(users)
                .then(() => 'signed in Succesfully')
        })
}

function checkLoggedUser() {
    return utilService.loadFromSessionStorage('loggedUser')
}

function _saveUsers(users) {
    return utilService.saveToStorage('users', users)
        .then();
}

function _loadUsers() {
    return utilService.loadFromStorage('users')
        .then(users => users)
}

function getUserPreferences(userName) {
    return _loadUsers()
        .then(users => {
            userName = userName.toLowerCase();            
            return users.find(user => user.userName === userName).preferences;
        })
}

function createPreferences(fullName, avatarSrc, backgroundSrc) {
    return { fullName, avatarSrc, backgroundSrc }
}

function setUserPreferences(userName, preferences) {
    return _loadUsers()
        .then(users => {
            let userIdx = users.findIndex(user => user.userName === userName);
            users[userIdx].preferences = preferences;
            _saveUsers(users)
        })
}