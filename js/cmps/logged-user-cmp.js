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
        <div class="user-name" @click="toggleMenu">
            {{loggedUserForView}}
        </div>
        <user-menu
            v-if="showUserMenu"
            :loggedUser="loggedUser"
            @logOut="logOut"
            @changeUser="changeUser"
            @login="login"
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
        loggedUserForView() {            
            return this.loggedUser ? this.loggedUser.userName : 'Guest'
        }
    },
    methods: {
        renderUser() {
            this.loggedUser = utilService.loadFromSessionStorage('loggedUser');
        },
        toggleMenu() {
            this.showUserMenu = !this.showUserMenu;
        },
        logOut() {
            userService.logOut();
            this.renderUser();
            this.$router.push('/')
            this.showUserMenu = false;
            eventBus.$emit('userChanged');
        },
        changeUser() {
            this.$router.push('/login');
            this.showUserMenu = false;
        },
        login() {
            this.$router.push('/login');
            this.showUserMenu = false;
        }
    },
    created() {
        this.renderUser();
        eventBus.$on('userChanged', () => this.renderUser());
    }
}