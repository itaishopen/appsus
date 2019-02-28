export default {

    template:`
    <section class="home-page">
        <div class="flex column">
            <div class="home-header flex align-center">
                <h1>welcome to <span class="logo-txt">AppSus</span></h1>
            </div>
        </div>
    </section>
    `,
    created() {
        document.querySelector('title').innerHTML = 'AppSus';
            document.getElementById('favicon').href = 'img/hourse-icon.png'; 
    },

}