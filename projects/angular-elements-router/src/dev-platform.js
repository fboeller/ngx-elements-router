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
  const element = document.createElement(tagName);
  addRoutingToElement(base, outlet, element);
  const route = window.location.pathname;
  if (route.startsWith(base)) {
    element.setAttribute("route", route.substring(base.length));
    outlet.appendChild(element);
  }
  return {
    changeRoute(route) {
      changeRoute(base, route, outlet, tagName);
    },
  };
}

function changeRoute(base, route, outlet, tagName) {
  if (route.startsWith("/root")) {
    window.history.pushState("", "", route.substring("/root".length) || "/");
    if (outlet.hasChildNodes()) {
      const element = outlet.childNodes[0];
      element.setAttribute("route", "/");
      outlet.removeChild(element);
    }
  } else {
    window.history.pushState("", "", base + route);
    if (!outlet.hasChildNodes()) {
      const element = document.createElement(tagName);
      addRoutingToElement(base, outlet, element);
      outlet.appendChild(element);
    }
    outlet.childNodes[0].setAttribute("route", route);
  }
}

function addRoutingToElement(base, outlet, element) {
  element.addEventListener("routeChange", (event) => {
    const route = event.detail;
    changeRoute(base, route, outlet, element);
  });
}
