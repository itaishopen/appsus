import userService from '../services/user-service.js'
import { eventBus } from '../services/eventbus-service.js';

export default {
    template: `
        <section class="login">
            <h3>Log In</h3>
            <form @submit.prevent="login">
                <label for="userName"> User Name: </label>
                    <input type="text" name="userName" v-model="userName" required>
                <label for="password"> Password: </label>
                    <input type="password" name="password" v-model="password" required>
                <button type="submit">Log In</button>
            </form>
        </section>
    `,
    data() {
        return {
            userName: '',
            password: ''
        }
    },
    mounted() {
        document.querySelector('title').innerHTML = 'Log In';
        document.getElementById('favicon').href = 'img/final-horse-circle.png';
        document.querySelector('.logo-img').src = 'img/final-horse-circle.png';
        if (document.body.classList.contains('open')) {
            document.querySelector(".mobile-menu-button").classList.toggle("change");
            document.body.classList.toggle('open');
        }
    },
    methods: {
        login() {
            userService.logOut();
            userService.login(this.userName, this.password)
                .then(res => {
                    if (res === 'Logged Succesfully') {
                        userService.getUserPreferences(this.userName)
                            .then(preferences => {
                                let backgroundSrc = preferences.backgroundSrc
                                if (backgroundSrc) document.body.style.backgroundImage = 'url(' + backgroundSrc + ')'
                            })
                        
                        this.$router.push('/');
                    }
                    eventBus.$emit('userChanged');
                })
        }
    }
}