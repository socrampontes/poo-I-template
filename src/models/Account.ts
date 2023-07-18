export class Account{
    constructor(
        private id: string,
        private ownerId: string,
        private balance: number,
        private createdAt: string
    ){}
    getId():string{return this.id;}
    getOwnerId():string{return this.ownerId;}
    getBalance():number{return this.balance;}
    getCreatedAt():string{return this.createdAt;}

    setBalance(balance:number):void{this.balance = balance};
}