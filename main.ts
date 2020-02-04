function dofood () {
    foodyy = sprites.create(img`
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . b 5 5 b . . . 
. . . . . . b b b b b b . . . . 
. . . . . b b 5 5 5 5 5 b . . . 
. b b b b b 5 5 5 5 5 5 5 b . . 
. b d 5 b 5 5 5 5 5 5 5 5 b . . 
. . b 5 5 b 5 d 1 f 5 d 4 f . . 
. . b d 5 5 b 1 f f 5 4 4 c . . 
b b d b 5 5 5 d f b 4 4 4 4 b . 
b d d c d 5 5 b 5 4 4 4 4 4 4 b 
c d d d c c b 5 5 5 5 5 5 5 b . 
c b d d d d d 5 5 5 5 5 5 5 b . 
. c d d d d d d 5 5 5 5 5 d b . 
. . c b d d d d d 5 5 5 b b . . 
. . . c c c c c c c c b b . . . 
`, SpriteKind.Food)
    foodyy.setPosition(Math.randomRange(20, 140), Math.randomRange(10, 110))
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    music.wawawawaa.play()
    pause(1000)
})
controller.anyButton.onEvent(ControllerButtonEvent.Pressed, function () {
    if (controller.up.isPressed()) {
        snake.vy = snakexv * -1
        snake.vx = 0
    } else if (controller.down.isPressed()) {
        snake.vy = snakexv * 1
        snake.vx = 0
    } else if (controller.left.isPressed()) {
        snake.vx = snakexv * -1
        snake.vy = 0
    } else if (controller.right.isPressed()) {
        snake.vx = snakexv * 1
        snake.vy = 0
    }
})
let ball1: Sprite = null
let foodyy: Sprite = null
let snakexv = 0
let snake: Sprite = null
scene.setBackgroundColor(15)
effects.starField.startScreenEffect()
info.setLife(3)
snake = sprites.create(img`
. 3 b b b b 3 . 
3 9 9 9 9 9 9 3 
b 9 f 9 9 f 9 b 
b 9 9 9 9 9 9 b 
b 9 b b b b 9 b 
b b 2 2 2 2 d b 
. 3 d 2 2 2 2 . 
. . b b b b 2 2 
`, SpriteKind.Player)
snake.setPosition(Math.randomRange(20, 80), Math.randomRange(10, 60))
snake.setFlag(SpriteFlag.StayInScreen, true)
snake.z = 3
snakexv = 50
snake.vx = snakexv
let sprite_list = sprites.allOfKind(SpriteKind.Player)
let ball = sprites.create(img`
. . b b b 9 . . 
. b 1 1 1 1 b . 
b 1 1 1 1 1 1 9 
b 1 b 1 1 1 1 b 
b 1 1 b 1 1 1 b 
b d 1 1 1 1 1 b 
. b d d 1 1 b . 
. . b b b b . . 
`, SpriteKind.Projectile)
ball.setFlag(SpriteFlag.Ghost, true)
sprite_list.push(ball)
ball.follow(snake, snakexv)
let muns = 4
dofood()
game.onUpdateInterval(2000, function () {
    snakexv += 1
})
game.onUpdate(function () {
    if (snake.overlapsWith(foodyy)) {
        music.magicWand.play()
        foodyy.destroy(effects.smiles, 500)
        ball1 = sprites.create(img`
. . b b b 9 . . 
. b 1 1 1 1 b . 
b 1 1 1 1 1 1 9 
b 1 b 1 1 1 1 b 
b 1 1 b 1 1 1 b 
b d 1 1 1 1 1 b 
. b d d 1 1 b . 
. . b b b b . . 
`, SpriteKind.Enemy)
        if (muns > 0) {
            ball1.setKind(SpriteKind.Projectile)
        }
        muns += -1
        ball1.setPosition(sprite_list[sprite_list.length - 1].x, sprite_list[sprite_list.length - 1].y)
        ball1.z = 0
        sprite_list.push(ball1)
        for (let index = 0; index <= sprite_list.length - 2; index++) {
            sprite_list[index + 1].follow(sprite_list[index], snakexv)
        }
        dofood()
        pause(200)
    }
})
