export class User {

    // cnp!: number;
    // lName!: string;
    // fName!: string;
    // eMail!: string;
            
      constructor(public cnp: number,
                  public lname: string,
                  public fname: string,
                  public email: string,
                  public score: number,
                  public admin: number,
                  public banned: number){}  
}
