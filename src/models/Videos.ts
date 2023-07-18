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
export class Videos {
    constructor(
       private id: string,
       private title: string,
       private durationInSeconds: string,
       private createdAt: string
    ){}
        getId(): string { return this.id; }
        getTitle(): string{ return this.title; }
        getDuration(): string{ return this.durationInSeconds; }
        getCreatedAt(): string{return this.createdAt}

        setTitle(title:string):void{
            this.title = title;
        }
        setDuration(durationInSeconds:string):void{
            this.durationInSeconds = durationInSeconds;
        }
       
}

