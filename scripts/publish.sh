#!/bin/bash

# Fail if any command in script fails
set -e

# This script handles the publishing of the current
# commits as an npm based package

# Example if the current package.json version reads 0.1.0
# then the release will be tagged with 0.1.0

# Add dev dependencies to current path
export PATH="$PATH:node_modules/.bin"

# Fetch the current version from the package.json
new_version=$(node -pe "require('./package.json').version")

# Version to this new unstable version
yarn publish --no-git-tag-version --new-version $new_version

# Reset changes to the package.json
git checkout -- package.json
