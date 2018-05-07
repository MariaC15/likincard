import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/fromPromise';
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection
} from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';

export abstract class UserData {
  userFireStoreDoc: AngularFirestoreDocument<any>;
  userFireStoreSubscription: Subscription;
  userFireStoreShards: Array<any> = [];
  userFireStoreShardsSubscription: Subscription;
  primaryAddress: any = {};
  primaryAddressDoc: AngularFirestoreCollection<any>;
  primaryAddressSubscription: Subscription;

  readyState: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(public db: AngularFirestore) {}

  public fillUserData(currentUserId) {
    console.info('Fill User Data', currentUserId);

    this.primaryAddressSubscription = this.getPrimaryAddress(
      currentUserId
    ).subscribe(res => {
      this.primaryAddress = res[0];
      this.updateReadyState();
    });

  }

  private getUserFireStoreData(currentUserId) {
    this.userFireStoreDoc = this.db.collection('users').doc(currentUserId);
    /*pendiente de revisar que se apague*/
    this.userFireStoreShardsSubscription = this.userFireStoreDoc
      .collection('shards')
      .valueChanges()
      .subscribe(res => {
        this.userFireStoreShards = res;
        this.updateReadyState();
      });
    return this.userFireStoreDoc.valueChanges();
  }

  private getPrimaryAddress(currentUserId) {
    let primaryAdressFilterFunction = ref =>
      ref.where('owner', '==', currentUserId).limit(1);
    this.primaryAddressDoc = this.db.collection(
      'addresses',
      primaryAdressFilterFunction
    );
    return this.primaryAddressDoc.valueChanges();
  }

  mapElements(action) {
    let itemEl = action.payload.doc.data();
    itemEl.key = action.payload.doc.id;
    return itemEl;
  }

  updateProperty(key,val) {
    let obj = {};
    obj[key]=val;
    this.userFireStoreDoc.update(obj);
  }

  isReadyData() {
    //let shards = !!this.userFireStoreShardsSubscription;
    //return !!this.primaryAddress && shards;
    return true;
  }

  updateReadyState() {
    if (this.isReadyData()) {
      this.readyState.next(true);
    }
    return false;
  }

  onReady(callBack: Function) {
    return this.readyState.subscribe(ready => {
      if (ready) callBack();
    });
  }

  emptyUserData() {
    this.userFireStoreDoc = null;
    this.userFireStoreShards = null;
    this.primaryAddress = null;
    this.primaryAddressDoc = null;
    this.closeSubscriptions();
  }

  closeSubscriptions() {
    if (this.userFireStoreSubscription) {
      this.userFireStoreSubscription.unsubscribe();
      this.userFireStoreSubscription = null;
    }
    if (this.userFireStoreShardsSubscription) {
      this.userFireStoreShardsSubscription.unsubscribe();
      this.userFireStoreShardsSubscription = null;
    }
    if (this.primaryAddressSubscription) {
      this.primaryAddressSubscription.unsubscribe();
      this.primaryAddressSubscription = null;
    }
  }
}
