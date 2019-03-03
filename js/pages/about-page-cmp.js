export default {
  template: `
    <section class="about">
      <div class="about-main">
        <div class="about-details flex">
          <div class="about-left-box flex column">
            <img  src="img/itai.jpg" alt="">
            <p v-if="show">
              I am 32 years old from Modiin, <br>
              To build this project I used Vue js framework.
            </p>
          </div>
          <div class="about-right-box flex column align-center justify-center">
            <h4>Itai Shopen</h4>
            <p class="text-muted">Junior Front-End Developer</p>
            <ul class="flex">
              <li>
                <a href="https://www.facebook.com/itai.shopen"><i class="fab fa-facebook-square facebook-logo"></i></a>
              </li>
              <li >
                <a href="https://www.linkedin.com/in/itai-shopen/"><i class="fab fa-linkedin linkedin-logo"></i></a>
              </li>
              <li>
                <a href="https://github.com/itaishopen/"><i class="fab fa-github github-logo"></i></a>
              </li>
            </ul>
          </div>
        </div>
        <div class="about-details flex">
          <div class="about-left-box flex column">
            <img  src="img/Yanai.jpg" alt="">
            <p v-if="show">
              I am 26 years old from kibbutz maabarot, musician and up-and-coming web developer<br>
            </p>
          </div>
          <div class="about-right-box flex column align-center justify-center">
            <h4>Yanai Avnet</h4>
            <p class="text-muted">Complicated functions lover</p>
            <ul class="flex">
              <li>
                <a href="https://www.facebook.com/itai.shopen"><i class="fab fa-facebook-square facebook-logo"></i></a>
              </li>
              <li >
                <a href="https://www.linkedin.com/in/itai-shopen/"><i class="fab fa-linkedin linkedin-logo"></i></a>
              </li>
              <li>
                <a href="https://github.com/itaishopen/"><i class="fab fa-github github-logo"></i></a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
    `,
  data() {
    return {
      show: true
    }
  },
  mounted() {
    this.$options.interval = setInterval(console.log(`I'm an interval`));
  },
  beforeDestroy() {
    clearInterval(this.$options.interval);
  },
}