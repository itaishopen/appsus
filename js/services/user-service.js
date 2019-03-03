import utilService from './util-service.js'

export default {
    login,
    logOut,
    signIn,
    checkLoggedUser
}

var dummyUsers = [
    {userName: 'Yanai_Avnet', password: 'Yanai1', preferences: null},
    {userName: 'Itai_Shopen', password: 'Itai1', preferences: null}
]

_createUsers();

function _createUsers() {
    let savedUsers = utilService.loadFromStorageSync('users');
    if (!savedUsers) utilService.saveToStorageSync('users', dummyUsers) 
}

function login(userName, password) {    
    return utilService.loadFromStorage('users')
        .then(users => {
            let user = users.find(user => user.userName === userName);            
            if (!user) return 'noUser';
            if (user.password !== password) return 'wrongPassword';
            utilService.saveToSessionStorage('loggedUser', user);
            return 'Logged Succesfully';
        })
}

function logOut() {
    utilService.saveToSessionStorage('loggedUser', null);
}

function signIn(userName, password) {
    return utilService.loadFromStorage('users')
        .then(users => {
            if (users.some(user => user.userName === userName)) return 'User Name Unavailabe';
            let user = {userName, password, preferences: null};
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
        .then(() => console.log('saved users'));
}