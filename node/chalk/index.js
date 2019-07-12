const http = require("http");
const chalk = require("chalk");

const initPage = `<!doctype html>
<html>
<title>Colors</title>
<form method="POST">
  <input type="text" name="text">
  <select name="color">
    <option value="red">red</option>
    <option value="blue">blue</option>
    <option value="green">green</option>
    <option value="yellow">yellow</option>
    <option value="gray">gray</option>
    <option value="magenta">magenta</option>
    <option value="cyan">cyan</option>
  </select>
  <button type="submit">Go</button>
</form>
</html>`;
const qs = require("querystring");

let toRender = "";

http.createServer((req, res) => {
    req.on("error", err => {
        console.log(err);
    });
    res.on("error", err => {
        console.log(err);
    });

    if (req.method == "GET") {
        res.statusCode = 200;
        res.setHeader("content-type", "text/html");
        res.write(initPage);
        res.end();
    }

    if (req.method == "POST") {
        let data = "";
        req.on("data", chunk => {
            data += chunk;
        }).on("end", () => {
            let formData = qs.parse(data);
            toRender = `<!doctype html>
<html>
<title>${formData.text}</title>
<a href="/" style="color:${formData.color}">${formData.text}</a>
</html>`;

            console.log(chalk.keyword(formData.color)(`${formData.text}`));
            res.write(toRender);
            res.end();
        });
    }
}).listen(8080, () => console.log("listening on port 8080."));
