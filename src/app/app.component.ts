import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public form: FormGroup;
  public quizList: FormArray;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      id: [null],
      quiz: this.fb.array([this.initQuizRow()]),
      answers: this.fb.array([this.initAnswerRow(), this.initAnswerRow(), this.initAnswerRow(), this.initAnswerRow()])
    });

    // set quizList to this field
    this.quizList = this.form.get('quiz') as FormArray;
  }

  // returns all form groups under quiz
  get quizFormGroup() {
    return this.form.get('quiz') as FormArray;
  }

  get answersFormGroup() {
    return this.form.get('answers') as FormArray;
  }

  // quiz formGroup
  initQuizRow(): FormGroup {
    return this.fb.group({
      text: ['', Validators.required],
      language: ['none', Validators.required],
    });
  }

  initAnswerRow(): FormGroup {
    return this.fb.group({
      text: ['', Validators.required],
      language: ['none', Validators.required],
      correct: ['0', Validators.required]
    });
  }

  // add a contact form group
  addQuizRow() {
    this.quizList.push(this.initQuizRow());
  }

  // remove contact from group
  removeQuizRow(index) {
    // this.quizList = this.form.get('quiz') as FormArray;
    if (this.quizList.length > 1) {
      this.quizList.removeAt(index);
    }
  }

  // // triggered to change validation of value field type
  // changedFieldType(index) {
  //   let validators = null;
  //
  //   if (this.getQuizFormGroup(index).controls['type'].value === 'email') {
  //     validators = Validators.compose([Validators.required, Validators.email]);
  //   } else {
  //     validators = Validators.compose([
  //       Validators.required,
  //       Validators.pattern(new RegExp('^\\+[0-9]?()[0-9](\\d[0-9]{9})$')) // pattern for validating international phone number
  //     ]);
  //   }
  //
  //   this.getQuizFormGroup(index).controls['value'].setValidators(
  //     validators
  //   );
  //
  //   this.getQuizFormGroup(index).controls['value'].updateValueAndValidity();
  // }

  // get the formgroup under quiz form array
  getQuizFormGroup(index): FormGroup {
    // this.quizList = this.form.get('quiz') as FormArray;
    const formGroup = this.quizList.controls[index] as FormGroup;
    return formGroup;
  }

  // method triggered when form is submitted
  submit() {
    console.log(this.form.value);
  }
}
