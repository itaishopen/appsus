import { eventBus, EVENT_FEEDBACK } from '../../../services/eventbus-service.js'
import emailServices from '../services/email-service.js'
import emailReply from './email-reply-cmp.js'


export default {
  props: ['email'],
  template: `
    <section class="email-details flex column">
      <div class="subject-container flex align-center">
        <div @click="backBtn"><i class="fas fa-arrow-circle-left"></i>Back</div>
        <div class="subject-txt">Subject: {{email.subject}}</div>
      </div>
      <div class="details-header-container flex space-between">
        <div class="sender-container flex column align-center justify-center">
          <div class="details-sender">From: {{email.sender}}</div>
          <div class="details-recipient">to: {{email.recipient}}</div>
        </div>
        <div class="email-actions-container flex align-center">
          <div class="subject-sentAt" v-if="email.sentAt">Sent at: {{email.sentAt.timeToShow}}</div>
          <div class="details-action-btns flex">
            <button v-if="!email.isDraft && !email.isSent" class="email-reply-btn details-action-btn" @click="isReplying = true"><i class="fas fa-reply"></i></button>
            <router-link to="/email" for="toolbar-delete-btn" ><button class="toolbar-delete-btn details-action-btn fas fa-trash-alt" @click="deleteEmail"></button></router-link>
            <router-link to="/email" for="toolbar-mark-as-unread-btn"><button class="toolbar-mark-as-unread-btn details-action-btn"  @click="markAsUnread"><i class="fas fa-envelope"></i></button></router-link>
          </div>
        </div>
      </div>

      <div class="details-body-container"><p class="details-body-txt">{{email.body}}</p></div>

      <email-reply v-if="isReplying" :emailForReply="email" @sendEmail="sendEmail" @replyClose="sendEmail"></email-reply>
    </section>
    `,
  data() {
    return {
      isReplying: false,
    }
  },
  created() {
      
  },
  mounted() {
  },
  methods: {
    backBtn() {
      this.$emit('backBtn')
    },
    deleteEmail(emailId) {
      emailServices.deleteAnEmail(emailId)
        .then() 
        // .catch(err => eventBus.$emit(EVENT_FEEDBACK, { txt: err, link: '' }, 'fail'))
    },
    markAsUnread() {
      this.email.isRead = false
      emailServices.sendAnEmail(this.email)
        .then()
    },
    sendEmail(emailData) {
      emailServices.sendAnEmail(emailData)
      .then(() => {
        this.email = emailData;
        this.isReplying = false;
          // eventBus.$emit(EVENT_FEEDBACK, { txt: 'Your email was sent do you want to view it?', link: `/email/${emailData.id}` }, 'success');
        })
    }
  },
  
  components: {
    emailReply,
  },
}