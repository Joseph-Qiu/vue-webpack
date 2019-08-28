<template>
  <div class="demo">
    <router-view />
</div></template>

<script>
export default {
    name: 'AppUser',
    components: {
    },
    data () {
        return {
        };
    },
    props: {
    },
    computed: {
    },
    created () {
        console.log(1);
    },
    mounted () {
    },

    methods: {
    }
};
</script>

<style scoped>
.demo{
    font-size: 16px;
    padding: 20px;
}
</style>
