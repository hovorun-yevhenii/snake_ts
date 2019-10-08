import Loop from '@/game/loop';
import {SnakeUnit, SnakeOptions} from '@/game/types';

export default class SnakeModel {
  public units: SnakeUnit[] = [];
  public dimension: number = 2;
  public direction: string = 'right';
  public unitSize!: number;
  public loop: Loop = new Loop({
    interval: 300,
    callback: this.main.bind(this),
  });

  constructor(options: SnakeOptions) {
    this.dimension = options.dimension;
    this.unitSize = Math.round(1000 / this.dimension);
    this.pushInitialUnits();
    this.addEventListener();
  }

  public pushInitialUnits(): void {
    Array(10).fill('').forEach(() => this.makeStep(true));
  }

  public makeStep(initial?: boolean): void {
    this.units.push(this.makeNewUnit);

    if (!initial) {
      this.units.shift();
    }
  }

  public main(): void {
    this.makeStep();
  }

  get getHead(): SnakeUnit {
    return this.units[this.units.length - 1] || {x: this.unitSize, y: this.unitSize};
  }

  get makeNewUnit(): SnakeUnit {
    const head: SnakeUnit = this.getHead;
    const limit = 1000 - this.unitSize;
    const normalize = (n: number) => n > limit ? 1000 - n : n < 0 ? 1000 + n : n;
    let x: number = 0;
    let y: number = 0;

    switch (this.direction) {
      case 'right':
        x = this.unitSize;
        break;
      case 'left':
        x = -this.unitSize;
        break;
      case 'up':
        y = -this.unitSize;
        break;
      case 'down':
        y = this.unitSize;
        break;
    }

    return {
      x: normalize(x + head.x),
      y: normalize(y += head.y),
    };
  }

  public addEventListener(): void {
    document.addEventListener('keydown', ({code}) => {
      switch (true) {
        case code === 'Space':
          this.loop.start.call(this.loop);
          break;
        case code === 'ArrowRight' && this.direction !== 'left':
          this.direction = 'right';
          break;
        case code === 'ArrowLeft' && this.direction !== 'right':
          this.direction = 'left';
          break;
        case code === 'ArrowUp' && this.direction !== 'down':
          this.direction = 'up';
          break;
        case code === 'ArrowDown' && this.direction !== 'up':
          this.direction = 'down';
          break;
        default:
          return false;
      }
    });
  }
}
