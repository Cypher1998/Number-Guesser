// UI Controller
const UICtrl = (function () {
  const UISelectors = {
    min: '.min-num',
    max: '.max-num',
    input: 'guess-input',
    display: '.info',
    pauseBtn: '#pause-btn',
    continueBtn: '#continue-btn',
    playBtn: '#play-btn',
    image: 'img',
    gameBody: '.game-body',
    counter: 'counter',
  };

  const UIdisplay = function () {
    document.querySelector(UISelectors.gameBody).style.display = 'none';
    setTimeout(function () {
      document.querySelector(UISelectors.image).style.display = 'none';
      document.querySelector(UISelectors.gameBody).style.display = 'block';
      document.querySelector(UISelectors.continueBtn).style.display = 'none';
    }, 1500);
  };

  const getTextValue = function () {
    const textValue = document.getElementById(UISelectors.input).value;
    return textValue;
  };

  const displayResult = function (msg, color) {
    const display = document.get(UISelectors.display);
    display.textContent = msg;
    display.style.color = color;
  };

  function setMessage(mssg, color) {
    const display = document.querySelector(UISelectors.display);
    display.textContent = mssg;
    display.classList.add('message');
    display.style.color = color;
  }

  function gameOver(won, msg) {
    let color;
    won === true ? (color = 'green') : (color = 'red');
    setMessage(msg, color);
    const guessInput = document.getElementById(UISelectors.input);
    guessInput.style.borderColor = color;
    guessInput.disabled = true;

    document.querySelector(UISelectors.playBtn).value = 'PLAY AGAIN';
    document.querySelector(UISelectors.playBtn).classList.add('play-again');
    document.querySelector(UISelectors.pauseBtn).style.display = 'none';
  }

  const pauseEvent = function () {
    document.querySelector(UISelectors.continueBtn).style.display = 'block';
    document.querySelector(UISelectors.playBtn).style.display = 'none';
    document.querySelector(UISelectors.pauseBtn).style.display = 'none';
    document.getElementById(UISelectors.input).disabled = true;
  };

  const continueEvent = function () {
    document.querySelector(UISelectors.continueBtn).style.display = 'none';
    document.querySelector(UISelectors.playBtn).style.display = 'block';
    document.querySelector(UISelectors.pauseBtn).style.display = 'block';
    document.getElementById(UISelectors.input).disabled = false;
  };

  const eventOver = function () {
    document.querySelector('.game-body').innerHTML = `
    <div class="text-center my-2">
      <h1>Game Over!!!</h1>
      <p class="lead">You are unlucky this time.</p>
      <p class="h4 mb-3">Do you have the courage to try again?</p>
      <a href="game.html" class="btn btn-success mx-2 mb-2">YES</a>
      <a href="index.html" class="btn btn-danger mx-2 mb-2">NO</a>
    </div>
    `;
  };

  return {
    getSelectors() {
      return UISelectors;
    },
    UIdisplay,
    getTextValue,
    displayResult,
    setMessage,
    gameOver,
    pauseEvent,
    continueEvent,
    eventOver,
  };
})();

function getRandom() {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
// Timer controller
const TimerCtrl = (function (UICtrl) {
  const UISelector = UICtrl.getSelectors();

  let min = 1,
    max = 15,
    winningNum,
    totalTime = 60,
    timerOn = false,
    clearTimer;

  const timedCount = function () {
    document.getElementById('counter').textContent = totalTime;
    totalTime = totalTime - 1;
    clearTimer = setTimeout(timedCount, 1000);

    if (totalTime === -2) {
      UICtrl.eventOver();
      clearTimeout(clearTimer);
    }
  };

  document
    .getElementById(UISelector.input)
    .addEventListener('focus', function () {
      if (!timerOn) {
        timerOn = true;
        timedCount();
      }
    });

  document
    .querySelector(UISelector.pauseBtn)
    .addEventListener('click', function () {
      clearTimeout(clearTimer);
      timerOn = false;
    });

  document
    .querySelector(UISelector.continueBtn)
    .addEventListener('click', function () {
      if (!timerOn) {
        timerOn = true;
        timedCount();
      }
    });

  return {
    min,
    max,
    winningNum,
    totalTime,
    timerOn,
    timedCount,
    clearTimer,
  };
})(UICtrl);

// App Controller
const AppCtrl = (function (TimerCtrl, UICtrl) {
  const UISelector = UICtrl.getSelectors();

  const min = TimerCtrl.min,
    max = TimerCtrl.max;

  document.querySelector(UISelector.min).textContent = min;
  document.querySelector(UISelector.max).textContent = max;

  // event listeners
  const loadAllEvents = function () {
    // play button
    document
      .querySelector(UISelector.playBtn)
      .addEventListener('click', submitInput);

    // pause button
    document
      .querySelector(UISelector.pauseBtn)
      .addEventListener('click', pauseGame);

    // continue button
    document
      .querySelector(UISelector.continueBtn)
      .addEventListener('click', continueGame);

    // play-again event
    document
      .querySelector(UISelector.gameBody)
      .addEventListener('mousedown', playAgain);
  };

  // play button event
  function submitInput(e) {
    function getRandom() {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }
    let winningNum = TimerCtrl.winningNum;

    winningNum = getRandom();

    const textValue = parseInt(UICtrl.getTextValue());

    if (isNaN(textValue) || textValue < min || textValue > max) {
      UICtrl.setMessage(`Enter a number between ${min} and ${max}`, 'red');
    } else if (textValue === winningNum) {
      UICtrl.gameOver(
        true,
        `${textValue} is correct. You really are a genuis.`
      );
      document.getElementById(UISelector.counter).style.display = 'none';

      clearTimeout(TimerCtrl.timedCount());
      // TimerCtrl.timerOn = false;
    } else {
      UICtrl.setMessage(
        `${textValue} is incorrect. Try again!!! Answer is ${winningNum}`,
        'red'
      );

      const guessInput = document.getElementById(UISelector.input);
      guessInput.style.borderColor = 'red';
      guessInput.value = '';
      // }
    }

    e.preventDefault();
  }

  // pause button event
  function pauseGame() {
    UICtrl.pauseEvent();
  }

  // pause button event
  function continueGame() {
    UICtrl.continueEvent();
  }

  // target the class of 'play-again'
  function playAgain(e) {
    if (e.target.classList.contains('play-again')) {
      window.location.reload();
    }
  }

  return {
    init() {
      loadAllEvents();
      UICtrl.UIdisplay();
    },
  };
})(TimerCtrl, UICtrl);

AppCtrl.init();
