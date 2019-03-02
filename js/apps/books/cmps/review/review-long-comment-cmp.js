export default {
    props: ['str','len'],
    template: `
        <section class="long-review">
            <p>{{firstLine}}</p>
        </section>
    `,
    computed:  {
        firstLine(){
            return this.str.substring(0, this.len);
        },
    }
}