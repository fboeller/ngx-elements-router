/**
* Registers a listener to the 'routeChange' event of the given element to reflect these in the browser url.
* Passes in the route change as well as the initial route as input.
*
* Note that this function can not be called repeatedly such that all elements retrieve the route changes of each other element.
*
* @param tagName The name of the html tag of the custom element, typically something like 'lx-some-thing'
*/
function registerRouting(tagName, keepWorkspaceName) {
  const element = document.getElementsByTagName(tagName)[0];
  element.setAttribute("route", window.location.pathname);
  element.addEventListener("routeChange", (event) => {
    const workspaceName = getWorkspaceNameFromUrl();
    const route = keepWorkspaceName
      ? addWorkspaceNameToUrl(workspaceName, event.detail)
      : event.detail;
    window.history.pushState("", "", route);
    element.setAttribute("route", route);
  });
}

function addWorkspaceNameToUrl(workspaceName, url) {
  const domainWithPath = url.split('?')[0];
  const queryString = url.split('?')[1];
  const params = new URLSearchParams(queryString);
  params.set('workspaceName', workspaceName);
  return domainWithPath + '?' + params.toString();
}

function getWorkspaceNameFromUrl() {
  const params = new URLSearchParams(window.location.search);
  if (params.has('workspaceName')) {
    return params.get('workspaceName');
  } else {
    const workspaceName = prompt('What is the name of the workspace you would like to see?');
    params.set('workspaceName', workspaceName);
    window.location.search = params.toString();
    return workspaceName;
  }
}
