'use strict'
const fs = require('fs')
module.exports = (dir)=>{
  return new Promise((resolve, reject) =>{
    try{
      fs.readdir(dir, (err, files)=>{
        if(err) reject(err);
        resolve(files)
      })
    }catch(e){
      reject(e)
    }
  })
}
