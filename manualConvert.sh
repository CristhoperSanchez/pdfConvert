#!/bin/bash

docker run -t -w /data -v $(pwd)/data:/data pdf_convert:local -x  -a --uncompressed -f pdf -o /data/pdf/ /data/drawio/Master.drawio

