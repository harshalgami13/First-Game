var coin
var jumps
var level = 1
var score = 0 
class gamePlay extends Phaser.Scene {

    constructor(player = null, platforms = null, cursors = null, bombs = null, scoreText = null, levelText = null) {
        super({ key: 'gamePlay' })
        this.player = player
        this.platforms = platforms
        this.cursors = cursors
        this.bombs = bombs
        this.scoreText = scoreText
        this.levelText = levelText
    }

    preload() {
        this.load.audio('coin', 'music/coin.mp3')
        this.load.audio('jump', 'music/jump.mp3')

        this.load.image('sky', 'assets/sky.png');
        this.load.image('key', 'assets/aswd.png');
        this.load.image('ground', 'assets/platform.png');
        this.load.image('star', 'assets/star.png');
        this.load.image('bomb', 'assets/bomb.png');
    }

    create() {
        coin = this.sound.add('coin')
        jumps = this.sound.add('jump')

        this.add.image(400, 300, 'sky');
        this.add.image(720, 470, 'key').setScale(0.2);

        this.platforms = this.physics.add.staticGroup();

        this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();

        this.platforms.create(400, 400, 'ground');
        this.platforms.create(50, 250, 'ground');
        this.platforms.create(650, 280, 'ground');

        this.player = this.physics.add.sprite(100, 50, 'dude');

        this.player.setBounce(0.4)
        this.player.setCollideWorldBounds(true);

        this.physics.add.collider(this.player, this.platforms);

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [{ key: 'dude', frame: 4 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });


        this.cursors = this.input.keyboard.createCursorKeys();

        this.stars = this.physics.add.group({
            key: 'star',
            repeat: 14,
            setXY: { x: 12, y: 0, stepX: 55 }
        });

        this.stars.children.iterate(function (child) {

            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

        });


        this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '20px', fill: '#fff' });
        this.levelText = this.add.text(650, 16, 'Level: 1', { fontSize: '20px', fill: '#fff' });

        this.physics.add.collider(this.stars, this.platforms);
        this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);

        this.bombs = this.physics.add.group();

        this.physics.add.collider(this.bombs, this.platforms);

        this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this);

    }

    update() {

        let keyA;
        let keyD;
        let keyW;

        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);


        if (keyA.isDown) {
            this.player.setVelocityX(-300);

            this.player.anims.play('left', true);
        }
        else if (keyD.isDown) {
            this.player.setVelocityX(300);

            this.player.anims.play('right', true);
        }
        else {
            this.player.setVelocityX(0);

            this.player.anims.play('turn');
        }
        if (keyW.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-310);
            jumps.play()
        }


    }

    hitBomb(player, bomb) {
        this.physics.pause();

        this.player.setTint(0xff0000);

        this.player.anims.play('turn');

        // gameOver = true;
        setTimeout(() => {
            game.scene.stop('gamePlay')
            game.scene.start('gameEnd')
        }, 1000)
    }
    collectStar(player, star) {
        star.disableBody(true, true);
        score += 10;
        coin.play()
        this.scoreText.setText('Score: ' +score);

        if (this.stars.countActive(true) === 0) {
            this.stars.children.iterate(function (child) {

                child.enableBody(true, child.x, 0, true, true);

            });

            console.log(level)
            level += 1
            console.log(level)
            this.levelText.setText('Level: ' + level);

            var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

            var bomb = this.bombs.create(x, 16, 'bomb');
            bomb.setBounce(1);
            bomb.setCollideWorldBounds(true);
            bomb.setVelocity(50 * level);
            bomb.allowGravity = true

        }
    }

}