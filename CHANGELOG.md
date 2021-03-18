# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.3] - 2021-03-18

### Fixed

- Don't throw error if `extras` is undefined on current navigation [#14](https://github.com/fboeller/ngx-elements-router/issues/14). (Thanks to @kelvindart-certua and @vickieallen-certua)

## [0.1.2] - 2021-01-26

### Added

- The package is now usable with Angular peer dependencies >=10.2.0 (before ~10.2.0). It is now build with 11.1.0 and is tested both with 10.2.0 and 11.1.0.

### Fixed

- The location strategy now prepends the base href to external urls such that a click on a link via middle mouse button opens a new tab with the correct url
