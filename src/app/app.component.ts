import { Component, OnInit } from '@angular/core';
import * as Tone from 'tone';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: ['./app.component.css'],
})
export class AppComponent {
  note: string;
  notes: string;
  constructor() {
    this.note = '';
    this.notes = '';
  }
  changeNote(event: any) {
    this.note = event.target.value;
  }
  playSound() {
    this.notes += this.note;
    const synth = new Tone.Synth().toMaster();
    synth.triggerAttackRelease(this.note, '8n');
    this.notes += ' ';
  }
}
