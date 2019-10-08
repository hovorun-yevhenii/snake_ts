import Loop from './Loop';

export interface SnakeUnit {
  readonly id?: number;
  x: number;
  y: number;
}

export interface SnakeOptions {
  dimension: number;
}

export interface CoordsIncrement {
  xIncrement: number;
  yIncrement: number;
}

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
    this.pushInitUnits();
    this.addEventListener();
  }

  public pushInitUnits(): void {
    Array(5).fill('').forEach(() => this.makeStep(true));
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

  public makeStep(initial?: boolean): void {
    const head: SnakeUnit = this.getHead;
    const {xIncrement, yIncrement} = this.getCoordsIncrements;
    const x: number = Math.round(head.x + xIncrement);
    const y: number = Math.round(head.y + yIncrement);
    this.units.push({x, y});

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

  get getCoordsIncrements(): CoordsIncrement {
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
      xIncrement: x,
      yIncrement: y,
    };
  }
}
