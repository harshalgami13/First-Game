var starts
class gameStart extends Phaser.Scene {

    constructor(button =null) {
        super({ key: 'gameStart' })
        this.button = button
    }

    preload() {
        this.load.image('welcome', 'assets/welcome.png');
        this.load.image('button', 'assets/button.png');
        this.load.audio('start', 'music/start.mp3')

        this.load.spritesheet('dude',
            'assets/dude.png',
            { frameWidth: 32, frameHeight: 48 }
        );
    }

    create() {
        this.add.image(350, 250, 'welcome').setScale(0.5)
        this.button = this.add.image(360, 450, 'button').setScale(0.5).setInteractive()

        starts = this.sound.add('start')
        
        this.button.on('pointerup',()=>{
            game.scene.stop('gameStart');
            game.scene.start('gamePlay');
            starts.play()
        })

        // setTimeout(() => { game.scene.start('gamePlay'); }, 1500);

    }
}