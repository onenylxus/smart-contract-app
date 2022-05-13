import fs from 'fs';
import fetch from 'node-fetch';

// Vercel does not like Angular, so environment file have to generate on my own
const jsonUrl = "https://api.jsonbin.io/b/627dd32a38be2967610362b5";
const targetPath = `${process.cwd()}/src/environments`;

async function make() {
  if (!fs.existsSync(targetPath)) {
    fs.mkdirSync(targetPath);
  }

  await fetch(jsonUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((json) => {
      const data = 'export const environment = {\n' + `  production: ${json.production},\n` + `  apiKey: '${json.apiKey}',\n` + '};';

      fs.writeFile(`${targetPath}/environment.ts`, data, (err) => {
        if (err) {
          console.error(err);
          throw err;
        } else {
          console.log(
            `Angular environment.ts file generated correctly at ${targetPath}\n`
          );
        }
      });

      fs.writeFile(`${targetPath}/environment.prod.ts`, data, (err) => {
        if (err) {
          console.error(err);
          throw err;
        } else {
          console.log(
            `Angular environment.prod.ts file generated correctly at ${targetPath}\n`
          );
        }
      });
    });
}

make();
