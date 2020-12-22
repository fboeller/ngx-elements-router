# Angular Elements Router

![License](https://img.shields.io/github/license/fboeller/ngx-elements-router) ![Build](https://img.shields.io/github/workflow/status/fboeller/ngx-elements-router/CI) ![Version](https://img.shields.io/npm/v/ngx-elements-router)

The angular elements router is a library for using the Angular Router within Angular Elements.

- **Router module usage** — Use the angular router module both in the platform and the micro frontend without interfering each other.

- **Dev platform** — Includes a straight-forward dev platform capable of replacing the production platform for local development.

- **Battle-tested** — This library is based on the efforts at [LeanIX](https://www.leanix.net/en/) where this approach is used to serve micro frontends to 100K users.

- **Non-intrusive** — Use only the features you need, easy opt-out once Angular starts supporting the router in Angular Elements out of the box.

- **No dependencies** — Besides Angular this library does not include any dependencies.

## Installation

```
$ npm install --save ngx-elements-router
```

## Try it

This repo includes an example platform and an example micro frontend.

```
$ git clone https://github.com/fboeller/ngx-elements-router.git
$ cd ngx-elements-router
$ npm install
```

### Dev platform with micro frontend

```
$ npm start example-micro-frontend
```

A visit to `localhost:4200` shows the dev platform.
If you click the buttons, you see how the route changes, independent from if the click originated in the platform or the micro frontend.

### Angular platform with micro frontend

```
$ npm run build example-micro-frontend
$ npm install -g http-server
$ http-server dist/example-micro-frontend --port 4201
```

```
$ npm start example-platform
```

A visit to `localhost:4200` shows the Angular platform.
The bundle file `main.js` is served from `localhost:4201` without hot-reloading.

## Prerequisites

You have an Angular application that acts as a [platform](./projects/example-platform) and an Angular application that acts as a [micro frontend](./projects/example-micro-frontend).
A build of the micro frontend results in a single build that registers custom elements on loading.

## Usage

### Create a host component

To be able to reference your custom element in the routes, you need to create a host component.
You can use the `aerRouting` on the custom element to pass route changes to the micro frontend and to allow the micro frontend to pass route changes to the platform.

[platform/micro-frontend-host.component.ts](./projects/example-platform/src/app/micro-frontend-host.component.ts)

```typescript
import { Component } from "@angular/core";

@Component({
  selector: "app-host",
  template: `<mf-entry aerRouting></mf-entry>`,
})
export class MicroFrontendHostComponent {}
```

### Create a host module

To lazy load your custom element, you need to create a host module in the platform.
Import `AngularElementsRouterModule` to be able to use the `aerRouting` directive.
Use the schema `CUSTOM_ELEMENTS_SCHEMA` to make Angular accept the custom element in the host component.
Use the path `**` to pass all sub paths to the custom element.

[platform/micro-frontend-host.module.ts](./projects/example-platform/src/app/micro-frontend-host.module.ts)

```typescript
import { AngularElementsRouterModule } from "ngx-elements-router";
import { MicroFrontendHostComponent } from "./micro-frontend-host.component";

const routes: Routes = [
  {
    path: "**",
    component: MicroFrontendHostComponent,
  },
];

@NgModule({
  declarations: [MicroFrontendHostComponent],
  imports: [RouterModule.forChild(routes), AngularElementsRouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MicroFrontendHostModule {}
```

### Bind the micro frontend to a route

Choose a route under which your micro frontend should be loaded.
Use the `LoadBundleGuard` to load the bundle of your micro frontend on the first activation of the route.

[platform/app-routing.module.ts](./projects/example-platform/src/app/app-routing.module.ts)

```typescript
import { LoadBundleGuard } from "ngx-elements-router";

const routes: Routes = [
  {
    path: "micro-frontend",
    canActivate: [LoadBundleGuard],
    data: {
      bundleUrl: "http://localhost:4201/main.js",
    },
    loadChildren: () =>
      import("./micro-frontend-host/micro-frontend-host.module").then(
        (m) => m.MicroFrontendHostModule
      ),
  },
];
```

### Register routing in the micro frontend

Use the `EntryRoutingService` in the Angular component representing the custom element.
This way, route changes are passed to the Angular router in the micro frontend and in the other direction to the platform.

[micro-frontend/entry-component.ts](./projects/example-micro-frontend/src/app/entry-component.ts)

```typescript
import { EntryRoutingService } from 'ngx-elements-router';

@Component({
  selector: 'mf-angular-entry',
  template: `<router-outlet></router-outlet>`,
})
export class EntryComponent implements OnChanges, OnDestroy {
  @Input() route?: string;
  @Output() routeChange = new EventEmitter<string>();

  route$ = new Subject<string | undefined>;

  private readonly subscription: Subscription;

  constructor(private entryRoutingService: EntryRoutingService) {
    this.subscription = this.entryRoutingService.registerRouting(
      this.routeChange,
      this.route$
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnChanges() {
    this.route$.next(this.route);
  }
```

### Create a custom element from the entry component

The module in your micro frontend needs to define the custom element in the browser on bootstrap of the module.

[micro-frontend/app-module.ts](./projects/example-micro-frontend/src/app/app.module.ts)

```typescript
import { EntryComponent } from "./entry.component";
import { createCustomElement } from "@angular/elements";

@NgModule({
  declarations: [EntryComponent],
  imports: [BrowserModule],
  providers: [],
})
export class AppModule {
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    const customElement = createCustomElement(EntryComponent, {
      injector: this.injector,
    });
    window.customElements.define("mf-entry", customElement);
  }
}
```

### Define the routes in the micro frontend

The route structure in the micro frontend needs to be defined with the same structure as the platform.
If the platform delegates all traffic at `/micro-frontend` to the micro frontend, then the micro frontend should define such a route.
All other traffic needs to go to a route `**` such that the router module of the micro frontend does not discard it as undefined routes.
This way, you can navigate to links outside of the micro frontend from within the micro frontend.

[micro-frontend/app-routing.module.ts](./projects/example-micro-frontend/src/app/app-routing.module.ts)

```typescript
import { NoComponent } from "ngx-elements-router";

const routes: Routes = [
  {
    path: "micro-frontend",
    children: microfrontendRoutes,
  },
  { path: "**", component: NoComponent },
];
```

### Prevent direct access to the browser url

By default, the Angular router within the micro frontend tries to update the browser url.
Use the `NoopLocationStrategy` to prevent this, such that the platform has the only access.

[micro-frontend/app-routing.module.ts](./projects/example-micro-frontend/src/app/app-routing.module.ts)

```typescript
import { NoopLocationStrategy } from "ngx-elements-router";

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [{ provide: LocationStrategy, useClass: NoopLocationStrategy }],
  exports: [RouterModule],
})
export class AppRoutingModule {}
```

### Setup a dev platform within the micro frontend

For the independent development of the micro frontend, a minimal dev platform consisting of an index.html with some Javascript can be of advantage.
This dev platform can be used both locally and also be deployed and used together with the bundle.

To use it, include the `dev-platform.js` in the scripts of your micro frontend in the `angular.json`.

[angular.json](./angular.json)

```json
{
"build": {
  "builder": "ngx-build-plus:build",
  "options": {
    "singleBundle": true,
    "outputHashing": "none",
    ...,
    "scripts": [
      "node_modules/ngx-elements-router/src/dev-platform.js"
    ]
  },
}
```

Setup an `index.html` in the micro frontend app.

[micro-frontend/index.html](./projects/example-micro-frontend/src/index.html)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Example Micro Frontend</title>
    <base href="/" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" type="image/x-icon" href="favicon.ico" />
    <script src="scripts.js"></script>
  </head>
  <body>
    <button onclick="router.changeRoute('/')">Go to platform main page</button>
    <button onclick="router.changeRoute('/micro-frontend')">
      Go to micro frontend main page
    </button>
    <div id="router-outlet"></div>
    <script>
      const router = registerRouting("/micro-frontend", "mf-entry");
    </script>
  </body>
</html>
```
