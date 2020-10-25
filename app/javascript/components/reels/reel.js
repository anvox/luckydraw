import * as PIXI from "pixi.js"
import gsap from 'gsap'
import MotionPathPlugin from 'gsap/MotionPathPlugin'

import createAvatar from "./avatar.js"
import drawFrame from "./frame.js"

class Reel {
  constructor(avatarSize, width, height, onUpdateTargetCallback, index) {
    this.container = null
    this.blur = null
    this.greyscales = []
    this.tweener = null

    this.avatarSize = avatarSize
    this.width = width
    this.height = height

    this.target = 0
    this.number_candidates = 0
    this.candidateOrder = []

    this.reelIndex = index

    // Blur make rolling like real, but it disable antilalias, which makes border pixelated
    this.blurEffect = false
    this.position = {
      x: 0,
      y: 0,
      prev: 0,
    }

    this.onUpdateTargetCallback = onUpdateTargetCallback

    this.frame = null

    gsap.registerPlugin(MotionPathPlugin)

    this._init()
  }

  _init() {
    this.container = new PIXI.Container({sortableChildren: true})
    if (this.blurEffect) {
      this.blur = new PIXI.filters.BlurFilter()
      this.blur.blurX = 0
      this.blur.blurY = 0
      this.container.filters = [this.blur]
    }
  }

  load(candidates, app) {
    let containers = []
    this.number_candidates = candidates.length
    this.candidateOrder = this._shuffledCandidateOrder(this.number_candidates)

    for (var i = 0; i < candidates.length; i++) {
      let {container, winnerFilter} = createAvatar(`candidate-${i}`, this.avatarSize, 10)

      this.greyscales[this.candidateOrder[i]] = winnerFilter

      container.x = 10 + this.avatarSize / 2 + this.reelIndex * 120
      container.y = this.candidateOrder[i] * this.avatarSize + this.avatarSize / 2
      containers.push(container)
    }
    this.container.addChild(...containers)
    this.container.sortChildren()

    this._setup_rolling(app)
    this.frame = drawFrame(app, this.reelIndex)

    this._updateY()
  }

  _shuffledCandidateOrder(length) {
    let list = []
    for (var i = 0; i < length; i++) {
      list[i] = i
    }
    return list.sort(() => { return Math.random() - 0.5 })
  }

  _tween(target) {
    const targetY = target * this.avatarSize
    this.tweener = gsap.to(this.position,
      {
        y: targetY,
        duration: 4,
        ease: `back.out(${0.5 + Math.random() * 1.6})`,
        onComplete: this._showWinner.bind(this),
        onUpdate: this._updateY.bind(this)
      })
  }

  _updateY() {
    var target = Math.ceil(this.position.y / this.avatarSize)
    target = target % this.number_candidates
    target = 3 - target
    if (target < 0) {
      target += this.number_candidates
    }

    this.onUpdateTargetCallback(this.candidateOrder.indexOf(target), this.reelIndex)
  }

  _showWinner() {
    var target = 3 - (this.target % this.number_candidates)
    if (target < 0) {
      target += this.number_candidates
    }

    for (var i = this.greyscales.length - 1; i >= 0; i--) {
      if (target != this.candidateOrder[i]) {
        this.greyscales[this.candidateOrder[i]].enabled = true
      }
    }
    this.frame.visible = true
  }

  _setup_rolling(app) {
    app.ticker.add((delta) => {
      const screenHeight = this.height + (this.avatarSize / 2)
      const frameHeight = this.avatarSize * this.number_candidates

      if (this.blurEffect) {
        this.blur.blurY = (this.position.y - this.position.prev) * 0.1
        this.position.prev = this.position.y
      }

      for (var i = 0; i < this.container.children.length; i++) {
        const newY = this.avatarSize * this.candidateOrder[i] + this.position.y
        if (newY > screenHeight) {
          this.container.children[i].y = newY % frameHeight - (this.avatarSize / 2)
        } else {
          this.container.children[i].y = newY - (this.avatarSize / 2)
        }
      }
    })
  }

  play(target) {
    if (this._isPlaying()) {
      return false
    }

    this.frame.visible = false
    for (var i = this.greyscales.length - 1; i >= 0; i--) {
      this.greyscales[i].enabled = false
    }

    this.target = target
    this._tween(this.target)

    return true
  }

  clear() {
    this.container.removeChildren()
  }

  _isPlaying() {
    return this.tweener !== null && this.tweener.isActive()
  }

  nextTarget(targets) {
    return this.target + Math.floor(Math.random() * this.number_candidates * 1.3) + this.number_candidates
  }
}

export default Reel
