const latex = require('node-latex')
const LATEX_END = '\\end{document}'
const fs = require('fs')
const PDF_NAME = `Plasmaホワイトペーパー.pdf`

// concat tex
let listTex = fs.readdirSync('./tex')
let bulk = listTex.map(n=> fs.readFileSync('./tex/'+n) ).join("\n") + "\n" + LATEX_END
fs.writeFileSync('.bulk', bulk)

// bake PDF
const input = fs.createReadStream('.bulk')
const output = fs.createWriteStream(PDF_NAME)
const pdf = latex(input)
pdf.pipe(output)
console.log("Generating... \n")
console.log("  > "+PDF_NAME+"\n")
pdf.on('error', err => console.error(err))