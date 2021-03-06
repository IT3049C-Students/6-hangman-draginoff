class Hangman {
  constructor(_canvas) {
    if (!_canvas) {
      throw new Error(`invalid canvas provided`);
    }

    this.canvas = _canvas;
    this.ctx = this.canvas.getContext(`2d`);
  }

  /**
   * This function takes a difficulty string as a parameter
   * would use the Fetch API to get a random word from the Hangman
   * To get an easy word: https://hangman-micro-service-bpblrjerwh.now.sh?difficulty=easy
   * To get an medium word: https://hangman-micro-service-bpblrjerwh.now.sh?difficulty=medium
   * To get an hard word: https://hangman-micro-service-bpblrjerwh.now.sh?difficulty=hard
   * The results is a json object that looks like this:
   *    { word: "book" }
   * */
  getRandomWord(difficulty) {
    return fetch(
      `https://hangman-micro-service.herokuapp.com/?difficulty=${difficulty}`
    )
      .then((r) => r.json())
      .then((r) => r.word);
  }

  /**
   *
   * @param {string} difficulty a difficulty string to be passed to the getRandomWord Function
   * @param {function} next callback function to be called after a word is reveived from the API.
   */
  async start(difficulty, next) {
    // get word and set it to the class's this.word
    this.word = await this.getRandomWord(difficulty);
    // clear canvas
    this.clearCanvas();
    // draw base
    this.drawBase();
    // reset this.guesses to empty array
    this.guesses = [];
    // reset this.isOver to false
    this.isOver = false;
    // reset this.didWin to false
    this.didWin = false;
    next();
  }

  /**
   *
   * @param {string} letter the guessed letter.
   */
  
  guess(letter) {
   const alphabet = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
    // Check if nothing was provided and throw an error if so
    if (letter == " ")
    {
      throw "No Guess Provided"
    }
    // Check for invalid cases (numbers, symbols, ...) throw an error if it is
    let splitLetters = letter.split("");

    for(const letters of splitLetters){
    if (!alphabet.includes(letter))
    {
      alert ("You must guess a letter!")
      throw "You must guess a letter!";
    }
  }
    // Check if more than one letter was provided. throw an error if it is.
    if (letter.length != 1)
    {
      throw "You may only guess 1 letter!"
    }
    // if it's a letter, convert it to lower case for consistency.
    if (alphabet.includes(letter))
    {
      letter = letter.toLowerCase;
    }
    // check if this.guesses includes the letter. Throw an error if it has been guessed already.
    // add the new letter to the guesses array.
    for(let i = 0; i< this.guesses.legnth; i++)
    {
      if(letter == guesses[i])
      {
        throw "You have already guessed this letter"
      }
      else 
      {
        this.guesses.push(letter);
      }
    }    
    // check if the word includes the guessed letter:
    //    if it is call checkWin()
    //    if it's not call onWrongGuess()
    if(this.word.includes(letter)){
      this.checkWin();
    }
    else
    {
      
      this.onWrongGuess;
    }    
  }

  checkWin() {
    // using the word and the guesses array, figure out how many remaining unknowns.
    // if zero, set both didWin, and isOver to true
    totalWordLength = this.word.length;
    let missingLetters = 0;
    for(i = 0; i< this.word.length; i++)
    {
        letter = this.word.at(i);
        if (!this.guesses.includes(letter)) {
          
          missingLetters++;
          console.log(missingLetters);
        }
    }
    if(missingLetters === 0)
    {
      this.didWin = true;
      this.isOver = true;
    }
  }

  /**
   * Based on the number of wrong guesses, this function would determine and call the appropriate drawing function
   * drawHead, drawBody, drawRightArm, drawLeftArm, drawRightLeg, or drawLeftLeg.
   * if the number wrong guesses is 6, then also set isOver to true and didWin to false.
   */
  onWrongGuess() {
    wrongGuesses ++;
    if (wrongGuess == 1 ){
      drawHead();
    } 
    
    elseif (wrongGuess == 2)
    {
      drawBody();
    }
    
    elseif (wrongGuess == 3)
    {
      drawRightArm();
    } 

    elseif (wrongGuess == 4)
    {
      drawLeftArm();
    } 

    elseif (wrongGuess == 5)
    {
      drawRightLeg();
    } 

    elseif(wrongGuess == 6)
    {    
      drawLeftLeg();
      isOver == true;
      didWin == false;    
    }
  }

  /**
   * This function will return a string of the word placeholder
   * It will have underscores in the correct number and places of the unguessed letters.
   * i.e.: if the word is BOOK, and the letter O has been guessed, this would return _ O O _
   */
  getWordHolderText() {
    let placeHolder = " ";
    let totalWordLength = this.word.length;
    for(let i = 0; i <= totalWordLength; i++){
      for(let j = 0; j <= this.guesses.length; j++){
        if(this.word.charAt(i) === this.guesses[j]){
          placeHolder.concat(this.word.charAt(i), " ");
        }
        else{
          placeHolder.concat("_ ");
        }
      }
    }
    placeHolder.trim;
    return placeHolder;
  }
  

  /**
   * This function returns a string of all the previous guesses, seperated by a comma
   * This would return something that looks like
   * (Guesses: A, B, C)
   * Hint: use the Array.prototype.join method.
   */
  getGuessesText() {
    let guess = this.guesses.join(", ");
    let guessesText = "Guesses: ";
    guessesText.concat(guess);
    return guessesText
  }

  /**
   * Clears the canvas
   */
  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  /**
   * Draws the hangman base
   */
  drawBase() {
    this.ctx.fillRect(95, 10, 150, 10); // Top
    this.ctx.fillRect(245, 10, 10, 50); // Noose
    this.ctx.fillRect(95, 10, 10, 400); // Main beam
    this.ctx.fillRect(10, 410, 175, 10); // Base
  }

  drawHead() {
    this.ctx.beginPath();
    this.ctx.arc(250, 85, 25, 0, Math.PI*2, false);
    this.ctx.stroke();
  }

  drawBody() {
    this.ctx.fillRect(245, 110, 10, 80, false);
  }

  drawLeftArm() {
    this.ctx.beginPath();
    this.ctx.moveTo(250, 175);
    this.ctx.lineTo(170, 100);
    this.ctx.stroke();
  }

  drawRightArm() {
    this.ctx.beginPath();
    this.ctx.moveTo(250, 175);
    this.ctx.lineTo(300, 100);
    this.ctx.stroke();
  }

  drawLeftLeg() {
    this.ctx.beginPath();
    this.ctx.moveTo(245, 190);
    this.ctx.lineTo(170, 250);
    this.ctx.stroke();
  }

  drawRightLeg() {
    this.ctx.beginPath();
    this.ctx.moveTo(255, 190);
    this.ctx.lineTo(330, 250);
    this.ctx.stroke();
  }
}