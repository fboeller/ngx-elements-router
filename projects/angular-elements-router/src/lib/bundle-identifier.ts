/**
 * Uniquely identifies a bundle.
 * A bundle is expected to register custom elements in the browser when executed.
 */
export interface BundleIdentifier {
  bundleUrl: string;
  customElementNames: string[];
}
