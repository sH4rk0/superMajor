interface TilesConfig {
  type: string
  texture: string
  x: number
  y: number
}

interface MapSize {
  x: number
  y: number
  width: number
  height: number
}
interface PlayerConfig {
  scene: Phaser.Scene
  x: number
  y: number
  key: string
  name: string
  physic: boolean
  commands: boolean
  inGame: boolean
}
interface ScoreConfig {
  name: string
  score: number
  level: number
  levelName: string
}

interface PlatformConfig {
  scene: Phaser.Scene
  x: number
  y: number
  key: string
  range: number
  velocity: number
  direction: number
}

interface LevelConfig {
  name: string
  block: { key: string; x: number; y: number; scale: number; offsetX: number; offsetY: number }
  map: string
  time: number
  bg: { x: number; y: number }
  clouds: Array<{ x: number; y: number; w: number; h: number; key: string; speed: number }>
}

interface EnemyConfig {
  scene: Phaser.Scene
  x: number
  y: number
  key: string
  frame: string | null
}

interface BonusConfig {
  scene: Phaser.Scene
  x: number
  y: number
  key: string
  frame: string | null
  score: number
  allowGravity?: boolean | undefined
}

interface BombConfig {
  scene: Phaser.Scene
  x: number
  y: number
  key: string
  hit: number
}
interface ExplosionConfig {
  scene: Phaser.Scene
  x: number
  y: number
  key: string
}

interface genericConfig {
  scene: Phaser.Scene
  x: number
  y: number
  key: string
}

interface enemyMap {
  name: string
  x: number
  y: number
}

interface platformMap {
  name: string
  x: number
  y: number
  type: string
}

interface bonusMap {
  name: string
  x: number
  y: number
  score: number
}

interface playerMap {
  name: string
  x: number
  y: number
}

interface ImageAsset {
  name: string
  path: string
}

interface ScriptAsset {
  key: string
  path: string
}

interface TileMapsAsset {
  key: string
  path: string
}

interface SpritesheetsAsset {
  name: string
  path: string
  width: number
  height: number
  frames: number
  spacing?: number
}

interface SoundAsset {
  name: string
  paths: Array<string>
}

interface AudioSpriteAsset {
  name: string
  jsonpath: string
  paths: Array<string>
  instance: { instance: number }
}

interface BitmapfontAsset {
  name: string
  imgpath: string
  xmlpath: string
}
