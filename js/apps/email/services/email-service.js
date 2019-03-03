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
    restoreAnEmail,
    delAllFolderEmails,
    onSearch,
    backBtnAll,
    restoreAllCheckedEmail,
    changeReadUnreadAll,
    unCheckAll,
    starAll,
}

const EMAIL_KEY = 'emailapp'
var gFilter = 'inbox'
var gSort = 'date';
var isFirstSort = true;

// query().then()

function query(filter = 'inbox') {
    if (filter !== 'all') gFilter = filter;
    return utilService.loadFromStorage(EMAIL_KEY)
        .then(emails => {
            if (!emails || emails.length === 0) {
                emails = createEmails(EMAIL_KEY);
                utilService.saveToStorage(EMAIL_KEY, emails).then();
            }
            switch (filter) {
                case 'inbox':
                    return emails.filter(email => !email.isSent && !email.isDel && !email.isDraft).sort(sortEmails);
                case 'star':
                    return emails.filter(email => email.isStar).sort(sortEmails);
                case 'read-filter':
                    return emails.filter(email => email.isRead && !email.isSent && !email.isDel && !email.isDraft).sort(sortEmails);
                case 'unread-filter':
                    return emails.filter(email => !email.isRead && !email.isSent && !email.isDel && !email.isDraft).sort(sortEmails);
                case 'sent':
                    return emails.filter(email => email.isSent && !email.isDel).sort(sortEmails);
                case 'draft':
                    return emails.filter(email => email.isDraft && !email.isDel).sort(sortEmails);
                case 'trash':
                    return emails.filter(email => email.isDel).sort(sortEmails);
                default:
                    return emails;
            }
        })
}

function onSearch(searchParam, searchLoc = gFilter) {
    return query(searchLoc).then(emails => {
        return emails.filter(email => email.sender.toLowerCase().includes(searchParam) || email.subject.toLowerCase().includes(searchParam) || email.body.toLowerCase().includes(searchParam)).sort(sortEmails);
    })
}

function onSort(sortBy = 'date') {
    if (sortBy === 'read' || sortBy === 'unread') {
        return query(gFilter).then(emails => {
            let readEmails = emails.filter(email => email.isRead).sort(sortEmails);
            let unreadEmails = emails.filter(email => !email.isRead).sort(sortEmails);
            if (sortBy === 'read') return readEmails.concat(unreadEmails);
            else return unreadEmails.concat(readEmails);
        })
    } else {
        if (sortBy === gSort) isFirstSort = !isFirstSort;
        else isFirstSort = true;
        gSort = sortBy;
        return query(gFilter).then(emails => emails);
    }
}

