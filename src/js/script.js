const canvas = document.querySelector("canvas")
const ctx = canvas.getContext('2d')

const audio = new Audio('../audio/foodsound.mp3')

const size = 30

const snake = [{ x:270, y:240 }
]

const randomNumber = (min, max) => {
    return Math.round(Math.random() * (max - min) + min)
}

const randomPosition = () => {
   const number = randomNumber(0, canvas.width - size)
   return Math.round(number / 30) * 30
}

const food = {
    x: randomPosition(),
    y: randomPosition(),
    color: "#FF4848"
}

let direction, loopID

const drawFood = () => {

    const { x, y, color} = food
    ctx.shadowColor = color
    ctx.fillStyle = food.color
    ctx.fillRect(x, y, size, size)
}

const drawSnake = () => {
    ctx.fillStyle = "#a3bc47"
    
    snake.forEach((position, index) => {
        if(index == snake.length - 1) {
            ctx.fillStyle = "#b8cb70"
        }

        ctx.fillRect(position.x, position.y, size, size)
    })
}

const moveSnake = () => {
    if(!direction) return

    const head = snake[snake.length - 1]

    if (direction == "right") {
        snake.push({ x: head.x + size, y: head.y })
    }

    if (direction == "left") {
        snake.push({ x: head.x - size, y: head.y })
    }

    if (direction == "up") {
        snake.push({ x: head.x, y: head.y - size })
    }

    if (direction == "down") {
        snake.push({ x: head.x, y: head.y + size })
    }

    snake.shift()
}

const drawGrid = () => {
    ctx.lineWidth = 2
    ctx.strokeStyle = "#092215"

    for (let i = 30; i < canvas.width; i += 30 ) {
        ctx.beginPath()
        ctx.lineTo(i,0)
        ctx.lineTo(i,600)
        ctx.stroke()

        ctx.beginPath()
        ctx.lineTo(0,i)
        ctx.lineTo(600,i)
        ctx.stroke()
    }

}

const checkEat = () => {
    const head = snake[snake.length - 1]

    if (head.x == food.x && head.y == food.y){
        snake.push(head)
        audio.play()

        food.x = randomPosition();
        food.y = randomPosition();
    }
}

const gameLoop = () => {
    clearInterval(loopID)
   
    ctx.clearRect(0, 0, 600, 600)
    drawGrid()
    drawFood()
    moveSnake()
    drawSnake()
    checkEat()

    loopID = setTimeout(() => {
        gameLoop()
    }, 150);
}

gameLoop()

document.addEventListener("keydown", ({key}) => {
    if (key == "ArrowRight" && direction != "left") {
        direction = "right"
    }

    if (key == "ArrowLeft" && direction != "right") {
        direction = "left"
    }
    
    if (key == "ArrowUp" && direction != "down") {
        direction = "up"
    }

    if (key == "ArrowDown" && direction != "up") {
        direction = "down"
    }


})

