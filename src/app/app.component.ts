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
  constructor() {
    this.note = '';
    this.notes = [];
    this.grid = [];
    this.gridNotes = '';
  }
  ngAfterContentInit() {
    this.gridGenerator([
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
      '',
    ]);
  }
  addButton(event: any): void {
    this.grid.push(event.target.value);
  }
  gridGenerator = (array: any) => {
    for (var i = 0; i < array.length; i++) {
      this.grid.push(array[i] + ' ');
    }
  };
  changeNote(event: any) {
    this.note = event.target.value;
  }
  playSound() {
    this.notes.push(this.note);
    const synth = new Tone.Synth().toDestination();
    synth.triggerAttackRelease(this.note, '8n');
  }
  playAllNotes() {
    const synth = new Tone.Synth().toDestination();
    const array = this.notes;
    synth.sync();

    let counter = 0;
    console.log(this.notes);

    for (let i = 0; i < array.length - 1; i++) {
      synth.triggerAttackRelease(array[i], '4n', counter);
      counter++;
    }
    Tone.Transport.start();
    setTimeout(() => {
      Tone.Transport.stop();
    }, counter * 1000);
  }
  clearAllNotes() {
    this.notes = [];
    this.gridNotes = '';
  }
  playGridNote(event: any) {
    const synth = new Tone.MonoSynth().toDestination();
    console.log(event);
    synth.triggerAttackRelease(event.target.innerText, '8n');
    this.gridNotes += event.target.innerText;
    this.gridNotes += ' ';
  }
  playAllGridNotes() {
    const synth = new Tone.MonoSynth().toDestination();
    const array = this.gridNotes.split(' ');
    synth.sync();

    let counter = 0;

    for (let i = 0; i < array.length - 1; i++) {
      synth.triggerAttackRelease(array[i], '8n', counter);
      counter += 0.5;
    }
    Tone.Transport.start();
    setTimeout(() => {
      Tone.Transport.stop();
    }, counter * 1000);
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
