#!/bin/bash

if [ $# -lt 2 ]; then
    echo "Usage: renderpdfmathjax.sh <input_file.html> <output_file.pdf>" >&2
    exit 1
fi

INPUT_FILE=$1
OUTPUT_FILE=$2

node index.js $INPUT_FILE $OUTPUT_FILE
