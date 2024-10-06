import config from '../utils/config.js'
import responseModel from '../utils/responseModel.js'
import utils from '../utils/utils.js'
import db_args from './db_args.js'
import dbModel from './db_model.js'


class dbRepository {
  constructor(db_config, banTimeList, verifyTimer) {
    this.dbModel = new dbModel(db_config)
    this.banTimeList = (banTimeList == undefined || banTimeList.length == undefined || banTimeList.length == 0) ? config.banTimeList : banTimeList
    this.verifyTimer = (typeof verifyTimer != Number) ? config.verifyTimer : verifyTimer
  }

  async init() {
    await this.dbModel.init()
  }

  async checkBanDevice(device_id, createdAt) {
    const firstBanLvl = config.firstBanLvl
    // get data
    const res = await this.dbModel.nvbm_verifying.findOne({
      where: {
        "device_id": device_id
      },
      raw: true,
    })
 
    // check data
    if(res == null) {
      return responseModel.banDevice(false, firstBanLvl, false, 0)
    }else {
      const elapsedTime = createdAt - res.createdAt
      const remainingTime = this.banTimeList[res.ban_lvl-1] - elapsedTime
      if(remainingTime <= 0) {
        const nextLVL = res.ban_lvl +1
        const banLVL = (nextLVL <= this.banTimeList.length) ? nextLVL : firstBanLvl // firstBanLvl: reset lvl 
        return responseModel.banDevice(false, banLVL, true, 0) 
      }else {
        return responseModel.banDevice(true, null, null, remainingTime, `"${res.number}" already is blocked`)
      }
    }
  }

  async addVerifying(number, code, device_id, createdAt, checkBanDevice) {
    if(checkBanDevice == undefined) {
      return new Error("nvbm Error: Please call 'await checkBanDevice()' first. then use your response for 'addVerifying(number, code, device_id, createdAt, checkBanDevice)' ");
    }
    if(!checkBanDevice.isBan) {
      if(checkBanDevice.needUpdate) {
        // update verifying
        await this.dbModel.nvbm_verifying.update(
          {"number": number, "createdAt": createdAt, "ban_lvl": checkBanDevice.ban_lvl},
          { where: {
             "device_id": device_id,
            }
          }
        )
      }else {
        // create verifying
        const data = db_args.verifying(number, code, device_id, checkBanDevice.ban_lvl, createdAt)
        await this.dbModel.nvbm_verifying.create(data)
      }

      // finally:
      return responseModel.addVerifying(true, `The code was sent to "${number}"`, 0)

    }
  }

  async codeExist(number, code, device_id) {
    const data = await this.dbModel.nvbm_verifying.findOne({
      where: {
        "number": number, 
        "code": code, 
        "device_id": device_id, 
      }
    })
    if(data == null) {
      return false
    }else {
      const reqAt = utils.requestTimeSecond()
      const elapsedTime = reqAt - data.createdAt

      // first del record
      await this.dbModel.nvbm_verifying.destroy({
        where: {
          "id": data.id
        }
      })

      // check timer
      return elapsedTime <= this.verifyTimer
    }
  }

}




export default dbRepository






