export default {
    template:`
    <form class="email-folder" @submit.prevent="setFolder">
            <div class="tab">
                <input type="radio" id="inbox" value="inbox" checked v-model="folder"/>
                <label for="inbox">Inbox</label>
            </div>
            <div class="tab">
                <input type="radio" id="sent" value="sent" v-model="folder" />
                <label for="sent">Sent</label>
            </div> 
            <div class="tab">
                <input type="radio" id="trash" value="trash" v-model="folder" />
                <label for="trash">Trash</label>
            </div>
        </form>
    `,
    data() {
        return {
            folder: 'inbox',
        }
    },
    methods: {
        setFolder() {
            this.$emit('folder', this.folder)
        }
    },
    watch: {
        'filter': function () {
            this.setFolder();
        },
        
    }
}