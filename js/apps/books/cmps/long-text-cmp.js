export default {
    props: ['str','len'],
    template: `
        <section class="long-text">
            <p>{{lineBreaker}}</p>
        </section>
    `,
    computed:  {
        lineBreaker(){
            if (this.str.length > this.len) {
                return this.str.slice(this.len, -1);
            }
        }
    }
}