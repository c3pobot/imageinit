'use strict'
const fs = require('fs')
const path = require('path')
const s3 = require('./s3')
const BASE_PATH = process.env.BASE_PATH || '/app/public'
module.exports = async(fileName)=>{
  try{
    let file = await s3.get(fileName)
    if(file) fs.writeFileSync(path.join(BASE_PATH, fileName), file)
  }catch(e){
    throw(e);
  }
}
