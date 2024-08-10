# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [3.7.2] - 2024-08-10

### Fixed
- Show onboarding flow when a membership is required and no wallet is connected.

## [3.7.1] - 2024-07-07

### Fixed
- Forum post context menu.

## [3.7.0 (Petra)][3.7.0] - 2024-06-17

### Added
- Update Argo bridge constraints proposal.

## [3.6.0] - 2024-05-28

### Added
- Notification support for proposal discussions.

### Fixed
- Copy fixes.

## [3.5.2] - 2024-05-01

### Fixed
- Fix nominate links.

## [3.5.1] - 2024-04-25

### Fixed
- Proxy API becoming unresponsive.

## [3.5.0 (Luxor)][3.5.0] - 2024-04-18

### Added
- Decrease council budget proposal.
- Update CRT pallet constraints proposal.
- Set Era Payout Damping Factor proposal.

### Fixed
- Keep the app usable if an error happen.
- Number input behavior.

## [3.4.0] - 2024-03-19

### Fixed
- Validator APR not showing.

### Added
- Github member links.

### Changed
- JOY token banner copy.

## [3.3.1] - 2024-03-14

### Added
- Show election tab during idle stage.

### Changed
- Rename "Normal period" to "Idle stage".


## [3.3.0 (Nara)][3.3.0] - 2024-03-13

### Added
- Freeze pallet proposal.

## [3.2.0] - 2024-03-07

### Added
- Role mention.

### Fixed
- Proposal default order.

## [3.1.0] - 2024-02-27

### Added
- Wallet Connect support.
- Mobile support for member onboarding, creation, and update.
- Link to nomination video guide.

### Fixed
- Autocomplete popup showing under post update toolbar.

## [3.0.0 (Validator dashboard)][3.0.0] - 2024-02-21

### Added
- Validator dashboard.
- Binding validator accounts to new or existing memberships.

## [2.6.0] - 2024-02-15

### Added
- Separate urls for each working group tabs.
- Default descriptions for each working group about tab.

### Fixed
- Searching for members by id.
- General search box behavior.
- Show members active roles only.
- Show creation date on member profiles.
- Fix opening creation for lead with separate role and controller accounts.
- OneKey wallet extension support.

## [2.5.0] - 2024-02-05

### Added
- Cancel proposal button.

### Changed
- Display weekly opening rewards instead of daily.

## [2.4.2] - 2024-01-29

### Fixed
- Fix infinite proposal page reload for CMs.

## [2.4.1] - 2024-01-29

### Fixed
- Don't notify people of their own messages in threads they created.

## [2.4.0] - 2024-01-18

### Added
- Display blacklisted accounts in the election module.
- Allow hiding the sidebar "Total balance".

### Changed
- Link block heights to the Subscan block explorer.

### Fixed
- Fix past election page endless refresh issue.

## [2.3.1] - 2024-01-12

### Fixed
- On boarding modal footer.

## [2.3.0] - 2023-12-29

### Added
- Support for forum action and email registration on mobile.

## [2.2.0] - 2023-12-22

### Added
- Widget which represents visually the progress of the current election.

### Changed
- Show reward for single councillor on council page.

### Fixed
- Vote recovery from the My Profile page.

## [2.1.1] - 2023-12-11

### Fixed
- Vote again button sometime linking to the wrong candidate.

## [2.1.0] - 2023-12-08

### Added
- Display error messages when a page or a modal crashes instead of crashing the whole app.
- Make some members social links clickable.

### Fixed
- Runtime upgrade proposal creation.
- Various UI bugs on responsive devices.

### Changed
- Expand the size of the Signal side pane.
- Rename Twitter to X.

## [2.0.2] - 2023-11-27

### Remove
- Remove forum activities button.

## [2.0.1] - 2023-11-24

### Fixed
- Some proposal page breaking on opening their rationale.

## [2.0.0 (Notifications and RWD)][2.0.0] - 2023-11-23

### Added
- Email notifications support for forum and elections events.
- New responsive web design.
- Add account balances in the membership pane.

### Fixed
- Past councils spending amounts.

## [1.9.0] - 2023-11-03

### Added
- Linkedin to membership social profile.

### Fixed
- Proposal history blocks styles.
- Past election total staked value.
- Past election "My contributed votes value".

## [1.8.0] - 2023-10-13

### Added
- Custom network settings.
- Opening creation modal.
- Grace period or exact execution block on proposal preview pages.

### Fixed
- Markdown list color and indentation.
- Speed-up forum category pages.
- Past council budget statistics.

## [1.7.0] - 2023-09-15

### Added
- Improve the multiple recipient funding request proposal preview.
- Links to buy and earn $JOY.
- Link to `joystream.subscan.io`.

## [1.6.0] - 2023-09-01

### Added
- Multiple recipient funding request proposal creation.

### Fixed
- Forum category page reloading multiple time on opening.
- Broken links to members on forum posts.
- Reduce the amount of queries from the forum category page.

### Changed
- Display amount staked by voting for a council candidate instead of their candidacy stake when applicable.

## [1.5.1] - 2023-07-25

### Fixed
- Do not ask for confirmation to close transaction success modals.
- Correctly match questions and answers in opening application pages.
- Do not keep showing the total balance after disconnecting a wallet.
- Show all applicants on closed opening pages.

### Changed
- Clarify the label copy of the council budget increment proposal input field.
- Just show past elections cycle id without "round".

## [1.5.0] - 2023-06-06

