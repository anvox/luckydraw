import * as PIXI from "pixi.js"
import gsap from 'gsap'
import MotionPathPlugin from 'gsap/MotionPathPlugin'

import createAvatar from "./avatar.js"
import drawFrame from "./frame.js"

class Reel {
  constructor(avatarWidth, width, height, onUpdateTargetCallback) {
    this.container = null
    this.blur = null
    this.greyscales = []
    this.tweener = null

    this.avatarWidth = avatarWidth
    this.width = width
    this.height = height

    this.target = 0
    this.number_candidates = 0
    this.candidateOrder = []

    this.blurEffect = false
    this.position = {
      x: 0,
      prev: 0,
    }

    this.onUpdateTargetCallback = onUpdateTargetCallback

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
      let {container, winnerFilter} = createAvatar(`candidate-${i}`, this.avatarWidth, 10)

      this.greyscales[this.candidateOrder[i]] = winnerFilter

      container.x += this.candidateOrder[i] * this.avatarWidth
      container.y = 100
      containers.push(container)
    }
    this.container.addChild(...containers)
    this.container.sortChildren()

    this._setup_rolling(app)
    drawFrame(app)

    this._updateX()
  }

  _shuffledCandidateOrder(length) {
    let list = []
    for (var i = 0; i < length; i++) {
      list[i] = i
    }
    return list.sort(() => { return Math.random() - 0.5 })
  }

  _tween(target) {
    const targetX = target * this.avatarWidth
    this.tweener = gsap.to(this.position,
      {
        x: targetX,
        duration: 4,
        ease: `back.out(${0.5 + Math.random() * 1.6})`,
        onComplete: this._showWinner.bind(this),
        onUpdate: this._updateX.bind(this)
      })
  }

  _updateX() {
    var target = Math.ceil(this.position.x / this.avatarWidth)
    target = target % this.number_candidates
    target = 5 - target
    if (target < 0) {
      target += this.number_candidates
    }

    this.onUpdateTargetCallback(this.candidateOrder.indexOf(target))
  }

  _showWinner() {
    var target = 5 - (this.target % this.number_candidates)
    if (target < 0) {
      target += this.number_candidates
    }

    for (var i = this.greyscales.length - 1; i >= 0; i--) {
      if (target != this.candidateOrder[i]) {
        this.greyscales[this.candidateOrder[i]].enabled = true
      }
    }
  }

  _setup_rolling(app) {
    app.ticker.add((delta) => {
      const screenWidth = this.width + (this.avatarWidth / 2)
      const frameWidth = this.avatarWidth * this.number_candidates

      if (this.blurEffect) {
        this.blur.blurX = (this.position.x - this.position.prev) * 0.1
        this.position.prev = this.position.x
      }

      for (var i = 0; i < this.container.children.length; i++) {
        const newX = this.avatarWidth * this.candidateOrder[i] + this.position.x
        if (newX > screenWidth) {
          this.container.children[i].x = newX % frameWidth - (this.avatarWidth / 2)
        } else {
          this.container.children[i].x = newX - (this.avatarWidth / 2)
        }
      }
    })
  }

  play(target) {
    if (this._isPlaying()) {
      return false
    }

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
}

export default Reel
