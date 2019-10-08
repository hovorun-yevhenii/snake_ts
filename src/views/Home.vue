<template>
  <div class="home">
    <router-link to="/game">Play game</router-link>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class Home extends Vue {}
</script>
