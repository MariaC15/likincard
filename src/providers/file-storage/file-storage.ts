import { Injectable } from '@angular/core';
import { FirebaseApp } from 'angularfire2';
import 'rxjs/add/operator/map';

/*
  Generated class for the FileStorageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FileStorage {
  firebaseStorage: any;
  constructor(public fireBaseApp: FirebaseApp) {
    console.log('Hello FileStorageProvider Provider');
   
  }
  uploadFileFromString(ref:string,fileName:string,data:any){
    let storageRef = this.fireBaseApp.storage().ref(ref).child(fileName);
    return storageRef.putString(data,'data_url');
  }
  
  static isURL(str:string) {
   let pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return pattern.test(str);
  }
  
  static isValidFileData(fileData:string){
     if (!fileData){
       return false;
     }
     if (this.isURL(fileData)){
       return false
     }else{
       return true;
     }
  }

}
