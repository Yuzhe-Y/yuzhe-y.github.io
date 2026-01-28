# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static personal academic website built for GitHub Pages. It's a single-page application that dynamically loads content from Markdown files and YAML configuration. The site is based on Bootstrap and uses client-side JavaScript to render content.

## Architecture

### Core Components
- **index.html**: Single-page application entry point with Bootstrap-based layout
- **contents/**: Contains all content as Markdown files and YAML configuration
  - `config.yml`: Site metadata (title, copyright, navigation text)
  - `home.md`: Personal bio and contact information
  - `publications.md`: Academic publications list
  - `awards.md`: Awards and honors
- **static/**: All static assets
  - `js/scripts.js`: Main application logic for content loading
  - `css/`: Styling files
  - `assets/img/`: Images (background, photo, favicon)

### Content Loading System
The application uses client-side JavaScript to:
1. Fetch YAML configuration from `contents/config.yml`
2. Load and parse Markdown files using the Marked.js library
3. Dynamically populate HTML sections with content
4. Support LaTeX mathematics rendering via MathJax

### Technology Stack
- **Frontend**: Vanilla JavaScript, Bootstrap 5, HTML5
- **Content Processing**: Marked.js (Markdown), js-yaml (YAML parsing)
- **Mathematics**: MathJax 3 for LaTeX formula rendering
- **Deployment**: GitHub Pages (static hosting)

## Development Workflow

### Content Updates
To modify site content:
1. Edit Markdown files in `contents/` directory:
   - `home.md`: Personal information, education, research interests
   - `publications.md`: Academic papers and research output
   - `awards.md`: Honors and recognition
2. Update `contents/config.yml` for site metadata changes
3. Replace images in `static/assets/img/` as needed

### Local Development
Since this is a static site with client-side content loading:
- Serve the directory with any HTTP server (Python's `http.server`, Node's `http-server`, etc.)
- No build process required - changes are immediately visible on refresh
- Note: File:// protocol won't work due to CORS restrictions when loading markdown files

### Deployment
This site is designed for GitHub Pages:
1. Push changes to the repository
2. GitHub Pages automatically serves the content
3. Changes may take up to 10 minutes to appear live

## Content Guidelines

### Markdown Support
- Standard Markdown syntax is supported via Marked.js
- LaTeX math expressions supported:
  - Inline: `$...$` or `\(...\)`
  - Display: `$$...$$` or `\[...\]`
  - Full equation environments and references supported

### Publication Format
Follow the existing pattern in `publications.md`:
- Use `<strong>` tags for author names
- Include DOI links with `[[Paper]]` notation
- Add code links with `[[Code]]` notation
- Separate submitted and published papers

### Image Assets
- Background image: `static/assets/img/background.jpeg`
- Profile photo: `static/assets/img/photo.png`
- Favicon: `static/assets/favicon.ico`

## File Structure
```
.
├── index.html              # Main application entry point
├── contents/
│   ├── config.yml         # Site configuration
│   ├── home.md           # Personal bio section
│   ├── publications.md   # Publications list
│   └── awards.md        # Awards and honors
└── static/
    ├── js/
    │   ├── scripts.js    # Main application logic
    │   ├── marked.min.js # Markdown parser
    │   └── js-yaml.min.js # YAML parser
    ├── css/             # Styling files
    └── assets/img/     # Image assets
```