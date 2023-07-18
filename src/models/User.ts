//sintaxe longa 
/* export class User {
    id: string
    name: string
    email: string
    password: string
    createdAt: string

    constructor(
        id: string,
        name: string,
        email: string,
        password: string,
        createdAt: string
    ) {
        this.id = id; 
        this.name = name;
        this.email = email;
        this.password = password;
        this.createdAt = createdAt;
    }

} */

//sintaxe curta
export class User {
    constructor(
       private id: string,
       private name: string,
       private email: string,
       private password: string,
       private createdAt: string
    ){}
        getId(): string { return this.id; }
        getName(): string{ return this.name; }
        getEmail(): string{ return this.email; }
        getPassword(): string{ return this.password; }
        getCreatedAt(): string{return this.createdAt}

        setName(name:string):void{
            this.name = name;
        }
        setEmail(email:string):void{
            this.email = email;
        }
        setPassword(password:string):void{
            this.password = password;
        }
}

const newUser = new User("id", "name", "email", "password", "createdAt");

/* console.log("1" , newUser.getName());
newUser.setName("joão")
console.log("2", newUser.getName()); */
