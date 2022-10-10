class gameEnd extends Phaser.Scene {
    constructor(bomb = null, buttons = null) {
        super({ key: 'gameEnd' })
        this.bomb = bomb
        this.buttons = buttons
    }

    preload() {
        this.load.audio('gameOverMusic', 'music/gameover.mp3')
        this.load.image('end', 'assets/gameover.png');
        this.load.image('restart', 'assets/restart.png');
    }
    create() {
        this.bomb = this.sound.add('gameOverMusic')
        this.bomb.play()
        this.add.image(350, 280, 'end').setScale(0.5)
        this.buttons = this.add.image(350, 470, 'restart').setScale(0.2).setInteractive()

        this.buttons.on('pointerup', () => {
            level = 1
            score = 0
            game.scene.stop('gameEnd');
            game.scene.start('gameStart');
        })
    }


}