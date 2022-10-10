var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    audio: {
        disableWebAudio: true
    },
    scene: [gameStart, gamePlay, gameEnd]
    // scene: [gameEnd , gameStart]
};
game = new Phaser.Game(config);
