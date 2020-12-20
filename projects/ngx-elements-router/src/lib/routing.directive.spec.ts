import { Router } from '@angular/router';
import { RoutingDirective } from './routing.directive';

describe('RoutingDirective', () => {
  let directive: RoutingDirective;
  let navigateByUrlSpy: jest.SpyInstance;

  beforeEach(() => {
    const router: Partial<Router> = {
      navigateByUrl: () => Promise.resolve(true),
      navigate: () => Promise.resolve(true),
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
    directive.navigateToUrl('/a/b');
    expect(navigateByUrlSpy).toBeCalledWith('/a/b');
  });

  it('navigates to / if the route is /', () => {
    directive.navigateToUrl('/');
    expect(navigateByUrlSpy).toBeCalledWith('/');
  });

  it('does not navigate on relative urls', () => {
    directive.navigateToUrl('./');
    expect(navigateByUrlSpy).toHaveBeenCalledTimes(0);
  });
});
