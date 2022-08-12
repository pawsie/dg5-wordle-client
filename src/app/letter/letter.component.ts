import { Component, Input, OnInit } from '@angular/core';
import { Letter } from './letterModel';

@Component({
  selector: 'app-letter',
  templateUrl: './letter.component.html',
  styleUrls: ['./letter.component.scss']
})
export class LetterComponent implements OnInit {

  @Input() letter !: Letter;
  
  constructor() { }

  ngOnInit(): void {
  }

}
