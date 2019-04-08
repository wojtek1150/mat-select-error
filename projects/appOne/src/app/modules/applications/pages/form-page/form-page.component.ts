import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'form-page',
  templateUrl: './form-page.component.html'
})
export class FormPageComponent {
  formGroup: FormGroup;


  constructor(
    private fb: FormBuilder
  ) {
    this.createForm();
  }


  private createForm(): void {

    // Create group with subgroups to improve validation
    this.formGroup = this.fb.group({
      'personalData': this.fb.group({
        'firstName': [null, Validators.required],
        'lastName': [null, Validators.required],
        'gender': [null, Validators.required]
      }),
    });
  }
}
