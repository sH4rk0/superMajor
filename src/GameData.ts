export let GameData: any = {
  levels: [
    {
      name: 'Acquamela',
      block: { key: 'block-acquamela', x: 100, y: 370, scale: 4, offsetX: 0, offsetY: -55 },
      map: 'level-1',
      intro: 'Kill you opponents, collect bonus and find the exit',
      time: 50,
      bg: { x: 0, y: -320 },
      clouds: [
        { x: 640, y: 250, w: 1280, h: 300, key: 'cloud1', speed: 0.5 },
        { x: 640, y: 150, w: 1280, h: 300, key: 'cloud2', speed: 0.7 }
      ]
    },
    {
      name: 'Antessano',
      block: { key: 'block-acquamela', x: 220, y: 370, scale: 4, offsetX: 0, offsetY: -55 },
      map: 'level-2',
      intro: 'Kill you opponents, collect bonus and find the exit',
      time: 60,
      bg: { x: 0, y: -320 },
      clouds: [
        { x: 640, y: 250, w: 1280, h: 300, key: 'cloud1', speed: 0.5 },
        { x: 640, y: 150, w: 1280, h: 300, key: 'cloud2', speed: 0.7 }
      ]
    },
    {
      name: 'Caprecano',
      block: { key: 'block-acquamela', x: 340, y: 370, scale: 4, offsetX: 0, offsetY: -55 },
      map: 'level-3',
      intro: 'Kill you opponents, collect bonus and find the exit',
      time: 80,
      bg: { x: 0, y: -320 },
      clouds: [
        { x: 640, y: 250, w: 1280, h: 300, key: 'cloud1', speed: 0.5 },
        { x: 640, y: 150, w: 1280, h: 300, key: 'cloud2', speed: 0.7 }
      ]
    },
    {
      name: 'Fusara',
      block: { key: 'block-acquamela', x: 460, y: 370, scale: 4, offsetX: 0, offsetY: -55 },
      map: 'level-4',
      intro: 'Kill you opponents, collect bonus and find the exit',
      time: 90,
      bg: { x: 0, y: -320 },
      clouds: [
        { x: 640, y: 250, w: 1280, h: 300, key: 'cloud1', speed: 0.5 },
        { x: 640, y: 150, w: 1280, h: 300, key: 'cloud2', speed: 0.7 }
      ]
    },
    {
      name: 'Orignano',
      block: { key: 'block-acquamela', x: 580, y: 370, scale: 4, offsetX: 0, offsetY: -55 },
      map: 'level-5',
      intro: 'Kill you opponents, collect bonus and find the exit',
      time: 100,
      bg: { x: 0, y: -320 }
    },
    {
      name: 'Saragnano',
      block: { key: 'block-acquamela', x: 700, y: 370, scale: 4, offsetX: 0, offsetY: -55 },
      map: 'level-6',
      intro: 'Kill you opponents, collect bonus and find the exit',
      time: 150,
      bg: { x: 0, y: -320 },
      clouds: [
        { x: 640, y: 250, w: 1280, h: 300, key: 'cloud1', speed: 0.5 },
        { x: 640, y: 150, w: 1280, h: 300, key: 'cloud2', speed: 0.7 }
      ]
    },
    {
      name: 'Sava',
      block: { key: 'block-acquamela', x: 820, y: 370, scale: 4, offsetX: 0, offsetY: -55 },
      map: 'level-7',
      intro: 'Kill you opponents, collect bonus and find the exit',
      time: 120,

      clouds: [
        { x: 640, y: 250, w: 1280, h: 300, key: 'cloud1', speed: 0.5 },
        { x: 640, y: 150, w: 1280, h: 300, key: 'cloud2', speed: 0.7 }
      ]
    },
    {
      name: 'City Hall',
      block: { key: 'block-hall', x: 1050, y: 315, scale: 1, offsetX: -100, offsetY: -5 },
      map: 'level-8',
      intro: 'Kill you opponents, collect bonus and find the exit',
      time: 70,
      bg: { x: 0, y: -320 }
    }
  ],
  tilemaps: [
    {
      key: 'gameover',
      path: 'assets/tilemap/gameover.json'
    },
    {
      key: 'intro',
      path: 'assets/tilemap/intro.json'
    },

    {
      key: 'win',
      path: 'assets/tilemap/win.json'
    },

    {
      key: 'level-1',
      path: 'assets/tilemap/level-1.json'
    },
    {
      key: 'level-2',
      path: 'assets/tilemap/level-2.json'
    },
    {
      key: 'level-3',
      path: 'assets/tilemap/level-3.json'
    },
    {
      key: 'level-4',
      path: 'assets/tilemap/level-4.json'
    },
    ,
    {
      key: 'level-5',
      path: 'assets/tilemap/level-5.json'
    },
    {
      key: 'level-6',
      path: 'assets/tilemap/level-6.json'
    },
    {
      key: 'level-7',
      path: 'assets/tilemap/level-7.json'
    },
    {
      key: 'level-8',
      path: 'assets/tilemap/level-8.json'
    }
  ],
  spritesheets: [
    { name: 'explosion', path: 'assets/images/game/explosion2.png', width: 80, height: 80, frames: 28 },

    { name: 'boss', path: 'assets/images/game/boss.png', width: 354 / 2, height: 218, frames: 2 },
    {
      name: 'deluca',
      path: 'assets/images/game/deluca.png',
      width: 60,
      height: 70,
      spacing: 4
    },
    {
      name: 'bomb',
      path: 'assets/images/game/bomb.png',
      width: 18,
      height: 32,
      spacing: 2
    },
    {
      name: 'tiles',
      path: 'assets/tilemap/super-mario-16bit.png',
      width: 16,
      height: 16,
      spacing: 2
    },
    {
      name: 'player-galdi',
      path: 'assets/images/game/players/player-galdi.png',
      width: 60,
      height: 70,
      frames: 30
    },
    {
      name: 'bonus-coin',
      path: 'assets/images/game/bonus/coin.png',
      width: 64,
      height: 64,
      frames: 8
    },
    {
      name: 'player-valiante',
      path: 'assets/images/game/players/player-valiante.png',
      width: 60,
      height: 70,
      frames: 30
    },
    {
      name: 'player-siniscalco',
      path: 'assets/images/game/players/player-siniscalco.png',
      width: 60,
      height: 70,
      frames: 30
    },
    {
      name: 'player-moscatiello',
      path: 'assets/images/game/players/player-moscatiello.png',
      width: 60,
      height: 70,
      frames: 30
    }
  ],

  images: [
    {
      name: 'QuestionTile',
      path: 'assets/images/game/QuestionTile.png'
    },
    {
      name: '1up',
      path: 'assets/images/game/bonus/1up.png'
    },
    {
      name: 'btn-blue',
      path: 'assets/images/game/buttons/btn-blue.png'
    },
    {
      name: 'btn-green',
      path: 'assets/images/game/buttons/btn-green.png'
    },
    {
      name: 'btn-purple',
      path: 'assets/images/game/buttons/btn-purple.png'
    },
    {
      name: 'btn-red',
      path: 'assets/images/game/buttons/btn-red.png'
    },
    {
      name: 'platform',
      path: 'assets/images/game/platform.png'
    },
    {
      name: 'brick',
      path: 'assets/images/game/brick.png'
    },
    {
      name: 'BrickTile',
      path: 'assets/images/game/BrickTile.png'
    },
    {
      name: 'time',
      path: 'assets/images/game/hud/time.png'
    },
    {
      name: 'coin',
      path: 'assets/images/game/hud/coin.png'
    },
    {
      name: 'heart',
      path: 'assets/images/game/hud/heart.png'
    },
    {
      name: 'done',
      path: 'assets/images/game/levels/done.png'
    },
    {
      name: 'dots',
      path: 'assets/images/game/levels/dots.png'
    },
    {
      name: 'block-acquamela',
      path: 'assets/images/game/levels/block-acquamela.png'
    },

    {
      name: 'block-hall',
      path: 'assets/images/game/levels/block-hall.png'
    },
    {
      name: 'player-menu',
      path: 'assets/images/game/player-menu.png'
    },
    {
      name: 'level-1-bg',
      path: 'assets/tilemap/level-1-bg.png'
    },
    {
      name: 'face-galdi',
      path: 'assets/images/game/players/face-galdi.png'
    },
    {
      name: 'face-valiante',
      path: 'assets/images/game/players/face-valiante.png'
    },
    {
      name: 'face-moscatiello',
      path: 'assets/images/game/players/face-moscatiello.png'
    },
    {
      name: 'face-siniscalco',
      path: 'assets/images/game/players/face-siniscalco.png'
    },
    {
      name: 'key',
      path: 'assets/images/game/key.png'
    },
    {
      name: 'lines',
      path: 'assets/images/game/lines.png'
    },
    {
      name: 'logo',
      path: 'assets/images/game/supermajor.png'
    },
    {
      name: 'cloud1',
      path: 'assets/images/game/cloud1.png'
    },
    {
      name: 'cloud2',
      path: 'assets/images/game/cloud2.png'
    },
    {
      name: 'light',
      path: 'assets/images/game/light.png'
    },
    {
      name: 'sky',
      path: 'assets/images/game/sky.png'
    },
    {
      name: '4lands',
      path: 'assets/images/game/4lands.png'
    }
  ],

  sounds: [
    {
      name: 'intro',
      paths: ['assets/sounds/intro.ogg', 'assets/sounds/intro.m4a'],
      volume: 1,
      loop: false
    },
    {
      name: 'game',
      paths: ['assets/sounds/overworld.ogg', 'assets/sounds/overworld.mp4', 'assets/sounds/overworld.m4a'],
      volume: 1,
      loop: false
    },
    {
      name: 'gameover',
      paths: ['assets/sounds/gameover.ogg', 'assets/sounds/gameover.mp4', 'assets/sounds/gameover.m4a'],
      volume: 1,
      loop: false
    },

    {
      name: 'win',
      paths: ['assets/sounds/win.ogg', 'assets/sounds/win.mp4', 'assets/sounds/win.m4a'],
      volume: 1,
      loop: false
    }
  ],

  audio: [
    {
      name: 'sfx',
      jsonpath: 'assets/sounds/sfx.json',
      paths: ['assets/sounds/sfx.ogg', 'assets/sounds/sfx.mp3'],
      instances: 4
    }
  ],

  script: [
    {
      key: 'webfont',
      path: 'assets/js/webfonts.js'
    }
  ],

  bitmapfont: [
    {
      name: 'carrier',
      imgpath: 'assets/fonts/carrier_command.png',
      xmlpath: 'assets/fonts/carrier_command.xml'
    }
  ]
}
