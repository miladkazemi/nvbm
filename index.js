import dbRepository from "./database/db_repository.js";
import utils from "./utils/utils.js";

class nvbm {
    constructor(banTimeList, verifyTimer) {
        this.dbRepository = undefined
        this.banTimeList = banTimeList
        this.verifyTimer = verifyTimer
    }

    async useSequelize(sequelize) {
        const db_config = {"sequelize": sequelize}
        this.dbRepository = new dbRepository(db_config, this.banTimeList, this.verifyTimer)
        await this.dbRepository.init()
    }

    async createDB(name, username, pass, hostname) {
        const db_config = {
            "name": name,
            "username": username,
            "pass": pass,
            "hostname": hostname,
        }
        this.dbRepository = new dbRepository(db_config, this.banTimeList, this.verifyTimer)
        await this.dbRepository.init()
    }

    _checkDbRepository() {
        if (this.dbRepository === undefined) {
            throw new Error("nvbm Error: Please call 'await useSequelize()' or 'await createDB()' first.");
        }
    }

    async checkBanDevice(device_id) {
        this._checkDbRepository();
        const createdAt = utils.requestTimeSecond()
        return await this.dbRepository.checkBanDevice(device_id, createdAt)
    }

    async addRequest(number, code, device_id, checkBanDevice) {
        this._checkDbRepository();
        const createdAt = utils.requestTimeSecond()
        return await this.dbRepository.addVerifying(number, code, device_id, createdAt, checkBanDevice)
    }

    async codeExist(number, code, device_id) {
        this._checkDbRepository();
        return await this.dbRepository.codeExist(number, code, device_id)
    }

}


export default nvbm
