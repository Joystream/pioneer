# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.3.1] - 2023-03-15

### Fixed
- Multiple voting rounds proposal view.
- Forum watchlist tab.
- Proposal list on narrow screens.
- Forum thread back button goes back to the category page with the thread.
- Typo in `docs/README`.

## [1.3.0] - 2023-02-17

### Added
- Member handles when hovering candidacies.
- Allow full UTF-8 proposal titles.
- `decode` helper command for development.

### Changed
- Open markdown links in a new tab.
- WG openings list items and selector options.
- Description of the update WG budget proposal.
- Rename proposal "Constants" to "Parameters".

### Removed
- The virtual member role.

### Fixed
- Invite member modal.
- New posts preview modal.
- Status of rejected and canceled application.
- Block explorer icon look.
- Do not truncate forum category descriptions.
- Latest threads reply count.
- Typos.

## [1.2.0] - 2023-02-09

### Added
- Number on the proposal type selector.
- Candidacy Staking and Vote Staking tooltips.
- Role information On the reward activity notification.

### Changed
- Clarified the stake step tooltip.

### Fixed
- Moderators were not showing on the forum category pages.
- Member profile hot update after editing it.
- The reply counter used to show `-1` when all post were moderated.
- App sometimes crashing due to empty vesting balances.
- Typo on the slash stake activity notification.

## [1.1.1] - 2023-01-09

### Fixed
- Replies to posts were always submitted to the chain without any text.

## [1.1.0] - 2023-01-06

### Added
- Description in the forum category headers.
- Creation date/time on forum thread.
- Whitelist on proposal "closed" discussions.
- Invitation lock tooltip.

### Changed
- Renames "Own Stake" to "My Stake".

### Removed
- Language tab from settings.

### Fixed
- The edit membership about section.
- Stake info on announce candidacy sign-in modal.
- Back button on WG openings.
- Set Membership Lead Invitation Quota Proposal preview.
- Blockheight info labels (in the settings).
- Replaced/Removed some more lorem ipsum.
- Better prevent localstorage overwrites from the forum tread watchlist.
- The hire limit on single position openings.
- The temporary "Insufficient balance to cover fee" message on the vesting claim modal.

## [1.0.1] - 2023-01-05

### Fixed
- Proposal view crashing due to high amounts of JOY

## [1.0.0] - 2022-12-16

### Added
- Mainnet network in the setting.
- Documentation link to the [Joystream Handbook](https://joystream.gitbook.io/testnet-workspace) for each working group.
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
- Large election revealing stage (long term fix).
- Recovering the stake locked when applying to an opening.
- Some broken [Joystream Handbook](https://joystream.gitbook.io/testnet-workspace) links.
- Replace placeholder text on vesting tooltips.
- Broken text on the insufficient funds modal.
- Proposal discussion order.
- On boarding flow before connecting to the RPC node.
- Some CI false positive.

## [0.1.1] - 2022-12-02

[unreleased]: https://github.com/Joystream/pioneer/compare/v1.3.1...HEAD
[1.3.1]: https://github.com/Joystream/pioneer/compare/v1.3.0...v1.3.1
[1.3.0]: https://github.com/Joystream/pioneer/compare/v1.2.0...v1.3.0
[1.2.0]: https://github.com/Joystream/pioneer/compare/v1.1.1...v1.2.0
[1.1.1]: https://github.com/Joystream/pioneer/compare/v1.1.0...v1.1.1
[1.1.0]: https://github.com/Joystream/pioneer/compare/v1.0.1...v1.1.0
[1.0.1]: https://github.com/Joystream/pioneer/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/Joystream/pioneer/compare/v0.1.1...v1.0.0
[0.1.1]: https://github.com/Joystream/pioneer/commits/v0.1.1
