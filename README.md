# faisalprasetya.github.io

Personal portfolio site for Faisal Malik Widya Prasetya — Senior Data & AI Engineer.

Live at: https://faisalprasetya.github.io/

## Stack

Plain HTML/CSS/JS, no build step, no external dependencies (fonts/frameworks/CDNs).
Served directly by GitHub Pages from the `main` branch root.

## Structure

```
index.html          Single-page site (About, Skills, Experience, Projects, Research, Contact)
404.html             Custom not-found page
css/style.css        Theme (dark/light via CSS variables, toggle persisted in localStorage)
js/main.js           Theme toggle + footer year
assets/favicon.svg   Site icon
robots.txt
sitemap.xml
```

## Local preview

```
python3 -m http.server 8000
```

Then open http://localhost:8000

## Updating content

Source of truth for résumé content is `Profile.md`. When it changes, update the
corresponding section in `index.html` by hand (no templating/build step).
