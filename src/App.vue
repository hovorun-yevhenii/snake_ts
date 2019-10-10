<template>
    <div id="app">
        <SnakePage/>
    </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import SnakePage from '@/components/SnakePage.vue';

  @Component({
    components: {SnakePage},
  })
  export default class App extends Vue {
  }
</script>

<style lang="less">
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
    }

    html, body, div, span, h1, h2, p, label, article,
    aside, footer, header, menu, nav, section {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        font: inherit;
        vertical-align: baseline;
    }

    footer, header, menu, nav {
        display: block;
    }

    body {
        line-height: 1;
    }
</style>
