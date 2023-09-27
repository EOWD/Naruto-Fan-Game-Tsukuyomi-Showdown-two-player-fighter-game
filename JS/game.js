class Game {
  constructor() {
    this.gameIntro = document.querySelector("#Game-Start");
    this.gameScreen = document.getElementById("game-Screen");
    this.gameContainer = document.querySelector("#game-container");
    this.gameOver = document.querySelector("#game-end");
    this.enemyHealth = document.querySelector(".health-enemy");
    this.playerHealth = document.querySelector(".health-player");
    this.gameTimer = document.querySelector("#timer");
    this.winnerImg = document.querySelector(".winner-img");
    this.winner = "";

    this.player = new player(
      this.element,
      this.gameScreen,
      {
        x: 100,
        y: 0,
      },
      {
        x: 0,
        y: 0,
      },
      200,
      268,
      { x: 80, y: 50 },
      "naruto-hit",
      "naruto-running",
      "naruto-damage",
      "attack"
    );

    this.enemy = new player(
      this.element,
      this.gameScreen,
      { x: 1100, y: 100 },
      { x: 0, y: 0 },
      200,
      268,
      { x: 80, y: 50 },
      "pain-attack",
      "pain-running",
      "pain-damage"
    );

    this.keys = {
      a: { pressed: false },
      d: { pressed: false },
      w: { pressed: false },
      ArrowRight: { pressed: false },
      ArrowLeft: { pressed: false },
    };

    this.enemy.changeClass();
    this.time = 300;
  }

  // timer
  decreaseTimer() {
    if (this.time > 0) {
      this.time--;

      const minutes = Math.floor(this.time / 60);
      const seconds = this.time % 60;

      const formattedTime = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

      this.gameTimer.innerHTML = formattedTime;

      setTimeout(() => this.decreaseTimer(), 1000);
    }
    if (this.player.health === this.enemy.health) {
      this.winner = "Tie";
    } else if (this.player.health > this.enemy.health) {
      this.winner = "Naruto wins";
      this.winnerImg.classList.add("naruto-win");
    } else if (this.player.health < this.enemy.health) {
      this.winner = "Pain wins";
      this.winnerImg.classList.add("super-move-pain");
    }
    if (this.time === 0) {
      this.gameEnd();
    }
  }

  animate() {
    window.requestAnimationFrame(() => this.animate());
    this.player.update();
    this.enemy.update();

    this.player.attackChangeClass();
    this.enemy.attackChangeClass();

    this.player.velocity.x = 0;
    this.enemy.velocity.x = 0;
    if (this.keys.a.pressed && this.player.lastKey === "a") {
      this.player.velocity.x = -5;
      this.player.running();
    } else if (this.keys.d.pressed && this.player.lastKey === "d") {
      this.player.velocity.x = 5;
      this.player.running();
    }

    if (this.keys.ArrowRight.pressed && this.enemy.lastKey === "ArrowRight") {
      this.enemy.velocity.x = 5;
      this.enemy.running();
    } else if (
      this.keys.ArrowLeft.pressed &&
      this.enemy.lastKey === "ArrowLeft"
    ) {
      this.enemy.velocity.x = -5;
      this.enemy.running();
    }

    // Attack conditions
    if (this.player.checkAttackBoxCollisionWithSprite(this.enemy)) {
      // setTimeout(() => {
      this.player.attackBox.isActive = false;
      //}, 15);
      this.enemy.damageClass();
      this.enemy.health -= 2;
      this.enemyHealth.style.width = this.enemy.health + "%";
      this.playAudio("pain-damage");
      console.log("Player attacked enemy");
    }

    if (this.enemy.checkAttackBoxCollisionWithSprite(this.player)) {
      //setTimeout(() => {
      this.enemy.attackBox.isActive = false;
      //}, 15);
      this.player.damageClass();
      this.player.health -= 2;
      this.playerHealth.style.width = this.player.health + "%";
      this.playAudio("naruto-damage");
      console.log("Enemy attacked player");
    }

    // Mirror motion
    this.enemy.mirrorBasedOnPlayerPosition(this.player.position.x);
    this.player.mirrorBasedOnPlayerPosition(this.enemy.position.x);

    // end if player is dead
    if (this.player.health <= 0 || this.enemy.health <= 0) {
      this.gameEnd();
    }
    this.player.changeWidthIfClassExists("naruto-hit", 262);
  }

  start() {
    this.gameIntro.style.display = "none";
    this.gameContainer.style.display = "block";
    this.decreaseTimer();

    this.animate();

    window.addEventListener("keydown", (event) => {
      switch (event.key) {
        case "d":
          this.keys.d.pressed = true;
          this.player.lastKey = "d";
          break;
        case "a":
          this.keys.a.pressed = true;
          this.player.lastKey = "a";
          break;
        case "w":
          this.player.velocity.y = -15;

          break;
        case "ArrowRight":
          this.keys.ArrowRight.pressed = true;
          this.enemy.lastKey = "ArrowRight";
          break;
        case "ArrowLeft":
          this.keys.ArrowLeft.pressed = true;
          this.enemy.lastKey = "ArrowLeft";
          break;
        case "ArrowUp":
          this.enemy.velocity.y = -15;
          break;
        case "e":
          this.player.attack();
          break;
        case "Shift":
          this.enemy.attack();
          break;
      }
      console.log(event.key);
    });

    window.addEventListener("keyup", (event) => {
      switch (event.key) {
        case "d":
          this.keys.d.pressed = false;
          break;
        case "a":
          this.keys.a.pressed = false;
          break;
        case "w":
          this.keys.w.pressed = false;
          break;
      }

      switch (event.key) {
        case "ArrowRight":
          this.keys.ArrowRight.pressed = false;
          break;
        case "ArrowLeft":
          this.keys.ArrowLeft.pressed = false;
          break;
        case "ArrowUp":
          break;
      }
      console.log(event.key);
    });
  }

  gameEnd() {
    if (this.player.health <= 0 || this.enemy.health <= 0) {
      this.gameContainer.style.display = "none";
      this.gameOver.style.display = "block";
      // console.log(this.winner);
      document.querySelector("#winner").innerHTML = this.winner;
      return;
    } else if (this.time === 0) {
      if (this.gameContainer) {
        this.gameContainer.style.display = "none";
        this.gameOver.style.display = "block";
        // console.log(this.winner);
        document.querySelector("#winner").innerHTML = this.winner;
      }
    }
  }
  playAudio(id) {
    const audio = document.getElementById(id);
    if (audio) {
      audio.currentTime = 0;
      audio.play();
    }
  }
}
