import { container } from 'tsyringe';

import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider';
import IStorageProvider from './StorageProvider/models/IStorageProvider';

import BCryptHashProvider from './HashProvider/implementations/BCryptHashProvider';
import IHashProvider from './HashProvider/models/IHashProvider';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);
