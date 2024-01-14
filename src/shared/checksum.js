
let crypto = require('crypto');
let fs = require('fs');

function checksum(file){
const fileBuffer = fs.readFileSync(file);
const hashSum = crypto.createHash('sha256');
hashSum.update(fileBuffer);
const hex = hashSum.digest('hex');
console.log(hex)
return (
    <h1>{hex}</h1>
    )
}
//checksum('C:/Users/Usuario/Desktop/DATA BOOK SBL 7/CERTIFICADOS/C29/CERTIFICADO_ID_29_FIRMADO.pdf')
 //export default checksum

export default checksum