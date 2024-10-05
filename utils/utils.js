const requestTime = () => {
    return new Date().getTime()
}

const requestTimeSecond = () => {
    return Math.floor(new Date().getTime() / 1000) //  Convert milliseconds to seconds
}

export default {
    requestTime: requestTime,
    requestTimeSecond: requestTimeSecond,
}