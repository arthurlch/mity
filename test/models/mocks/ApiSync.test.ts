import { ApiSync } from '../../../src/models/ApiSync';

jest.mock('../../../src/models/ApiSync', () => {
  return {
    ApiSync: jest.fn().mockImplementation(() => {
      return {
        fetch: () => {},
        save: () => {},
      };
    }),
  };
});

describe('ApiSyncConsumer', () => {
  const MockedApiSync = mocked(ApiSync, true);
});

// cant make mocked proc
