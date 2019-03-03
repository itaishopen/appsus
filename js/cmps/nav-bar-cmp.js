export default {
    template: `
    <section class="nav-bar" id="nav-bar">
        <div id="mobile-menu-button" class="mobile-menu-button" @click="toggleMenu">
            <div class="bar1"></div>
            <div class="bar2"></div>
            <div class="bar3"></div>
        </div>
        <div class="nav flex">
            <router-link exact to="/">Home</router-link> <span class="line">|</span></span>
            
                <router-link exact to="/miss-keep"><span class="nav-link-btn">Miss Keep</span></router-link> <span class="line">|</span>
            
           
                <router-link exact to="/email"><span class="nav-link-btn">Mr Email</span></router-link><span class="line">|</span>
           
           
                <router-link exact to="/book"><span class="nav-link-btn">Books Gallery</span></router-link>
         
        </div>
    </section>
    `,
    methods: {
        toggleMenu() {
            if (document.body.classList.contains('show')) {
                document.getElementById("mobile-email-filter-button").classList.toggle("change-filter");
                document.body.classList.toggle('show');
            }
            document.getElementById("mobile-menu-button").classList.toggle("change");
            document.body.classList.toggle('open');
        },
        // menuClick() {
        //     if (document.body.classList.contains('open')) {
        //         document.querySelector(".mobile-menu-button").classList.toggle("change");
        //         document.body.classList.toggle('open');
        //     }
        //     if (document.body.classList.contains('show')) {
        //         document.getElementById("mobile-email-filter-button").classList.toggle("change-filter");
        //         document.body.classList.toggle('show');
        //     }
        // },
    }
}