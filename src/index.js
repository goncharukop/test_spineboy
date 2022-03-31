import * as PIXI from 'pixi.js';
import { Spine } from 'pixi-spine';
import { Graphics } from 'pixi.js';

const app = new PIXI.Application();
document.body.appendChild(app.view);

app.loader
    .add('character', 'assets/spineboy.json')
    .load(function (loader, resources) {
        const mainScreen = new Graphics();
        mainScreen.lineStyle(5, 0xffffff, 0.9);
        mainScreen.beginFill(0x444444);
        mainScreen.drawRoundedRect(20,20,500,400,10);

        app.stage.addChild(mainScreen);

        const person = new Spine(resources.character.spineData);
        person.x = 250;
        person.y = 400;
        person.scale.x = person.scale.y = 0.75;

        const skeleton = person.skeleton;

        app.stage.addChild(person);

        const skinButton1 = new Graphics();
        skinButton1.lineStyle(2.5, 0xffffff, 0.9);
        skinButton1.beginFill(0x444444);
        skinButton1.drawRect(0,0,180,50);
        skinButton1.x = 580;
        skinButton1.y = 100;

        app.stage.addChild(skinButton1);
        skinButton1.buttonMode = true;
        skinButton1.interactive = true;

        skinButton1.addListener('pointerdown', () => {
            setSkinByName('testSkin1');
        });

        const skinButton2 = new Graphics();
        skinButton2.lineStyle(2.5, 0xffffff, 0.9);
        skinButton2.beginFill(0x444444);
        skinButton2.drawRect(0,0,180,50);
        skinButton2.x = 580;
        skinButton2.y = 152.5;

        app.stage.addChild(skinButton2);
        skinButton2.buttonMode = true;
        skinButton2.interactive = true;
        skinButton2.addListener('pointerdown', () => {
            setSkinByName('testSkin2');
        });

        const skinButton3 = new Graphics();
        skinButton3.lineStyle(2.5, 0xffffff, 0.9);
        skinButton3.beginFill(0x444444);
        skinButton3.drawRect(0,0,180,50);
        skinButton3.x = 580;
        skinButton3.y = 205;
 
        app.stage.addChild(skinButton3);
        skinButton3.buttonMode = true;
        skinButton3.interactive = true;
        skinButton3.addListener('pointerdown', () => {
            setSkinByName('default');
        });

        const animationButton1 = new Graphics();
        animationButton1.lineStyle(2.5, 0xffffff, 0.9);
        animationButton1.beginFill(0x444444);
        animationButton1.drawRect(0,0,180,50);
        animationButton1.x = 580;
        animationButton1.y = 350;

        app.stage.addChild(animationButton1);
        animationButton1.buttonMode = true;
        animationButton1.interactive = true;
        animationButton1.addListener('pointerdown', () => {
            person.state.setAnimation(0, 'walk', true);
        });

        const animationButton2 = new Graphics();
        animationButton2.lineStyle(2.5, 0xffffff, 0.9);
        animationButton2.beginFill(0x444444);
        animationButton2.drawRect(0,0,180,50);
        animationButton2.x = 580;
        animationButton2.y = 402.5;

        app.stage.addChild(animationButton2);
        animationButton2.buttonMode = true;
        animationButton2.interactive = true;
        animationButton2.addListener('pointerdown', () => {
            person.state.setAnimation(0, 'jump', true);
        });

        const animationButton3 = new Graphics();
        animationButton3.lineStyle(2.5, 0xffffff, 0.9);
        animationButton3.beginFill(0x444444);
        animationButton3.drawRect(0,0,180,50);
        animationButton3.x = 580;
        animationButton3.y = 455;

        app.stage.addChild(animationButton3);
        animationButton3.buttonMode = true;
        animationButton3.interactive = true;
        animationButton3.addListener('pointerdown', () => {
            person.state.setAnimation(0, 'jump', false);
        });

        const startButton = new Graphics();
        startButton.lineStyle(2.5, 0xffffff, 0.9);
        startButton.beginFill(0x444444);
        startButton.drawRect(0,0,180,50);
        startButton.x = 20;
        startButton.y = 450;
//Start pause button
        app.stage.addChild(startButton);
        startButton.buttonMode = true;
        startButton.interactive = true;

        let onPauseNow = true;
        startButton.addListener('pointerdown', () => {
            onPauseNow
                ? person.state.timeScale = 0
                : person.state.timeScale = 1;

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

        const skinText1 = new PIXI.Text('skin 1', styleButtonText);
        skinText1.x = skinButton1.x + 20;
        skinText1.y = skinButton1.y + (skinButton1.height - skinText1.height) / 2;
        app.stage.addChild(skinText1);

        const skinText2 = new PIXI.Text('skin 2', styleButtonText);
        skinText2.x = skinButton2.x + 20;
        skinText2.y = skinButton2.y + (skinButton2.height - skinText2.height) / 2;
        app.stage.addChild(skinText2);

        const skinText3 = new PIXI.Text('skin 3', styleButtonText);
        skinText3.x = skinButton3.x + 20;
        skinText3.y = skinButton3.y + (skinButton3.height - skinText3.height) / 2;
        app.stage.addChild(skinText3);

        const animationText1 = new PIXI.Text('walk', styleButtonText);
        animationText1.x = animationButton1.x + 20;
        animationText1.y = animationButton1.y + (animationButton1.height - animationText1.height) / 2;
        app.stage.addChild(animationText1);

        const animationText2 = new PIXI.Text('jumping', styleButtonText);
        animationText2.x = animationButton2.x + 20;
        animationText2.y = animationButton2.y + (animationButton2.height - animationText2.height) / 2;
        app.stage.addChild(animationText2);

        const animationText3 = new PIXI.Text('1 jump', styleButtonText);
        animationText3.x = animationButton3.x + 20;
        animationText3.y = animationButton3.y + (animationButton3.height - animationText3.height) / 2;
        app.stage.addChild(animationText3);

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
                .drawRect(0, 0, 200, 3,)
                .endFill(),
        );

        slider.position.set(275, 475);

        slider
            .beginFill(0xffffff, 0.1)
            .drawRect( -10, -10, 220, 20)
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

        // Update the handle's position & bunny's scale when the handle is moved.
        function onDrag(e) {
          // Set handle x-position to match pointer
          handle.position.x = Math.max(
              0,
              Math.min(
                  slider.toLocal(e.global).x,
                  0
              )
          );
          onHandleMoved();
        }

        function onHandleMoved() {
          person.state.timeScale = handle.position.x / 100;
        }


        app.start( );
    });

