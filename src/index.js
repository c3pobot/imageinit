'use strict'
const paths = ['asset', 'portrait', 'thumbnail']
const fs = require('fs')
const checkFiles = require('./checkFiles')
const reportError = (err, lines = 2)=>{
  try{
    let msg

    if(err.stack){
      msg = ''
      let stack = err.stack?.split('\n')
      for(let i = 0;i<lines;i++) msg += stack[i]+'\n'
    }
    if(msg){
      console.error(msg)
    }else{
      console.error(err)
    }
  }catch(e){
    console.error(e);
  }
}
const checkPaths = async()=>{
  try{
    let i = paths.length
    while(i--){
      await checkFiles(paths[i])
    }
  }catch(e){
    if(e.message){
      //console.error(e.name+' '+e.message+' '+e.type);
      reportError(e)
    }else{
      console.error(e);
    }
    setTimeout(checkPaths, 5000)
  }
}
checkPaths()
