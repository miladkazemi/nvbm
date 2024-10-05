
const banDevice = (isBan, ban_lvl, needUpdate, remainingTime, reason) => {
    return {
      "isBan": isBan,
      "ban_lvl": ban_lvl,
      "needUpdate": needUpdate,
      "remainingTime": remainingTime,
      "reason": (reason == undefined) ? "no reason" : reason,
    }
}

const addVerifying = (isOK, msg, remainingTime) => {
    return {
      "isOK": isOK,
      "msg": msg,
      "remainingTime": remainingTime,
    }
}

export default {
  banDevice: banDevice,
  addVerifying: addVerifying,
}