const latex = require('node-latex')
const LATEX_END = '\\end{document}'
const fs = require('fs')
const PDF_NAME = `Plasmaホワイトペーパー.pdf`

// Concat sections
let listTex = fs.readdirSync('./tex')
let body = listTex.map(n=> fs.readFileSync('./tex/'+n) ).join("\n")
let translatorsBlock = fs.readFileSync("2_TRANSLATORS.tsv").toString().split('\n').map(t=> t.replace(/  /, ' / ') ).join('\n')
let contributersBlock = fs.readFileSync("3_CONTRIBUTORS.md")

// Transalators and Contributors
let footer = `
\\pagebreak
\\Large{Japanese Transalation / 日本語訳}
\\
\\
\\small{Technical Transalators / 技術翻訳}
\\
\\scriptsize{${translatorsBlock}}
\\
\\
\\
\\small{Contributors / 修正協力}
\\
\\scriptsize{${contributersBlock}}
`.replace(/\n/g, '\n\n')//latex way. empty line is \\

// Make it bulk and save as hidden file
let bulk = `${body}\n${footer}\n${LATEX_END}`
fs.writeFileSync('.bulk', bulk)

// Bake PDF
const input = fs.createReadStream('.bulk')
const output = fs.createWriteStream(PDF_NAME)
const pdf = latex(input)
pdf.on('error', err => console.error(err))
pdf.pipe(output)

// Logging
console.log("Generating... \n")
console.log("  > "+PDF_NAME+"\n")
