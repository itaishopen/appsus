import {eventBus} from '../../../services/eventbus-service.js'

export default {
    template: `
        <li class="search-item" @click="goToNote">
            {{note.header}}
        </li>
    `,
    props: ['note'],
    data() {
        return {

        }
    },
    methods: {
        goToNote() {
            eventBus.$emit('search-item-clicked', this.note.id);
        }
    },
    computed: {

    }
}