<template>
    <svg viewBox="0 0 1000 1000" width="100%">
        <rect width="1000" height="1000" stroke="#5f6368" fill="none"></rect>
        <!--        <transition-group tag="g" name="list" appear>-->
        <!--            <line v-for="index in (dimension - 1)"-->
        <!--                  :key="'x' + index"-->
        <!--                  :x1="(1000 / dimension) * index"-->
        <!--                  :x2="(1000 / dimension) * index"-->
        <!--                  y2="1000">-->
        <!--            </line>-->
        <!--            <line v-for="index in (dimension - 1)"-->
        <!--                  :key="'y' + index"-->
        <!--                  :y1="(1000 / dimension) * index"-->
        <!--                  :y2="(1000 / dimension) * index"-->
        <!--                  x2="1000">-->
        <!--            </line>-->
        <!--        </transition-group>-->

        <!--        <circle v-for="unit in units" :cx="unit.x" :cy="unit.y" :r="Math.round(500 / dimension)"></circle>-->

        <transition-group tag="g" name="list" appear>
            <rect v-for="(unit, index) in units"
                  :key="unit.x + unit.y + index"
                  :x="unit.x"
                  :y="unit.y"
                  :stroke="colors[index]"
                  :fill="colors[index]"
                  :width="Math.round(1000 / dimension)"
                  :height="Math.round(1000 / dimension)"></rect>
        </transition-group>
    </svg>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';
  import SnakeModel, {SnakeUnit} from '@/Game/SnakeModel';

  @Component({})
  export default class SnakeView extends Vue {
    @Prop({default: {}}) public snake!: SnakeModel;
    @Prop({default: 90}) public hueValue!: number;

    public get units(): SnakeUnit[] {
      return this.snake.units;
    }

    public get dimension(): number {
      return this.snake.dimension;
    }

    public get colors(): string[] {
      const {length} = this.units;
      const step: number = 40 / (length - 1);

      return Array(length)
        .fill(40)
        .map((value: number, index: number) => value + index * step)
        .map((value: number) => `hsl(${this.hueValue}, 60%, ${Math.floor(value)}%`)
        .reverse();
    }
  }
</script>

<style lang="less" scoped>
    svg {
        max-width: 480px;

        line {
            stroke: #5f6368;
        }
    }

    .list-enter-active,
    .list-leave-active,
    .list-move {
        transition: 0ms linear;
    }

    .list-enter {
        opacity: 0;
        /*transform: scale(0.5);*/
    }

    .list-enter-to {
        opacity: 1;
        /*transform: scale(1);*/
    }

    .list-leave-to {
        opacity: 0;
        /*transform: scale(0);*/
    }
</style>
