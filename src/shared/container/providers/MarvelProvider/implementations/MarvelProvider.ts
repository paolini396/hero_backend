import { injectable, inject } from 'tsyringe';

import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';

import apiMarvel from '@config/marvel';

import IMarvelProvider from '../models/IMarvelProvider';

@injectable()
class MarvelProvider implements IMarvelProvider {
  constructor(
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async marvelKeys(): Promise<void> {
    const hashMarvel = await this.hashProvider.generateHash(
      `${process.env.MARVEL_TS}${process.env.MARVEL_API_PUBLIC_KEY}${process.env.MARVEL_API_PRIVATE_KEY}
    `,
    );

    console.log({ hashMarvel });

    apiMarvel.interceptors.request.use(config => {
      const auxConfig = config;
      auxConfig.params = auxConfig.params || {};
      auxConfig.params.ts = process.env.MARVEL_TS;
      auxConfig.params.apikey = process.env.MARVEL_API_PUBLIC_KEY;
      auxConfig.params.hash = process.env.MARVEL_API_HASH;
      return config;
    });
  }
}

export default MarvelProvider;
