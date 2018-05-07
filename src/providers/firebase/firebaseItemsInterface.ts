import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';


export interface FirebaseItemsInterface {
  
  afs: AngularFirestore;
  itemsCollection: AngularFirestoreCollection<any>;
  items: Observable<any>;

  defaultItem?: any;
  
  query(params?: any): any;

  add(item: any) :any;

  delete(item: any): any;

}


