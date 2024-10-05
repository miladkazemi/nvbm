export default {

    verifying: (number, code, device_id, ban_lvl, createdAt) => {
        return {
            number: number,
            code: code,
            device_id: device_id,
            ban_lvl: ban_lvl,
            createdAt: createdAt,
        }
    },

}