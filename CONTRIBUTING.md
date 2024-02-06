# Contributing

We welcome every contribution – either a bug report or a pull request. If you're planning to implement a new feature, please create an issue first.

## Issues

To submit a bug report a feature request, please [create an issue on GitHub](https://github.com/Joystream/pioneer/issues/new/choose).

If you're looking for an issue to fix, take a look at the issues tagged [Good first issue](https://github.com/Joystream/pioneer/labels/good%20first%20issue)

## Contributing code

Please follow the development guide [README](docs/README.md) to get started.

### Submitting Changes

Please create a pull request from your fork. We may suggest some changes or improvements to make your changes fit overall architecture. However, small fixes or updates should be accepted quickly.

The below guidelines will help you understand what it takes for the PR to be accepted:

- Write stories (with Storybook) to test your code, have a look [at the testing documentaion](docs/tests.md).
- Provide a good PR title – it will be used as a commit message when the PR is merged
- Follow the code style & make sure that your PR passes the CI
- Use GitHub's special keywords to reference and/or close the issue automatically
- Make sure that you've described your assumptions, unusual fixes or other information that may help the reviewer understand your code
- Don't worry about squashing your commits – GitHub will do it for you.

### Branching strategy

All PRs land in the `dev` branch. The everything added to `main` gets deployed to [production](https://pioneerapp.xyz). Other branches are short-lived for development purposes. However, the archival branches exists under `/arch/*` – those consists prepared components or code that was not included in the main branch, but might be needed at later stage.
