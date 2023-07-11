'use strict'
const log = require('./logger')
let logLevel = process.env.LOG_LEVEL || log.Level.INFO;
log.setLevel(logLevel);
const paths = ['asset', 'portrait', 'thumbnail']
const fs = require('fs')
const checkFiles = require('./checkFiles')
const checkPaths = async()=>{
  try{
    let i = paths.length
    while(i--){
      await checkFiles(paths[i])
    }
  }catch(e){
    log.error(e)
    setTimeout(checkPaths, 5000)
  }
}
checkPaths()
