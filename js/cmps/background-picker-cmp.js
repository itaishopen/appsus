export default {
    template: `
    <section class="background-picker">
        <img src="img/BG1.jpg" class="background-preview" @click="selectBackground(1)">
        <img src="img/BG2.jpg" class="background-preview" @click="selectBackground(2)">
        <img src="img/BG3.jpg" class="background-preview" @click="selectBackground(3)">
        <img src="img/BG4.jpg" class="background-preview" @click="selectBackground(4)">
    </section>
    `,
    methods: {
        selectBackground(bgSelected) {
            this.$emit('background-selected', `img/BG${bgSelected}.jpg`)
        }
    }
}