const latex = require('node-latex')
const LATEX_END = '\\end{document}'
const fs = require('fs')

let listTex = fs.readdirSync('./tex')
let bulk = listTex.map(n=> fs.readFileSync('./tex/'+n) ).join("\n") + "\n" + LATEX_END
fs.writeFileSync('.bulk', bulk)

let listPdf = fs.readdirSync('./pdf')
listPdf = listPdf.map(f=>{
  let arr = f.match(/\d+/)
  return arr ? parseInt(arr[0]) : 0
})
let max = Math.max(...listPdf)
let incrementedName = `pdf/Plasmaホワイトペーパー_第${max+1}版.pdf`
let latestName = `pdf/Plasmaホワイトペーパー_最新版.pdf`

// Change former latest version to backnumber
try {
  let isLatestExist = fs.accessSync(latestName)
  fs.renameSync(latestName, incrementedName)
  console.log("\nLatest version detected\n")
  console.log("Renaming...\n")
  console.log("  "+latestName+" >>> "+incrementedName+"\n")
} catch(e) {
  console.log("\nNo latest version of pdf\n")
}

const input = fs.createReadStream('.bulk')
const output = fs.createWriteStream(latestName)
const pdf = latex(input)
pdf.pipe(output)
console.log("Generating... \n")
console.log("  > "+latestName+"\n")
pdf.on('error', err => console.error(err))