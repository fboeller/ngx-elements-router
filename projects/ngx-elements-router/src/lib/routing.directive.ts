import {
  Directive,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { RouterEvent } from './router-event.type';

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

  @HostListener('routeChange', ['$event'])
  handleRouteChange(event: { detail?: RouterEvent }): void {
    this.navigateToUrl(event?.detail);
  }

  ngOnInit(): void {
    this.route.url
      .pipe(
        map(() => this.router.url),
        takeUntil(this.destroyed$)
      )
      .subscribe((url) => (this.element.nativeElement.route = url));
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
  }

  navigateToUrl(event: RouterEvent | undefined): void {
    if (event?.url && event.url.startsWith('/')) {
      this.router.navigateByUrl(event.url, {
        replaceUrl: event.replaceUrl || false,
      });
    } else {
      console.warn(
        `The aerRouting directive received an invalid router event.`,
        event
      );
    }
  }
}
