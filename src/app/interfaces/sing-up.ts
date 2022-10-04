export interface User {
    id? : number,
    username : string,
    password? : string, 
    email? : string,
    listGroup? : Array<Group>
}

export interface Group {
    id? : number,
    admin? : User,
    name? : string,
    totalBill? : number,
    date? : string,
    userGroups? : Array<Friends>
}

export interface Friends {
    id? : number,
    name : string,
    bill : number,
    description : string,
    date? : string
    listGroupsFriends : Array<Group>

}