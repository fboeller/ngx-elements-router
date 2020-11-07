import { BundleIdentifier } from './bundle-identifier';
import { BundleRegistryService } from './bundle-registry.service';

describe('BundleRegistryService', () => {
  let service: BundleRegistryService;
  jest.spyOn(document, 'createElement').mockImplementation(() => ({} as any));
  jest.spyOn(document.body, 'appendChild').mockImplementation(() => ({} as any));
  jest.spyOn(window.customElements, 'whenDefined').mockImplementation(() => Promise.resolve());

  beforeEach(() => {
    service = new BundleRegistryService();
  });

  it('should not have any web component loaded on startup', () => {
    expect(service.isBundleLoaded('http://localhost:4200/main.js')).toBeFalsy();
  });

  it('should load a web component that has not been loaded yet', async () => {
    const bundleIdentifier: BundleIdentifier = { customElementName: 'x', bundleUrl: 'http://localhost:4200/main.js' };
    expect(await service.loadBundle(bundleIdentifier)).toBeTruthy();
    expect(await service.isBundleLoaded(bundleIdentifier.bundleUrl)).toBeTruthy();
  });

  it('should load multiple web components', async () => {
    const bundleIdentifier1: BundleIdentifier = { customElementName: 'x', bundleUrl: 'http://localhost:4200/main.js' };
    const bundleIdentifier2: BundleIdentifier = { customElementName: 'y', bundleUrl: 'http://localhost:4200/main.js' };
    expect(await service.loadBundle(bundleIdentifier1)).toBeTruthy();
    expect(await service.loadBundle(bundleIdentifier2)).toBeTruthy();
    expect(await service.isBundleLoaded(bundleIdentifier1.bundleUrl)).toBeTruthy();
    expect(await service.isBundleLoaded(bundleIdentifier2.bundleUrl)).toBeTruthy();
    expect(await service.isBundleLoaded('z')).toBeFalsy();
  });
});
