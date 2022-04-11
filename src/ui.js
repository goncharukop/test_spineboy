import * as PIXI from 'pixi.js';
import { Graphics } from 'pixi.js';
import { state } from './state';

export const UI = {
    elements: {},

    createStartButton(stage) {
        const startButton = new Graphics();
        startButton.lineStyle(2.5, 0xffffff, 0.9)
            .beginFill(0x444444)
            .drawRect(0, 0, 180, 50);

        startButton.x = 20;
        startButton.y = 450;
        //Start pause button
        stage.addChild(startButton);
        startButton.buttonMode = true;
        startButton.interactive = true;
        this.elements.startButton = startButton;

        return startButton;
    },

    update() {
        const color = state.isPaused ? 0xff0000 : 0xffffff
        this.elements.startButton.tint = color;
    }
};