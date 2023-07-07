'use strict'
const fs = require('fs-extra')
const path = require('path')
const getFiles = require('./getFiles')
const s3 = require('./s3')
const BASE_PATH = process.env.BASE_PATH || '/app/public'

const SaveFile = require('./saveFile')
module.exports = async(dir)=>{
  try{
    await fs.ensureDirSync(path.join(BASE_PATH, dir))
    const list = await getFiles(path.join(BASE_PATH, dir))
    const remoteFiles = await s3.list(dir)
    let missingFiles = remoteFiles.filter(x=>!list.includes(x.Key?.replace(dir+'/','')))
    if(!missingFiles) missingFiles = []
    if(missingFiles?.length > 0){
      console.log('Getting '+missingFiles?.length+' for '+path.join(BASE_PATH, dir))
      let i = missingFiles.length
      while(i--){
        await SaveFile(missingFiles[i].Key)
      }
    }else{
      console.log('No missing files for '+path.join(BASE_PATH, dir))
    }
  }catch(e){
    throw(e);
  }
}
