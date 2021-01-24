import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { GroupService } from '../group.service';

@Component({
  selector: 'app-delete-group',
  templateUrl: './delete-group.component.html',
  styleUrls: ['./delete-group.component.css']
})
export class DeleteGroupComponent implements OnInit {

  constructor(private service: GroupService, @Inject(MAT_DIALOG_DATA) public data: number) { }

  ngOnInit() {
  }

  DeleteGroup(id) {
    this.service.deleteGroup(id).subscribe(
      null,
      error => { alert("Group containing employees cannot be deleted!");},
      () => { alert("Group Successfully deleted") , location.reload();}
    );
  }
}


