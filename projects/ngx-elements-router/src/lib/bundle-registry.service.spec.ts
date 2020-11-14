import { BundleRegistryService } from './bundle-registry.service';

describe('BundleRegistryService', () => {
  let service: BundleRegistryService;
  let script: any;

  beforeEach(() => {
    service = new BundleRegistryService();
    script = {} as any;
    jest.spyOn(document, 'createElement').mockReturnValue(script);
    jest
      .spyOn(document.body, 'appendChild')
      .mockImplementation(() => ({} as any));
  });

  it('should not have any web component loaded on startup', () => {
    expect(service.isBundleLoaded('http://localhost:4200/main.js')).toBeFalsy();
  });

  it('should load a web component that has not been loaded yet', async () => {
    const bundleUrl = 'http://localhost:4200/main.js';
    const loadPromise = service.loadBundle(bundleUrl);
    script.onload();
    expect(await loadPromise).toBeTruthy();
    expect(await service.isBundleLoaded(bundleUrl)).toBeTruthy();
  });

  it('should return the status failed if waiting for a custom element fails', async () => {
    const bundleUrl = 'http://localhost:4200/main.js';
    const loadPromise = service.loadBundle(bundleUrl);
    script.onerror('Some error');
    expect(await loadPromise).toBeFalsy();
    expect(await service.isBundleLoaded(bundleUrl)).toBeFalsy();
    expect(await service.getLoadingState(bundleUrl)).toEqual('FAILED');
  });
});
