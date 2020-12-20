/**
 * An event sent from the micro frontend to the platform to indicate that the route within the micro frontend has changed.
 */
export interface RouterEvent {
  /**
   * The new absolute url without the base href, e.g. `/micro-frontend/child`.
   */
  url: string;
  /**
   * If the new url is replacing the current url or if this url is a new entry in the browser history.
   * A replace is used for redirects.
   */
  replaceUrl: boolean;
}
