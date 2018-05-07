import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';
//import { Account} from '../../models/' ;
import { FirebaseItemsAbstract } from '../firebase/firebaseItemsAbstract';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable'; 

@Injectable()
export class UsersProvider extends FirebaseItemsAbstract {
  
  items: Observable<Array<any>>;
  constructor(public afs: AngularFirestore) {
      super('/users',afs);
  }
  
  /*mapElements(action){
        let itemEl=action.payload.doc.data();
        itemEl.key=action.payload.doc.id;
        itemEl.product?itemEl.product.key=itemEl.productRef.id:itemEl.product;
        return itemEl;
  }*/
  
  add(item: any): Promise<any> {
    let normalObject:any=this.toJSON(item);
    return super.add(normalObject);
  }
}
