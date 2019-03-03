export default {
    template: `
    <section class="user-menu">
        <h3>{{loggedUserForView}}</h3>
        <h4>{{loggedUser.userName}}</h4>
        <router-link to="/preferences">Preferences</router-link>
        <button @click="logOut">Log Out</button>
        <button @click="closeMenu" class="close-menu"><i class="fas fa-times"></i></button>
            <!-- <li @click ="login" v-if="!loggedUser">Log In</li>
            <li v-if="!loggedUser"><router-link to="/sign-in">Sign In</router-link></li> -->
            

    </section>
    `,
    props: ['loggedUser'],
    methods: {
        logOut() {
            console.log('logging out');
            this.$emit('logOut');
        },
        login() {
            this.$emit('login')
        },
        closeMenu() {
            this.$emit('closeMenu');
        }
    },
    computed: {
        loggedUserForView() {
            return this.loggedUser ? this.loggedUser.preferences.fullName : 'Guest'
        }
    }
}