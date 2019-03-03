export default {
    props: ['checkedEmails'],
    template:`
    <div class="email-actions-btns flex space-between" @submit.prevent="setSortBy">
            <div class="action-btn flex">
                <button class="multipal-delete" @click="deleteAll"></button>
            </div>
            <div class="action-btn flex">
                <button class="multipal-restore" @click="deleteAll"></button>
            </div>
            <div class="action-btn flex">
                <button class="multipal-mark-as-read" @click="deleteAll"></button>
            </div>
            <div class="action-btn flex">
                <button class="multipal-mark-as-unread" @click="deleteAll"></button>
            </div>     
        </div>
    `,
    methods: {
        deleteMail() {
            this.checkedEmails.forEach(email => {
                emailServices.deleteAnEmail(email.id)
                .then() 
            });
            
            
                    emailServices.query(this.filter).then(emails => {
                        this.emails = emails;
                        this.unreadEmails = this.checkEmailStatus();
                        this.checkedEmails = this.emails.filter(email => email.isCheck);
                        this.checkedEmailsNum = this.checkedEmails.length;
                    })
                })
        },
        

    },
    computed: {
        name() {
            return this.isRead ? 'read' : 'unread'
        },
    }
}