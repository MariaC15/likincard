import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection
} from 'angularfire2/firestore';
import { FirebaseItemsInterface } from './firebaseItemsInterface';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';

@Injectable()
export abstract class FirebaseItemsAbstract implements FirebaseItemsInterface {
  itemsCollection: AngularFirestoreCollection<any>;
  items: Observable<any>;
  filteredCollection: any;

  //defaultItem?: any;

  constructor(public firebaseRoute: string, public afs: AngularFirestore) {
    this.itemsCollection = afs.collection<any>(firebaseRoute);
    this.items = this.getItems();
  }

  mapElements(action) {
    let itemEl = action.payload.doc.data();
    itemEl.key = action.payload.doc.id;
    return itemEl;
  }

  query(params?: any): Observable<any> {
    if (!params) {
      return this.getItems();
    }
    this.filteredCollection = this.afs.collection<any>(
      this.firebaseRoute,
      params
    );
    return this.filteredCollection.snapshotChanges().map(list => {
      return list.map(this.mapElements);
    });
  }

  add(item: any): Promise<any> {
    // Persist a document id
    //let id = this.afs.createId();
    return this.itemsCollection.add(item);
  }

  getDocByKey(key: string): AngularFirestoreDocument<any> {
    return this.itemsCollection.doc(key);
  }

  findBy(field: string, value: string) {
    let findByFilterFunction = ref => ref.where(field, '==', value);
    return this.query(findByFilterFunction);
  }

  findOneBy(field: string, value: string) {
    return this.findBy(field, value).map((elements: any[]) => {
      if (elements) {
        return elements[0];
      } else {
        return null;
      }
    });
  }

  getItems(): Observable<any> {
    return this.itemsCollection.snapshotChanges().map(list => {
      return list.map(this.mapElements);
    });
  }

  update(item: any, data: any) {
    return this.itemsCollection.doc(item.key).update(data);
  }

  updateByKey(key: string, data: any) {
    return this.itemsCollection.doc(key).update(data);
  }

  delete(item: any) {
    return this.itemsCollection.doc(item.key).delete();
  }
  toSimpleObject(item: any) {
    return JSON.parse(JSON.stringify(item));
  }

  toJSON(obj) {
    let json = {};
    Object.keys(obj).forEach(e => {
      json[e] = _.clone(obj[e]);
    });
    return json;
  }
}
