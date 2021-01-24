import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { groupObject } from '../group.model';
import { GroupService } from '../group.service';

@Component({
  selector: 'app-group-info',
  templateUrl: './group-info.component.html',
  styleUrls: ['./group-info.component.css']
})
export class GroupInfoComponent implements OnInit {

  constructor(private service: GroupService, @Inject(MAT_DIALOG_DATA) public data: groupObject) { }

  ngOnInit() {
  }
  EditGroup(group: groupObject) {
    this.service.editGroup(group).subscribe(
      null ,
      error => { alert("Error occured while trying to change group name"); },
      () => { alert("Successfully edited");}
    )
  }
}


