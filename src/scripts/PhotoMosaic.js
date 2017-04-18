class PhotoMosaic {
  constructor({image = null, tileWidth = 5, tileHeight = 5, targetElement = null, tileShape = 'circle', opacity = 1, width = null, height = null, defaultBackground = 'rgba(0, 0, 0, 0)'}) {
    if (!image) {
      throw new Error('image options is not passed')
    }
    if (!targetElement) {
      throw new Error('targetElement is not passed in options')
    }
    
    this.options = {
      image,
      tileWidth,
      tileHeight,
      targetElement,
      tileShape,
      opacity,
      width,
      height,
      defaultBackground
    }
    
    if (this.options.image.complete) {
      this.process()
    } else {
      this.options.image.onload = this.process.bind(this)
    }
  }
  
  process = function () {
    this.options.divX = Math.floor(this.options.width / this.options.tileWidth)
    this.options.divY = Math.floor(this.options.height / this.options.tileHeight)
    let context = this.renderImage()
    this.tileCanvas(context)
  }
  
  /**
   * Renders the image on a canvas before processing the pixels
   * @return {object} Context of the canvas created
   */
  renderImage = function () {
    let options = this.options
    let canvas = document.createElement('canvas')
    
    canvas.width = options.tileWidth * options.divX
    canvas.height = options.tileHeight * options.divY
    
    let context = canvas.getContext('2d')
    
    context.fillStyle = options.defaultBackground
    context.beginPath()
    context.rect(0, 0, canvas.width, canvas.height)
    context.closePath()
    context.fill()
    
    context.drawImage(options.image, 0, 0, canvas.width, canvas.height)
    return context
  }
  
  /**
   * Divides the whole canvas into smaller tiles and finds the average
   * colour of each block. After calculating the average colour, it stores
   * the data into an array.
   *
   * @param context   Context of the canvas
   */
  tileCanvas = function (context) {
    let processedCanvas = document.createElement('canvas')
    let width = processedCanvas.width = context.canvas.width
    processedCanvas.height = context.canvas.height
    
    let processedContext = processedCanvas.getContext('2d')
    let options = this.options
    
    let originalImageData = context.getImageData(0, 0, context.canvas.width, context.canvas.height)
    
    for (let i = 0; i < options.divY; i++) {
      for (let j = 0; j < options.divX; j++) {
        const x = j * options.tileWidth
        const y = i * options.tileHeight
        let imageData = this.getImageData(x, y, width, originalImageData)
        let averageColor = this.getAverageColor(imageData)
        processedContext.fillStyle = 'rgba(' + averageColor.r + ',' + averageColor.g + ',' + averageColor.b + ',' + options.opacity + ')'
        this.createMosaic(x, y, processedContext)
      }
    }
    
    this.options.targetElement.appendChild(processedCanvas)
  }
  
  /**
   * Creates an array of the image data of the tile from the data of whole image
   * @param  {number} startX            x coordinate of the tile
   * @param  {number} startY            y coordinate of the tile
   * @param  {number} width             width of the canvas
   * @param  {object} originalImageData imageData if the whole canvas
   * @return {array}                    Image data of a tile
   */
  getImageData = function (startX, startY, width, originalImageData) {
    let data = []
    let tileWidth = this.options.tileWidth
    let tileHeight = this.options.tileHeight
    for (let x = startX; x < (startX + tileWidth); x++) {
      let xPos = x * 4
      for (let y = startY; y < (startY + tileHeight); y++) {
        let yPos = y * width * 4
        data.push(
          originalImageData.data[xPos + yPos + 0],
          originalImageData.data[xPos + yPos + 1],
          originalImageData.data[xPos + yPos + 2],
          originalImageData.data[xPos + yPos + 3]
        )
      }
    }
    return data
  }
  
  /**
   * Returns the average color of the canvas.
   * @param  {Array} data     The data received by using the getImage() method
   * @return {Object}         The object containing the RGB value
   */
  getAverageColor = function (data) {
    let i = -4
    let pixelInterval = 5
    let count = 0
    let rgb = {
      r: 0,
      g: 0,
      b: 0
    }
    let length = data.length
    
    while ((i += pixelInterval * 4) < length) {
      count++
      rgb.r += data[i]
      rgb.g += data[i + 1]
      rgb.b += data[i + 2]
    }
    
    // floor the average values to give correct rgb values
    rgb.r = Math.floor(rgb.r / count)
    rgb.g = Math.floor(rgb.g / count)
    rgb.b = Math.floor(rgb.b / count)
    
    return rgb
  }
  
  /**
   * Creates a block of the mosaic. This is called divX*divY times to create all blocks
   * of the mosaic.
   * @param  {number} x          x coordinate of the block
   * @param  {number} y          y coordinate of the block
   * @param  {object} context    Context of the result canvas
   * @return {}
   */
  createMosaic = function (x, y, context) {
    
    let tileWidth = this.options.tileWidth
    let tileHeight = this.options.tileHeight
    
    if (this.options.tileShape === 'circle') {
      let centerX = x + tileWidth / 2
      let centerY = y + tileHeight / 2
      let radius = Math.min(tileWidth, tileHeight) / 2
      context.beginPath()
      context.arc(centerX, centerY, radius, 0, 2 * Math.PI)
      context.closePath()
      context.fill()
    } else if (this.options.tileShape === 'rectangle') {
      let height = tileHeight
      let width = tileWidth
      context.beginPath()
      context.rect(x, y, width, height)
      context.closePath()
      context.fill()
    }
  }
}

export default PhotoMosaic