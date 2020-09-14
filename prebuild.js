const fs = require('fs')
const path = require('path')
const remark = require('remark')
const html = require('remark-html')

// we'll look for any `.json` files in the `input` folder, then output to a single json file
const scanDirectories = [
  { inputDirectory: 'public/data/posts', outputFile: 'public/data/posts.json' }
]

console.log('BUILD JSON DATA')
scanDirectories.forEach(processFiles)

// finds all json files in directory, processes to markdown, updates original file, updates output file
function processFiles({ inputDirectory, outputFile }) {
  const postsDirectory = path.join(process.cwd(), inputDirectory)
  const filenames = fs.readdirSync(postsDirectory)
  
  Promise.all(filenames.map(async (filename) => {
    // only allow .json files
    if (!filename.endsWith('.json')) {
      return false
    }
  
    const filePath = path.join(postsDirectory, filename)
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const jsonData = JSON.parse(fileContents)
  
    // parse / transform any contents
    if (jsonData.body) {
      jsonData.bodyHtml = (await remark().use(html).process(jsonData.body)).toString()
    }
    if (jsonData.date) {
      jsonData.dateFormatted = (new Date(jsonData.date)).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
    }

    // write transformations back to original file
    fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2))
  
    return jsonData
  })).then(results => {
    const posts = results.filter(Boolean)

    // plump it up for performance testing
    // do {
    //   [...posts].map(post => posts.push(post))
    // } while (posts.length < 5000)

    // sort
    posts.sort((a, b) => new Date(b.date) - new Date(a.date))
    
    const outputPath = path.join(process.cwd(), outputFile)
    fs.writeFileSync(outputPath, JSON.stringify(posts, null, 2))
    
    console.log([inputDirectory, outputFile].join(' -> '), posts.length)
  })
}