import { Injectable } from '@angular/core';
import { BundleIdentifier } from './bundle-identifier';

function triggerLoad(url: string): void {
  const script = document.createElement('script');
  script.src = url;
  document.body.appendChild(script);
}

function waitUntilLoaded(customElementName: string): Promise<boolean> {
  return window.customElements
    .whenDefined(customElementName)
    .then(() => true)
    .catch(() => false);
}

@Injectable({ providedIn: 'root' })
export class BundleRegistryService {
  private loadedBundles: string[] = [];

  /**
   * Loads the given bundle if not already loaded, registering its custom elements in the browser.
   */
  loadBundle(bundleIdentifier: BundleIdentifier): Promise<boolean> {
    if (this.isBundleLoaded(bundleIdentifier.bundleUrl)) {
      return Promise.resolve(true);
    }
    this.loadedBundles = [...this.loadedBundles, bundleIdentifier.bundleUrl];
    triggerLoad(bundleIdentifier.bundleUrl);
    return waitUntilLoaded(bundleIdentifier.customElementName);
  }

  isBundleLoaded(bundleUrl: string): boolean {
    return this.loadedBundles.includes(bundleUrl);
  }
}
