export default {
  props: ['email'],
  template: `
      <div class="email-preview flex space-between">
        <div class="email-preview-letter flex align-center justify-center" :style="{ background: starColor }" >
            <input type="checkbox" id="letter-checkbox" class="email-preview-letter-checkbox">
            <label for="letter-checkbox" @click="emailCheck(email.id)">
                <span v-if="!email.isCheck" class="first-letter">{{firstLetter}}</span>
                <span v-if="email.isCheck" class="first-letter"><i class="fas fa-check"></i></span>
            </label>
        </div>
        <div  class="email-link flex" @click="openEmail(email.id)">
          <div class="text-container flex column justify-center">
              <div v-if="!email.isSent" class="email-preview-sender">{{email.sender}}</div>
              <div v-if="email.isSent" class="email-preview-sender">{{email.recipient}}</div>
              <div class="email-preview-subject">{{email.subject}}</div>
          </div>
          <div class="email-preview-sentAt">{{email.sentAt.timeToShow}}</div>
        </div>
      </div>
  `,
  data() {
    return {
      color: '#00ffff',
      currEmail: {},
    }
  },
  methods: { 
    openEmail(emailId) {
      this.$emit('openEmail', emailId);
    },
    emailCheck(emailId) {
      this.$emit('emailCheck', emailId);
    }
  },
  computed: {
    starColor() {
         return "#"+((1<<24)*Math.random()|0).toString(16);
    },
    firstLetter() {
      if (this.email.sender) {
        if (!this.email.isSent) return this.email.sender.charAt(0).toUpperCase();
        return this.email.recipient.charAt(0).toUpperCase();
      }
      return '?'
    }
},
}