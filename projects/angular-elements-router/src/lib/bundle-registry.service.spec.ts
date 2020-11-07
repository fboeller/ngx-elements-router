import { BundleIdentifier } from './bundle-identifier';
import { BundleRegistryService } from './bundle-registry.service';

describe('BundleRegistryService', () => {
  let service: BundleRegistryService;
  jest.spyOn(document, 'createElement').mockImplementation(() => ({} as any));
  jest
    .spyOn(document.body, 'appendChild')
    .mockImplementation(() => ({} as any));
  let whenDefinedSpy: jest.SpyInstance;

  beforeEach(() => {
    service = new BundleRegistryService();
    whenDefinedSpy = jest
      .spyOn(window.customElements, 'whenDefined')
      .mockImplementation(() => Promise.resolve());
  });

  it('should not have any web component loaded on startup', () => {
    expect(service.isBundleLoaded('http://localhost:4200/main.js')).toBeFalsy();
  });

  it('should load a web component that has not been loaded yet', async () => {
    const bundleIdentifier: BundleIdentifier = {
      customElementName: 'my-element',
      bundleUrl: 'http://localhost:4200/main.js',
    };
    expect(await service.loadBundle(bundleIdentifier)).toBeTruthy();
    expect(
      await service.isBundleLoaded(bundleIdentifier.bundleUrl)
    ).toBeTruthy();
  });

  it('should return the status failed if waiting for a custom element fails', async () => {
    const bundleIdentifier: BundleIdentifier = {
      customElementName: 'my-element',
      bundleUrl: 'http://localhost:4200/main.js',
    };
    whenDefinedSpy.mockReturnValue(Promise.reject('Some error'));
    expect(await service.loadBundle(bundleIdentifier)).toBeFalsy();
    expect(
      await service.isBundleLoaded(bundleIdentifier.bundleUrl)
    ).toBeFalsy();
    expect(
      await service.getLoadingState(bundleIdentifier.bundleUrl)
    ).toEqual('FAILED');
  });

  it('should load multiple web components', async () => {
    const bundleIdentifier1: BundleIdentifier = {
      customElementName: 'my-element-1',
      bundleUrl: 'http://localhost:4200/main.js',
    };
    const bundleIdentifier2: BundleIdentifier = {
      customElementName: 'my-element-1',
      bundleUrl: 'http://localhost:4200/main.js',
    };
    expect(await service.loadBundle(bundleIdentifier1)).toBeTruthy();
    expect(await service.loadBundle(bundleIdentifier2)).toBeTruthy();
    expect(
      await service.isBundleLoaded(bundleIdentifier1.bundleUrl)
    ).toBeTruthy();
    expect(
      await service.isBundleLoaded(bundleIdentifier2.bundleUrl)
    ).toBeTruthy();
    expect(await service.isBundleLoaded('my-element-3')).toBeFalsy();
  });
});
