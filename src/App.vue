<template>
  <div id="demo">
    <router-view />
  </div>
</template>

<script>
let a = () => {
    console.log(1)
}
a()
export default {
    name: 'App',
    components: {
    },
    data () {
        return {}
    },
    computed: {
    },
    created () {
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
