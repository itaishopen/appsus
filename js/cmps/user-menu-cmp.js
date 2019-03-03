export default {
    template: `
    <section class="user-menu">
        <h3>{{loggedUserForView}}</h3>
        <h4>{{loggedUser.userName}}</h4>
        <div @click="closeMenu">
            <router-link to="/preferences">Preferences</router-link>
        </div>
        <button @click="logOut">Log Out</button>
        <button @click="closeMenu" class="close-menu"><i class="fas fa-times"></i></button>
    </section>
    `,
    props: ['loggedUser'],
    methods: {
        logOut() {
            this.closeMenu();
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