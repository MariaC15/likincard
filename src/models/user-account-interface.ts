import { Roles } from './roles';
import * as firebase from 'firebase/app'
import { Organization } from './organization';
import { Address } from './address';

export interface UserAccountInterface extends firebase.User {
  uid: string;
  name: string;
  lastname: string;
  email: string;
  password: string;
  profilePic?: string;
  phone: string;
  type: string;
  roles?: Roles;
  description: string;
  occupation:string;
  address: Address;
  organization?: Organization;
}
