import { LoadBundleGuard } from './load-bundle.guard';
import { BundleRegistryService } from './bundle-registry.service';

describe('LoadBundleGuard', () => {
  let guard: LoadBundleGuard;
  let serviceSpy: jest.SpyInstance;
  const consoleErrorSpy = jest
    .spyOn(console, 'error')
    .mockImplementation(() => {});

  beforeEach(() => {
    const service: Partial<BundleRegistryService> = {
      loadBundle: () => Promise.resolve(true),
    };
    guard = new LoadBundleGuard(service as BundleRegistryService);
    serviceSpy = jest.spyOn(service, 'loadBundle');
  });

  afterEach(() => {
    consoleErrorSpy.mockClear();
  });

  it.each([
    [{ data: {} }],
    [{ data: { bundleUrl: [] } }],
    [{ data: { bundleUrl: {} } }],
    [{ data: { bundleUrl: undefined } }],
    [{ data: { bundleUrl: null } }],
    [{ data: { bundleUrl: false } }],
    [{ data: { bundleUrl: 0 } }],
  ])('should fail if the route is missing data', async (route) => {
    expect(await guard.canActivate(route as any)).toBeFalsy();
    expect(serviceSpy).toBeCalledTimes(0);
    expect(consoleErrorSpy).toBeCalledTimes(1);
  });

  it('should load a bundle and return true', async () => {
    const route = {
      data: {
        bundleUrl: 'http://localhost:4200/main.js',
      },
    };
    expect(await guard.canActivate(route as any)).toBeTruthy();
    expect(serviceSpy).toBeCalledWith('http://localhost:4200/main.js');
    expect(consoleErrorSpy).toBeCalledTimes(0);
  });
});
