import utilService from '../../../services/util-service';
import { eventBus, EVENT_FEEDBACK } from '../event-bus.js'

export default {
    getEmails,
    onSort,
    getEmailById,
    getEmailIdx,
    getEmailByIdx,
    writeAnEmail
}

var gEmails;
var gFilterEmails;
const EMAIL_KEY = 'emailapp'
var gSort = 'date';
var isFirstSort = true;


loadDefaultEmails()

function loadDefaultEmails() {
    gEmails = utilService.loadFromStorage(EMAIL_KEY);
    if (!gEmails || gEmails.length === 0) {
        gEmails = _createEmails();
        utilService.saveToStorage(EMAIL_KEY, gEmails);
    }
    return Promise.resolve(gEmails)
}

function getEmails(filter = 'all') {
    switch (filter) {
        case 'all':
            gFilterEmails = gEmails;
            break;
        case 'read':
            gFilterEmails = gEmails.filter(email => email.isRead)
            break;
        case 'unread':
            gFilterEmails = gEmails.filter(email => !email.isRead)
            break;
    }
    return Promise.resolve(gFilterEmails)
}

function onSort(sortBy) {
    if (sortBy === gSort) isFirstSort = !isFirstSort;
    gSort = sortBy;
    gFilterEmails = gFilterEmails.sort(sortEmails)        
    return Promise.resolve(gFilterEmails);
}

function sortEmails(a,b) {
    var num = -1;
    if (isFirstSort) num = 1; 
    if (a[gSort] - b[gSort] > 0) return 1 * num;
    else if (a[gSort] - b[gSort] < 0) return -1 * num;
    return 0;
}

function getEmailById(emailId) {
    return Promise.resolve(gEmails.find(email => email.id === emailId))
}

function _createEmails() {
    let emails = JSON.parse(JSON.stringify(jsonData));
    return emails
}

function getEmailIdx(emailId) {
    return Promise.resolve(gEmails.findIndex(email => email.id === emailId))
}

function getEmailByIdx(emailIdx) {
    return Promise.resolve(gEmails[emailIdx]);
}

function deleteAnEmail(emailId) {
    let emailIdx = getEmailIdx(emailId);
    gEmails.splice(emailIdx, 1);
    utilService.saveToStorage(EMAIL_KEY, gEmails);
}

function writeAnEmail(email) {
    try {
        let email = createAnEmail(email);
        gEmails.push(email)
        utilService.saveToStorage(EMAIL_KEY, gEmails)
        return Promise.resolve(email)
    } catch (err) {
        eventBus.$emit(EVENT_FEEDBACK,{txt: err,link: ''},'fail')
    }
}

function createAnEmail(email) {
    return {
        id: utilService.makeId(),
        recipient: email.recipient,
        sender: email.sender,
        subject: email.subject,
        body: email.body,
        isRead: false,
        sentAt: {
            timeToShow: moment().format('MMMM Do YYYY, h:mm:ss a'),
            timestamp: Date.now()
        },
    };
}