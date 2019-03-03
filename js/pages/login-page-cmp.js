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
                    <input type="text" name="password" v-model="password" required>
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
                    console.log(res);
                    if (res === 'Logged Succesfully') {
                        userService.getUserPreferences(this.userName)
                            .then(preferences => {
                                document.body.style.backgroundImage = `url(${preferences.backgroundSrc})`
                            })
                        
                        this.$router.push('/');
                    }
                    eventBus.$emit('userChanged');
                })
        }
    }
}