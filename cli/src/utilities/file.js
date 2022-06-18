const path = require ('path')
const fs = require('fs')

const saving = function (Outpath,keys){
    const folder = path.parse(Outpath)
    if(folder.dir!==''){
    fs.mkdir(folder.dir, { recursive: true }, function(err) {
  if (err) {
    console.log(err)
  } else {
    console.log("New directory successfully created.")
  }
})}
    const data = JSON.stringify(keys)
    fs.writeFileSync(Outpath,data)
}

const reading = function (Outpath){
    const buffer = fs.readFileSync(Outpath)
    const dataJSON = buffer.toString()
    const data = JSON.parse(dataJSON)
    return data
}

module.exports = {
    saving,
    reading
}