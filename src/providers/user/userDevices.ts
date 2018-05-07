import { Firebase } from '@ionic-native/firebase';
import { Platform } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { UserData } from './userData';
import { Subscription } from 'rxjs/Subscription';

export abstract class UserDevices extends UserData  {
  
  FCMToken;
  userDevicesFCMDoc: AngularFirestoreDocument<any>;
  userDevices;
  userDevicesSubscription:Subscription;
  constructor(public db: AngularFirestore, public firebasePlugin: Firebase, public platform: Platform){
        super(db);
        this.platform.ready().then(() => {
        if (this.platform.is('cordova'))
        {
           this.firebasePlugin.getToken()
              .then(token => {
                              console.log(`The token is ${token}`);
                              this.FCMToken=token;
                        }) // save the token server-side and use it to push notifications to this device
              .catch(error => console.error('Error getting token', error));
           this.firebasePlugin.onTokenRefresh()
            .subscribe((token: string) =>{
               console.log(`Got a new token ${token}`);
               this.FCMToken=token;
               try{
                 this.registerFCMToken();
               }catch(e){
                 console.log('Error updating token',e);
               }
           });   
        }
        });
    
  } 
  public fillUserData(currentUserId){
     super.fillUserData(currentUserId);
     if (this.platform.is('cordova'))
        {
          this.registerFCMToken();
        }
  }
  registerFCMToken(token?:string){
    this.userDevicesFCMDoc = this.userFireStoreDoc.collection('devices').doc('customerFCM');
    this.userDevicesSubscription = this.userDevicesFCMDoc.valueChanges()
                                        .subscribe(res=>{
                                          let devicesFCM:Array<string>;
                                          if (res){
                                            devicesFCM = res.devices||[];
                                          }else{
                                            devicesFCM = [];
                                          }
                                          let newDevice=token || this.FCMToken;
                                          if (devicesFCM.indexOf(newDevice)==-1){
                                            devicesFCM.push(token || this.FCMToken);
                                            this.userDevicesFCMDoc.set({devices:devicesFCM},{merge:true});
                                          }
                                          this.userDevicesSubscription.unsubscribe();
                                          });
    
  }
  
}