### Added
- Support for wallet metadata update.
- Emoji selection in the text editor.
- Visual representation of membership verified status.
- Link in the side bar to the Calamar explorer.

### Fixed
- Forum false 404 and empty categories during query node outage.
- Text visibility in the forum.
- Way too large margins on forum threads.
- Initial deciding stage view of multiple voting rounds proposal.
- Fix Apps working group's opening links with ids from the query node.

## [1.4.0 (Ephesus)][1.4.0] - 2023-04-12

### Added
- Update Channel Payouts Proposal.
- Self-imposed governance blacklisting support.

## [1.3.2] - 2023-04-05

### Fixed
- Incorrect values in the "My Roles" tab.
- Working group history tab crashing.
- Infinite auto scroll to a post after opening a link to this post.
- Unclear councilor reward widget.
- Some posts overflowing on Webkit browsers.
- Improve stake and constitutionality visibility when creating a proposal.
- Copy improvements: proposal discussion status and voting rounds tabs tooltips, and forum empty category.

### Removed
- Buggy link icon on proposal lists.

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

## [1.0.0 (Mainnet)][1.0.0] - 2022-12-16

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

[unreleased]: https://github.com/Joystream/pioneer/compare/v3.7.2...HEAD
[3.8.0]: https://github.com/Joystream/pioneer/compare/v3.7.1...v3.7.2
[3.7.1]: https://github.com/Joystream/pioneer/compare/v3.7.0...v3.7.1
[3.7.0]: https://github.com/Joystream/pioneer/compare/v3.6.0...v3.7.0
[3.6.0]: https://github.com/Joystream/pioneer/compare/v3.5.2...v3.6.0
[3.5.2]: https://github.com/Joystream/pioneer/compare/v3.5.1...v3.5.2
[3.5.1]: https://github.com/Joystream/pioneer/compare/v3.5.0...v3.5.1
[3.5.0]: https://github.com/Joystream/pioneer/compare/v3.4.0...v3.5.0
[3.4.0]: https://github.com/Joystream/pioneer/compare/v3.3.1...v3.4.0
[3.3.1]: https://github.com/Joystream/pioneer/compare/v3.3.0...v3.3.1
[3.3.0]: https://github.com/Joystream/pioneer/compare/v3.2.0...v3.3.0
[3.2.0]: https://github.com/Joystream/pioneer/compare/v3.1.0...v3.2.0
[3.1.0]: https://github.com/Joystream/pioneer/compare/v3.0.0...v3.1.0
[3.0.0]: https://github.com/Joystream/pioneer/compare/v2.6.0...v3.0.0
[2.6.0]: https://github.com/Joystream/pioneer/compare/v2.5.0...v2.6.0
[2.5.0]: https://github.com/Joystream/pioneer/compare/v2.4.2...v2.5.0
[2.4.2]: https://github.com/Joystream/pioneer/compare/v2.4.1...v2.4.2
[2.4.1]: https://github.com/Joystream/pioneer/compare/v2.4.0...v2.4.1
[2.4.0]: https://github.com/Joystream/pioneer/compare/v2.3.1...v2.4.0
[2.3.1]: https://github.com/Joystream/pioneer/compare/v2.3.0...v2.3.1
[2.3.0]: https://github.com/Joystream/pioneer/compare/v2.2.0...v2.3.0
[2.2.0]: https://github.com/Joystream/pioneer/compare/v2.1.1...v2.2.0
[2.1.1]: https://github.com/Joystream/pioneer/compare/v2.1.0...v2.1.1
[2.1.0]: https://github.com/Joystream/pioneer/compare/v2.0.2...v2.1.0
[2.0.2]: https://github.com/Joystream/pioneer/compare/v2.0.1...v2.0.2
[2.0.1]: https://github.com/Joystream/pioneer/compare/v2.0.0...v2.0.1
[2.0.0]: https://github.com/Joystream/pioneer/compare/v1.9.0...v2.0.0
[1.9.0]: https://github.com/Joystream/pioneer/compare/v1.8.0...v1.9.0
[1.8.0]: https://github.com/Joystream/pioneer/compare/v1.7.0...v1.8.0
[1.7.0]: https://github.com/Joystream/pioneer/compare/v1.6.0...v1.7.0
[1.6.0]: https://github.com/Joystream/pioneer/compare/v1.5.1...v1.6.0
[1.5.1]: https://github.com/Joystream/pioneer/compare/v1.5.0...v1.5.1
[1.5.0]: https://github.com/Joystream/pioneer/compare/v1.4.0...v1.5.0
[1.4.0]: https://github.com/Joystream/pioneer/compare/v1.3.2...v1.4.0
[1.3.2]: https://github.com/Joystream/pioneer/compare/v1.3.1...v1.3.2
[1.3.1]: https://github.com/Joystream/pioneer/compare/v1.3.0...v1.3.1
[1.3.0]: https://github.com/Joystream/pioneer/compare/v1.2.0...v1.3.0
[1.2.0]: https://github.com/Joystream/pioneer/compare/v1.1.1...v1.2.0
[1.1.1]: https://github.com/Joystream/pioneer/compare/v1.1.0...v1.1.1
[1.1.0]: https://github.com/Joystream/pioneer/compare/v1.0.1...v1.1.0
[1.0.1]: https://github.com/Joystream/pioneer/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/Joystream/pioneer/compare/v0.1.1...v1.0.0
[0.1.1]: https://github.com/Joystream/pioneer/commits/v0.1.1
