import { Router } from '@angular/router';
import { RoutingDirective } from './routing.directive';

describe('RoutingDirective', () => {
  let directive: RoutingDirective;
  let navigateByUrlSpy: jest.SpyInstance;
  let navigateSpy: jest.SpyInstance;

  beforeEach(() => {
    const router: Partial<Router> = {
      navigateByUrl: () => Promise.resolve(true),
      navigate: () => Promise.resolve(true),
    };
    const activatedRoute = {
      parent: 'parent',
    };
    navigateByUrlSpy = jest.spyOn(router, 'navigateByUrl');
    navigateSpy = jest.spyOn(router, 'navigate');
    directive = new RoutingDirective(
      null as any,
      router as any,
      activatedRoute as any
    );
  });

  it('navigates relative to the base href if the route is prefixed with /root', () => {
    directive.navigateToUrl('/root/my-external-route');
    expect(navigateByUrlSpy).toBeCalledWith('/my-external-route');
  });

  it('navigates to the root when called with /root', () => {
    directive.navigateToUrl('/root');
    expect(navigateByUrlSpy).toBeCalledWith('');
  });

  it('navigates relative to the activated route if the route is not prefixed with /root', () => {
    directive.navigateToUrl('/a/b');
    expect(navigateSpy).toBeCalledWith(['./a/b'], { relativeTo: 'parent' });
  });

  it('navigates to the activated route itself if the route is /', () => {
    directive.navigateToUrl('/');
    expect(navigateSpy).toBeCalledWith(['./'], { relativeTo: 'parent' });
  });
});
