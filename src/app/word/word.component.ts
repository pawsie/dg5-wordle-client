import { animate, animateChild, keyframes, query, stagger, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { Word } from './wordModel';

const shakeAnimation = [
  animate('0.5s', 
    keyframes([
      style({transform: 'translateX(-10px)', offset: 0}),
      style({transform: 'translateX(20px)', offset: 0.2}),
      style({transform: 'translateX(-20px)', offset: 0.4}),
      style({transform: 'translateX(20px)', offset: 0.6}),
      style({transform: 'translateX(-20px)', offset: 0.8}),
      style({transform: 'translateX(10px)', offset: 1}),
    ])
  )
];

@Component({
  selector: 'app-word',
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.scss'],
  animations: [
    trigger('shake', [transition('true <=> false', shakeAnimation)]),
    trigger('flipLetters', [transition('true <=> false', [query('.app-letter', stagger('500ms', animateChild()), { optional: true })])])
  ]
})
export class WordComponent implements OnInit {

  @Input() word !: Word;
  
  constructor() { }

  ngOnInit(): void {
  }

  shakeTrigger = true;
  flipTrigger = true;

  shake() {
    this.shakeTrigger = !this.shakeTrigger;
  }
  flip() {
    this.flipTrigger = !this.flipTrigger;
  }
}
