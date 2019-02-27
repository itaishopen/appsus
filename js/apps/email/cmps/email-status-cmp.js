
export default {
  props: ['unReadEmailsCount'],
  template: `
    <section class="email-status">
      <span class="email-status-txt">UnRead Emails: {{unReadEmailsCount}}</span>
    </section>
    `,
}