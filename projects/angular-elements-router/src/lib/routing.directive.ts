import {
  Directive,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

const urlSegmentsToString = (segments: UrlSegment[]) =>
  '/' + segments.map((segment) => segment.path).join('/');

/**
 * Enables the routing feature on a custom element.
 * It passes the activated route into the custom element and listens to route changes of the custom element.
 * The custom element needs to define an input `route` and an output `routeChange`.
 *
 * ```
 * @Component({
 *   selector: 'my-custom-element-host',
 *   template: `
 *     <my-custom-element aerRouting></lx-custom-element>
 *   `
 * })
 * export class MyCustomElementHostComponent {}
 * ```
 */
@Directive({
  selector: '[aerRouting]',
})
export class RoutingDirective implements OnInit, OnDestroy {
  private destroyed$ = new Subject<void>();

  constructor(
    private element: ElementRef,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.url
      .pipe(map(urlSegmentsToString), takeUntil(this.destroyed$))
      .subscribe((url) => (this.element.nativeElement.route = url));
  }

  ngOnDestroy() {
    this.destroyed$.next();
  }

  @HostListener('routeChange', ['$event'])
  handleRouteChange(event: { detail?: string }) {
    this.navigateToUrl(event?.detail);
  }

  navigateToUrl(url: string | undefined) {
    if (url && url.startsWith('/root')) {
      this.router.navigateByUrl(url.substring('/root'.length));
    } else if (url && url.startsWith('/')) {
      this.router.navigate(['./' + url.substring('/'.length)], {
        relativeTo: this.route.parent,
      });
    } else {
      console.warn(
        `The aerRouting retrieved a route change that does not start with a '/'.`
      );
    }
  }
}
