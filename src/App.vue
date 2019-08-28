<template>
  <div class="demo">
    <router-view />
    ddddd
    <div v-for="item in kk" :key="item">
      {{item}}
      <span></span>
    </div>
  </div>
</template>

<script>
export default {
    name: 'AppUser',
    components: {
    },
    data () {
        return {
            kk: [1, 2]
        }
    },
    props: {
        a: {
            type: String,
            default: ''
        }
    },
    computed: {
    },
    created () {
        console.log(1)
    },
    mounted () {
    },

    methods: {
    }
}
</script>

<style scoped>
.demo{
    font-size: 16px;
    padding: 20px;
}
</style>
