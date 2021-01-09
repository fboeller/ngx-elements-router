import { Directive, ElementRef, NgZone, OnInit } from '@angular/core';

/**
 * Enables the zone feature on a custom element.
 * It passes an observable of all events where the global `window.Zone` object reported that the microtask queue is empty.
 * Such an event indicates to Angular that a change detection cycle needs to be run.
 *
 * ```
 * @Component({
 *   selector: 'my-custom-element-host',
 *   template: `
 *     <my-custom-element aerZone></lx-custom-element>
 *   `
 * })
 * export class MyCustomElementHostComponent {}
 * ```
 */
@Directive({
  selector: '[aerZone]',
})
export class ZoneDirective implements OnInit {
  constructor(private element: ElementRef, private zone: NgZone) {}

  ngOnInit(): void {
    this.element.nativeElement.microtaskEmpty$ = this.zone.onMicrotaskEmpty;
  }
}
