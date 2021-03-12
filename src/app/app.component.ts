import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
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
  addButton(event: any): void {
    this.notes += event.target.value;
  }
  changeNote(event: any) {
    this.note = event.target.value;
  }
  playSound() {
    this.notes += this.note;
    const synth = new Tone.Synth().toDestination();
    synth.triggerAttackRelease(this.note, '8n');
    this.notes += ' ';
  }
  playAllNotes() {
    const synth = new Tone.Synth().toDestination();
    const array = this.notes.split(' ');
    synth.sync();

    let counter = 0;

    for (let i = 0; i < array.length - 1; i++) {
      synth.triggerAttackRelease(array[i], '8n', counter);
      counter++;
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
