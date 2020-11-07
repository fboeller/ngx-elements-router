import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { BundleIdentifier } from './bundle-identifier';
import { BundleRegistryService } from './bundle-registry.service';

/**
 * Ensures that a bundle is loaded before activating the route.
 *
 * ```
 * {
 *   path: 'my-micro-frontend',
 *   canActivate: [LoadBundleGuard],
 *   data: {
 *     bundle: {
 *       bundleUrl: 'http://localhost:4200/main.js',
 *       customElementName: 'lx-example'
 *     }
 *   },
 *   loadChildren: () => import('./my-micro-frontend/my-micro-frontend-host.module').then((m) => m.MyMicroFrontendHostModule)
 * }
 * ```
 */
@Injectable({ providedIn: 'root' })
export class LoadBundleGuard implements CanActivate {
  constructor(private bundleRegistryService: BundleRegistryService) {}

  canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    let bundle = route.data.bundle as BundleIdentifier;
    if (!bundle || !('customElementName' in bundle) || !('bundleUrl' in bundle)) {
      console.error(`
        The LoadBundleGuard is missing information on which web component to load.
        Did you forget to provide an object bundle: { customElementName: string; bundleUrl: string; } as data to the route?
      `);
      return Promise.resolve(false);
    }
    return this.bundleRegistryService.loadBundle(bundle);
  }
}
