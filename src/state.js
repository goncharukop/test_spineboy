import { bus } from './bus';
import { UI } from './ui';

export const state = {
    init() {
        bus.on('togglePause', () => {
            this.isPaused = !this.isPaused;
            UI.update();
        })
    },

    isPaused: false
};