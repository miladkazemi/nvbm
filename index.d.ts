/* Created By MiladStOrM ( October 5, 2024 )
|-----------------------------------------------|
|   contact me {                                |
|    "telegram": "t.me/DevSt0rM",               |
|    "github": "github.com/miladkazemi",        |
|   }                                           |
|-----------------------------------------------|
*/

import { Sequelize } from "sequelize";

interface checkBanDeviceModel {
  isBan: boolean,
  ban_lvl: number,
  needUpdate: boolean,
  remainingTime: number,
  reason: string,
}

interface addVerifyingModel {
  isOK: boolean,
  msg: string,
  remainingTime: number,
}


declare module 'spna' {
  export default class SPNA {
    constructor(banTimeList: Array<number>, verifyTimer: number)
    // call for init 'createDB' of 'useSequelize'
    createDB(db_name: string, username: string, pass: string, hostname: string): Promise<null>;
    useSequelize(sequelize: Sequelize): Promise<null>;
    // step1:
    checkBanDevice(device_id: String): Promise<checkBanDeviceModel>;
    // step2:
    addRequest(number: String, code: String, device_id: String, checkBanDevice: checkBanDeviceModel): Promise<addVerifyingModel>;
    // step3:
    codeExist(number: String, code: String, device_id: String): Promise<boolean>;
  }
}