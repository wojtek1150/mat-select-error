import { Component } from '@angular/core';

@Component({
  selector: 'appOne-home-page',
  template: `
    <mat-form-field>
      <mat-label>Your Gender *</mat-label>
      <mat-select>
        <mat-option value="male">Male</mat-option>
        <mat-option value="female">Female</mat-option>
        <mat-option value="other">Non-binary / Other</mat-option>
        <mat-option value="decline">Rather not say</mat-option>
      </mat-select>
    </mat-form-field>
  `,
  styles: [`
    :host {
      display: flex;
      flex: 1;
      flex-flow: column;
      overflow-x: hidden;
      overflow-y: auto;
    }
  `]
})
export class HomePageComponent {}
