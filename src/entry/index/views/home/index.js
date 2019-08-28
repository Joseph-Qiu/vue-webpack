import { mapState } from 'vuex';
import echarts from 'echarts';

const ViewModule =  {
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
                name: '总量',
                type: 'bar',
                data: [5, 20, 86, 10, 10, 20]
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
            window.location.href = 'user.html';
        }
    }
};

export default ViewModule;