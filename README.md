# bookstack-pdf-latex

A BookStack PDF rendering pipeline with LaTeX support.

## Prerequisites

- bash
- a reasonably recent version of nodejs (>= 18 should be fine?)
- chromium browser (or its dependencies, for some reason puppeteer does not install them)

## Quick Start.

1. Clone the repo and run `npm install` in the repository root.
2. Configure the [PDF export command in BookStack](https://www.bookstackapp.com/docs/admin/pdf-rendering/) to `renderpdfmathjax.sh {input_html_path} {output_pdf_path}`.
