import { Component, OnInit } from '@angular/core';
import * as Tone from 'tone';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  note: string;
  notes: Array<string>;
  grid: Array<string>;
  gridNotes: string;
  time: Array<string>;
  dropdownItem: string;
  tempo: Array<number>;
  tempoItem: number;
  counter: number;
  constructor() {
    this.note = '';
    this.notes = [];
    this.grid = [
      'C4',
      'D4',
      'E4',
      'F4',
      'G4',
      'A4',
      'B4',
      'C5',
      'D5',
      'E5',
      'F5',
      'G5',
      'A5',
      'B5',
      'C6',
    ];
    this.gridNotes = '';
    this.time = ['4n', '2n', '1n', '8n'];
    this.dropdownItem = this.time[0];
    this.tempo = [0.3, 0.5, 0.7, 1, 1.5, 2];
    this.tempoItem = 1;
    this.counter = 0;
  }
  changeValue(event: any) {
    const target = event.target.innerText;
    if (event.target.name === 'tempo') {
      this.tempoItem = Number(target);
      this.counter = 0;
    } else {
      this.dropdownItem = target;
    }
  }
  addButton(event: any): void {
    this.grid.push(this.note);
  }
  changeNote(event: any) {
    this.note = event.target.value;
  }
  addToGrid(event: any) {
    this.grid.push(this.note);
  }
  clearAllNotes() {
    this.notes = [];
    this.gridNotes = '';
  }
  playGridNote(event: any) {
    const synth = new Tone.MonoSynth().toDestination();
    synth.triggerAttackRelease(event.target.innerText, this.dropdownItem);
    this.gridNotes += event.target.innerText;
    this.gridNotes += ' ';
  }
  playAllGridNotes() {
    const array = this.gridNotes.split(' ');
    const synth = new Tone.MonoSynth().toDestination();
    synth.sync();
    for (let i = 0; i < array.length - 1; i++) {
      synth.triggerAttackRelease(array[i], this.dropdownItem, this.counter);
      this.counter += this.tempoItem;
      Tone.Transport.start();
    }
    setTimeout(() => {
      Tone.Transport.stop();
      synth.unsync();
    }, this.counter * 1000);
  }
}

//  recordSound() {
//     const recorder = new Tone.Recorder();
//     recorder.start();
//     setTimeout(async () => {
//       // the recorded audio is returned as a blob
//       const recording = await recorder.stop();
//       // download the recording by creating an anchor element and blob url
//       const url = URL.createObjectURL(recording);
//       const anchor = document.createElement('a');
//       anchor.download = 'recording.webm';
//       anchor.href = url;
//       anchor.click();
//     }, 4000);
//   }

// @Pipe({ name: 'stringy' })
// export class StringyPipe implements PipeTransform {
//   transform(input: any[]): any {
//     return input.map((value) => value);
//   }
// }

// playAllNotes() {
//   const synth = new Tone.Synth().toDestination();
//   const array = this.notes;
//   synth.sync();

//   let counter = 0;

//   for (let i = 0; i < array.length - 1; i++) {
//     synth.triggerAttackRelease(array[i], '4n', counter);
//     counter++;
//   }
//   Tone.Transport.start();
//   setTimeout(() => {
//     Tone.Transport.stop();
//   }, counter * 1000);
// }

// playSound() {
//   this.notes.push(this.note);
//   const synth = new Tone.Synth().toDestination();
//   synth.triggerAttackRelease(this.note, '8n');
// }
