class player {
  constructor(
    element,
    gameScreen,
    position,
    velocity,
    width,
    height,
    offset,
    attackClass,
    runningClass,
    damage,
    attackclass
  ) {
    this.element = element;
    this.gameScreen = gameScreen;
    this.position = position;
    this.velocity = velocity;
    this.width = width;
    this.height = height;
    this.attackClass = attackClass;
    this.runningClass = runningClass;
    this.damage = damage;
    this.attackclass = attackclass;

    this.element = document.createElement("div");
    //this.element.src = imgSrc;
    this.element.style.position = "absolute";
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.left = `${this.position.x}px`;
    this.element.style.top = `${this.position.y}px`;

    this.element.classList.add("naruto-standing");

    gameScreen.appendChild(this.element);
    this.gravity = 0.5;
    this.lastKey;

    this.attackBox = {
      position: { x: this.position.x, y: this.position.y },
      size: { width: 0, height: 0 },
      isActive: false,
      offset,
    };
    this.attackBoxImg = document.createElement("div");

    this.attackBoxImg.style.position = "absolute";
    this.attackBoxImg.style.width = "50px";

    this.attackBoxImg.style.height = "50px";
    //this.attackBoxImg.style.backgroundColor = "red";

    this.attackBoxImg.style.display = "none";
    this.attackBoxImg.style.backgroundRepeat = "no-repeat";
    gameScreen.appendChild(this.attackBoxImg);

    this.health = 100;
  }

  checkAttackBoxCollisionWithSprite(otherSprite) {
    const thisAttackBoxRect = this.attackBoxImg.getBoundingClientRect();
    const otherSpriteRect = otherSprite.element.getBoundingClientRect();

    if (
      this.attackBox.isActive === true &&
      otherSprite.attackBox.isActive === true
    ) {
      return false; // Both attack boxes are active, no points deducted
    }

    if (
      thisAttackBoxRect.right >= otherSpriteRect.left &&
      thisAttackBoxRect.left <= otherSpriteRect.right &&
      thisAttackBoxRect.bottom >= otherSpriteRect.top &&
      thisAttackBoxRect.top <= otherSpriteRect.bottom &&
      this.attackBox.isActive === true
    ) {
      return true;
    }

    return false;
  }

  attack() {
    this.attackBox.isActive = true;
    setTimeout(() => {
      this.attackBox.isActive = false;
    }, 1000);
  }

  update() {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
    this.attackBox.position.y = this.position.y + this.attackBox.offset.y;

    if (this.attackBox.isActive) {
      this.attackBoxImg.style.left = this.attackBox.position.x + "px";
      this.attackBoxImg.style.top = this.attackBox.position.y + "px";
      this.attackBoxImg.style.display = "block";
    } else {
      this.attackBoxImg.style.display = "none";
    }

    this.velocity.y += this.gravity;
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.position.y + this.height > this.gameScreen.clientHeight) {
      this.position.y = this.gameScreen.clientHeight - this.height;
      this.velocity.y = 0;
    }
    if (this.position.y < 0) {
      this.position.y = 0;
      this.velocity.y = 0;
    }
    if (this.position.x + this.width > this.gameScreen.clientWidth) {
      this.position.x = this.gameScreen.clientWidth - this.width;
      this.velocity.x = 0;
    }
    if (this.position.x < 0) {
      this.position.x = 0;
      this.velocity.x = 0;
    }

    this.element.style.left = this.position.x + "px";
    this.element.style.top = this.position.y + "px";
  }

  toggleMirrored(isMirrored) {
    if (isMirrored) {
      this.element.classList.add("mirrored-sprite");
    } else {
      this.element.classList.remove("mirrored-sprite");
    }
  }

  mirrorBasedOnPlayerPosition(playerX) {
    if (this.position.x < playerX) {
      this.toggleMirrored(false);
      //this.attackBox.offset.x = 0;
    } else {
      this.toggleMirrored(true);
      // this.attackBox.offset.x = +10;
    }
  }
  changeClass() {
    this.element.classList.remove("naruto-standing");
    this.element.classList.add("itachi-standing");
  }

  attackChangeClass() {
    if (this.attackBox.isActive === true) {
      this.element.classList.remove(
        ("naruto-standing" && this.runningClass) || "itachi-standing"
      );

      this.element.classList.add(this.attackClass);
      setTimeout(() => {
        this.element.classList.remove(this.attackClass);
        // this.element.classList.add('naruto-standing' || 'itachi-standing' );
      }, 500);
    }
  }

  running() {
    if (this.attackBox.isActive === false) {
      this.element.classList.remove("naruto-standing" || "itachi-standing");
      this.element.classList.add(this.runningClass);
      setTimeout(() => {
        this.element.classList.remove(this.runningClass);
        this.element.classList.add("naruto-standing" || "itachi-standing");
      }, 500);
    }
  }
  attackMirrorEnemy() {
    if (this.toggleMirrored(false)) {
      this.attackBox.offset.x = +100;
    } else {
      this.attackBox.offset.x = -40;
    }
  }
  changeWidthIfClassExists(className, newWidth) {
    if (this.element.classList.contains(className)) {
      this.element.style.width = newWidth + "px";
    } else {
      // If the class is not present, revert to the original width
      this.element.style.width = this.width + "px";
    }
  }
  damageClass() {
    // Add the damage class
    this.element.classList.add(this.damage);

    // Remove multiple classes individually

    setTimeout(() => {
      // Remove the damage class after a delay
      this.element.classList.remove(this.damage);
    }, 500);
  }
}
