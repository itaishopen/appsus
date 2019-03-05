import emailServices from '../services/email-service.js'

export default {
    props: ['emailForReply'],
    template: `
        <section class="email-reply flex column">
            <div class="reply-action-btns">
                <button @click="replyClose" class="reply-action-btn fas fa-arrow-circle-left fa-lg" title="back"></button>
                <button class="reply-action-btn close-reply fas fa-file-alt fa-lg" @click="replyClose" title="save as draft"></button>
                <button class="reply-action-btn send-email-btn fas fa-paper-plane fa-lg" type="submit" title="send" @click="sendEmail"></button>
            </div>
            <form class="reply-email-container flex column" @submit.prevent="sendEmail">
                <span class="reply-form reply-form-from">From: <input type="text" class="compose-email-from" placeholder="From" v-model="email.sender" disabled></span>
                <span class="reply-form reply-form-to">To: <input type="text" class="compose-email-to" placeholder="To" v-model="email.recipient"></span> 
                <span class="reply-form reply-form-subject">Subject: <input type="text" class="compose-email-subject" placeholder="Subject" v-model="email.subject"></span>
                <div class="reply-email-body">
                    <textarea  cols="50" rows="10" placeholder="Message body" v-model="email.body"></textarea>
                </div>
            </form>
        </section>
        `,
    data() {
        return {
            email: {
                recipient: this.emailForReply.sender,
                sender: '',
                subject: this.emailForReply.subject,
                body: this.emailForReply.body,
                isDraft: false,
              }
        }
    },
    created() {
        let user = emailServices.checkLoggedUser();
        this.email.sender = `${user.userName}@devil.com`;
      },
    methods: {
        sendEmail() {
            this.email.isSent = true;
            this.$emit('sendEmail', this.email);
        },
        replyClose() {
            this.email.isDraft = true;
            this.$emit('replyClose', this.email);
        }
    }

}