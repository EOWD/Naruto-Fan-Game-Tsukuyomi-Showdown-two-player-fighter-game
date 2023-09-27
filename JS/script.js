window.onload = function () {
  const startButton = document.querySelector(".start-button");
  const restartButton = document.querySelector(".restart-button");
  const painStart = document.getElementById("pain");
  const narutoWin = document.getElementById("naruto");
  const body = document.body;
  const playerInfo = document.getElementById("player-info");
  let game;

  startButton.addEventListener("click", function () {
    playAudio("fight-theme", true);
    if (!game) {
      console.log("start game");
      game = new Game();
      game.start();
    }
  });
  const screenWidth = window.innerWidth || document.documentElement.clientWidth;

  console.log(`Screen width: ${screenWidth}px`);

  restartButton.addEventListener("click", () => {
    restartGame();
  });

  function restartGame() {
    location.reload();
  }
  function playAudio(id, loop) {
    const audio = document.getElementById(id);
    if (audio) {
      audio.loop = loop;
      audio.currentTime = 0;
      // audio.play();
    }
  }
  playerInfo.style.textAlign = "left";

  painStart.addEventListener("mouseover", () => {
    painStart.classList.add("super-move-pain");

    playAudio("pain-start-audio", false);

    setTimeout(() => {
      body.classList.add("shake");

      setTimeout(() => {
        body.classList.remove("shake");
        painStart.classList.add("itachi-standing");
        painStart.classList.remove("super-move-pain");
      }, 10000);
    }, 13000);
    playerInfo.innerHTML = `
    <h2>Name: Pain (Nagato)</h2>
    <h3>Clan:No clan, just a bunch of piercings</h3>
    <ul>
    <li>Almighty Push: Can clean his room by pushing everything away (and also destroy cities).</li>
    <li>Nagato Mode: Wears a lot of piercings and looks intimidating.</li>
    <li>Six Paths of Pain: Controls a gang of ninja zombies, like the ultimate puppeteer.</li>
    <li>Philosopher's Stone: Not the magical one, but a weird ninja power source.</li>
    </ul>
    <h4>Pain is the guy who makes you wonder if he's having a mid-life ninja crisis. 💀✨</h4>
  `;
  });

  narutoWin.addEventListener("mouseover", () => {
    playAudio("naruto-start-audio");
    narutoWin.classList.add("naruto-win");

    setTimeout(() => {
      narutoWin.classList.add("naruto-standing");
      narutoWin.classList.remove("naruto-win");
    }, 4000);

    playerInfo.innerHTML = `
    <h2>Name: Naruto Uzumaki</h2>
    <h3>Clan: Ramen Clan (self-proclaimed)</h3>
    <ul>
    <li>Shadow Clone Jutsu: Can make hundreds of copies of himself for epic pranks.</li>
    <li>Rasengan: A powerful move he named after his favorite dish, "Ramen-sengan.</li>
    <li>Nine-Tails Mode: When angry, he turns into a fiery fox with attitude.</li>
    <li>Talk-no-Jutsu: Can talk his way out of any situation, even with villains.</li>
    </ul>
    <h4>Naruto is the ramen-loving ninja with dreams as big as his appetite! 🍥🍜</h4>
  `;
  });
};
