import routes from './routes.js'
import navBar from './cmps/nav-bar-cmp.js'
import loggedUser from './cmps/logged-user-cmp.js'
// import userMsg from './cmps/user-msg-cmp.js'

Vue.use(VueRouter);

const router = new VueRouter({ routes })

new Vue({
    router,
    el: '#app',
    components: {
        navBar,
        loggedUser
        // userMsg
    },
})