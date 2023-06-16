function loopValue() {
    
    basic.clearScreen()
    val = pins.analogReadPin(AnalogPin.P0) - 614
    basic.showNumber(val)
}

input.onButtonPressed(Button.A, function on_button_pressed_a() {
    
    showValue = !showValue
})
input.onButtonPressed(Button.B, function on_button_pressed_b() {
    
    pauseGame = !pauseGame
})
function moveBall() {
    
    if (ball.y() == 0 || ball.y() == 4) {
        changeY = changeY * -1
    }
    
    if (ball.x() == 0 || ball.x() == 4) {
        ball.changeDirectionBy(180)
        changeY = randint(-1, 1)
    }
    
    if (ball.x() == 0 && !ball.isTouching(player)) {
        GameOver()
    }
    
    ball.move(1)
    ball.changeYBy(changeY + randint(0, 1))
}

function GameOver() {
    
    basic.showString("GameOver")
    ball.goTo(5, 2)
    pauseGame = true
}

function moveCursor() {
    
    val2 = pins.analogReadPin(AnalogPin.P0) - 614
    if (val2 < 10) {
        player.goTo(0, 0)
    }
    
    if (val2 > 10 && val2 < 80) {
        player.goTo(0, 1)
    }
    
    if (val2 > 80 && val2 < 160) {
        player.goTo(0, 2)
    }
    
    if (val2 > 160 && val2 < 240) {
        player.goTo(0, 3)
    }
    
    if (val2 > 240 && val2 < 320) {
        player.goTo(0, 4)
    }
    
    if (val2 > 400) {
        player.goTo(0, 5)
    }
    
}

let time = 0
let val2 = 0
let showValue = false
let val = 0
let pauseGame = false
let ball : game.LedSprite = null
let player : game.LedSprite = null
let changeY = 0
player = game.createSprite(0, 0)
ball = game.createSprite(5, 2)
ball.ifOnEdgeBounce()
pauseGame = true
basic.forever(function on_forever() {
    
    let gameOver = false
    if (pauseGame) {
        return
    }
    
    if (showValue) {
        loopValue()
    } else if (gameOver) {
        GameOver()
    } else {
        moveCursor()
        time = time + 1
        if (time > 25) {
            moveBall()
            time = 0
        }
        
    }
    
})
