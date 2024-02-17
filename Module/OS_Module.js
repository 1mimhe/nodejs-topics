const os = require("os");

const currentOS = {
    name: os.type(),
    arch: os.arch(),
    platform: os.platform(),
    release: os.release(),
    version: os.version()
}
console.log(currentOS);
// {
//   name: 'Windows_NT',
//   arch: 'x64',
//   platform: 'win32',
//   release: '10.0.22000',
//   version: 'Windows 10 Pro'
// }

console.log(os.uptime()); // 1750641.281 (seconds)
console.log(os.userInfo());
// {
//   uid: -1,
//   gid: -1,
//   username: 'mimhe',
//   homedir: 'C:\\Users\\mimhe',
//   shell: null
// }

console.log(os.totalmem()); // 8355045376 (bytes)
console.log(os.freemem()); // 647307264

console.log(os.cpus());
// CPU logical cores(threads):
// [
//   {
//     model: 'Intel(R) Core(TM) i5-1035G1 CPU @ 1.00GHz',
//     speed: 1190,
//     times: {
//       user: 10835750,
//       nice: 0,
//       sys: 14473593,
//       idle: 117509828,
//       irq: 1409093
//     }
//   },
//   {
//     model: 'Intel(R) Core(TM) i5-1035G1 CPU @ 1.00GHz',
//     speed: 1190,
//     times: {
//       user: 9178171,
//       nice: 0,
//       sys: 10727984,
//       idle: 122912765,
//       irq: 156265
//     }
//   },
//   {
//     model: 'Intel(R) Core(TM) i5-1035G1 CPU @ 1.00GHz',
//     speed: 1190,
//     times: {
//       user: 10582187,
//       nice: 0,
//       sys: 9863843,
//       idle: 122372890,
//       irq: 191828
//     }
//   },
//   {
//     model: 'Intel(R) Core(TM) i5-1035G1 CPU @ 1.00GHz',
//     speed: 1190,
//     times: {
//       user: 8646609,
//       nice: 0,
//       sys: 8302281,
//       idle: 125870031,
//       irq: 145437
//     }
//   },
//   {
//     model: 'Intel(R) Core(TM) i5-1035G1 CPU @ 1.00GHz',
//     speed: 1190,
//     times: {
//       user: 6955843,
//       nice: 0,
//       sys: 6831046,
//       idle: 129032031,
//       irq: 128046
//     }
//   },
//   {
//     model: 'Intel(R) Core(TM) i5-1035G1 CPU @ 1.00GHz',
//     speed: 1190,
//     times: {
//       user: 5901578,
//       nice: 0,
//       sys: 5602734,
//       idle: 131314593,
//       irq: 96250
//     }
//   },
//   {
//     model: 'Intel(R) Core(TM) i5-1035G1 CPU @ 1.00GHz',
//     speed: 1190,
//     times: {
//       user: 6524218,
//       nice: 0,
//       sys: 5563750,
//       idle: 130730937,
//       irq: 97593
//     }
//   },
//   {
//     model: 'Intel(R) Core(TM) i5-1035G1 CPU @ 1.00GHz',
//     speed: 1190,
//     times: {
//       user: 6509140,
//       nice: 0,
//       sys: 5303625,
//       idle: 131006140,
//       irq: 74343
//     }
//   }
// ]

console.log(os.networkInterfaces());
// {
//   'Wi-Fi 2': [
//     {
//       address: 'fe80::7e45:ef9e:ebf5:1170',
//       netmask: 'ffff:ffff:ffff:ffff::',
//       family: 'IPv6',
//       mac: 'f0:77:c3:82:f8:70',
//       internal: false,
//       cidr: 'fe80::7e45:ef9e:ebf5:1170/64',
//       scopeid: 23
//     },
//     {
//       address: '172.17.35.8',
//       netmask: '255.255.254.0',
//       family: 'IPv4',
//       mac: 'f0:77:c3:82:f8:70',
//       internal: false,
//       cidr: '172.17.35.8/23'
//     }
//   ],
//   'Loopback Pseudo-Interface 1': [
//     {
//       address: '::1',
//       netmask: 'ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff',
//       family: 'IPv6',
//       mac: '00:00:00:00:00:00',
//       internal: true,
//       cidr: '::1/128',
//       scopeid: 0
//     },
//     {
//       address: '127.0.0.1',
//       netmask: '255.0.0.0',
//       family: 'IPv4',
//       mac: '00:00:00:00:00:00',
//       internal: true,
//       cidr: '127.0.0.1/8'
//     }
//   ],
//   'vEthernet (WSL)': [
//     {
//       address: 'fe80::174a:22ef:f545:73c1',
//       netmask: 'ffff:ffff:ffff:ffff::',
//       family: 'IPv6',
//       mac: '00:15:5d:2e:8e:e5',
//       internal: false,
//       cidr: 'fe80::174a:22ef:f545:73c1/64',
//       scopeid: 52
//     },
//     {
//       address: '172.25.0.1',
//       netmask: '255.255.240.0',
//       family: 'IPv4',
//       mac: '00:15:5d:2e:8e:e5',
//       internal: false,
//       cidr: '172.25.0.1/20'
//     }
//   ]
// }