import Loop from '@/game/loop';
import {Coords, SnakeOptions} from '@/game/types';

export default class SnakeModel {
  public units: Coords[] = [];
  public dimension: number = 2;
  public snakeDirection: string = 'right';
  public userDirection: string = 'right';
  public unitSize!: number;
  public loop: Loop = new Loop({
    interval: 200,
    callback: this.main.bind(this),
  });

  constructor(options: SnakeOptions) {
    this.dimension = options.dimension;
    this.unitSize = 1000 / this.dimension;
    this.pushInitialUnits();
    this.addEventListener();
  }

  public pushInitialUnits(): void {
    Array(10).fill('').forEach(() => this.makeStep(true));
  }

  public makeStep(initial?: boolean): void {
    const newUnit: Coords = this.makeNewUnit;
    const intersection: boolean = this.getAnyIntersection(newUnit);
    this.units.push(newUnit);

    if (intersection) {
      this.reset();
    }

    if (!initial) {
      this.units.shift();
    }
  }

  public main(): void {
    this.makeStep();
  }

  public reset(): void {
    this.snakeDirection = 'right';
    this.userDirection = 'right';
    this.loop.toggleLoop();
    this.units = [];
    this.pushInitialUnits();
  }

  public getAnyIntersection(coords: Coords): boolean {
    this.makeRabbit();
    return this.units.some((unit: Coords) => coords.x === unit.x && coords.y === unit.y);
  }

  public getHeadIntersection(coords: Coords): boolean {
    const {x, y} = this.getHead;

    return x === coords.x && y === coords.y;
  }

  public makeRabbit(): Coords {
    // TODO
    return {x: 0, y: 0};
  }

  get getHead(): Coords {
    return this.units[this.units.length - 1] || {x: this.unitSize, y: this.unitSize};
  }

  get makeNewUnit(): Coords {
    const head: Coords = this.getHead;
    const limit = 1000 - this.unitSize;
    const normalize = (n: number) => n > limit ? 1000 - n : n < 0 ? 1000 + n : n;
    let x: number = 0;
    let y: number = 0;

    this.snakeDirection = this.userDirection;

    switch (this.snakeDirection) {
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
      y: normalize(y + head.y),
    };
  }

  public addEventListener(): void {
    document.addEventListener('keydown', ({code}) => {
      switch (true) {
        case code === 'Space':
          this.loop.toggleLoop();
          break;
        case !this.loop.frame:
          return;
        case code === 'ArrowRight' && this.snakeDirection !== 'left':
          this.userDirection = 'right';
          break;
        case code === 'ArrowLeft' && this.snakeDirection !== 'right':
          this.userDirection = 'left';
          break;
        case code === 'ArrowUp' && this.snakeDirection !== 'down':
          this.userDirection = 'up';
          break;
        case code === 'ArrowDown' && this.snakeDirection !== 'up':
          this.userDirection = 'down';
          break;
      }
    });
  }
}
