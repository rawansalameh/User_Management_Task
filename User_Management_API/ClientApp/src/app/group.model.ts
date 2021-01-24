export class Group {
  group: groupObject
  usersCount: number
  companyName: string
}

export interface groupObject {
  groupId?: number
  name: string
  companyId: number
}
