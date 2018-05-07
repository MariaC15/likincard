/**
 *  Account Class
 *  
 */

export class Account{ 
	
    name: string;
    nickname: string;
    email: string;
    password: string;
    profilePic?:string;
    phone?: string;
    type?: string;
    
    constructor(fields: any) {
      // Quick and dirty extend/assign fields to this model
      for (const f in fields) {
        this[f] = fields[f];
      }
    }
  }