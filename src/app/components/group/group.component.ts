import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Friends, Group } from 'src/app/interfaces/sing-up';
import { FriendService } from 'src/app/services/friend.service';
import { GroupService } from 'src/app/services/group.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  friendForm!: FormGroup;
  pathVariable : string;
  groupInfo : Group;
  listFriends : Friends[];
  showFriendForm: Boolean;
  listBalanced:  Array<{ name: string, balance : number }> = [];

  constructor(private readonly route: ActivatedRoute, private _groupService : GroupService,
              private _friendService : FriendService, private readonly formBuilder: FormBuilder) {
    this.route.params.subscribe( params => {
      this.pathVariable = params['name']
    })
    this.showFriendForm = false
   }

  ngOnInit(): void {
    this.friendForm = this.initForm()
    this.getInfoGroup();
  }

  getInfoGroup(){
    this._groupService.getInfoGroup(this.pathVariable).subscribe({
      next : (v) => {
        this.groupInfo = { id : v.id, name : v.name, date : v.date}
        this.listFriends = v.userGroups as []
        this.billBalanced();
      }
    })
  }

  onSubmit(){
    const friend : Friends = {
      name : this.friendForm.value.name,
      description : this.friendForm.value.description,
      bill : this.friendForm.value.bill,
      listGroupsFriends : [{ id : this.groupInfo.id}]
    }
    this._friendService.addFriend(friend).subscribe({
      next : (v) => {
        this.getInfoGroup()
      }
    })
    this.friendForm.reset()
    this.showFriendForm = false
  }

  formFriend(){
    if(!this.showFriendForm) this.showFriendForm = true
    else this.showFriendForm = false
  }

  initForm(): FormGroup {
    return this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(3)]],
      bill: ['', [Validators.required]],

    })
  }

  billBalanced(){
    var totalBill = 0
    var balencedForFriend;
    this.listFriends.forEach(element => {
      totalBill += element.bill
    });
    var div = totalBill / this.listFriends.length
    this.listFriends.forEach(element => {
      balencedForFriend = element.bill - div 
      this.listBalanced.push({ name : element.name, balance : balencedForFriend})
    });
  }

}
