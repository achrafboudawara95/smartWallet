export class user{
    fullname:string;
    email:string;
    id:string;
    image:string;

    setUser(fullname,email,id,image=null){
        this.email=email
        this.fullname=fullname
        this.id=id
        this.image=image
    }
}