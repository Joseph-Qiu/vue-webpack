<template>
    <div class="home">
        <div class="title">
            home-{{ENV}}
        </div>

        <div class="element-ui">
            <span class="on">{{value}}</span>
            <el-select v-model="value" placeholder="请选择">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
            <el-button type="primary" @click="handleToUser"><i class="el-icon-search"></i>用户中心</el-button>
        </div>

        <div id="main"></div>
    </div>
</template>

<script>
	import './index.less';
    import Index from './index.js';
    export default Index;
</script>

<style scoped lang="less">
.home{
    font-size: 20px;
    color: #666;
    .title{
        font-weight: 700;
        background: #eee;
    }
}
</style>