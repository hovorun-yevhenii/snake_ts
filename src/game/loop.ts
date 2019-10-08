export interface LoopOptions {
  interval: number;
  callback: () => void;
}

export default class Loop {
  public frame: number | void = 0;
  private lastTime: number = performance.now();
  private readonly callback: () => void;
  private readonly interval: number;

  constructor(options: LoopOptions) {
    this.callback = options.callback;
    this.interval = options.interval;
    this.toggleLoop();
  }

  public toggleLoop(): void {
    if (this.frame) {
      this.frame = cancelAnimationFrame(this.frame);
    } else {
      this.frame = requestAnimationFrame(this.loop.bind(this));
    }
  }

  private loop() {
    const passedTime = performance.now() - this.lastTime;

    if (passedTime >= this.interval) {
      this.callback();
      this.lastTime = performance.now();
    }

    this.frame = requestAnimationFrame(this.loop.bind(this));
  }
}
