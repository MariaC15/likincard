import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/fromPromise';

import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {
_auth : any;
preSavedAccountInfo : any;
userFireStoreDoc: AngularFirestoreDocument<any>;
userFireStore: Observable<any>;
userFireStoreData: any = {};
userName: any;
authState: Observable<any>;

  constructor(private afAuth :  AngularFireAuth, private db: AngularFirestore) { 

    this.authState = afAuth.authState;
        this.authState.subscribe((user: firebase.User) => {
                                              this._auth = user;
                                              if (user){
                                                if (!this.userFireStore){
                                                  this.fillUserData();
                                                }
                                               }
                                              });
  }

  // Returns true if user is logged in
    get authenticated(): boolean {
        return this._auth != null;
    }
  
  
      // Returns current user
    get currentUser(): any {
      return this.authenticated ? this._auth.auth : null;
    }
    // Returns current user UID
    get currentUserId(): string {
      return this.authenticated ? this._auth.uid : '';
    } 

    private fillUserData(){
    console.info('Fill User Data');
    this.userFireStore=this.getUserFireStoreData();
    this.userFireStore.subscribe((res)=>{
         this.userFireStoreData=res;
    });
   }


   private getUserFireStoreData(){
     this.userFireStoreDoc= this.db.collection("users").doc(this.currentUserId);
     return this.userFireStoreDoc.valueChanges();
  }
  // Registro de usuario
  registerUser(email:string, password:string){
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
    .then((res)=>{
     // El usuario se ha creado correctamente.
    })
    .catch(err=>Promise.reject(err))
 }

 login(accountInfo: any, mode?: any) {
    
    let seq = this.afAuth.auth.signInWithEmailAndPassword(accountInfo.email, accountInfo.password);
    
    seq.then((res)=>{
        console.log("login exitoso");
        this._loggedIn(res,accountInfo,mode);
    })
    .catch((error)=>{
        console.error('ERROR EN LOGIN', error);
    });

    return seq;
  }

  /**
   * Process a login/signup response to store user data
   */
  _loggedIn(resp, accountInfo?, mode?) {
    this._auth = resp;  //res.user en code movil
    if (accountInfo && mode=="create")
        {
            accountInfo? this.updateUserData(accountInfo):null;
        }
  }

  private updateUserData(accountInfo): void {
        //let path = `users/${this.currentUserId}`; // Endpoint on firebase
        let data = accountInfo;
        let userDoc= this.db.collection("users").doc(this.currentUserId);
        userDoc.set(data)
        .catch(error => console.log("error al actualizar userData",error));
  }

  /**
   * Send a POST request to our signup endpoint with the data
   * the user entered on the form.
   */
  signup(accountInfo: any) {
     
    let seq = this.afAuth.auth.createUserWithEmailAndPassword(accountInfo.email,  accountInfo.password);
    seq.then((res)=>{
      this.preSavedAccountInfo=accountInfo;
      return this.login(accountInfo,'create');
    }).catch((error)=>{
      // Error; SMS not sent
      // ...
      console.error('ERROR', error);
    });  
     
    return seq;
  }

  // Login de usuario
 loginUser(email:string, password:string){
   return this.afAuth.auth.signInWithEmailAndPassword(email, password)
     .then(user=>Promise.resolve(user))
     .catch(err=>Promise.reject(err))
 }

 // Logout de usuario
 logout(){
   this.afAuth.auth.signOut().then(()=>{
     // hemos salido
   })
 }

  // Devuelve la session
 get Session(){
  return this.afAuth.authState;
 }

}
