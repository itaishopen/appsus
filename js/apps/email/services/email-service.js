import utilService from '../../../services/util-service.js'
import { eventBus, EVENT_FEEDBACK } from '../../../services/eventbus-service.js'

export default {
    query,
    onSort,
    getEmailById,
    getEmailIdx,
    getEmailByIdx,
    sendAnEmail,
    deleteAnEmail,
}

const EMAIL_KEY = 'emailapp'
var gFilter = 'all'
var gSort = 'date';
var isFirstSort = true;

// query().then()

function query(filter = 'all', key = EMAIL_KEY) {
    gFilter = filter;
    return utilService.loadFromStorage(key)
        .then(emails => {
            if (!emails || emails.length === 0) {
                emails = createEmails(key);
                utilService.saveToStorage(key, emails).then();
            }
            switch (gFilter) {
                case 'all':
                    return emails
                case 'read':
                    return emails.filter(email => email.isRead);
                case 'unread':
                    return emails.filter(email => !email.isRead);
                default: {
                    return emails.filter(email => email.sender.toLowerCase().includes(gFilter) || email.subject.toLowerCase().includes(gFilter) || email.body.toLowerCase().includes(gFilter));
                }
            }
        })
}

function onSort(sortBy) {
    if (sortBy === gSort) isFirstSort = !isFirstSort;
    gSort = sortBy;
    return query(gFilter).then(emails => emails.sort(sortEmails));
}

function sortEmails(a, b) {
    var num = -1;
    if (isFirstSort) num = 1;
    if (a[gSort] - b[gSort] > 0) return 1 * num;
    else if (a[gSort] - b[gSort] < 0) return -1 * num;
    return 0;
}

function getEmailById(emailId) {
    return utilService.loadFromStorage(EMAIL_KEY).then(emails => { return emails.find(email => email.id === emailId) })
}

function getEmailIdx(emailId) {
    return utilService.loadFromStorage(EMAIL_KEY).then(emails => { return emails.findIndex(email => email.id === emailId) })
}

function getEmailByIdx(emailIdx) {
    return utilService.loadFromStorage(EMAIL_KEY).then(emails => emails[emailIdx])
}

function deleteAnEmail(emailId) {
    return utilService.loadFromStorage(EMAIL_KEY)
        .then(emails => {
            getEmailIdx(emailId).then(emailIdx => {
                emails.splice(emailIdx, 1);
                return utilService.saveToStorage(EMAIL_KEY, emails);
            });
        })
}

function sendAnEmail(emailData) {
    return utilService.loadFromStorage(EMAIL_KEY).then(emails => {
        if (emailData.id) {
            getEmailIdx(emailData.id).then(emailIdx => {
                emails[emailIdx].isRead = emailData.isRead;
                emails.splice(emailIdx, 1, emailData);
                return utilService.saveToStorage(EMAIL_KEY, emails);
            }); 
        } else {
            let newEmail = createAnEmail(emailData);
            emails.push(newEmail)
            return utilService.saveToStorage(EMAIL_KEY, emails)
        }
    })
}

function createAnEmail(email) {
    return {
        id: email.id ? email.id : utilService.makeId(),
        recipient: email.recipient,
        sender: email.sender,
        subject: email.subject,
        body: email.body,
        isRead: email.isRead ? email.isRead : false,
        sentAt: {
            timeToShow: moment().format('DD MMM YYYY, h:mm:ss'),
            timestamp: Date.now()
        },
    };
}


function createEmails() {
    return [
        {
            id: utilService.makeId(),
            recipient: 'You',
            sender: 'Jonas from EmailChimp',
            subject: 'Welcome to EmailChimp!',
            body: 'We welcome you to EmailChimp, the new email service by Jonas and Bar. You\'re welcomed to enjoy it and contact your contacts right away!',
            isRead: false,
            sentAt: {
                timeToShow: moment('20170619', 'YYYYMMDD').fromNow(),
                timestamp: 1497853352,
            }
        },
        {
            id: utilService.makeId(),
            recipient: 'You',
            sender: 'Bar from EmailChimp',
            subject: 'How to get started with your new Email',
            body: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Qui nesciunt commodi odit amet tempora? Suscipit aut omnis possimus placeat, ipsa iusto maiores illum animi necessitatibus cupiditate ducimus enim, error impedit.',
            isRead: true,
            sentAt: {
                timeToShow: moment('20170620', 'YYYYMMDD').fromNow(),
                timestamp: 1497939752,
            }
        },
    ];
}