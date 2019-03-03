export default {
    template: `
    <section class="user-menu">
        <ul>
            <li @click ="login" v-if="!loggedUser">Log In</li>
            <li v-if="!loggedUser"><router-link to="/sign-in">Sign In</router-link></li>
            <li @click="changeUser" v-if="loggedUser">Change User</li>
            <li @click="logOut" v-if="loggedUser">Log Out</li>
        </ul>
    </section>
    `,
    props: ['loggedUser'],
    methods: {
        logOut() {
            console.log('logging out');
            this.$emit('logOut');
        },
        changeUser() {
            this.$emit('changeUser');
        },
        login() {
            this.$emit('login')
        }
    }
}