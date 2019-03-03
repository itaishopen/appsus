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