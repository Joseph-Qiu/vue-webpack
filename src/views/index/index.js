import { mapState } from 'vuex';
import echarts from 'echarts';
import Storage from 'utils/storage';
import Cookie from 'utils/cookie';

const ViewModule = {
    name: 'Home',
    data () {
        return {
            value: '',
            options: [{
                value: '黄金糕',
                label: '黄金糕'
            }, {
                value: '双皮奶',
                label: '双皮奶'
            }, {
                value: '蚵仔煎',
                label: '蚵仔煎'
            }, {
                value: '龙须面',
                label: '龙须面'
            }, {
                value: '北京烤鸭',
                label: '北京烤鸭'
            }]
        };
    },
    created () {
        document.title = '首页';
        Storage.add('index', '2');
        Cookie.setCookie('cookie-index', '1');
    },
    mounted () {
        let myChart = echarts.init(document.getElementById('main'));
        myChart.setOption({
            title: {
                text: 'ECharts 入门示例'
            },
            tooltip: {},
            xAxis: {
                data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        });
    },
    computed: Object.assign({
    }, mapState({
        ENV: (state) => state.ENV
    })),
    components: {
       
    },
    methods: {
        handleToUser () {
            this.$router.push({
                name: 'user'
            });
        },
        handleToDetail () {
            this.$router.push({
                name: 'detail'
            });
        }
    }
};

export default ViewModule;
