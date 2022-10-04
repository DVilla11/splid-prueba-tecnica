import { identifierName } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Group, User } from 'src/app/interfaces/sing-up';
import { DataSiblingService } from 'src/app/services/data-sibling.service';
import { GroupService } from 'src/app/services/group.service';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  groupForm!: FormGroup;
  name! : string;
  loading : boolean = true
  userInfo!: User;
  listGroups: Group[] = [];
  userName: string;
  
  constructor(private _userData : UserDataService, private router : Router, 
              private data: DataSiblingService, private readonly formBuilder: FormBuilder,
              private _createGroup : GroupService, private readonly route : ActivatedRoute) { }
  
  ngOnInit(): void {
    this.groupForm = this.initForm(),
    this.data.currentMessage.subscribe(message => this.userName = message)
    if(!localStorage.getItem("username")) localStorage.setItem("username", this.userName);
    this.getUserInfo();
    this.route.params.subscribe((params:Params) => {
      this.name = params['name']
    })
  }

  getUserInfo(){
    const user = localStorage.getItem("username")
    this._userData.getData(user as string).subscribe(data => {
      this.userInfo = { id : data.id, username : data.username, email : data.email}
      this.listGroups = data.listGroup as [];
      this.loading = false
    })
  }
  
  onSubmit() : void{
    const user = localStorage.getItem('username');
    const group : Group = {
      name: this.groupForm.value.groupName,
      admin: {username : user as string}
    }
    console.log(group)
    this._createGroup.addGroup(group).subscribe({
      next : (v) => {
        console.log(v)
        this.getUserInfo()
      }
    })
    this.groupForm.reset()
  }


  initForm(): FormGroup {
    return this.formBuilder.group({
      groupName: ['', [Validators.required, Validators.minLength(3)]]
    })
  }


  logOut(){
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.router.navigate(['/login'])
  }

}
