sprites.onOverlap(SpriteKind.Food, SpriteKind.Player, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    sprites.destroy(생명, effects.disintegrate, 0)
    우주선.startEffect(effects.hearts, 200)
    info.changeLifeBy(1)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . 3 3 3 3 3 3 3 . . . . . 
        . . . 3 3 1 1 1 1 1 3 3 . . . . 
        . . . 2 1 1 1 1 1 1 1 2 . . . . 
        . . . 2 2 1 1 1 1 1 2 2 . . . . 
        . . 3 3 2 3 3 1 3 3 2 3 3 . . . 
        . 3 3 . . 2 3 1 3 2 . . 3 3 . . 
        . 1 . . . 2 3 1 3 2 . . . 1 . . 
        . 1 3 . . . 3 1 3 . . . 3 1 . . 
        . . 1 1 3 3 3 3 3 3 3 1 1 . . . 
        . . . . 1 1 1 1 1 1 1 . . . . . 
        . . . . . . 2 1 2 . . . . . . . 
        . . . . . . 2 1 2 . . . . . . . 
        . . . . . . 2 1 2 . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, 우주선, 0, -140)
    projectile.startEffect(effects.coolRadial, 100)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    sprites.destroy(otherSprite, effects.disintegrate, 0)
    info.changeScoreBy(1)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Food, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    sprites.destroy(otherSprite, effects.disintegrate, 0)
    info.changeScoreBy(1)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    scene.cameraShake(4, 500)
    sprites.destroy(otherSprite, effects.disintegrate, 0)
    sprite.startEffect(effects.fire, 200)
    info.changeLifeBy(-1)
})
let projectile2: Sprite = null
let projectile: Sprite = null
let 우주선: Sprite = null
let 생명: Sprite = null
let 폭발 = [
img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . 4 4 . . . . . . . 
    . . . . . . 4 5 5 4 . . . . . . 
    . . . . . . 2 5 5 2 . . . . . . 
    . . . . . . . 2 2 . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `,
img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . 4 . . . . . 
    . . . . 2 . . . . 4 4 . . . . . 
    . . . . 2 4 . . 4 5 4 . . . . . 
    . . . . . 2 4 d 5 5 4 . . . . . 
    . . . . . 2 5 5 5 5 4 . . . . . 
    . . . . . . 2 5 5 5 5 4 . . . . 
    . . . . . . 2 5 4 2 4 4 . . . . 
    . . . . . . 4 4 . . 2 4 4 . . . 
    . . . . . 4 4 . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `,
img`
    . 3 . . . . . . . . . . . 4 . . 
    . 3 3 . . . . . . . . . 4 4 . . 
    . 3 d 3 . . 4 4 . . 4 4 d 4 . . 
    . . 3 5 3 4 5 5 4 4 d d 4 4 . . 
    . . 3 d 5 d 1 1 d 5 5 d 4 4 . . 
    . . 4 5 5 1 1 1 1 5 1 1 5 4 . . 
    . 4 5 5 5 5 1 1 5 1 1 1 d 4 4 . 
    . 4 d 5 1 1 5 5 5 1 1 1 5 5 4 . 
    . 4 4 5 1 1 5 5 5 5 5 d 5 5 4 . 
    . . 4 3 d 5 5 5 d 5 5 d d d 4 . 
    . 4 5 5 d 5 5 5 d d d 5 5 4 . . 
    . 4 5 5 d 3 5 d d 3 d 5 5 4 . . 
    . 4 4 d d 4 d d d 4 3 d d 4 . . 
    . . 4 5 4 4 4 4 4 4 4 4 4 . . . 
    . 4 5 4 . . 4 4 4 . . . 4 4 . . 
    . 4 4 . . . . . . . . . . 4 4 . 
    `,
img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . 4 4 4 4 4 . . . . . . 
    . . . 4 4 4 5 5 5 d 4 4 4 4 . . 
    . . 4 d 5 d 5 5 5 d d d 4 4 . . 
    . . 4 5 5 1 1 1 d d 5 5 5 4 . . 
    . 4 5 5 5 1 1 1 5 1 1 5 5 4 4 . 
    . 4 d d 1 1 5 5 5 1 1 5 5 d 4 . 
    . 4 5 5 1 1 5 1 1 5 5 d d d 4 . 
    . 2 5 5 5 d 1 1 1 5 1 1 5 5 2 . 
    . 2 d 5 5 d 1 1 1 5 1 1 5 5 2 . 
    . . 2 4 d d 5 5 5 5 d d 5 4 . . 
    . . . 2 2 4 d 5 5 d d 4 4 . . . 
    . . 2 2 2 2 2 4 4 4 2 2 2 . . . 
    . . . 2 2 4 4 4 4 4 4 2 2 . . . 
    . . . . . 2 2 2 2 2 2 . . . . . 
    `,
img`
    . . . . 2 2 2 2 2 2 2 2 . . . . 
    . . . 2 4 4 4 5 5 4 4 4 2 2 2 . 
    . 2 2 5 5 d 4 5 5 5 4 4 4 4 2 . 
    . 2 4 5 5 5 5 d 5 5 5 4 5 4 2 2 
    . 2 4 d d 5 5 5 5 5 5 d 4 4 4 2 
    2 4 5 5 d 5 5 5 d d d 5 5 5 4 4 
    2 4 5 5 4 4 4 d 5 5 d 5 5 5 4 4 
    4 4 4 4 . . 2 4 5 5 . . 4 4 4 4 
    . . b b b b 2 4 4 2 b b b b . . 
    . b d d d d 2 4 4 2 d d d d b . 
    b d d b b b 2 4 4 2 b b b d d b 
    b d d b b b b b b b b b b d d b 
    b b d 1 1 3 1 1 d 1 d 1 1 d b b 
    . . b b d d 1 1 3 d d 1 b b . . 
    . . 2 2 4 4 4 4 4 4 4 4 2 2 . . 
    . . . 2 2 4 4 4 4 4 2 2 2 . . . 
    `
]
생명 = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . f f f . f f f . . . . 
    . . . . f 3 3 3 f 3 3 3 f . . . 
    . . . . f 3 3 3 3 3 1 3 f . . . 
    . . . . f 3 3 3 3 3 3 3 f . . . 
    . . . . . f 3 b b b 3 f . . . . 
    . . . . . f f b b b f f . . . . 
    . . . . . . f f b f f . . . . . 
    . . . . . . . f f f . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Player)
우주선 = sprites.create(img`
    . . . . . . . f f . . . . . . . 
    . . . . . . f 1 1 f . . . . . . 
    . . . . . f 1 1 1 1 f . . . . . 
    . . . . f 1 1 1 1 1 1 f . . . . 
    . . . f 1 f f f f f f 1 f . . . 
    . . . f 1 1 1 1 1 1 1 1 f . . . 
    . . f f f 1 1 1 1 1 1 f f f . . 
    . f f f f f f f f f f f f f f . 
    . 1 f 1 f 1 1 1 1 1 1 f 1 f 1 . 
    . f f 1 f f f f f f f f 1 f f . 
    . 1 f 1 f 1 1 1 1 1 1 f 1 f 1 . 
    . f f f f f f f f f f f f f f . 
    . 1 f f f 1 1 1 1 1 1 f f f 1 . 
    . f 1 f 1 f f f f f f 1 f 1 f . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Player)
