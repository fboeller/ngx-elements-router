/**
 * Registers a listener to the 'routeChange' event of the given element to reflect these in the browser url.
 * Passes in the route change as well as the initial route as input.
 *
 * Note that this function can not be called repeatedly such that all elements retrieve the route changes of each other element.
 *
 * @param tagName The name of the html tag of the custom element, typically something like 'lx-some-thing'
 */
function registerRouting(tagName) {
  const element = document.getElementsByTagName(tagName)[0];
  element.setAttribute("route", window.location.pathname);
  element.addEventListener("routeChange", (event) => {
    const route = event.detail;
    window.history.pushState("", "", route);
    element.setAttribute("route", route);
  });
  return {
    changeRoute(route) {
      window.history.pushState("", "", route);
      element.setAttribute("route", route);
    },
  };
}
