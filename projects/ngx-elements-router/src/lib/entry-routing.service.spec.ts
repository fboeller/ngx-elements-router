import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { EntryRoutingService } from './entry-routing.service';

describe('EntryZoneService - Incoming Routes', () => {
  let service: EntryRoutingService;
  let router: {
    navigateByUrl: (route: string, state: { fromPlatform: boolean }) => void;
  };
  let incomingRoute$: Subject<string | undefined>;
  let subscription: Subscription;

  beforeEach(() => {
    router = {
      navigateByUrl: jest.fn(),
    };
    service = new EntryRoutingService(router as Router);
    incomingRoute$ = new Subject<string | undefined>();
    subscription = service.registerIncomingRouting(incomingRoute$);
  });

  it('does not navigate if no route is incoming', () => {
    expect(router.navigateByUrl).toHaveBeenCalledTimes(0);
  });

  it('navigates to the incoming url', () => {
    incomingRoute$.next('/my-url');
    expect(router.navigateByUrl).toHaveBeenCalledWith('/my-url', {
      state: { fromPlatform: true },
    });
    expect(router.navigateByUrl).toHaveBeenCalledTimes(1);
  });

  it('navigates to the second url', () => {
    incomingRoute$.next('/my-url');
    incomingRoute$.next('/my-other-url');
    expect(router.navigateByUrl).toHaveBeenCalledWith('/my-other-url', {
      state: { fromPlatform: true },
    });
    expect(router.navigateByUrl).toHaveBeenCalledTimes(2);
  });

  it('does not navigate to the same url twice', () => {
    incomingRoute$.next('/my-url');
    incomingRoute$.next('/my-url');
    expect(router.navigateByUrl).toHaveBeenCalledWith('/my-url', {
      state: { fromPlatform: true },
    });
    expect(router.navigateByUrl).toHaveBeenCalledTimes(1);
  });

  it('does not navigate after unsubscribed', () => {
    subscription.unsubscribe();
    incomingRoute$.next('/my-url');
    expect(router.navigateByUrl).toHaveBeenCalledTimes(0);
  });
});
