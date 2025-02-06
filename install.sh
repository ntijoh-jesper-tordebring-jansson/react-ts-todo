#!/bin/sh

# Install a new npm package for either frontend or backend
echo "Enter the package name and eventuall flags:"
read package

if [ -z "$package" ]; then
  echo "❌ No package name entered. Exiting..."
  exit 1
fi

echo "Select a workspace:"
options=("frontend" "backend")
select workspace in "${options[@]}"; do
  if [[ -n "$workspace" ]]; then
    echo "📦 Installing $package in $workspace workspace..."
    npm install $package --workspace=$workspace
    break
  else
    echo "❌ Invalid selection. Try again."
  fi
done
