function PageState() {
  this.currentState = new HomeState();

  this.init = function () {
    this.change(new HomeState());
  };

  this.change = function (state) {
    currentState = state;
  };
}

const HomeState = function () {
  (document.getElementById('intro-head').innerHTML = `
      <h2 class="text-success">Hello Genuis.</h2>  
  `),
    (document.getElementById('intro-body').innerHTML = `
      <p>Welcome to our page. Do you have the intellect to play our number guessing game?</p>
      <div class="d-grid">
      <p class="text-dark">If YES. Check out the rules of the game?</p>
      <a type="button" class="btn btn-warning game-btn" href="#">Click Here</a>
    `);
  document.querySelector('.start-btn').style.display = 'none';
};

const GameState = function () {
  (document.getElementById('intro-head').innerHTML = `
    <h1>Rules of the game</h1> 
  `),
    (document.getElementById('intro-body').innerHTML = `
    <div>
      <ul>
        <li>You are to enter a number between the minimum and maximum.</li>
        <li>You have 60 seconds until countdown.</li>
        <li>Timer begins when you focus the text area.</li>
        <li>For any wrong answer, you will be notified.</li>
        <li>When the game is paused, click on the continue button to resume.</li>
        <li>Click on play button to submit your guess.</li>
      </ul>
    </div>
  `);
  document.querySelector('.start-btn').style.display = 'block';
};

const page = new PageState();
page.init();

document.querySelector('.game-btn').addEventListener('click', function () {
  page.change(new GameState());
});
document.querySelector('.start-btn').addEventListener('click', () => {
  console.log(123);
});
