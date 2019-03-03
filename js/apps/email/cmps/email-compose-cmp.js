import { eventBus, EVENT_FEEDBACK } from '../../../services/eventbus-service.js'
import emailServices from '../services/email-service.js'

export default {
  template: `
    <section class="email-compose flex column">
      <div class="compose-action-btns">
        <button @click="backBtn" class="compose-action-btn fas fa-arrow-circle-left fa-lg" title="back"></button>
        <button class="compose-action-btn close-compose fas fa-file-alt fa-lg" @click="composeClose" title="save as draft"></button>
        <button class="compose-action-btn send-email-btn fas fa-paper-plane fa-lg" type="submit" title="send"></button>
      </div>
      <form class="compose-email-container flex column" @submit.prevent="sendEmail">
        <span class="compose-form compose-form-to">To: <input type="text" class="compose-email-to" placeholder="To" v-model="email.recipient"></span> 
        <span class="compose-form compose-form-from">From: <input type="text" class="compose-email-from" placeholder="From" v-model="email.sender" disabled></span>
        <span class="compose-form compose-form-subject">Subject: <input type="text" class="compose-email-subject" placeholder="Subject" v-model="email.subject"></span>
        <div class="compose-email-body">
            <textarea  cols="50" rows="10" placeholder="Message body" v-model="email.body"></textarea>
        </div>
      </form>
    </section>
    `,
  data() {
    return {
      email: {
        recipient: '',
        sender: '',
        subject: '',
        body: '',
      }
    }
  },
  created() {
    let user = emailServices.checkLoggedUser();
    this.email.sender = `${user.userName}@devil.com`;
  },
  methods: {
    sendEmail() {
      if (!(/^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/).test(this.email.recipient) || !this.email.subject || !this.email.body) {
        eventBus.$emit(EVENT_FEEDBACK, {txt: 'Please fill in all the details', link: '' }, 'fail')
        return;
      }
      this.email.isSent = true;      
      emailServices.sendAnEmail(this.email)
        .then(() => {          
          // todo: display confirmation
          this.closeModal();
        })
    },
    composeClose() {
      this.email.isDraft = true
      emailServices.sendAnEmail(this.email)
        .then(() => {          
          // todo: display confirmation
          this.closeModal();
        })
    },
    backBtn() {
      this.$emit('backBtn')
    },
    closeModal() {
      this.$emit('composeClose', this.email)
    }
  },
}