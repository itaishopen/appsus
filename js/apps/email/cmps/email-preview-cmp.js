export default {
  props: ['email'],
  template: `
      <div class="email-preview flex space-between">
        <div class="email-preview-letter flex align-center justify-center" v-bind:style="{ background: activeColor }"><span class="first-letter">{{email.sender.charAt(0).toUpperCase()}}</span></div>
        <div class="text-container flex column justify-center">
            <div class="email-preview-sender">{{email.sender}}</div>
            <div class="email-preview-subject">{{email.subject}}</div>
        </div>
        <div class="email-preview-sentAt">{{email.sentAt.timeToShow}}</div>
      </div>
  `,
  data() {
    return {
      activeColor: '#00ffff',
    }
  },
  mounted: function() {
      this.activeColor = "#"+((1<<24)*Math.random()|0).toString(16);
  } 
}