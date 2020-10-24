import * as PIXI from "pixi.js"
import FrameImage from "../assets/frame.png"

export default function drawFrame(app) {
  const container = new PIXI.Container()
  const texture = PIXI.Texture.from(FrameImage)
  const frame = new PIXI.Sprite(texture)

  // TODO: Remove hardcode
  container.x = 347
  container.y = 43

  frame.width = 115
  frame.height = 115

  container.addChild(frame)

  app.stage.addChild(container)
}
