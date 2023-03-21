const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1500
canvas.height = 680

c.fillRect(0,0, canvas.width, canvas.height);
const gravity = 0.8;
const background = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    imageSrc: './img/background.png'
})

class Sprite  {
    constructor({
        position,
        imageSrc,
        scale = 1,
        framesMax = 1,
        offset = { x: 0, y: 0 }
      }) {
        this.position = position
        this.width = 50
        this.height = 150
        this.image = new Image()
        this.image.src = imageSrc
        this.scale = scale
        this.framesMax = framesMax
        this.framesCurrent = 0
        this.framesElapsed = 0
        this.framesHold = 5
        this.offset = offset
      }
    
      draw() {
        c.drawImage(
          this.image,
          this.framesCurrent * (this.image.width / this.framesMax),
          0,
          this.image.width / this.framesMax,
          this.image.height,
          this.position.x - this.offset.x,
          this.position.y - this.offset.y,
          (this.image.width / this.framesMax) * this.scale,
          this.image.height * this.scale
        )
      }
    
      animateFrames() {
        this.framesElapsed++
    
        if (this.framesElapsed % this.framesHold === 0) {
          if (this.framesCurrent < this.framesMax - 1) {
            this.framesCurrent++
          } else {
            this.framesCurrent = 0
          }
        }
      }
    update() {
        this.draw()
            this.animateFrames()
        }
        
    }
    
class Fighter extends Sprite{
    constructor({ position, speed, color = 'blue', scale = 1, framesMax = 1,
    offset = { x: 0, y: 0 }, sprites,
    attackBox = { offset: {}, width: undefined, height: undefined }}) {
        super({
            position,
            imageSrc,
            scale,
            framesMax,
            offset
          })
        
        this.speed = speed
        this.width =50
        this.height = 150
        this.lastKey
        this.attackBox = {
            position: {
              x: this.position.x,
              y: this.position.y
            },
            offset: attackBox.offset,
            width: attackBox.width,
            height: attackBox.height
          }
          this.color = color
          this.isAttacking
          this.health = 100
          this.framesCurrent = 0
          this.framesElapsed = 0
          this.framesHold = 5
          this.sprites = sprites
          this.dead = false
      
    for (const sprite in this.sprites) {
        sprites[sprite].image = new Image()
        sprites[sprite].image.src = sprites[sprite].imageSrc
      }
    }
    draw() {
        c.fillStyle = this.color
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
        
        if(this.isAttacking) {
        c.fillStyle = 'yellow'
        c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width,this.attachBox.height)
        }
    }
    update() {
        this.draw()
        this.attackBox.position.x = this.position.x - this.attackBox.offset.x
        this.attackBox.position.y = this.position.y

        this.position.x += this.speed.x
        this.position.y += this.speed.y

        if (this.position.y + this.height +this.speed.y >= canvas.height){
            this.speed.y = 0
        } else this.speed.y += gravity
    }
    attack(){
        this.isAttacking = true
        setTimeout(() => {
this.isAttacking = false
        }, 90)
    }
}
const player = new Fighter ({
    position: {
        x: 0,
        y: 0
    },
    speed: {
        x:0,
        y: 0
    },
    offset: {
        x: 0,
        y: 0
    }
}) 
const enemy = new Fighter ({
    position: {
        x: 400,
        y: 100
    },
    speed: {
        x: 0,
        y: 0
    },
    color: 'green',
    offset: {
        x: -50,
        y: 0
    }
})
console.log(player)
const keys = {
    s:{
        pressed: false
    },
    f: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    }, 
    ArrowLeft: {
        pressed: false
    },
}
function rectangularCollision({rectangle1, rectangle2}) {
    return (
        rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x && 
        rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width && 
        rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y &&
        rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height )     
}
function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'imageSrc'
c.fillRect(0,0,canvas.width, canvas.height)
background.update()
player.update()
enemy.update()

player.speed.x = 0
enemy.speed.x = 0

if (keys.s.pressed && player.lastKey === 's') {
    player.speed.x = -6
} else if (keys.f.pressed && player.lastKey === 'f') {
    player.speed.x = 6
}
if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
    enemy.speed.x = -6
} else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
    enemy.speed.x = 6
}
if (
    rectangularCollision({
        rectangle1: player,
        rectangle2: enemy
    }) && 
    player.isAttacking) {
        player.isAttacking =false
        enemy.health -= 10
    document.querySelector('#enemyHealth').style.width= enemy.health + '%'
}
if (
    rectangularCollision({
        rectangle1: enemy,
        rectangle2: player
    }) && 
 enemy.isAttacking) {
        enemy.isAttacking =false
        document.querySelector('#playerHealth').style.width= player.health + '%'
        if (enemy.isAttacking && enemy.framesCurrent === 4) {
            enemy.isAttacking = false
          }
          let timer = 60
let timerId
function decreaseTimer() {
  if (timer > 0) {
    timerId = setTimeout(decreaseTimer, 1000)
    timer--
    document.querySelector('#timer').innerHTML = timer
  }

  if (timer === 0) {
    determineWinner({ player, enemy, timerId })
  }
        if (enemy.health <= 0 || player.health <= 0) {
            determineWinner({ player, enemy, timerId })
          }
}
}
animate()
window.addEventListener('keydown', (event) => {
    console.log(event.key)
    switch (event.key) {
        case 'f':
            keys.f.pressed = true
            player.lastKey= 'f'
            break
            case 's':
                keys.s.pressed = true
            player.lastKey = 's'
                break
                case 'e':
                player.speed.y = -30
                break
                case ' ':
                    player.attack()
                    break
                case 'ArrowRight':
                    keys.ArrowRight.pressed = true
                    enemy.lastKey= 'ArrowRight'
                    break
                    case 'ArrowLeft':
                        keys.ArrowLeft.pressed = true
                    enemy.lastKey = 'ArrowLeft'
                        break
                        case 'ArrowUp':
                        enemy.speed.y = -30
                        break
                        case 'ArrowDown':
                            enemy.isAttacking = true
                            break
    }
    console.log(event.key)
})
window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'f':
            keys.f.pressed = false
            break
            case 's':
            keys.s.pressed = false
            break
            case 'e':
                keys.e.pressed = false
            lastKey = 'e'
                break
                switch (event.key) { 
                    case 'ArrowRight':
                keys.ArrowRight.pressed = false
                enemy.lastKey= 'ArrowRight'
                break
                case 'ArrowLeft':
                    keys.ArrowLeft.pressed = false
                enemy.lastKey = 'ArrowLeft'
                    break
                    case 'ArrowUp':
                    enemy.speed.y = -9
                    break
                    
    }
}
    console.log(event.key)
})}