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
            // xxx
            dd: 1,

            name: "11", //xxx

            /**
             * sadfsdaf
             */
            data: {}
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
