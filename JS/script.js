window.onload = function () {
  const playButton=document.querySelector(".play-button");
  const controls=document.querySelector(".control-button");
  const about=document.querySelector(".about-button");
  const entroScreen=document.getElementById("entro-screen");
  const startScreen=document.getElementById("Game-Start");
  const startButton = document.querySelector(".start-button");
  const restartButton = document.querySelector(".restart-button");
  const painStart = document.getElementById("pain");
  const narutoWin = document.getElementById("naruto");
  const body = document.body;
  const playerInfo = document.getElementById("player-info");


  let game;
playButton.addEventListener('click',()=>{
entroScreen.style.display='none';
startScreen.style.display='block'

})
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
  function playAudio(id, loop, stop) {
    const audio = document.getElementById(id);
    if (audio) {
      if (stop) {
        audio.pause(); 
      } else {
        audio.loop = loop;
        audio.currentTime = 0;
        audio.play();
      }
    }
  }
  playerInfo.style.textAlign = "center";
  //playerInfo.style.marginBottom = "30%";
  
  playerInfo.style.display= "flex";
  playerInfo.style.flexDirection= "column";

  painStart.addEventListener("mouseover", () => {
    playerInfo.style.display='block'
    painStart.classList.add("super-move-pain");

    playAudio("pain-start-audio", false);

    setTimeout(() => {
      body.classList.add("shake");

      setTimeout(() => {
        
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
    playerInfo.style.display='block'
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
  narutoWin.addEventListener("mouseout",()=>{
    playAudio("naruto-start-audio",false,stop);
    playerInfo.style.display='none'
    narutoWin.classList.remove("naruto-win");
  })
  painStart.addEventListener("mouseout",()=>{
    playAudio("pain-start-audio", false, stop);
    playerInfo.style.display='none'
    painStart.classList.remove("super-move-pain");
    body.classList.remove("shake");
  })
  controls.addEventListener('click',()=>{
    playerInfo.style.display='block'
    playerInfo.innerHTML = `
    <div>
    <h2>Player 1 Controls (The Hero):</h2>
    <ul>
    <li>W: Fly Like a Frog (Jump)</li>
    <li>D: You're Late for Ramen (Move Right)</li>
    <li>A: Glide Left (Move Left)</li>
    <li>Space: Smack! Attack!</li>
    </div>
    <div>
    <h2>Player 2 Controls (The Trickster):</h2>
    <ul>
    <li>↑: Hop to the Moon (Jump)</li>
    <li>→: Dash Right (Move Right)</li>
    <li>←: Moonwalk Left (Move Left)</li>
    <li>Shift: Surprise Slap! Attack!</li>
    </ul>
    <h3>May your ramen dreams and Sharingan pranks come true! 🍜🌪️</h3>
    </div>
  `;
  })
  about.addEventListener('click',()=>{
    playerInfo.style.width= "50vw";
    playerInfo.style.display='flex'
    playerInfo.style.marginBottom='1%'
    playerInfo.innerHTML = `
   
   <p>Hey there, I'm Eiad, and this Naruto fan game is my very first project during my time at IronHack's 
   web development bootcamp.
    I've crafted this game with the power of HTML, JavaScript, and CSS, channeled from the Hidden Leaf Village to your screen! 
    So, get ready to immerse yourself in the ninja world and let's embark on an epic adventure together! Believe it!
    If you're as excited about ninja adventures as I am, let's join forces and turn this into an epic ninja saga! Check out the source code below or drop by our GitHub repository. 
    🍥🌟🐉
     </p>
     <strong><a href="https://github.com/EOWD/project1--two-player-fighter-game.git">Git Hub</a></strong>
  `;
  })

};
