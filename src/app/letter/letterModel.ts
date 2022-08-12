export enum LetterStates { 
    BeforeCheck,
    WrongLetter,
    RightLetterWrongPlace,
    RightLetterRightPlace,
  };
  
export class Letter { 
  value: string = '';
  state = LetterStates.BeforeCheck;
    toString: any;
}