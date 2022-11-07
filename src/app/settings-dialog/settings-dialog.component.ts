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

  ngOnInit(): void {
  }

}
