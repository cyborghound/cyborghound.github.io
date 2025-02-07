#!/bin/bash

set -e  # Exit on error

echo "Checking if upstream remote exists..."
if ! git remote | grep -q "chirpy"; then
    echo "Adding upstream remote..."
    git remote add chirpy https://github.com/cotes2020/chirpy-starter.git
else
    echo "Upstream remote already exists."
fi

echo "Verifying remote..."
git remote -v

echo "Configuring submodule handling..."
git config submodule.assets/lib.ignore all

echo "Fetching updates from upstream..."
git fetch chirpy --tags

echo "Finding the latest version tag..."
LATEST_VERSION=$(git tag | sort -V | tail -n 1)

echo "Latest version found: $LATEST_VERSION"
if [ -z "$LATEST_VERSION" ]; then
    echo "No version tags found. Exiting."
    exit 1
fi

echo "Merging $LATEST_VERSION..."
git merge $LATEST_VERSION --squash --allow-unrelated-histories || {
    echo "Merge conflicts detected. Please resolve them manually."
    exit 1
}

# Check for unresolved merge conflicts
echo "Checking for unresolved conflicts..."
if grep -r -l "<<<<<<<" .; then
    echo "Merge conflicts detected. Please resolve them manually before proceeding."
    exit 1
fi

echo "Adding and committing changes..."
git add .
git commit -m "chore: upgrade to $LATEST_VERSION"

echo "Updating theme gems..."
bundle update

echo "Upgrade complete!"