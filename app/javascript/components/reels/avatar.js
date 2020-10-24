import * as PIXI from "pixi.js"

// size = 90
// margin = 10
// TODO: Create avatar model
export default function createAvatar(url, size, margin) {
  const container = new PIXI.Container()
  const avatarRadius = (size - margin) / 2
  // Avatar
  const texture = PIXI.Texture.from(url)
  const bunny = new PIXI.Sprite(texture)
  bunny.anchor.set(0)
  bunny.x = - avatarRadius
  bunny.y = - avatarRadius
  bunny.width = size - margin
  bunny.height = size - margin

  // Crop to circle
  const graphics = new PIXI.Graphics();
  graphics.beginFill(0xFFFFFF);
  graphics.drawCircle(texture.width / 2 , texture.height / 2 , texture.width / 2);
  graphics.endFill();

  bunny.mask = graphics;
  bunny.addChild(graphics)

  container.addChild(bunny)

  // Draw the white border
  const border = new PIXI.Graphics();
  border.beginFill(0xFFFFFF, 0);
  border.lineStyle(4, 0xFFFFFF);
  border.drawCircle(0, 0, avatarRadius);
  border.endFill();
  container.addChild(border)

  // Greyout when showing result
  const greyscale = new PIXI.filters.ColorMatrixFilter()
  greyscale.greyscale(0.2, true)
  greyscale.enabled = false;
  container.filters = [greyscale]

  container.scale.x = 1
  container.scale.y = 1

  return {
    container: container,
    winnerFilter: greyscale
  }
}
