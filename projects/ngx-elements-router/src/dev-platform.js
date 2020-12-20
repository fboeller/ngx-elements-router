/**
 * Registers a listener to the 'routeChange' event of the given element to reflect these in the browser url.
 * Passes in the route change as well as the initial route as input.
 *
 * Note that this function can not be called repeatedly such that all elements retrieve the route changes of each other element.
 *
 * @param base The base url of the micro frontend, typically something like '/micro-frontend'
 * @param tagName The name of the html tag of the custom element, typically something like 'lx-something'
 */
function registerRouting(base, tagName) {
  const outlet = document.getElementById("router-outlet");
  window.onpopstate = () => {
    const route = window.location.pathname;
    adaptOutlet(base, route, outlet, tagName);
  };
  const route = window.location.pathname;
  if (route.startsWith(base)) {
    const element = document.createElement(tagName);
    addRoutingToElement(base, outlet, element);
    element.setAttribute("route", route);
    outlet.appendChild(element);
  }
  return {
    changeRoute(route) {
      changeBrowserUrl(route, false);
      adaptOutlet(base, route, outlet, tagName);
    },
  };
}

function changeBrowserUrl(url, replaceUrl) {
  if (replaceUrl) {
    window.history.replaceState("", "", url);
  } else {
    window.history.pushState("", "", url);
  }
}

function adaptOutlet(base, route, outlet, tagName) {
  if (route.startsWith(base)) {
    if (!outlet.hasChildNodes()) {
      const element = document.createElement(tagName);
      addRoutingToElement(base, outlet, element);
      outlet.appendChild(element);
    }
    outlet.childNodes[0].setAttribute("route", route);
  } else {
    if (outlet.hasChildNodes()) {
      const element = outlet.childNodes[0];
      element.setAttribute("route", "/");
      outlet.removeChild(element);
    }
  }
}

function addRoutingToElement(base, outlet, element) {
  element.addEventListener("routeChange", (event) => {
    const route = event.detail;
    changeBrowserUrl(route.url, route.replaceUrl);
    adaptOutlet(base, route.url, outlet, element);
  });
}
