import Loop from '@/game/loop';
import {Coords} from '@/game/types';
import keyboardListener from '@/game/keyboardListener';

export default class Snake {
  public MAX_CALL_PER_CYCLE: number = 15999;
  public FIELD_SIZE: number = 1000;
  public DIMENSION: number = 20;
  public INITIAL_TEMPO: number = 100;

  public tempo!: number;
  public units: Coords[] = [];
  public carrot: Coords = {x: 0, y: 0};
  public snakeDirection: string = 'right';
  public userDirection: string = 'right';
  public unitSize: number = this.FIELD_SIZE / this.DIMENSION;
  public loop: Loop = new Loop(this.makeStep.bind(this));

  constructor() {
    this.unitSize = this.FIELD_SIZE / this.DIMENSION;
    this.pushInitialUnits();
    this.tempo = this.INITIAL_TEMPO;
    document.addEventListener('keydown', keyboardListener.bind(this));
  }

  public pushInitialUnits(): void {
    this.units = [];
    this.units.push(this.makeNewUnit);
    this.units.push(this.makeNewUnit);
  }

  public makeStep(): void {
    const newUnit: Coords = this.makeNewUnit;
    const selfIntersection: boolean = this.getAnyIntersection(newUnit);
    const carrotIntersection: boolean = this.getHeadIntersection;

    if (selfIntersection) {
      this.reset();
    } else {
      this.units.push(newUnit);
    }

    if (carrotIntersection) {
      this.addCarrot();
    } else {
      this.units.shift();
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

  public get getHeadIntersection(): boolean {
    const {x: headX, y: headY} = this.getHead;
    const {x: carrotX, y: carrotY} = this.carrot;

    return headX === carrotX && headY === carrotY;
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
        setTimeout(() => this.addCarrot());
        break;
      }
    }

    this.carrot.x = x;
    this.carrot.y = y;
  }

  set setTempo(value: number) {
    this.tempo = value;
    this.loop.setInterval = this.tempo;
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
