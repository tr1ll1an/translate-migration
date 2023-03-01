import 'zone.js/dist/zone';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <h1>Migrate translattion</h1>
   <div class="d-flex">  <textarea [formControl] ="sourseTranslates"> </textarea>
   <pre> {{formattedTranslate$ | async | json}} </pre></div>
  `,
})
export class App {
  sourseTranslates = new FormControl();
  formattedTranslate$: Observable<Object> =
    this.sourseTranslates.valueChanges.pipe(map((data) => this.format(data)));

  format(data) {
    const res = data.replace(/\"/g, '').split('\n');
    return res.reduce((acc, curr) => {
      const t = curr.split('=');
      return { ...acc, [t[0]]: `${t[1]}` };
    }, {});
  }
}

bootstrapApplication(App);
