#!/bin/bash

# Array of labels to create
# Format: "name:color:description"
LABELS=(
  "epic:3E4B9E:High-level project goals"
  "user-story:FBCA04:User-focused feature requirements"
  "task:0E8A16:Atomic implementation steps"
  "bug:D73A4A:Something isn't working"
  "enhancement:A2EEEF:New feature or request"
  "documentation:0075CA:Improvements or additions to documentation"
)

for label in "${LABELS[@]}"; do
  IFS=':' read -r name color description <<< "$label"
  echo "Creating label: $name ($color) - $description"
  # Note: This requires the GitHub CLI 'gh' to be installed and authenticated
  if command -v gh &> /dev/null; then
    gh label create "$name" --color "$color" --description "$description" --force
  else
    echo "Warning: GitHub CLI (gh) not found. Skipping label creation in remote."
  fi
done

echo "Labels setup complete!"
