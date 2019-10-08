export interface LoopOptions {
  interval: number;
  callback: () => void;
}

export default class Loop {
  public time: number = 0;
  public frame: any = null;
  public callback: () => void;
  public delay: number;
  public isPlaying: boolean = false;

  constructor(options: LoopOptions) {
    this.callback = options.callback;
    this.delay = options.interval;
  }

  public loop(time: any) {
    if (!this.time) {
      this.time = time;
    }

    const current = new Date().getTime();
    const delta = current - this.time;

    if (delta >= this.delay) {
      this.callback();
      this.time = new Date().getTime();
    }

    this.frame = requestAnimationFrame(this.loop.bind(this));
  }

  public pause(): void {
    if (this.isPlaying) {
      cancelAnimationFrame(this.frame);
      this.isPlaying = false;
      this.time = 0;
    }
  }

  public start(): void {
    if (!this.isPlaying) {
      this.isPlaying = true;
      this.frame = requestAnimationFrame(this.loop.bind(this));
    } else {
      this.pause.call(this);
    }
  }
}
