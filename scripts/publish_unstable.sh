#!/bin/bash

# Fail if any command in script fails
set -e

# This script handles the publishing of the current
# commits as an npm based unstable package

# Example if the current package.json version reads 0.1.0
# then the unstable release of 0.1.1-unstable.(current git commit reference)

# Add dev dependencies to current path
export PATH="$PATH:node_modules/.bin"

# Minor version the current package
yarn version --no-git-tag-version --patch

# Fetch the current version from the package.json
new_version=$(node -pe "require('./package.json').version")

# Fetch the new unstable version
new_unstable_version=$new_version"-unstable.$(git rev-parse --short HEAD)"

# Version to this new unstable version
yarn publish --no-git-tag-version --new-version $new_unstable_version --tag unstable

# Reset changes to the package.json
git checkout -- package.json
