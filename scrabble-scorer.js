// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = wordToScore.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   let word = input.question("Let's play some Scrabble! \nEnter a word to score: ");
   return word;
} 

function simpleScorer(word) {
   let score = wordToScore.length;
   return score; 
   //let letterPoints = ""
   //let pointValue = word.length
      //for (let i = 0; i < word.length; i++) {
         //letterPoints += `Points for '${word[i]}': ${pointValue}\n`
      //}
      //return letterPoints

   }

function vowelBonusScorer(word) {
   let wordOne = wordToScore.toLowerCase();
   const vowelArr = ['a', 'e', 'i', 'o', 'u'];
   let score = 0;
     for (let i = 0; i < wordOne.length; i++) {
      if (vowelArr.includes(wordOne[i])) {
         score += 3;
      } else {
         score += 1;
      }
     }
     return score;
}

function scrabbleScorer(wordToScore) {
   let lowerCaseWord = wordToScore.toLowerCase();
   let score = 0;

   for (let i = 0; i < lowerCaseWord.length; i++) {
      const character = lowerCaseWord[i];
      for (const pointValue in newPointStructure) {
         if (newPointStructure[pointValue].includes(character)) {
            score += Number(pointValue);
         }
      }
   }
   return score
}

const wordToScore = initialPrompt();

//const scoringAlgorithms = [simpleScore, vowelBonus, scrabble] 
   
   let simpleScore = {
      name: "Simple Score", 
      description: "Each letter is worth 1 point.", 
      scoringFunction: simpleScorer
   }; 
   let vowelBonus = {
      name: "Bonus Vowels",
      desription: "Vowels are 3 pts, consonants are 1 pt.",
      scoringFunction: vowelBonusScorer
   };
   let scrabble = {
      name: "Scrabble",
      description: "The traditional scoring method.",
      scoringFunction: scrabbleScorer
   };

const scoringAlgorithms = [simpleScore, vowelBonus, scrabble]

   //console.log(scoringAlgorithms[0]);

function scorerPrompt() {
   //const scoringAlgorithms = [simpleScore, vowelBonus, scrabble]
   let info = input.question(`Which scoring algorithm would you like to use?
   0 - Simple: One point per character
   1 - Vowel Bonus: Vowels are worth 3 points
   2 - Scrabble: Uses scrabble point system
   Enter 0, 1, or 2: `);
   if (info === "0"){
      return scoringAlgorithms[0].scoringFunction();
   } else if (info === "1"){
      return scoringAlgorithms[1].scoringFunction();
   } else if (info === "2"){
      return scoringAlgorithms[2].scoringFunction();
   } else {
      return console.log("Please pick a number between 0 and 2.");
   }
}

function transform(object) {
   const newPointStructure = {};
   for (key in object) {
    const keyArr = object[key];
      for (i = 0; i <keyArr.length; i++) {
         const character = keyArr[i].toLowerCase();
         newPointStructure[character] = Number(key);
      }
   }
   return newPointStructure
};

let newPointStructure = transform(oldPointStructure);

function runProgram() {
   //let word = initialPrompt();
  
      return console.log(`Score for '${wordToScore}': ${scorerPrompt(wordToScore)}`);
   
  // if (num === "0"){
     // console.log(`Score for '${word}': ${scoringAlgorithms[0].scoringFunction(word)}`);
  // } else if (num === "1"){
      //console.log(`Score for '${word}': ${scoringAlgorithms[1].scoringFunction(word)}`);
   //} else if (num === "2"){
      //console.log(`Score for '${word}': ${scoringAlgorithms[2].scoringFunction(word)}`);
   //} else {
      //console.log("Please pick a number between 0 and 2.");
   //}
      
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
