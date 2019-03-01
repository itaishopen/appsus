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
    created() {
        document.querySelector('title').innerHTML = 'AppSus';
        document.getElementById('favicon').href = 'img/final-horse-circle.png'; 
        document.querySelector('.logo-img').src = 'img/final-horse-circle.png'; 
    },

}