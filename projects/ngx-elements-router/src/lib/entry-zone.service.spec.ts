import { EntryZoneService } from './entry-zone.service';
import { ApplicationRef, NgZone } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';

describe('EntryZoneService', () => {
  let service: EntryZoneService;
  let zone: { run: (f: () => void) => void };
  let applicationRef: { tick: () => void };
  let microtaskEmpty$$: Subject<Observable<void>>;
  let subscription: Subscription;

  beforeEach(() => {
    zone = {
      run: (f) => {
        f();
      },
    };
    applicationRef = {
      tick: jest.fn(),
    };
    service = new EntryZoneService(
      zone as NgZone,
      applicationRef as ApplicationRef
    );
    microtaskEmpty$$ = new Subject<Observable<void>>();
    subscription = service.registerZone(microtaskEmpty$$);
  });

  it('does not call tick if no microtask empty queue is emitted', () => {
    expect(applicationRef.tick).toHaveBeenCalledTimes(0);
  });

  it('does not call tick if a microtask empty queue is emitted but it has not emitted something', () => {
    const microtaskEmpty$ = new Subject<void>();
    microtaskEmpty$$.next(microtaskEmpty$);
    expect(applicationRef.tick).toHaveBeenCalledTimes(0);
  });

  it('calls tick if the microtasks are empty', () => {
    const microtaskEmpty$ = new Subject<void>();
    microtaskEmpty$$.next(microtaskEmpty$);
    microtaskEmpty$.next();
    expect(applicationRef.tick).toHaveBeenCalledTimes(1);
  });

  it('does not consider microtask empty events from older queues', () => {
    const previousMicrotaskEmpty$ = new Subject<void>();
    microtaskEmpty$$.next(previousMicrotaskEmpty$);
    const newMicrotaskEmpty$ = new Subject<void>();
    microtaskEmpty$$.next(newMicrotaskEmpty$);
    previousMicrotaskEmpty$.next();
    expect(applicationRef.tick).toHaveBeenCalledTimes(0);
  });

  it('calls tick if the newest microtask empty queue is empty', () => {
    const previousMicrotaskEmpty$ = new Subject<void>();
    microtaskEmpty$$.next(previousMicrotaskEmpty$);
    const newMicrotaskEmpty$ = new Subject<void>();
    microtaskEmpty$$.next(newMicrotaskEmpty$);
    newMicrotaskEmpty$.next();
    expect(applicationRef.tick).toHaveBeenCalledTimes(1);
  });

  it('calls tick for each microtask empty event', () => {
    const microtaskEmpty$ = new Subject<void>();
    microtaskEmpty$$.next(microtaskEmpty$);
    microtaskEmpty$.next();
    expect(applicationRef.tick).toHaveBeenCalledTimes(1);
    microtaskEmpty$.next();
    expect(applicationRef.tick).toHaveBeenCalledTimes(2);
    microtaskEmpty$.next();
    expect(applicationRef.tick).toHaveBeenCalledTimes(3);
  });

  it('does not consider microtask empty events once unsubscribed', () => {
    const microtaskEmpty$ = new Subject<void>();
    microtaskEmpty$$.next(microtaskEmpty$);
    subscription.unsubscribe();
    microtaskEmpty$.next();
    expect(applicationRef.tick).toHaveBeenCalledTimes(0);
  });

  it('does not consider microtask empty events if undefined is passed as a micro task empty queue', () => {
    const microtaskEmpty$ = new Subject<void>();
    microtaskEmpty$$.next(microtaskEmpty$);
    microtaskEmpty$$.next(undefined);
    microtaskEmpty$.next();
    expect(applicationRef.tick).toHaveBeenCalledTimes(0);
  });
});
