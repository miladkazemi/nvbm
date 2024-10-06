# nvbm - number verification & Ban Management ⚔️


[![npm version](https://badge.fury.io/js/nvbm.svg)](https://badge.fury.io/js/nvbm)
[![license](https://img.shields.io/npm/l/nvbm.svg)](https://www.npmjs.com/package/nvbm)
[![downloads](https://img.shields.io/npm/dt/nvbm.svg)](https://www.npmjs.com/package/nvbm)
![Logo](./images/verify_number.jpg)



## Table of Contents 📕

- [Introduction](#introduction-)
- [Features](#features-)
- [Installation](#installation-)
- [API](#api-)
  - [nvbm.createDB()](#createDB)
  - [nvbm.useSequelize()](#useSequelize)
  - [nvbm.checkBanDevice()](#checkBanDevice)
  - [nvbm.addRequest()](#addRequest)
  - [nvbm.codeExist()](#codeExist)
- [Examples](#example-)
- [License](#license-️)

## Introduction 💡

`nvbm` is a powerful and flexible Node.js package for verifying numbers with codes, managing repeated requests, and banning users based on their device ID. Whether you're building a web or mobile application, `nvbm` helps you secure your app with authentication mechanisms and rate-limiting strategies.

## Features 🚀

- ✅ Verify user phone numbers with custom codes
- 🚫 Ban users based on device ID
- 📦 Integration with Sequelize and MySQL
- ✔ Simple API with async/await support

## Installation 📥

You can install the package via npm:

```bash
npm install nvbm --save
```

## API ⭐

  ### createDB
  - `args:` `dbName`, `username`, `password`, `hostname`
  - First, create a database and then send its values ​​mentioned above to `nvbm.createDB()`

  ### useSequelize
  - `args:` `sequelize`
  - If you use Sequelize, it is better to use this method and give it only one instance of Sequelize as input.

  ### checkBanDevice
  - `args:` `device_id`
  - Before you want to send a confirmation code, check whether the user with a certain device_id is prohibited from receiving SMS or not.

  ### addRequest
  - `args:` `number`, `code`, `device_id`, `checkBanDevice`
  - If the user with her specific `device_id` was not restricted, we can confirm the request to receive the code and after receiving the code, we will call the `addRequest()` method (pay attention that you must also give the response `checkBanDevice()` to its input)

  ### codeExist
  - `args:` `number`, `code`, `device_id`
  - In the last step, when the user wants to send the received `code` for authentication, we call this method


## Example 📌

Pay attention to explanations:

- `banTimeList: ` Each time it is requested by a device_id, according to the value provided each time, it takes n time for the user to unblock (if it reaches the end of the list, it starts from the beginning) -> ( custom )
- `verifyTimer: ` Once the code is submitted, you have n seconds to submit the code for verification -> ( custom )
- `exampleCode: ` The amount of the code you received from anywhere (for example, SMS panel)
- `exampleDeviceID: ` You should get a unique ID from the client


```JS
import NVBM from 'nvbm'

const banTimeList = [60, 120, 180, 500, 3600] // array sec: 
const verifyTimer = 120 // sec ( 2 min )

const nvbm = new NVBM(banTimeList, verifyTimer)
await nvbm.useSequelize(sequelize) // or: await nvbm.createDB('dbName', 'root', '', 'localhost')
// first check ban list
const checkBanDeviceRes = await nvbm.checkBanDevice("exampleDeviceID") // you can log 'checkBanDeviceRes' ( maybe user is ban ( device_id ) )
if(!checkBanDeviceRes.isBan) {
  // call for send code to your number
  console.log(await nvbm.addRequest("exampleNumber", "exampleCode", "exampleDeviceID", checkBanDeviceRes)) 
}

// call for check & verify your number with Code
console.log(await nvbm.codeExist("exampleNumber", "exampleCode", "exampleDeviceID")) // if verifyed: true, else: false

```



## License ⚖️

This project is licensed under the GPL-3.0 License - see the [LICENSE](./LICENSE) file for details.
