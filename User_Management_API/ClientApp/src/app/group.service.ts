import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Group, groupObject } from './group.model';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  getAllGroupsUrl: string = "https://localhost:44363/api/Group/GetAllGroups";

  deleteGroupUrl: string = "https://localhost:44363/api/Group/DeleteGroup";

  editGroupUrl: string = "https://localhost:44363/api/Group/EditGroupName";

  createGroupUrl: string = "https://localhost:44363/api/Group/CreateGroup";

  constructor(private http: HttpClient) { }

  getAllGroups(): Observable<any> {
    return this.http.get(this.getAllGroupsUrl);
  }

  deleteGroup(groupID: number)  {
    return this.http.post(this.deleteGroupUrl, groupID);
  }

  editGroup(group: groupObject) {
    return this.http.post(this.editGroupUrl, group);
  }

  createGroup(group: groupObject) {
    return this.http.post(this.createGroupUrl, group);
  }
}



