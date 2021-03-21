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
  grid2: Array<string>;
  gridNotes: string;
  time: Array<string>;
  dropdownItem: string;
  tempo: Array<number>;
  tempoItem: number;
  counter: number;
  tone: Array<string>;
  toneItem: string;
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
      'D6',
      'E6',
      'F6',
      'G6',
      'A6',
      'B6',
    ];
    this.grid2 = [
      'C4',
      'Db4',
      'D4',
      'Eb4',
      'E4',
      'F4',
      'F#4',
      'G4',
      'Ab4',
      'A4',
      'Bb4',
      'B4',
      'C5',
      'Db5',
      'D5',
      'Eb5',
      'E5',
      'F5',
      'F#5',
      'G5',
      'Ab5',
      'A5',
      'Bb5',
      'B5',
      'C6',
    ];
    this.gridNotes = '';
    this.time = ['4n', '2n', '1n', '8n'];
    this.dropdownItem = this.time[0];
    this.tempo = [0.3, 0.5, 0.7, 1, 1.5, 2];
    this.tempoItem = 1;
    this.counter = 0;
    this.tone = ['1', '2', '3', '4'];
    this.toneItem = '1';
  }
  changeValue(event: any) {
    const target = event.target.innerText;
    if (event.target.name === 'tempo') {
      this.tempoItem = Number(target);
      this.counter = 0;
    } else if (event.target.name === 'tone') {
      this.toneItem = target;
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
    const synth = new Tone.MonoSynth().toDestination();
    const array = this.gridNotes.split(' ');

    synth.sync();
    for (let i = 0; i < array.length - 1; i++) {
      synth.triggerAttackRelease(array[i], this.dropdownItem, this.counter);
      this.counter += this.tempoItem;
      Tone.Transport.start();
    }
    setTimeout(() => {
      Tone.Transport.stop();
      synth.unsync();
      this.counter = 0;
    }, this.counter * 1000);
  }
  celine() {
    const myHeart = [
      'E4',
      'F#4',
      'B3',
      'B4',
      'A4',
      'G#4',
      'F#4',
      'G#4',
      'A4',
      'G#4',
      'F#4',
      'E4',
      'D#4',
      'E4',
      'D#4',
      'C#4',
      'B3',
    ];
    const synth = new Tone.MonoSynth().toDestination();
    synth.sync();
    synth.triggerAttackRelease(myHeart[0], '1n', 0);
    synth.triggerAttackRelease(myHeart[1], '2n', 2);
    synth.triggerAttackRelease(myHeart[2], '4n', 3);
    synth.triggerAttackRelease(myHeart[3], '2n', 4);
    synth.triggerAttackRelease(myHeart[4], '8n', 5);
    synth.triggerAttackRelease(myHeart[5], '8n', 5.5);
    synth.triggerAttackRelease(myHeart[6], '2n', 6);
    synth.triggerAttackRelease(myHeart[7], '8n', 7);
    synth.triggerAttackRelease(myHeart[8], '8n', 7.5);
    synth.triggerAttackRelease(myHeart[9], '2n', 8);
    synth.triggerAttackRelease(myHeart[10], '8n', 9);
    synth.triggerAttackRelease(myHeart[11], '8n', 9.5);
    synth.triggerAttackRelease(myHeart[12], '8n', 10);
    synth.triggerAttackRelease(myHeart[13], '4n', 10.5);
    synth.triggerAttackRelease(myHeart[14], '8n', 11.5);
    synth.triggerAttackRelease(myHeart[15], '1n', 12);
    synth.triggerAttackRelease(myHeart[16], '1n', 14);
    Tone.Transport.start();
    Tone.Transport.stop(25);
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
