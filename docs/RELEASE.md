# Stable Releases

To create a stable release follow the following steps

1. Checkout the head of master `git checkout master && git pull`
2. Create a new release branch from master e.g `release`
3. Ensure the package is clean from previous branches/builds `yarn clean`
4. Install the dependencies `yarn install --frozen-lockfile`
5. Build the package `yarn build`
6. Test the package `yarn test`
7. Run `yarn version:release`, note by default this will do a minor package release as we are pre the `1.0.0` release
8. Observe the correctly incremented change to the `package.json` and the new entry in `CHANGELOG.md` along with the
   newly created commit
9. Push the release branch including the newly created tags `git push origin release --tags`
10. Open a pull request for the release, once approvals have been sought, merge the pull request using squash,
    preserving the commit message as `chore(release): publish [skip ci]`
11. Observe the triggering of the `/.github/workflows/release-master.yaml`

The resulting release will publish the new package to NPM and the resulting binaries to github packages.

# Unstable Releases

The releases have the following version syntax `0.1.1-unstable.(current git commit reference)`

## Automatic Release

An unstable release is triggered on every commit to master, where the `/.github/workflows/push-master.yaml` is run.

**Note** The `/.github/workflows/push-master.yaml` will skip if the commit message includes `[skip ci]`

**Note** To skip the automatic release of a new unstable version append `[skip ci]` to the end of the commit message
that is merged into master.

## Manual Release

If the automated unstable release fails, please run the following manually

1. Checkout the head of master `git checkout master && git pull`
2. Run `npm login --registry=https://npm.pkg.github.com` and follow the prompts outlined below.
   1. Enter your github username
   2. Generate a [personal access token](https://github.com/settings/tokens) with `read:packages` and `write:packages`
      permissions
   3. Enter the generated personal access token as the password
   4. Enter your github email
3. Ensure the package is clean from previous branches/builds `yarn clean`
4. Install the dependencies `yarn install --frozen-lockfile`
5. Build the package `yarn build`
6. Publish the package `yarn publish:unstable:ts`
7. Observe the newly created unstable packages in the github package manager.

**Note** - Yarn cannot be used in step 2 as it does not support the `--registry` flag
