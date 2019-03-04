import userService from '../services/user-service.js'
import { eventBus } from '../services/eventbus-service.js';

export default {
    template: `
        <section class="signIn">
            <h3>Sign In</h3>
            <form @submit.prevent="signIn">
                <label for="userName"> User Name: </label>
                    <input type="text" name="userName" v-model="userName" required>
                <label for="password"> Password: </label>
                    <input type="text" name="password" v-model="password" required>
                <label for="confirmPassword"> Confirm Password:</label>
                    <input type="text" name="confirmPassword" v-model="confirmPassword" required>
                <label for="fullName"> Full Name: </label>
                    <input type="text" name="confirmPassword" v-model="fullName" required>
                <button type="submit">Sign In</button>
            </form>
        </section>
    `,
    data() {
        return {
            userName: '',
            password: '',
            confirmPassword: '',
            fullName: ''
        }
    },
    methods: {
        signIn() {
            if (this.password !== this.confirmPassword) {
                console.log('password doesn\'t match');
                return;
            }
            this.userName = this.userName.trim();
            if (this.userName.indexOf(' ') !== -1) {
                console.log('User Name Can\'t Contain Spaces');
                return;
            }
            userService.signIn(this.userName, this.password, this.fullName)
                .then(res => {
                    console.log(res);
                    if (res === 'Signed in Succesfully') this.$router.push('/');
                    eventBus.$emit('userChanged');
                    this.$emit('userSigned');
                })
        }
    }
}