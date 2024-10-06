import NVBM from './copyIndex.js';

const banTimeList = [60, 120, 180, 500, 3600] // array sec: 
const verifyTimer = 120 // sec ( 2 min )

const nvbm = new NVBM(banTimeList, verifyTimer)
await nvbm.createDB('game', 'root', '', 'localhost')
// first check ban list
const checkBanDeviceRes = await nvbm.checkBanDevice("exampleDeviceID") 
console.log(checkBanDeviceRes)
if(!checkBanDeviceRes.isBan) {
  // call for send code to your number
  console.log(await nvbm.addRequest("exampleNumber", "exampleCode", "exampleDeviceID", checkBanDeviceRes)) // maybe user is ban ( device_id )
}
// call for check & verify your number with Code
console.log(await nvbm.codeExist("exampleNumber", "exampleCode", "exampleDeviceID")) // if verifyed: true, else: false

