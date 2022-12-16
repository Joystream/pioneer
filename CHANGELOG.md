# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.0] - 2022-12-16

### Added
- Mainnet network in the setting.
- Documentation link to the [Joystrem Handbook](https://joystream.gitbook.io/testnet-workspace) for each working group.
- Refresh auto-conf network button.
- RPC blockheight and latest processed block in settings.

### Changed
- The token denomination to `JOY`.
- Rename the Gateway working group to App.
- The favicon to the Pioneer logo.
- Rename the `ui` package to `@joystream/pioneer`.
- Depend on npm published version of `@joystream/types@0.20.5` and `@joystream/metadata-protobuf@^2`.
- Update to `yarn@3`.
- Clarify the `MoveFundsModal` copy.
- Reply to post from a modal.

### Removed
- Testnet banner.

### Fixed
- Large election relealing stage (long term fix).
- Recovering the stake locked when applying to an opening.
- Some broken [Joystrem Handbook](https://joystream.gitbook.io/testnet-workspace) links.
- Replace placeholder text on vesting tooltips.
- Broken text on the insufficient funds modal.
- Proposal discussion order.
- On boarding flow before connecting to the RPC node.
- Some CI false positive.

## [0.1.1] - 2022-12-02

[unreleased]: https://github.com/Joystream/pioneer/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/Joystream/pioneer/compare/v0.1.1...v1.0.0
[0.1.1]: https://github.com/Joystream/pioneer/commits/v0.1.1
