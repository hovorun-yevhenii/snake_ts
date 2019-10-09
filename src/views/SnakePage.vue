<template>
    <div class="game">
        <header>
            <router-link class="icon-link" to="/">
                <i class="fas fa-arrow-circle-left"></i>
            </router-link>

            <label>
                Color HUE
                <input type="range" min="0" max="360" step="1" v-model="hueValue"/>
            </label>
            <label>
                Snake Speed
                <input type="range" min="4" max="1000" step="1" value="150" @change="setSnakeTempo"/>
            </label>
        </header>

        <main>
            <div class="stat">
                <div class="speed">
                    Speed: {{Math.round((1000 / snake.tempo)*100) / 100}} steps/sec
                </div>
                <div class="count">
                    Carrots: {{snake.units.length}}
                </div>
            </div>
            <SnakeView :snake="snake" :hueValue="hueValue"/>
        </main>
    </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import SnakeView from '@/components/SnakeView.vue';
  import Snake from '@/game';

  @Component({
    components: {SnakeView},
  })
  export default class SnakePage extends Vue {
    public hueValue: number = 130;
    protected snake: Snake = new Snake();

    public setSnakeTempo(ev: any) {
      this.snake.setTempo = ev.target.value;
    }
  }
</script>

<style lang="less" scoped>
    .game {
        min-height: 100vh;
        background-color: #202124;
        color: #5F6368;
        display: flex;
        flex-direction: column;

        header {
            display: flex;
            justify-content: space-around;
            align-items: center;
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

            label {
                display: inline-flex;
                flex-direction: column;
                align-items: center;
                input {
                    opacity: .3;
                    cursor: pointer;
                    transition: .2s;

                    &:hover {
                        opacity: .5;
                    }
                }
            }
        }

        main {
            flex-grow: 1;
            flex-direction: column;
            display: flex;
            align-items: center;
            justify-content: center;

            .stat {
                display: flex;
                justify-content: space-between;
                max-width: 480px;
                width: 100%;
                padding: 16px 32px;
                box-sizing: border-box;
                font-family: monospace;
            }
        }
    }
</style>
