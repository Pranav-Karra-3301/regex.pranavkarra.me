<p align="center">
  <img src="public/logo.png" alt="curious?" width="200"/>
</p>

<h1 align="center">Regular Expressions</h1>

<p align="center">
  A free, interactive course for learning and practicing regular expressions in the browser.
</p>

<p align="center">
  <a href="https://regex.pranavkarra.me">regex.pranavkarra.me</a>
</p>

## What is this

An interactive regex practice course with 39 hands-on lessons. Type a pattern, and it live-tests against a set of cases you should match and cases you should not. Work through the fundamentals up to the tricky stuff:

- Basics (literal characters, the dot wildcard, escaping)
- Character classes (sets, ranges, negation, `\d`, `\w`, `\s`)
- Anchors and boundaries (`^`, `$`, `\b`, `\B`)
- Quantifiers (`*`, `+`, `?`, `{n}`, `{n,m}`, lazy)
- Groups and capturing (alternation, non-capturing, named groups, backreferences)
- Lookarounds (lookahead and lookbehind, positive and negative)
- Real-world patterns (emails, phone numbers, URLs, IPs, dates, and more)

Built while studying for CMPSC 461 at Penn State.

## Running locally

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000). It is a [Next.js](https://nextjs.org) app.

## Credits

Built by [Pranav Karra](https://pranavkarra.me) and Claude.
