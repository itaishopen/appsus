import userService from '../services/user-service.js'
import { eventBus } from '../services/eventbus-service.js';

export default {

    template: `
    <section class="home-page">
        <div class="flex column">
            <h3>welcome to</h3>
            <h1 class="logo-txt">AppSus</h1>
        </div>
        <div class="log-sign-area"  v-if="!loggedUser">
        <div class="flex space-between">
            <router-link to="/login">Log In</router-link><router-link to="/signIn">Sign In</router-link>
        </div>
            <router-view @userSigned="updateLoggedUser"></router-view>
        </div>
    </section>
    `,
    data() {
        return {
            loggedUser: null
        }
    },
    methods: {
        updateLoggedUser() {
            this.loggedUser = userService.checkLoggedUser();
        }
    },
    mounted() {
        document.querySelector('title').innerHTML = 'AppSus';
        document.getElementById('favicon').href = 'img/final-horse-circle.png';
        document.querySelector('.logo-img').src = 'img/final-horse-circle.png';
        if (document.body.classList.contains('open')) {
            document.querySelector(".mobile-menu-button").classList.toggle("change");
            document.body.classList.toggle('open');
        }
        this.updateLoggedUser();
        eventBus.$on('userChanged', () => this.updateLoggedUser())
    }
}