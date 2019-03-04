import utilService from '../services/util-service.js';
import {eventBus} from '../services/eventbus-service.js';
import userMenu from '../cmps/user-menu-cmp.js'
import userService from '../services/user-service.js';
// import util
// import userMsg from './cmps/user-msg-cmp.js'



export default {
    components: {
        userMenu
    },
    template: `
    <section class="logged-user">
        <img class="user-avatar" :src="userAvatarSrc" @click="toggleMenu">
        <user-menu
            v-if="showUserMenu"
            :loggedUser="loggedUser"
            @logOut="logOut"
            @login="login"
            @closeMenu="toggleMenu"
            ></user-menu>
    </section>
    `,
    data() {
        return {
            loggedUser: null,
            showUserMenu: false
        }
    },
    computed: {
        userAvatarSrc() {
            if (!this.loggedUser) return 'img/placeholder_avatar.png';
            return this.loggedUser.preferences.avatarSrc || 'img/placeholder_avatar.png';
        }
    },
    methods: {
        renderUser() {            
            this.loggedUser = userService.checkLoggedUser();            
        },
        toggleMenu() {
            if (!this.loggedUser) return;
            this.showUserMenu = !this.showUserMenu;
        },
        logOut() {
            userService.logOut();
            this.renderUser();
            this.$router.push('/')
            this.showUserMenu = false;
            document.body.style.backgroundImage = '';
            eventBus.$emit('userChanged');
        },
        login() {
            this.$router.push('/login');
            this.showUserMenu = false;
        }
    },
    created() {
        this.renderUser();
        eventBus.$on('userChanged', () => this.renderUser());
        eventBus.$on('avatarChanged', () => this.renderUser());
    }
}