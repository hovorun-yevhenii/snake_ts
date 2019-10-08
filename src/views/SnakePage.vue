<template>
    <div class="game">
        <header>
            <router-link class="icon-link" to="/">
                <i class="fas fa-arrow-circle-left"></i>
            </router-link>
            <input type="range" min="0" max="360" step="1" v-model="hueValue"/>
        </header>

        <main>
            <SnakeView :snake="snake" :hueValue="hueValue"/>
        </main>
    </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import SnakeView from '@/components/SnakeView.vue';
  import SnakeModel from '@/game/SnakeModel';

  @Component({
    components: {SnakeView},
  })
  export default class Game extends Vue {
    public dimension: number = 20;
    public hueValue: number = 100;
    public snake: SnakeModel = new SnakeModel({
      dimension: this.dimension,
    });
  }
</script>

<style lang="less" scoped>
    .game {
        min-height: 100vh;
        background-color: #202124;
        display: flex;
        flex-direction: column;

        header {
            display: flex;
            justify-content: space-around;
            padding: 16px;
            border-bottom: 1px solid #5f6368;

            .icon-link {
                font-size: 32px;
                color: #5f6368;
                opacity: .7;
                transition: .2s;

                &:hover {
                    opacity: 1;
                }
            }

            input {
                opacity: .3;
                cursor: pointer;
                transition: .2s;

                &:hover {
                    opacity: .5;
                }
            }
        }

        main {
            flex-grow: 1;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
</style>
