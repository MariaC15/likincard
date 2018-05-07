import { Api } from './api/api';
import { Items } from '../mocks/providers/items';
import { FirebaseConfig } from './firebase/firebaseConfig';
import { Settings } from './settings/settings';
import { User } from './user/user';
import { LoadingService } from './loading-service/loading.service';
import { UsersProvider } from './users/users';
import { FileStorage } from './file-storage/file-storage';

export {
    Api,
    FileStorage,
    FirebaseConfig,
    LoadingService,
    Items,
    Settings,
    User,
    UsersProvider
};

export const defaultProviders = [FileStorage,LoadingService];
