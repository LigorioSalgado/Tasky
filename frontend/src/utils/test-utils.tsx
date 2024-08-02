import { NextRouter } from 'next/router';

export function createMockRouter(router: Partial<NextRouter>): NextRouter {
  return {
    basePath: '',
    pathname: '/',
    route: '/',
    asPath: '/',
    query: {},
    back: jest.fn(),
    beforePopState: jest.fn(),
    prefetch: jest.fn().resolves(undefined),
    push: jest.fn().resolves(true),
    reload: jest.fn(),
    replace: jest.fn().resolves(true),
    events: {
      on: jest.fn(),
      off: jest.fn(),
      emit: jest.fn(),
    },
    isFallback: false,
    isLocaleDomain: false,
    isReady: true,
    defaultLocale: 'en',
    domainLocales: [],
    ...router,
  };
}
