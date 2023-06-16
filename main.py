def loopValue():
    global val
    basic.clear_screen()
    val = pins.analog_read_pin(AnalogPin.P0) - 614
    basic.show_number(val)

def on_button_pressed_a():
    global showValue
    showValue = not showValue
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_button_pressed_b():
    global pauseGame
    pauseGame = not pauseGame
input.on_button_pressed(Button.B, on_button_pressed_b)

def moveBall():
    global changeY
    if ball.y() == 0 or ball.y() == 4:
        changeY = changeY * -1
    if ball.x() == 0 or ball.x() == 4:
        ball.change_direction_by(180)
        changeY = randint(-1, 1)
    if ball.x() == 0 and not ball.is_touching(player):
        GameOver()
    ball.move(1)
    ball.change_yby(changeY + randint(0, 1))

def GameOver():
    global pauseGame
    basic.show_string("GameOver")
    ball.go_to(5, 2)
    pauseGame = True

def moveCursor():
    global val2
    val2 = pins.analog_read_pin(AnalogPin.P0) - 614
    if val2 < 10:
        player.go_to(0, 0)
    if val2 > 10 and val2 < 80:
        player.go_to(0, 1)
    if val2 > 80 and val2 < 160:
        player.go_to(0, 2)
    if val2 > 160 and val2 < 240:
        player.go_to(0, 3)
    if val2 > 240 and val2 < 320:
        player.go_to(0, 4)
    if val2 > 400:
        player.go_to(0, 5)
        
time = 0
val2 = 0
showValue = False
val = 0
pauseGame = False
ball: game.LedSprite = None
player: game.LedSprite = None
changeY = 0
player = game.create_sprite(0, 0)
ball = game.create_sprite(5, 2)
ball.if_on_edge_bounce()
pauseGame = True

def on_forever():
    global time
    gameOver = False
    if pauseGame:
        return
    if showValue:
        loopValue()
    elif gameOver:
        GameOver()
    else:
        moveCursor()
        time = time + 1
        if time > 25:
            moveBall()
            time = 0
basic.forever(on_forever)
