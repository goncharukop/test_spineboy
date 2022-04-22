import * as PIXI from 'pixi.js';
import { Spine } from 'pixi-spine';
import { EventSystem } from '@pixi/events';
import { Graphics } from 'pixi.js';

delete PIXI.Renderer.__plugins.interaction;

const app = new PIXI.Application();
document.body.appendChild(app.view);

if (!('events' in app.renderer)) {
  app.renderer.addSystem(EventSystem, 'events');
}

app.loader
    .add('character', 'assets/spineboy.json')
    .load(function () {
        const mainScreen = new Graphics();
        mainScreen.lineStyle(5, 0xffffff, 0.9)
          .beginFill(0x444444)
          .drawRoundedRect(20,20,500,400,10);

        app.stage.addChild(mainScreen);
    })
    .load(function (loader, resources) {
        const person = new Spine(resources.character.spineData);
        person.x = 250;
        person.y = 400;
        person.scale.x = person.scale.y = 0.75;

        const skeleton = person.skeleton;

        app.stage.addChild(person);

        const startButton = new Graphics();
        startButton.lineStyle(2.5, 0xffffff, 0.9)
          .beginFill(0x444444)
          .drawRect(0,0,180,50);
        startButton.x = 20;
        startButton.y = 450;
//Start pause button
        app.stage.addChild(startButton);
        startButton.buttonMode = true;
        startButton.interactive = true;

        let onPauseNow = true;
        startButton.addListener('pointerdown', () => {
          if (onPauseNow) {
            person.state.timeScale = 0;
            startText.text = 'play';
          }

          else {
            person.state.timeScale = handle.position.x / 100;
            startText.text = 'pause';
          }

          onPauseNow = !onPauseNow;
        });

//style text
        const styleTitleText = new PIXI.TextStyle({
          fontFamily: 'Helvetica',
          fontSize: 36,
          fontStyle: 'italic',
          fill: ['#FFFFFF'],
        });

        const styleButtonText = new PIXI.TextStyle({
          fontFamily: 'Helvetica',
          fontSize: 26,
          fontStyle: 'italic',
          fill: ['#FFFFFF'],
        });

        const title1 = new PIXI.Text('skins', styleTitleText);
        title1.x = 630;
        title1.y = 45;
        app.stage.addChild(title1);

        const title2 = new PIXI.Text('animations', styleTitleText);
        title2.x = 580;
        title2.y = 295;
        app.stage.addChild(title2);

//Set skins
        person.skeleton.data.skins.forEach((el, i) => {
          const buttonText = new PIXI.Text(el.name, styleButtonText);
          const skinButton = new Graphics();

          skinButton.lineStyle(2.5, 0xffffff, 0.9)
            .beginFill(0x444444)
            .drawRect(0,0,180,50);
          skinButton.x = 580;
          skinButton.y = 100 + 52.5 * i;

          app.stage.addChild(skinButton);

          buttonText.x = skinButton.x + 20;
          buttonText.y = skinButton.y + (skinButton.height - buttonText.height) / 2;
          
          app.stage.addChild(buttonText);

          skinButton.buttonMode = true;
          skinButton.interactive = true;
          skinButton.addListener('pointerdown', () => {
            setSkinByName(el.name);
          });
        })

//Set animations
        person.skeleton.data.animations.forEach((el, i) => {
          const buttonText = new PIXI.Text(el.name, styleButtonText);
          const animationButton = new Graphics();

          animationButton.lineStyle(2.5, 0xffffff, 0.9)
            .beginFill(0x444444)
            .drawRect(0,0,180,50);
          animationButton.x = 580;
          animationButton.y = 350 + 52.5 * i;

          app.stage.addChild(animationButton);

          buttonText.x = animationButton.x + 20;
          buttonText.y = animationButton.y + (animationButton.height - buttonText.height) / 2;
          
          app.stage.addChild(buttonText);

          animationButton.buttonMode = true;
          animationButton.interactive = true;
          animationButton.addListener('pointerdown', () => {
            person.state.setAnimation(0, el.name, true);
            onPauseNow
              ? person.state.timeScale = 1
              : person.state.timeScale = 0;
          });
        })

        const startText = new PIXI.Text('pause / play', styleButtonText);
        startText.x = startButton.x + 20;
        startText.y = startButton.y + (startButton.height - startText.height) / 2;
        app.stage.addChild(startText);

        function setSkinByName(skinName) {
          skeleton.setSkin(null);
          skeleton.setSkinByName(skinName);
        }

//slider
        const slider = app.stage.addChild(
          new PIXI.Graphics()
            .beginFill(0xffffff)
            .drawRect(0, 0, 200, 3)
            .endFill(),
        );

        slider.position.set(275, 475);

        slider
          .beginFill(0xffffff, 0.001)
          .drawRect( -10, -50, 220, 180)
          .endFill();

        slider.interactive = true;

        const handle = slider.addChild(
          new PIXI.Graphics()
            .beginFill(0xffffff)
            .drawCircle(0, 0, 8)
            .endFill(),
        );

        handle.interactive = true;
        handle.position.set(0, 0);
        handle.addEventListener('pointerdown', onDragStart);
        handle.addEventListener('pointerup', onDragEnd);
        handle.addEventListener('pointerupoutside', onDragEnd);


        function onDragStart(e) {
          app.stage.interactive = true;
          app.stage.addEventListener('pointermove', onDrag);
        }
      // Stop dragging feedback once the handle is released.
        function onDragEnd(e) {
          app.stage.interactive = false;
          app.stage.removeEventListener('pointermove', onDrag);
        }

        // Update the handle's position & change speed when the handle is moved.
        function onDrag(e) {
          // Set handle x-position to match pointer
          handle.position.x = Math.max(
              0,
              Math.min(
                slider.toLocal(e.global).x,
                200
              )
          );
          onHandleMoved();
        }

        function onHandleMoved() {
          onPauseNow
            ? person.state.timeScale = handle.position.x / 100
            : person.state.timeScale = 0
        }

        app.start( );
    });

