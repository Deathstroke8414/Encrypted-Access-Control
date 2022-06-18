const Proxy = require("recrypt-js").Proxy
const PRE = require("recrypt-js")
const request = require('request')
const file = require('./file')



const generate =  function (Outpath) {
    
    // generates the key pair
    const key_pair = Proxy.generate_key_pair();
    const secret_key = Proxy.to_hex(key_pair.get_private_key().to_bytes())
    const public_key = Proxy.to_hex(key_pair.get_public_key().to_bytes())

    //saving the keys in a json file
    const keys = {
        secret_key,
        public_key
    }
     file.saving(Outpath,keys)
  
}

const encrypt = async function (msg,keyPath){
       
    const data = await file.reading(keyPath)
    
    // alice encryptes the message 
    const encr = PRE.encryptData(data.public_key, msg)
    
    //saving the encrypted message on the server database
    const url = 'http://localhost:3000/data'
    request({
    url : url,
    method :"POST",
    headers : {
        "content-type": "application/json",
    },
    body: {
        'data': encr,
        'access':[],
        'key':[]
    },
    json: true
    },(err,res)=>{
        if(err){
            console.log(err)
        }else{
            console.log(res.body)
        }
    })
}
    
const grantAccess = async function (Bpub , uid, keyPath){

    const public_key_bob = Bpub

    // alice wants to grant access to bob
    // alice first generates proxy re-encryption key and send it to the server
    const data = await file.reading(keyPath)
    const grant_to_bob = PRE.generateReEncrytionKey(data.secret_key, public_key_bob)

    // server stores the re-encryption key and the uid of data
    const url = 'http://localhost:3000/data/grant_access/'+uid
    request({
    url : url,
    method :"POST",
    headers : {
        "content-type": "application/json",
    },
    body: {
        'pub_bob':public_key_bob,
        're_encr_key': grant_to_bob
    },
    json: true
    },(err,res)=>{
        if(err){
            console.log(err)
        }else{
            console.log(res.body)
        }
    })
}
    
const view =  function (uid,keyPath){
     
    // request the data with uid from server and the re-encryption key
    const url = 'http://localhost:3000/data/'+uid
    request({
    url : url,
    method :"GET",
    headers : {
        "content-type": "application/json",
    },
    json: true
    },(err,res)=>{
        if(err){
            console.log(err)
        }else{
     // reading public key of bob from stored file
     const data1 =  file.reading(keyPath)

    const i = res.body.access.findIndex(item => item.pub_bob === data1.public_key)
    const grant_to_bob = res.body.key[i].re_encr_key
    const data2 = res.body.data
  
    //re-encryption of the data
    PRE.reEncryption(grant_to_bob, data2)

    //read the secret key of bob from its saved location
      const secret_key_bob = data1.secret_key    

     // bob decrypte to get the message
    let msg_bob = PRE.decryptData(secret_key_bob, data2)

     console.log(msg_bob)
        }
    })


}   

const list = function (){
     
    // request the data with uid from server 
    const url = 'http://localhost:3000/data'
    request({
    url : url,
    method :"GET",
    headers : {
        "content-type": "application/json",
    },
    json: true
    },(err,res)=>{
        if(err){
            console.log(err)
        }else{
            console.log(res.body)
        }
    })
}

module.exports = {
    generate,
    encrypt,
    grantAccess,
    view,
    list
}