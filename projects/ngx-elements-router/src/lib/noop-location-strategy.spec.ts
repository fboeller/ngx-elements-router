import { PlatformLocation } from '@angular/common';
import { NoopLocationStrategy } from './noop-location-strategy';

describe('NoopLocationStrategy', () => {
  it('should return the base href from the injection token if set', () => {
    const strategy = new NoopLocationStrategy(null as any, '/app-base-href');
    expect(strategy.getBaseHref()).toEqual('/app-base-href');
  });

  it('should return the base href from the platform location if the one from the base href is unset', () => {
    const platformLocation: Partial<PlatformLocation> = {
      getBaseHrefFromDOM: () => '/platform-base-href',
    };
    const strategy = new NoopLocationStrategy(
      platformLocation as PlatformLocation,
      undefined
    );
    expect(strategy.getBaseHref()).toEqual('/platform-base-href');
  });

  it('should throw an error if no base href is provided', () => {
    expect(() => new NoopLocationStrategy(null as any, undefined)).toThrowError(
      new Error(`Cannot read property 'getBaseHrefFromDOM' of null`)
    );
  });

  it.each([
    ['/base', '/internal', '/base/internal'],
    ['/base/', '/internal', '/base/internal'],
    ['/base/', 'internal', '/base/internal'],
    ['/base', 'internal', '/base/internal'],
  ])(
    'should prepare a correct external url from the base href %s and the internal url %s',
    (baseHref, internal, expected) => {
      const strategy = new NoopLocationStrategy(
        (undefined as unknown) as PlatformLocation,
        baseHref
      );
      expect(strategy.prepareExternalUrl(internal)).toEqual(expected);
    }
  );
});
