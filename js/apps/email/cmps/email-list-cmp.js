import emailPreview from './email-preview.cmp.js'

export default {
    props: ['emails'],
    template: `
        <section class="email-list">
            <div v-for="email in emails" :class="(email.isRead)? 'read' : 'unread'">
            <router-link :to="email/details/email.id"><email-preview :email="email"></email-preview></router-link>
                <button class="preview-delete-btn" @click="deleteEmail(email.id)"><i class="fas fa-trash-alt"></i></button>
            </div>
        </section>
        `,
    methods: {
        // selectEmail(emailId) {
        //     this.$router.push(`email/details/${emailId}`);
        //     console.log('email:', emailId);
        // },
        deleteEmail(emailId) {
            this.$emit('deleteEmail', emailId);
        }
    },
    components: {
        emailPreview,
    },

}