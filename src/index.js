'use strict'
const paths = ['asset', 'portrait', 'thumbnail']

const checkFiles = require('./checkFiles')
const checkPaths = async()=>{
  try{
    let i = paths.length
    while(i--){
      checkFiles(paths[i])
    }
  }catch(e){
    if(e.message){
      console.error(e.name+' '+e.message+' 'e.type);
    }else{
      console.error(e);
    }
    setTimeout(checkPaths, 5000)
  }
}
checkPaths()
