import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface SettingsData {
  hardMode: boolean;
  showAnswer: boolean
}

@Component({
  selector: 'app-settings-dialog',
  templateUrl: './settings-dialog.component.html',
  styleUrls: ['./settings-dialog.component.scss']
})
export class SettingsDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public settingsData: SettingsData) {}

  originalHardMode = false;
  hardModeChanged = false;

  ngOnInit(): void {
    this.originalHardMode = this.settingsData.hardMode;
  }

  onHardModeChange(){
    this.hardModeChanged = (this.originalHardMode != this.settingsData.hardMode);    
    console.log("hardModeChanged:" + this.hardModeChanged);
    console.log("originalHardMode:" + this.originalHardMode);
    console.log("settingsData.hardMode:" + this.settingsData.hardMode);
  }

}
