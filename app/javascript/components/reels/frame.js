import * as PIXI from "pixi.js"
import FrameImage from "../assets/frame.png"

export default function drawFrame(app) {
  const container = new PIXI.Container()
  const texture = PIXI.Texture.from(FrameImage)
  const frame = new PIXI.Sprite(texture)

  // TODO: Remove hardcode
  container.x = -13
  container.y = 168

  frame.width = 115
  frame.height = 115

  container.addChild(frame)

  app.stage.addChild(container)
}