우주선.setStayInScreen(true)
우주선.bottom = 120
controller.moveSprite(우주선, 100, 100)
info.setLife(4)
effects.starField.startScreenEffect()
game.onUpdateInterval(500, function () {
    projectile = sprites.createProjectileFromSide(폭발[randint(0, 폭발.length - 1)], 0, 75)
    projectile.setKind(SpriteKind.Enemy)
    projectile.x = randint(10, 150)
})
game.onUpdateInterval(500, function () {
    projectile2 = sprites.createProjectileFromSide(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . f f f . f f f . . . . 
        . . . . f 3 3 3 f 3 3 3 f . . . 
        . . . . f 3 3 3 3 3 1 3 f . . . 
        . . . . f 3 3 3 3 3 3 3 f . . . 
        . . . . . f 3 b b b 3 f . . . . 
        . . . . . f f b b b f f . . . . 
        . . . . . . f f b f f . . . . . 
        . . . . . . . f f f . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, 0, 75)
    projectile2.setKind(SpriteKind.Food)
    projectile2.x = randint(10, 150)
})
game.onUpdateInterval(500, function () {
    projectile = sprites.createProjectileFromSide(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . f f f . f f f . . . . 
        . . . . f 3 3 3 f 3 3 3 f . . . 
        . . . . f 3 3 3 3 3 1 3 f . . . 
        . . . . f 3 3 3 3 3 3 3 f . . . 
        . . . . . f 3 b b b 3 f . . . . 
        . . . . . f f b b b f f . . . . 
        . . . . . . f f b f f . . . . . 
        . . . . . . . f f f . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, 0, 75)
    projectile.setKind(SpriteKind.Enemy)
    projectile.x = randint(10, 150)
})
