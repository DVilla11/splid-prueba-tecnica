import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/sing-up';
import { SingUpService } from 'src/app/services/sing-up.service';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit {

  singUpForm!: FormGroup;

  constructor(private readonly formBuilder: FormBuilder, 
              private _singUp : SingUpService, private router: Router) { }

  ngOnInit(): void {
    this.singUpForm = this.initForm()
  }

  onSubmit():void{
    const user: User = {
      username: this.singUpForm.value.username,
      email: this.singUpForm.value.email,
      password: this.singUpForm.value.password,
  }

  this._singUp.singUp(user).subscribe({
    next: (v) => {
      console.log(v)
      this.router.navigate(['/login'])
    },
    error: (e : HttpErrorResponse) => {
      console.log(e.error)
    },
    complete: () => console.info('complete')
  })

  }

  initForm(): FormGroup {
    return this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]],
    })
  }
}
