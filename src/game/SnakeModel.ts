import Loop from '@/game/loop';
import {Coords} from '@/game/types';
import {keyboardListener} from '@/game/keyboardListener';

export default class SnakeModel {
  public MAX_CALL_PER_CYCLE: number = 15999;
  public FIELD_SIZE: number = 1000;
  public DIMENSION: number = 20;
  public tempo: number = 100;
  public units: Coords[] = [];
  public carrot: Coords = {x: 0, y: 0};
  public snakeDirection: string = 'right';
  public userDirection: string = 'right';
  public unitSize: number = this.FIELD_SIZE / this.DIMENSION;
  public loop: Loop = new Loop(this.main.bind(this));

  constructor() {
    this.unitSize = this.FIELD_SIZE / this.DIMENSION;
    this.pushInitialUnits();
    this.loop.seInterval = this.tempo;
    document.addEventListener('keydown', keyboardListener.bind(this));
  }

  public main(): void {
    this.makeStep();
  }

  public pushInitialUnits(): void {
    this.units = [];
    Array(10).fill('').forEach(() => this.makeStep(true));
  }

  public makeStep(initial?: boolean): void {
    const newHead: Coords = this.makeNewUnit;
    const selfIntersection: boolean = this.getAnyIntersection(newHead);
    const carrotIntersection: boolean = this.getHeadIntersection(this.carrot);

    if (selfIntersection) {
      this.reset();
    } else {
      this.units.push(newHead);
    }

    if (!initial && !carrotIntersection) {
      this.units.shift();
    }

    if (carrotIntersection) {
      this.addCarrot();
    }
  }

  public reset(): void {
    this.snakeDirection = 'right';
    this.userDirection = 'right';
    this.pushInitialUnits();
    this.loop.toggleLoop();
  }

  public getAnyIntersection(coords: Coords): boolean {
    return this.units.some((unit: Coords) => coords.x === unit.x && coords.y === unit.y);
  }

  public getHeadIntersection(coords: Coords): boolean {
    const {x, y} = this.getHead;

    return x === coords.x && y === coords.y;
  }

  public addCarrot(): void {
    let x!: number;
    let y!: number;
    let intersection: boolean = true;
    let tries: number = 0;

    while (intersection) {
      x = this.unitSize * this.getRandomOffset;
      y = this.unitSize * this.getRandomOffset;
      intersection = this.getAnyIntersection({x, y});

      tries++;

      if (tries > this.MAX_CALL_PER_CYCLE) {
        x = -this.unitSize * 2;
        y = -this.unitSize * 2;
        setTimeout(() => this.addCarrot(), 0);
        break;
      }
    }

    this.carrot.x = x;
    this.carrot.y = y;
  }

  get getRandomOffset(): number {
    return Math.round(Math.random() * (this.DIMENSION - 1));
  }

  get getHead(): Coords {
    return this.units[this.units.length - 1] || {x: this.unitSize, y: this.unitSize};
  }

  get makeNewUnit(): Coords {
    const head: Coords = this.getHead;
    const limit = this.FIELD_SIZE - this.unitSize;
    const normalize = (n: number) => n > limit ? this.FIELD_SIZE - n : n < 0 ? this.FIELD_SIZE + n : n;
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
}
