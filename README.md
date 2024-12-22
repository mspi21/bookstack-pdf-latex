# bookstack-pdf-latex

A BookStack PDF rendering pipeline with LaTeX support.

## Quick Start

These steps assume you have bash and a reasonably recent version of nodejs (>= 18 should be fine?) installed on the system hosting your BookStack instance.

1. Clone the repo and run `npm install` in the repository root.
2. Configure the [PDF export command in BookStack](https://www.bookstackapp.com/docs/admin/pdf-rendering/) to `renderpdfmathjax.sh {input_html_path} {output_pdf_path}`.
