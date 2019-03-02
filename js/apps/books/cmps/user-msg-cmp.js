import { eventBus, EVENT_FEEDBACK } from '../../../services/eventbus-service.js'

export default {
    template:`
    <section v-if="showMsg" class="user-msg flex justify-center align-center">
        <div :class="msgType" >
            <div class="flex">
                <button :style="{color:btnColor}"  @click="closeMsg" class="fas fa-times-circle close-btn btn"></button>
                <i :class="iconClass"></i>
                <div>
                    <p>{{msg.txt}}</p>
                    <router-link class="msg-link" v-if="msg.link !== ''" :to='msg.link' @click="closeMsg">Go to book</router-link>
                </div>
            </div>
        </div>
        
    </section>
    `,
     data() {
        return {
            showMsg: false,
            msg: '',
            msgType:'',  
        }
    },
    created() {
        eventBus.$on(EVENT_FEEDBACK,(msg,type) => {
            this.showMsg = true;
            this.msg = msg;
            this.msgType = type;
            
        })
    },
    // mounted() {
    //     document.querySelector('.msg-link').onclick = this.closeMsg;
    //   },
    watch: {
        "document.querySelector('.msg-link').classList": function (classList) {
            this.showMsg = false;
        }
    },
    methods:{
        closeMsg() {
            this.showMsg = false;
        }
    },
   
    computed :{
        iconClass(){
            return this.msgType === 'success' ?'fas fa-check':'fas fa-times';
        },
        btnColor(){
            return this.msgType === 'success' ?'green':'red';  
        }
    }

    
}