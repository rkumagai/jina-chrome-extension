#!/bin/bash

# Configuration
EXTENSION_NAME="targetclip-chrome-extension"
VERSION=$(grep '"version"' manifest.json | cut -d '"' -f 4)
OUTPUT_DIR="build"
TEMP_DIR="temp_package"

# List of necessary files
FILES=(
    "manifest.json"
    "popup.html"
    "popup.js"
    "options.html"
    "options.js"
    "icon16.png"
    "icon48.png"
    "icon128.png"
)

# Create output and temporary directories
mkdir -p "$OUTPUT_DIR"
mkdir -p "$TEMP_DIR"

# Copy files
for file in "${FILES[@]}"; do
    if [ -f "$file" ]; then
        cp "$file" "$TEMP_DIR/"
    else
        echo "Warning: $file not found."
    fi
done

# Create ZIP file
cd "$TEMP_DIR"
zip -r "../$OUTPUT_DIR/${EXTENSION_NAME}_v${VERSION}.zip" .
cd