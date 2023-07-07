'use strict'
const fetch = require('node-fetch')
const path = require('path')
const BUCKET = process.env.S3_BUCKET || 'web-public'
const S3_API_URI = process.env.S3API_URI
const apiRequest = async(uri)=>{
  try{
    let res = await fetch(path.join(S3_API_URI, uri), { method: 'GET', timeout: 30000, compress: true})
    return await parseResponse(res)
  }catch(e){
    if(e.message){
      throw(e.name+' '+e.message+' '+e.type)
    }else{
      throw(e)
    }
  }
}
const parseResponse = async(res)=>{
  try{
    if(!res) return
    if(res.status?.toString().startsWith(4)) throw('s3api fetch error')
    if(!res.status?.toString().startsWith(2)) return
    let body
    if (res.headers?.get('Content-Type')?.includes('application/json')) body = await res.json()
    if (res.headers?.get('Content-Type')?.includes('image/png')){
      body = await res.arrayBuffer()
      body = Buffer.from(body)
    }
    if(!body) body = res.status
    return body
  }catch(e){
    throw(e)
  }
}
module.exports.list = async(prefix)=>{
  try{
    if(!BUCKET) return
    let uri = 'list?Bucket='+BUCKET
    if(prefix) uri += '&Prefix='+prefix
    return await apiRequest(uri)
  }catch(e){
    throw(e);
  }
}
module.exports.get = async(file)=>{
  try{
    if(!BUCKET || !file) return
    return await apiRequest('get?Bucket='+BUCKET+'&Key='+file)
  }catch(e){
    throw(e);
  }
}
