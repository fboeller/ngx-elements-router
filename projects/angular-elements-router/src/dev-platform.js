/**
 * Registers a listener to the 'routeChange' event of the given element to reflect these in the browser url.
 * Passes in the route change as well as the initial route as input.
 *
 * Note that this function can not be called repeatedly such that all elements retrieve the route changes of each other element.
 *
 * @param tagName The name of the html tag of the custom element, typically something like 'lx-some-thing'
 */
function registerRouting(base, tagName) {
  const outlet = document.getElementById("router-outlet");
  const element = document.createElement(tagName);
  element.addEventListener("routeChange", (event) => {
    const route = event.detail;
    changeRoute(base, route, outlet, element);
  });
  if (window.location.pathname.startsWith(base)) {
    element.setAttribute(
      "route",
      window.location.pathname.substring(base.length)
    );
    outlet.appendChild(element);
  }
  return {
    changeRoute(route) {
      changeRoute(base, route, outlet, element);
    },
  };
}

function changeRoute(base, route, outlet, element) {
  if (route.startsWith("/root")) {
    if (outlet.hasChildNodes()) {
      outlet.removeChild(element);
    }
    window.history.pushState("", "", route.substring("/root".length));
  } else {
    if (!outlet.hasChildNodes()) {
      outlet.appendChild(element);
    }
    window.history.pushState("", "", base + route);
    element.setAttribute("route", route);
  }
}
