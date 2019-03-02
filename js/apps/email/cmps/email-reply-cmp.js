export default {
    props: ['emailForReply'],
    template: `
        <section class="email-reply flex column">
            <form class="reply-container flex column" @submit.prevent="sendEmail">
                <button class="cancel-reply-btn" type="button" @click="replyClose"><i class="fas fa-times"></i></button>
                <input type="text" class="reply-email-from" placeholder="To" v-model="email.recipient" disabled>
                <input type="text" class="reply-email-to" placeholder="From" v-model="email.sender">
                <input type="text" class="reply-email-subject" placeholder="Subject" v-model="email.subject">
            
                <div class="reply-email-body">
                    <textarea autofocus cols="43" rows="10" placeholder="Message body" v-model="email.body"></textarea>
                    <button class="send-reply-btn" type="submit">Send</button>
                </div>
            </form>
        </section>
        `,
    data() {
        return {
            email: {
                recipient: this.emailForReply.sender,
                sender: this.emailForReply.recipient,
                subject: this.emailForReply.subject,
                body: this.emailForReply.body,
                isDraft: false,
              }
        }
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