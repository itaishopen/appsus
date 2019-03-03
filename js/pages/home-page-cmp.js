export default {

    template:`
    <section class="home-page">
        <div class="flex column">
            <div class="home-header flex align-center">
                <h1>welcome to <span class="logo-txt">AppSus</span></h1>
                <img src="img/large-horse-icon.png" class="horse-large">
            </div>
        </div>
    </section>
    `,
    mounted: function() {
        document.querySelector('title').innerHTML = 'AppSus';
        document.getElementById('favicon').href = 'img/final-horse-circle.png'; 
        document.querySelector('.logo-img').src = 'img/final-horse-circle.png';
        if (document.body.classList.contains('open')) {
            document.querySelector(".mobile-menu-button").classList.toggle("change");
            document.body.classList.toggle('open');
        } 
    },

}