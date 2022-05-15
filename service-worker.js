/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "53511c8ef94ddb885bb858c93224a63d"
  },
  {
    "url": "assets/css/0.styles.c43f6643.css",
    "revision": "1485044e42216d34c7558815db926b8e"
  },
  {
    "url": "assets/img/img.ca29d84a.png",
    "revision": "ca29d84a618ccb02f4cc98f79489ecce"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.30b887d3.js",
    "revision": "9861f1acd35b8cdae58c97c641a020c0"
  },
  {
    "url": "assets/js/11.c1b62882.js",
    "revision": "7d264acc88202f94eeaff5d87f12b22b"
  },
  {
    "url": "assets/js/12.b1839374.js",
    "revision": "f0df0062371af5560ac6c4df78715d46"
  },
  {
    "url": "assets/js/13.e56cff29.js",
    "revision": "329392e254b7c42877bdd9be0419daf3"
  },
  {
    "url": "assets/js/14.e77244b9.js",
    "revision": "7e6e78346124412195991dd1ef11bfae"
  },
  {
    "url": "assets/js/15.5c650a86.js",
    "revision": "21e30b797528e6510270412867bde0ba"
  },
  {
    "url": "assets/js/16.6889be8d.js",
    "revision": "d3c0ebca532c4411cd6551963437fd50"
  },
  {
    "url": "assets/js/17.f55b1329.js",
    "revision": "81ade835c2f67b7fbbab8fba59257969"
  },
  {
    "url": "assets/js/18.9e9d7f5c.js",
    "revision": "b8bff4cbe7f041462fd325b7b27197b6"
  },
  {
    "url": "assets/js/19.aebefa05.js",
    "revision": "61a0efe9ad2a0b831e70315ea4cae3ba"
  },
  {
    "url": "assets/js/2.b638ab38.js",
    "revision": "daa6b6ed292696bf0a2e3aa0e1b1153a"
  },
  {
    "url": "assets/js/20.0aaf0c93.js",
    "revision": "cf48daec9ba6c402f862922687bb03d8"
  },
  {
    "url": "assets/js/21.f0dc4bba.js",
    "revision": "49627f222a46e7351be6a8a384fb3490"
  },
  {
    "url": "assets/js/22.c5bbbc5d.js",
    "revision": "435fa747b95f612a0e198dc870ba12dd"
  },
  {
    "url": "assets/js/23.9c9cf32f.js",
    "revision": "ababb98b2fce59099380a5d4ca80a377"
  },
  {
    "url": "assets/js/24.5a427858.js",
    "revision": "bdaafcb3b3e9d940d5fb0980132d09ce"
  },
  {
    "url": "assets/js/26.a388051f.js",
    "revision": "9052f0ce80ac768f33661d8b7dc67bcd"
  },
  {
    "url": "assets/js/3.11bf8a91.js",
    "revision": "9d2b51430537848cac2ea5124482a938"
  },
  {
    "url": "assets/js/4.be72248a.js",
    "revision": "668bc91fb4500762c33bec844d358f72"
  },
  {
    "url": "assets/js/5.01993805.js",
    "revision": "6d5176ba3b4c2fa125c6a9aeb57b6aa7"
  },
  {
    "url": "assets/js/6.c2160e41.js",
    "revision": "52d18539e934aaf4d345354d67942f01"
  },
  {
    "url": "assets/js/7.1f827184.js",
    "revision": "bdfef6f12cfe483be868002afeba6c65"
  },
  {
    "url": "assets/js/8.ecbf9340.js",
    "revision": "a323d6e61a5078e66e9a97db0719672c"
  },
  {
    "url": "assets/js/9.a50bcd73.js",
    "revision": "8d744c4bc62ac7fd91f68755a0f6239d"
  },
  {
    "url": "assets/js/app.45e93e7b.js",
    "revision": "67710ff765758cbb233ee0d2f1e28ff9"
  },
  {
    "url": "conclusion/index.html",
    "revision": "737db322ff5bd1ce3491bc1172932c07"
  },
  {
    "url": "design/index.html",
    "revision": "9933d3e3789f5da43c161ce51b290251"
  },
  {
    "url": "index.html",
    "revision": "a7aba4565362231f58607d0ec3e5b68e"
  },
  {
    "url": "intro/index.html",
    "revision": "addd9cc87aa97285bbb57a78d6a570a3"
  },
  {
    "url": "license.html",
    "revision": "70a2edbdcd1a16b29dc6ec11e14ab937"
  },
  {
    "url": "logo.png",
    "revision": "ed5e6a8116cbdfd54da3f3ff7735e0f5"
  },
  {
    "url": "myAvatar.png",
    "revision": "b76db1e62eb8e7fca02a487eb3eac10c"
  },
  {
    "url": "requirements/index.html",
    "revision": "bf86db2a270cd62db98a2223aafa539a"
  },
  {
    "url": "requirements/stakeholders-needs.html",
    "revision": "bc54bbf2e971853e49e8720081764f04"
  },
  {
    "url": "requirements/state-of-the-art.html",
    "revision": "90333ac9f362f757902efbb8da393973"
  },
  {
    "url": "software/index.html",
    "revision": "58def3f897519bad8396bf6a63477c93"
  },
  {
    "url": "test/index.html",
    "revision": "2cfa64641847cbb47910808896969b4a"
  },
  {
    "url": "use cases/index.html",
    "revision": "170359ae1f0fd0f7deec259515664b81"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
