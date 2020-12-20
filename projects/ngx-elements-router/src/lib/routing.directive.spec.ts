import { Router } from '@angular/router';
import { RoutingDirective } from './routing.directive';

describe('RoutingDirective', () => {
  let directive: RoutingDirective;
  let navigateByUrlSpy: jest.SpyInstance;
  jest.spyOn(console, 'warn').mockImplementation(() => {});

  beforeEach(() => {
    const router: Partial<Router> = {
      navigateByUrl: () => Promise.resolve(true),
    };
    const activatedRoute = {
      parent: 'parent',
    };
    navigateByUrlSpy = jest.spyOn(router, 'navigateByUrl');
    directive = new RoutingDirective(
      null as any,
      router as any,
      activatedRoute as any
    );
  });

  it('navigates to the url', () => {
    directive.navigateToUrl({ url: '/a/b', replaceUrl: false });
    expect(navigateByUrlSpy).toBeCalledWith('/a/b', { replaceUrl: false });
  });

  it('navigates to / if the route is /', () => {
    directive.navigateToUrl({ url: '/', replaceUrl: false });
    expect(navigateByUrlSpy).toBeCalledWith('/', { replaceUrl: false });
  });

  it('does not navigate on relative urls', () => {
    directive.navigateToUrl({ url: './', replaceUrl: false });
    expect(navigateByUrlSpy).toHaveBeenCalledTimes(0);
  });
});
