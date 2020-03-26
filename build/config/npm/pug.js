const fs = require('fs')
  , path = require('path')
  , mkdirp = require('mkdirp')
  , pug = require('pug')

const src = 'build/pug'
  , dist = 'dist'
  , pages = `${dist}/pages`
  , csspath = 'css/acdors.css'

let files = fs.readdirSync(src, {withFileTypes: true});
mkdirp.sync(pages);

files.forEach(function(file) {
  let distpath = pages
    , options = {pretty: true}
    , locals = {csspath: csspath}

  if(file.isFile()){
    if(file.name == 'index.pug'){ 
      distpath = dist; 
    }else{ 
      distpath = pages; 
      locals.csspath = `../${csspath}`;
    }

    let fn = pug.compileFile(`${src}/${file.name}`, options)
      , filename = path.basename(file.name, '.pug') + '.html';
    fs.writeFileSync(`${distpath}/${filename}`, fn(locals));
  }
})
