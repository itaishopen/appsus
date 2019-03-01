export default {
    template: `
    <section class="nav-bar" id="nav-bar">
        <div id="mobile-menu-button" class="mobile-menu-button" @click="toggleMenu">
            <div class="bar1"></div>
            <div class="bar2"></div>
            <div class="bar3"></div>
        </div>
        <div class="nav flex">
            <router-link exact to="/">Home</router-link> <span class="line">|</span>
            <router-link exact to="/miss-keep">Miss Keep</router-link> <span class="line">|</span>
            <router-link exact to="/email">Mr Email</router-link>  
        </div>
    </section>
    `,
    methods: {
        toggleMenu() {
            document.getElementById("mobile-menu-button").classList.toggle("change");
            document.body.classList.toggle('open');
        }
    }
}