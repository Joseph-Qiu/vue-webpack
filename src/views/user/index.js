
import Storage from 'utils/storage';
const ViewModule =  {
    name: 'Home',
    data () {
        return {
            
        };
    },
    components: {
       
    },
    created () {
        Storage.add('user', '1');
    },
    computed: {},
    beforeRouteEnter (to, from, next) {
        next();
    },
    beforeRouteLeave (to, from, next) {
        next();
    },
    methods: {
        
    }
};

export default ViewModule;