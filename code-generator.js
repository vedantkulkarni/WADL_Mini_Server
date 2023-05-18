const { 
    v4: uuidv4,
  } = require('uuid');

const getCode = async()=>{
    return uuidv4();
}

module.exports = getCode