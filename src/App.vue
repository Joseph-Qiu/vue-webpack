<template>
  <div id="demo">
    <router-view />
  </div>
</template>

<script>
export default {
    name: 'AppUser',
    components: {
    },
    data () {
        return {
            dd:1
        }
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
