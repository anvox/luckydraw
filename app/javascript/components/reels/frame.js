import * as PIXI from "pixi.js"
import FrameImage from "../assets/frame.png"

export default function drawFrame(app, reelIndex) {
  const container = new PIXI.Container()
  const texture = PIXI.Texture.from(FrameImage)
  const frame = new PIXI.Sprite(texture)

  // TODO: Remove hardcode
  container.x = -3 + reelIndex * 120
  container.y = 178

  frame.width = 115
  frame.height = 115

  container.addChild(frame)
  container.visible = false

  app.stage.addChild(container)

  return container
}
