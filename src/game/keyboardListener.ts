import Index from '@/game/index';

export function keyboardListener(this: Index, {code}: {code: string}) {
    switch (true) {
      case ['KeyP', 'Space'].includes(code):
        this.loop.toggleLoop();
        break;
      case !this.loop.frame:
        return;
      case this.snakeDirection !== 'left' && ['KeyD', 'ArrowRight'].includes(code):
        this.userDirection = 'right';
        break;
      case this.snakeDirection !== 'right' && ['KeyA', 'ArrowLeft'].includes(code):
        this.userDirection = 'left';
        break;
      case this.snakeDirection !== 'down' && ['KeyW', 'ArrowUp'].includes(code):
        this.userDirection = 'up';
        break;
      case this.snakeDirection !== 'up' && ['KeyS', 'ArrowDown'].includes(code):
        this.userDirection = 'down';
        break;
    }
}
