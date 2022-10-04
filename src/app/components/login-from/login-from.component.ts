import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/sing-up';
import { DataSiblingService } from 'src/app/services/data-sibling.service';
import { SingUpService } from 'src/app/services/sing-up.service';

@Component({
  selector: 'app-login-from',
  templateUrl: './login-from.component.html',
  styleUrls: ['./login-from.component.css']
})
export class LoginFromComponent implements OnInit {

  loginForm!: FormGroup;
  userName : string = "";

  constructor(private readonly formBuilder: FormBuilder,
              private _login : SingUpService, private router : Router,
              private data: DataSiblingService) { }

  ngOnInit(): void {
    this.loginForm = this.initForm(),
    this.data.currentMessage.subscribe(message => this.userName = message)
  }

  onSubmit() : void{
    const user : User = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password,
    }

    this._login.login(user).subscribe({
      next : (v) => {
        if(v.headers.get('Authorization')){
          const token = v.headers.get('Authorization')
          localStorage.setItem('token', token as string)
          this.router.navigate(['/home'])
          this.data.setUsername(user.username)
        }
      }
    })
  }


  initForm(): FormGroup {
    return this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(3)]],
    })
  }

}
