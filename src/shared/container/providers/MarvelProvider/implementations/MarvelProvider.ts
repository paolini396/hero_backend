import md5 from 'md5';

import apiMarvel from '@config/marvel';

import IMarvelProvider from '../models/IMarvelProvider';

class MarvelProvider implements IMarvelProvider {
  public async marvelKeys(): Promise<void> {
    const ts = Date.now().toString();
    const toHash =
      ts +
      process.env.MARVEL_API_PRIVATE_KEY +
      process.env.MARVEL_API_PUBLIC_KEY;

    const hash = md5(toHash);

    apiMarvel.interceptors.request.use(config => {
      const auxConfig = config;
      auxConfig.params = auxConfig.params || {};
      auxConfig.params.ts = ts;
      auxConfig.params.apikey = process.env.MARVEL_API_PUBLIC_KEY;
      auxConfig.params.hash = hash;
      return config;
    });
  }
}

export default MarvelProvider;
