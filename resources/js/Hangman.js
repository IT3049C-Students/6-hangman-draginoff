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
      `https://hangman-micro-service-bpblrjerwh.now.sh?difficulty=${difficulty}`
    )
      .then((r) => r.json())
      .then((r) => r.word);
  }

  /**
   *
   * @param {string} difficulty a difficulty string to be passed to the getRandomWord Function
   * @param {function} next callback function to be called after a word is reveived from the API.
   */
  start(difficulty, next) {
    // get word and set it to the class's this.word
    this.word = this.getRandomWord(difficulty);
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
  }

  /**
   *
   * @param {string} letter the guessed letter.
   */
  guess(letter) {
    // Check if nothing was provided and throw an error if so
    if (letter == " ")
    {
      throw "No Guess Provided"
    }
    // Check for invalid cases (numbers, symbols, ...) throw an error if it is
    if (letter != /^[a-zA-Z]+$/)
    {
      throw "You must guess a letter!"
    }
    // Check if more than one letter was provided. throw an error if it is.
    if (letter.length != 1)
    {
      throw "You may only guess 1 letter!"
    }
    // if it's a letter, convert it to lower case for consistency.
    if (letter == /^[a-zA-Z]+$/)
    {
      letter = letter.toLowerCase;
    }
    // check if this.guesses includes the letter. Throw an error if it has been guessed already.
    // add the new letter to the guesses array.
    for(i = 0; i< this.guesses.legnth; i++)
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
      wrongGuesses ++;
      this.onWrongGuess;
    }    
  }

  checkWin() {
    // using the word and the guesses array, figure out how many remaining unknowns.
    // if zero, set both didWin, and isOver to true
    totalWordLength = this.word.length;
    missingLetters = totalWordLength;
    for(i = 0; i< totalWordLength; i++)
    {
      for(i = 0; i< this.guesses.length; i++)
      {
        if(this.word[i] == this.guesses[i])
        {
          missingLetters = missingLetters - 1;
        }
      }
    }
    if(missingLetters == 0)
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
     placeHolder;
     
    return;
  }

  /**
   * This function returns a string of all the previous guesses, seperated by a comma
   * This would return something that looks like
   * (Guesses: A, B, C)
   * Hint: use the Array.prototype.join method.
   */
  getGuessesText() {
    return ``;
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

  drawHead() {}

  drawBody() {}

  drawLeftArm() {}

  drawRightArm() {}

  drawLeftLeg() {}

  drawRightLeg() {}
}
