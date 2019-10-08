<template>
    <svg viewBox="0 0 1000 1000" width="100%">
        <transition-group tag="g" name="list" appear>
            <line v-for="index in (dimension - 1)"
                  :key="`x${index}`"
                  :stroke-dasharray="strokeDasharray"
                  :stroke-dashoffset="dimension"
                  :x1="(1000 / dimension) * index"
                  :x2="(1000 / dimension) * index"
                  y2="1000">
            </line>
            <line v-for="index in (dimension - 1)"
                  :key="`y${index}`"
                  :stroke-dasharray="strokeDasharray"
                  :stroke-dashoffset="dimension"
                  :y1="(1000 / dimension) * index"
                  :y2="(1000 / dimension) * index"
                  x2="1000">
            </line>
        </transition-group>

        <transition-group tag="g" name="list" appear>
            <rect v-for="(unit, index) in units"
                  :key="`x${unit.x}/y${unit.y}`"
                  :x="unit.x"
                  :y="unit.y"
                  :stroke="`hsl(${hueValue}, 90%, 20%)`"
                  :fill="colors[index]"
                  :width="1000 / dimension"
                  :height="1000 / dimension"></rect>
        </transition-group>
    </svg>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';
  import SnakeModel from '@/game/SnakeModel';
  import {Coords} from '@/game/types';

  @Component({})
  export default class SnakeView extends Vue {
    @Prop({default: {}}) public snake!: SnakeModel;
    @Prop({default: 90}) public hueValue!: number;

    public get units(): Coords[] {
      return this.snake.units;
    }

    public get dimension(): number {
      return this.snake.dimension;
    }

    public get strokeDasharray(): string {
      return `${this.dimension * 2} ${this.dimension / 2}`;
    }

    public get colors(): string[] {
      const {length} = this.units;
      const step: number = 35 / (length - 1);

      return Array(length)
        .fill(35)
        .map((value: number, index: number) => value + index * step)
        .map((value: number) => `hsl(${this.hueValue}, 70%, ${Math.floor(value)}%`)
        .reverse();
    }
  }
</script>

<style lang="less" scoped>
    svg {
        max-width: 480px;

        line {
            stroke: #000;
        }
    }

    .list-enter-active,
    .list-leave-active,
    .list-move {
        transition: 0s linear;
    }

    .list-enter {
        opacity: 0;
        transform: scale(0.5);
    }

    .list-enter-to {
        opacity: 1;
        transform: scale(1);
    }

    .list-leave-to {
        opacity: 0;
        transform: scale(0);
    }
</style>
