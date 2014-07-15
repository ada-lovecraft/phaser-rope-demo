var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, '',{preload: preload, create: create, update:update, render: render});

var rope, debugKey, shouldDebug = false;

function preload() {
    game.load.image('snake', 'assets/snake.png');
}

function create() {
    var count = 0;
    var length = 918/20;
    var points = [];
    for (var i = 0; i < 20; i++) {
        points.push(new Phaser.Point(i * length, 0));
    }

    rope = game.add.rope(0,this.game.world.centerY,'snake', null, points);

    rope.updateAnimation = function() {
        count += 0.1;
        for (var i = 0; i < this.points.length; i++) {
            this.points[i].y = Math.sin(i * 0.5  + count) * 20;
        }
    };

    debugKey = game.input.keyboard.addKey(Phaser.Keyboard.D);
    debugKey.onDown.add(toggleDebug);
}

function update() {

}

function render() {
    if(shouldDebug) {
        game.debug.ropeSegments(rope);
    }
    game.debug.text('(D) to show debug', 20,20);
}

function toggleDebug() {
    shouldDebug = !shouldDebug;
}
