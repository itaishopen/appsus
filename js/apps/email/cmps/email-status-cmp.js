
export default {
  props: ['readEmailsCount'],
  template: `
    <section class="email-status">
      <progress class="email-status-progress" :value="readEmailsCount" max="100"></progress>
      <span class="email-status-txt">Read: {{readEmailsCount}}%</span>
    </section>
    `,
}