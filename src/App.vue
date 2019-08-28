<template>
  <div id="demo">
    <span 
      v-for="item in kk" 
      :key="item">{{ item }}</span>
    {{ str }}
    <router-view />
  </div>
</template>

<script>
export default {
    name: 'App',
    components: {
    },
    data () {
        return {
            kk: [1, 3],
            str: ""
        }
    },
    computed: {
    },
    created () {
        this.str = `${this.kk}`
    },
    mounted () {
    },

    methods: {
    }
}
</script>

<style scoped>
#demo{
    font-size: 16px;
    padding: 20px;
}
</style>
