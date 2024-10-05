import dbRepository from "./database/db_repository.js";
import utils from "./utils/utils.js";

class SPNA {
    constructor(banTimeList, verifyTimer) {
        this.dbRepository = undefined
        this.banTimeList = banTimeList
        this.verifyTimer = verifyTimer
    }

    useSequelize(sequelize) {
        const db_config = {"sequelize": sequelize}
        this.dbRepository = new dbRepository(db_config, this.banTimeList, this.verifyTimer)
    }

    createDB(name, username, pass, hostname) {
        const db_config = {
            "name": name,
            "username": username,
            "pass": pass,
            "hostname": hostname,
        }
        this.dbRepository = new dbRepository(db_config, this.banTimeList, this.verifyTimer)
    }

    _checkDbRepository() {
        if (this.dbRepository === undefined) {
            throw new Error("dbRepository is not defined. Please call useSequelize() or createDB() first.");
        }
    }

    async addRequest(number, code, device_id) {
        this._checkDbRepository();
        const createdAt = utils.requestTimeSecond()
        return await this.dbRepository.addVerifying(number, code, device_id, createdAt)
    }

    async codeExist(number, code, device_id) {
        this._checkDbRepository();
        return await this.dbRepository.codeExist(number, code, device_id)
    }

}


export default SPNA
