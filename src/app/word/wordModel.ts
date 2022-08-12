import { Letter } from "../letter/letterModel";

export class Word { 

    letters: Letter[] = new Array(5);

    constructor(){
        this.resetLetters();
    }   
        
    resetLetters(){
        for (var i = 0; i < 5; i++){
            this.letters[i] = new Letter();
        }
    }

}