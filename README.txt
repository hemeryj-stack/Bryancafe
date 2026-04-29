Bryan's Café website project

Files included:
- index.html
- menu.html
- contact.html
- privacy.html
- assets/css/style.css
- assets/js/script.js
- assets/js/menu.js
- assets/js/contact.js
- data/menu.xml + data/menu.dtd
- data/branches.xml + data/branches.dtd
- assets/images/*.jpg

How to run:
1. Open the folder in VS Code.
2. Start it with Live Server, or host it on a local/web server.
3. Open index.html through that server.

Important:
- The Menu and Contact pages use JavaScript fetch() to read the XML files.
- If you open the HTML files directly with file:/// some browsers may block the XML loading.
- The footer year is generated automatically with JavaScript.
- The Privacy Policy link is only in the footer and opens in a new tab.
