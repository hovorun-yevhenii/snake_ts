export default class Loop {
  public frame: number | void = 0;
  private lastTime: number = performance.now();
  private readonly callback: () => void;
  private interval: number = 1000;

  constructor(callback: () => void) {
    this.callback = callback;
  }

  public toggleLoop(): void {
    if (this.frame) {
      this.frame = cancelAnimationFrame(this.frame);
    } else {
      this.frame = requestAnimationFrame(this.loop.bind(this));
    }
  }

  public set seInterval(value: number) {
    this.interval = value;
  }

  private loop() {
    const passedTime = performance.now() - this.lastTime;

    if (passedTime >= this.interval) {
      this.callback();
      this.lastTime = performance.now();
    }

    if (this.frame) {
      this.frame = requestAnimationFrame(this.loop.bind(this));
    }
  }
}
