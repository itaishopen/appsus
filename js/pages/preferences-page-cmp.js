import backgroundPicker from '../cmps/background-picker-cmp.js'
import userService from '../services/user-service.js'
import { eventBus } from '../services/eventbus-service.js';

export default {
    components: {
        backgroundPicker
    },
    template: `
    <section class="user-preferences">
        <form @submit.prevent="submitPreferences">
            <label for="fullName">Full Name:</label> 
            <input type="text" name="fullName" v-model="fullName">
            <label for="avatarSrc">Avatar:</label> 
            <input type="text" name="avatarSrc" v-model="avatarSrc">
            <span>
                <label for="background">Background:</label>
                <input type="text" name="background" v-model="backgroundSrc" style="display: none">
                <button @click="backgroundSelected('')"><i class="fas fa-times"></i></button>
            </span>
            <background-picker @background-selected="backgroundSelected"></background-picker>
            <button type="submit">Submit</button>
        </form>
    </section>
    `,
    data() {
        return {
            fullName: '',
            avatarSrc: '',
            backgroundSrc: '',
            user: null
        }
    },
    methods: {
        backgroundSelected(backgroundSrc) {
            document.body.style.backgroundImage = `url(${backgroundSrc})`
            document.body.style.backgroundSize = `cover`
            this.backgroundSrc = backgroundSrc;
        },
        submitPreferences() {
            let preferences = userService.createPreferences(this.fullName, this.avatarSrc, this.backgroundSrc);
            userService.setUserPreferences(this.user.userName, preferences);
            eventBus.$emit('avatarChanged');
        }
    },
    created() {
        this.user = userService.checkLoggedUser();
        if (!this.user) {
            this.$router.push('/')
            return;
        } 
        userService.getUserPreferences(this.user.userName)
            .then(preferences => {
                if (preferences) {
                    this.fullName = preferences.fullName;
                    this.avatarSrc = preferences.avatarSrc;
                    this.backgroundSrc = preferences.backgroundSrc;
                }
            })
    }
}