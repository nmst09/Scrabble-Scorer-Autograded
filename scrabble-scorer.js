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
	word = word.toUpperCase();
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

function simpleScorer(word) {
   let score = word.length;
   return score; 
}

function vowelBonusScorer(word) {
   let wordOne = word.toLowerCase();
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

function scrabbleScorer(word) {          
   let score = 0;
      for (let i = 0; i < word.length; i++) {
         score += newPointStructure[word[i].toLowerCase()];
      }

      return score;
}

const scoringAlgorithms = [
   
   {
      name: "Simple Scorer", 
      description: "Each letter is worth 1 point.", 
      scorerFunction: simpleScorer
   },
   {
      name: "Bonus Vowels",
      desription: "Vowels are 3 pts, consonants are 1 pt.",
      scorerFunction: vowelBonusScorer
   },
   {
      name: "Scrabble",
      description: "The traditional scoring method.",
      scorerFunction: scrabbleScorer
   }
];
  
function scorerPrompt() {
   
let info = input.question(`Which scoring algorithm would you like to use?\n\n
0 - Simple: One point per character
1 - Vowel Bonus: Vowels are worth 3 points
2 - Scrabble: Uses scrabble point system
Enter 0, 1, or 2: `);
   if (info === "0"){
      return scoringAlgorithms[0].scorerFunction;
   } else if (info === "1"){
      return scoringAlgorithms[1].scorerFunction;
   } else if (info === "2"){
      return scoringAlgorithms[2].scorerFunction;
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

function initialPrompt() {
   let word = input.question("Let's play some Scrabble!\n \nEnter a word to score: ");
   return word;
};

function runProgram() {
   let word = initialPrompt();
   let algorithm = scorerPrompt();
   let score = algorithm(word);
   console.log(`Score for '${word}': ${score}`);  
      
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