function sortEmails(a, b) {
    var num = -1;
    if (isFirstSort) num = 1;
    if (gSort === 'date' && isFirstSort) num = -1;
    if (gSort === 'date' && !isFirstSort) num = 1;
    if (a[gSort] > b[gSort]) return 1 * num;
    else if (a[gSort] < b[gSort]) return -1 * num;
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

function backBtnAll(changeEmails) {
    changeEmails.forEach(email => {
        email.isCheck = false;
        sendAnEmail(email)
    })
    return Promise.resolve()
}

function deleteAnEmail(emailId) {
    return utilService.loadFromStorage(EMAIL_KEY)
        .then(emails => {
            return getEmailIdx(emailId).then(emailIdx => {
                if (!emails[emailIdx].isDel) {
                    emails[emailIdx].isDel = true;
                    utilService.saveToStorage(EMAIL_KEY, emails);
                } else {
                    emails.splice(emailIdx, 1);
                    utilService.saveToStorage(EMAIL_KEY, emails);
                }
                return Promise.resolve();
            });
        })
}

function restoreAnEmail(emailId) {
    return utilService.loadFromStorage(EMAIL_KEY)
        .then(emails => {
            return getEmailIdx(emailId).then(emailIdx => {
                emails[emailIdx].isDel = false;
                utilService.saveToStorage(EMAIL_KEY, emails);
                return Promise.resolve();
            });
        })
}

function restoreAllCheckedEmail(emailsToRestore) {
    return utilService.loadFromStorage(EMAIL_KEY).then(emails => {
        emailsToRestore.forEach(email => {
            let emailIdx = emails.findIndex(currEmail => email.id === currEmail.id)
            
                    emails[emailIdx].isCheck = false;
                    emails[emailIdx].isDel = false;
        })
        return utilService.saveToStorage(EMAIL_KEY, emails)
    })
}

function changeReadUnreadAll(emailsToChange, changeTo) {
    return utilService.loadFromStorage(EMAIL_KEY).then(emails => {
        emailsToChange.forEach(email => {
            let emailIdx = emails.findIndex(currEmail => email.id === currEmail.id)
            
                    emails[emailIdx].isCheck = false;
                    if (changeTo === 'read') emails[emailIdx].isRead = true;
                    else emails[emailIdx].isRead = false;
        })
        return utilService.saveToStorage(EMAIL_KEY, emails)
    })
}
function unCheckAll(emailsToUnCheck) {
    return utilService.loadFromStorage(EMAIL_KEY).then(emails => {
        emailsToUnCheck.forEach(email => {
            let emailIdx = emails.findIndex(currEmail => email.id === currEmail.id)
                    emails[emailIdx].isCheck = false;
        })
        return utilService.saveToStorage(EMAIL_KEY, emails)
    })
}
function starAll(emailsToStar, action) {
    return utilService.loadFromStorage(EMAIL_KEY).then(emails => {
        emailsToStar.forEach(email => {
            let emailIdx = emails.findIndex(currEmail => email.id === currEmail.id)
                    emails[emailIdx].isCheck = false;
                    if (action) emails[emailIdx].isStar = true;
                    else emails[emailIdx].isStar = false;

        })
        return utilService.saveToStorage(EMAIL_KEY, emails)
    })
}

function sendAnEmail(emailData) {
    return utilService.loadFromStorage(EMAIL_KEY).then(emails => {
        if (emailData.id) {
            return getEmailIdx(emailData.id).then(emailIdx => {
                emails.splice(emailIdx, 1, emailData);
                console.log(emails);
                utilService.saveToStorage(EMAIL_KEY, emails).then(() => {
                    utilService.loadFromStorage(EMAIL_KEY).then(emails => console.log(emails));
                });
                return Promise.resolve()
            });
        } else {
            let newEmail = createAnEmail(emailData);
            newEmail.isSent = emailData.isSent;
            emails.push(newEmail)
            utilService.saveToStorage(EMAIL_KEY, emails).then()
            return Promise.resolve()
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
        isSent: email.isSent ? email.isSent : false,
        isDel: email.isDel ? email.isDel : false,
        isDraft: email.isDraft ? email.isDraft : false,
        isCheck: email.isCheck ? email.isCheck : false,
        sentAt: {
            timeToShow: moment().format('DD MMM YYYY, h:mm:ss a'),
            timestamp: Date.now()
        },
        date: Date.now(),
    };
}

function delAllFolderEmails(emailsToDel) {
    return utilService.loadFromStorage(EMAIL_KEY).then(emails => {
        emailsToDel.forEach(email => {
            let emailIdx = emails.findIndex(currEmail => email.id === currEmail.id)
            if (email.isCheck) {
                if (email.isDel) {
                    emails.splice(emailIdx, 1);
                } else {
                    emails[emailIdx].isCheck = false;
                    emails[emailIdx].isDel = true;
                }
            }
        })
        return utilService.saveToStorage(EMAIL_KEY, emails)
    })
}


function createEmails() {
    return [
        {
            id: utilService.makeId(),
            recipient: 'awesome@devil.com',
            sender: 'yanai@devil.com',
            subject: 'Welcome to devil mail!',
            body: 'We welcome you to devil mail, the new email service by Yanai and Itai. we welcome you with open hands and hope you will spread the word to your friends and family, don\'t forget to use our other apps, best regards Yanai Avnet',
            isRead: false,
            isSent: false,
            isDel: false,
            isDraft: false,
            isCheck: false,
            isStar: false,
            sentAt: {
                timeToShow: moment('20040401, 12:01 am', 'YYYYMMDD, h:mm a').format('lll'),
                timestamp: 1080777660,
            },
            date: 1080777660,
        },
        {
            id: utilService.makeId(),
            recipient: 'awesome@devil.com',
            sender: 'itai@devil.com',
            subject: 'How to get started with your new Email',
            body: 'We want to welcome you again to our new service, if you have any questions you\'re welcome to reply to this email and I will be more then happy to help you out. hope you enjoy our new devil mail, best regards Itai Shopen',
            isRead: false,
            isSent: false,
            isDel: false,
            isDraft: false,
            isCheck: false,
            isStar: false,
            sentAt: {
                timeToShow: moment('20040401 12:03 am', 'YYYYMMDD, h:mm a').format('lll'),
                timestamp: 1080777780,
            },
            date: 1080777780,
        },
        {
            id: utilService.makeId(),
            recipient: 'sheron@gmail.com',
            sender: 'awesome@devil.com',
            subject: 'Best email service ever!!!!',
            body: 'You must try this new email service it\'s the best',
            isRead: false,
            isSent: true,
            isDel: false,
            isDraft: false,
            isCheck: false,
            isStar: false,
            sentAt: {
                timeToShow: moment('20040402 12:03 pm', 'YYYYMMDD, h:mm a').format('lll'),
                timestamp: 1080907380,
            },
            date: 1080907380,
        },
        {
            id: utilService.makeId(),
            recipient: 'awesome@devil.com',
            sender: 'AlyusiIslassis@NigerianPrince.com',
            subject: 'Your help is needed!!!',
            body: `Dear Sir:

            I have been requested by the Nigerian National Petroleum Company to contact you for assistance in resolving a matter. The Nigerian National Petroleum Company has recently concluded a large number of contracts for oil exploration in the sub-Sahara region. The contracts have immediately produced moneys equaling US$40,000,000. The Nigerian National Petroleum Company is desirous of oil exploration in other parts of the world, however, because of certain regulations of the Nigerian Government, it is unable to move these funds to another region.
            
            You assistance is requested as a non-Nigerian citizen to assist the Nigerian National Petroleum Company, and also the Central Bank of Nigeria, in moving these funds out of Nigeria. If the funds can be transferred to your name, in your United States account, then you can forward the funds as directed by the Nigerian National Petroleum Company. In exchange for your accommodating services, the Nigerian National Petroleum Company would agree to allow you to retain 10%, or US$4 million of this amount.
            
            However, to be a legitimate transferee of these moneys according to Nigerian law, you must presently be a depositor of at least US$100,000 in a Nigerian bank which is regulated by the Central Bank of Nigeria.
            
            If it will be possible for you to assist us, we would be most grateful. We suggest that you meet with us in person in Lagos, and that during your visit I introduce you to the representatives of the Nigerian National Petroleum Company, as well as with certain officials of the Central Bank of Nigeria.
            
            Please call me at your earliest convenience at 18-467-4975. Time is of the essence in this matter; very quickly the Nigerian Government will realize that the Central Bank is maintaining this amount on deposit, and attempt to levy certain depository taxes on it.
            
            Yours truly,
            
            Prince Alyusi Islassis`,
            isRead: false,
            isSent: false,
            isDel: true,
            isDraft: false,
            isCheck: false,
            isStar: true,
            sentAt: {
                timeToShow: moment('20040402 12:03 pm', 'YYYYMMDD, h:mm a').format('lll'),
                timestamp: 1080907380,
            },
            date: 1080907380,
        },
    ];
}