<template>
    <svg :viewBox="`0 0 ${fieldSize} ${fieldSize}`" width="100%">
        <defs>
            <symbol id="carrot" viewBox="0 0 510.719 510.719">
                <path class="carrot" d="m491.723 134.466c14.894-33.54 7.282-72.196-18.056-97.533-25.333-25.335-63.985
                -32.949-97.526-18.058-34.188-27.134-84.289-25.135-116.209 6.785-37.692 37.691-33.236 99.837
                9.253 131.863.576 14.142 4.576 27.853 11.546 40.005-77.942-53.956-149.126 37.263-200.601 88.733
                0 .456-93.19 84.67-78.351 208.942.875 7.333 6.656 13.115 13.99 13.99 75.438 9.007 153.078-22.49
                208.94-78.352 53.241-53.241 138.828-126.3 88.19-201.068 12.193 7.03 25.967 11.064 40.177 11.642 32.148
                42.639 94.309 46.808 131.863 9.253 31.701-31.7 33.961-81.867 6.784-116.202zm-320.842 299.367c-6.247
                6.248-16.379 6.249-22.627 0l-17.678-17.678c-6.249-6.248-6.249-16.379 0-22.627 6.248-6.249 16.379-6.249
                22.627 0l17.678 17.678c6.249 6.248 6.249 16.379 0 22.627zm15.68-162.208-17.678-17.678c-6.249-6.248
                -6.249-16.379 0-22.627 6.248-6.249 16.379-6.249 22.627 0l17.678 17.678c10.109 10.108 2.812
                27.313-11.313 27.313-4.095.001-8.19-1.561-11.314-4.686zm66.202 105.014c-6.247 6.248-16.379
                6.249-22.627 0l-17.678-17.678c-6.249-6.248-6.249-16.379 0-22.627 6.248-6.249 16.379-6.249 22.627
                0l17.678 17.678c6.249 6.248 6.249 16.379 0 22.627zm151.254-208.967c-.599 0-6.662-.299-36.731-1.731l
                -58.358 58.358c-6.521-8.434-14.71-16.45-22.608-22.645l40.251-40.251-5.873-45.471c-1.132-8.764 5.055
                -16.786 13.818-17.918 8.755-1.132 16.786 5.054 17.918 13.818l2.712 20.996 27.001-27.001c6.248-6.249
                16.379-6.249 22.627 0 6.249 6.248 6.249 16.379 0 22.627l-6.907 6.907 6.898.328c8.827.42 15.642
                7.917 15.221 16.743-.408 8.568-7.483 15.24-15.969 15.24z"/>
            </symbol>

            <symbol id="tail">
                <transition appear name="unit">
                    <rect style="transform-origin: center"
                          :x="tailUnit.x"
                          :key="`${tailUnit.x}-${tailUnit.y}`"
                          :y="tailUnit.y"
                          :stroke="strokeColor"
                          :fill="colors[0]"
                          :width="gridSize"
                          :height="gridSize"></rect>
                </transition>
            </symbol>

            <symbol id="head">
                <transition appear name="unit">
                    <rect style="transform-origin: center"
                          :x="headUnit.x"
                          :y="headUnit.y"
                          :key="`${headUnit.x}-${headUnit.y}`"
                          :stroke="strokeColor"
                          :fill="colors[colors.length - 1]"
                          :width="gridSize"
                          :height="gridSize"></rect>
                </transition>
            </symbol>
        </defs>

        <use xlink:href="#carrot"
             :fill="carrotColor"
             :x="carrot.x + carrotOffset"
             :y="carrot.y + carrotOffset"
             :width="dimension * 2"
             :height="dimension * 2"/>

        <transition-group tag="g" name="grid" appear>
            <line v-for="index in (dimension - 1)"
                  :key="`x${index}`"
                  :stroke-dasharray="strokeDasharray"
                  :stroke-dashoffset="dimension"
                  :x1="gridSize * index"
                  :x2="gridSize * index"
                  :y2="fieldSize">
            </line>
            <line v-for="index in (dimension - 1)"
                  :key="`y${index}`"
                  :stroke-dasharray="strokeDasharray"
                  :stroke-dashoffset="dimension"
                  :y1="gridSize * index"
                  :y2="gridSize * index"
                  :x2="fieldSize">
            </line>
        </transition-group>


        <use xlink:href="#tail"></use>

        <rect v-for="(unit, index) in body"
              :key="`x${unit.x}/y${unit.y}`"
              :x="unit.x"
              :y="unit.y"
              :stroke="strokeColor"
              :fill="colors[index + 1]"
              :width="gridSize"
              :height="gridSize"></rect>

        <use xlink:href="#head"></use>
    </svg>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';
  import Snake from '@/game';
  import {Coords} from '@/game/types';

  @Component({})
  export default class SnakeView extends Vue {
    @Prop() public snake!: Snake;
    @Prop({default: 90}) public hueValue!: number;

    public get body(): Coords[] {
      return this.snake.units.slice(1, this.snake.units.length - 1);
    }

    public get carrot(): Coords {
      return this.snake.carrot;
    }

    public get dimension(): number {
      return this.snake.DIMENSION;
    }

    public get gridSize(): number {
      return this.fieldSize / this.dimension;
    }

    public get carrotOffset(): number {
      return this.dimension / 4;
    }

    public get fieldSize(): number {
      return this.snake.FIELD_SIZE;
    }

    public get headUnit(): Coords {
      return this.snake.getHead;
    }

    public get tailUnit(): Coords {
      return this.snake.units[0];
    }

    public get carrotColor(): string {
      return `hsl(${this.hueValue - 100}, 90%, 60%)`;
    }

    public get strokeColor(): string {
      return `hsl(${this.hueValue}, 90%, 20%)`;
    }

    public get strokeDasharray(): string {
      return `${this.dimension * 2} ${this.dimension / 2}`;
    }

    public get colors(): string[] {
      const length = this.body.length + 2;
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

        .carrot {
            transform-origin: center;
            animation: .7s carrot ease-in alternate infinite;
        }
    }

    @keyframes carrot {
        to {
            transform: scale(.7);
        }
    }

    .grid-enter-active {
        transform-origin: center;
        transition: 1s;
    }

    .grid-enter {
        opacity: 0;
    }

    .head, .tail {
        transform-origin: center;
    }

    .unit-enter-active,
    .unit-leave-active {
        transform-origin: center;
        transition: 0s;
    }

    .unit-enter-to {
        opacity: 0;
        transform: scaleX(0);
    }

    .unit-leave-to {
        opacity: 0;
        transform: scaleX(0);
    }
</style>
