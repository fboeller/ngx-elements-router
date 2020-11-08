import { Injectable } from '@angular/core';

function load(url: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = url;
    script.onload = () => resolve();
    script.onerror = () =>
      reject({
        error: `Bundle ${url} could not be loaded`,
      });
    document.body.appendChild(script);
  });
}

/**
 * The loading state of a bundle.
 *
 * UNKNOWN -> It has not been tried to load this bundle.
 * LOADING -> The loading of this bundle is currently happening.
 * LOADED -> The bundle has been successfully loaded.
 * FAILED -> The loading of the bundle failed.
 */
type LoadingState = 'UNKNOWN' | 'LOADING' | 'LOADED' | 'FAILED';

/**
 * This service loads bundles and keeps track of which bundles have been already loaded.
 * This way, it prevents errors that would occur if a bundle is loaded a second time.
 */
@Injectable({ providedIn: 'root' })
export class BundleRegistryService {
  private loadingStates: Record<string, LoadingState> = {};

  /**
   * Loads the given bundle if not already loaded, registering its custom elements in the browser.
   *
   * @param bundleUrl The url of the bundle, can be absolute or relative to the domain + base href.
   */
  async loadBundle(bundleUrl: string): Promise<boolean> {
    if (['LOADING', 'LOADED'].includes(this.getLoadingState(bundleUrl))) {
      return true;
    }
    this.loadingStates[bundleUrl] = 'LOADING';
    const isSuccess = await load(bundleUrl)
      .then(() => true)
      .catch(() => false);
    this.loadingStates[bundleUrl] = isSuccess ? 'LOADED' : 'FAILED';
    return isSuccess;
  }

  /**
   * Returns the loading state of the bundle.
   *
   * @param bundleUrl The url of the bundle.
   */
  getLoadingState(bundleUrl: string): LoadingState {
    return this.loadingStates[bundleUrl] || 'UNKNOWN';
  }

  /**
   * Returns if the bundle has already been loaded successfully.
   *
   * @param bundleUrl The url of the bundle.
   */
  isBundleLoaded(bundleUrl: string): boolean {
    return this.getLoadingState(bundleUrl) === 'LOADED';
  }
}
