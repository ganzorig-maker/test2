// Тоглоомын бүх газарт ашиглагдах глобаль хувьсагчид

var isNewGame;

// Аль тоглогч шоо шидэх вэ гэдгийг энд хадгална
var activePlayer;

// Хоёр тоглогчийн цуглуулсан оноонууд
var scores;

// Идэвхтэй тоглогчийн цуглуулж байгаа ээлжийн оноо
var roundScore;

// Шооны зургийг үзүүлэх элементийг Дом оос хайж олоод энд хадгална
var diceDom = document.querySelector(".dice");

// Тоглоомыг эхлүүлнэ
initGame();

// ********************************************************************************ТОГЛООМЫГ ШИНЭЭР ЭХЛҮҮЛЭХ БУЮУ new game ТОВЧЛУУР**************
function initGame() {
  // Тоглоом эхлэлээ гэдэг төлөвт оруулна
  isNewGame = true;

  //  // Тоглогчдын ээлжийг хадгалах хувьсагч 
  activePlayer = 0;

  // Тоглогчдын цуглуулсан оноог хадгалах хувьсагч
  scores = [0, 0];

  // Тоглогчийн ээлжиндээ цуглуулж байгаа оноог хадгалах хувьсагч
  roundScore = 0;
  // New game товчлууран дээр дарагдахад тоглоом дахин эхлэнэ
document.querySelector(".btn-new").addEventListener("click", initGame);

  // Програм эхлэхэд бэлтгэе
  // ***********Дом руу хандах***********
  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  // Тоглогчдын нэр
  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";

  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  // Улаан цэгийг шилжүүлэх
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");

  document.querySelector(".player-0-panel").classList.add("active");

  diceDom.style.display = "none";
}

// ********************************************************************************ШООГ ШИДЭХ ЭВЕНТ ЛИСТЕНЕР БУЮУ roll-dice ТОВЧЛУУР***********************
document.querySelector(".btn-roll").addEventListener("click", function roll() {
  if (isNewGame) {
    // 1 ээс 6 хүртэлх санамсаргүй нэг тоо гаргаж авна
    var diceNumber = Math.floor(Math.random() * 6) + 1;

    // Шооны зургийг вэб дээр гаргах
    diceDom.style.display = "block";

    //Буусан санамсаргүй тоог харгалзах шооны зурагтай вэб дээр гаргаж авна
    diceDom.src = "dice-" + diceNumber + ".png";

    // Буусан тоо нь 1 ээс ялгаатай бол идэвхтэй тоглогчийн ээлжийн оноог нэмэгдүүл
    // ************* Тоглогчийн ээлжийг солих*****************
    if (diceNumber !== 1) {
      roundScore = roundScore + diceNumber;
      document.getElementById(
        "current-" + activePlayer
      ).textContent = roundScore;
    } else {
      // 1 буусан тул тоглогчийн ээлжийг энэ хэсэгт сольж өгнө
      switchToNextPlayer();
    }
  } 
});

// ********************************************************************************HOLD ТОВЧНЫ ЭВЕНТ ЛИСТЕНЕР БУЮУ ТОГЛОГЧИЙН ОНООГ ЦУГЛУУЛАХ************
document.querySelector(".btn-hold").addEventListener("click", function hold() {
  if (isNewGame) {
    // уг тоглогчийн ээлжийн оноог глобаль хувьсагч дээр нэмж өгнө
    scores[activePlayer] = scores[activePlayer] + roundScore;

    // дэлгэц дээр нь оноог нь өөрчил
    document.getElementById("score-" + activePlayer).textContent =
      scores[activePlayer];

    // Уг тоглогчын хожсон эсэхийг шалгах
    if (scores[activePlayer] >= 50) {
      // Тоглоомыг дууссан төлөвт оруулна
      isNewGame = false; 
      alert("Тоглоом дууссан тул NEW GAME товчийг дарж дахин эхлүүлнэ үү");
      

      // ялагч гэсэн текстийг нэрнийх нь оронд гаргана
      document.getElementById("name-" + activePlayer).textContent = "WINNER!!!";
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");
    } else {
      // 1 буусан тул ээлжийг дараагын тоглогч руу шилжүүл
      switchToNextPlayer();
    }
  } 
});

//*****************Ээлжээ солих функц******************
function switchToNextPlayer() {
  roundScore = 0;
  document.getElementById("current-" + activePlayer).textContent = 0;
  // if ийг өөрөөр ингэж бичнэ
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);

 
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");
  diceDom.style.display = "none";
}


