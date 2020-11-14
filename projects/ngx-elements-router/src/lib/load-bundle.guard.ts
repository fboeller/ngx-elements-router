import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { BundleRegistryService } from './bundle-registry.service';

/**
 * Ensures that a bundle is loaded before activating the route.
 *
 * ```
 * {
 *   path: 'my-micro-frontend',
 *   canActivate: [LoadBundleGuard],
 *   data: {
 *     bundleUrl: 'http://localhost:4200/main.js'
 *   },
 *   loadChildren: () => import('./my-micro-frontend/my-micro-frontend-host.module').then((m) => m.MyMicroFrontendHostModule)
 * }
 * ```
 */
@Injectable({ providedIn: 'root' })
export class LoadBundleGuard implements CanActivate {
  constructor(private bundleRegistryService: BundleRegistryService) {}

  canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    const bundleUrl = route.data.bundleUrl as unknown;
    if (!(typeof bundleUrl === 'string')) {
      console.error(`
        The LoadBundleGuard is missing information on which bundle to load.
        Did you forget to provide a bundleUrl: string as data to the route?
      `);
      return Promise.resolve(false);
    }
    return this.bundleRegistryService.loadBundle(bundleUrl);
  }
}
