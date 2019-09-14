export default {
  name: 'CanvasComponent',
  props: {
    images: {
      type: Array,
      default: []
    },
    texts: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      allowedElements: ['IMG', 'P'],
      mouseIsDown: false,
      offset: {
        left: 0,
        top: 0
      },
      target: null
    }
  },
  methods: {
    deleteDrawnItem(element) {
      switch (element.nodeName) {
        case 'IMG':
          this.$emit('deleteImage', element.src)
        case 'P':
          this.$emit('deleteText', element.innerText)
      }
    },
    handleCanvasDown(event) {
      if (this.allowedElements.includes(event.target.nodeName)) {
        this.mouseIsDown = true
        this.offset.left = event.target.offsetLeft - event.clientX
        this.offset.top = event.target.offsetTop - event.clientY
        this.target = event.target
      }
    },
    handleCanvasUp(event) {
      if (this.mouseIsDown) {
        const rect = this.$refs.canvas.getBoundingClientRect()
        // This boolean lets us know if the item was dropped inside the canvas
        const isInsideCanvas =
          event.clientY > rect.bottom ||
          event.clientY < rect.top ||
          event.clientX > rect.right ||
          event.clientX < rect.left
        if (isInsideCanvas) this.deleteDrawnItem(event.target)
      }
      this.mouseIsDown = false
    },
    handleCanvasMove(event) {
      event.preventDefault()
      if (this.mouseIsDown) {
        let mousePosition = {
          x: event.clientX,
          y: event.clientY
        }
        this.target.style.left = `${mousePosition.x + this.offset.left}px`
        this.target.style.top = `${mousePosition.y + this.offset.top}px`
      }
    }
  },
  mounted() {
    this.$refs.canvas.addEventListener('mousedown', this.handleCanvasDown)
    this.$refs.canvas.addEventListener('mouseup', this.handleCanvasUp)
    this.$refs.canvas.addEventListener('mousemove', this.handleCanvasMove)
  },
  template: `
  <div class="canvas col-sm-8 col-md-8 col-lg-8">
    <div class="block" ref="canvas">
      <img v-for="image in images" :src="image" style="position: absolute;"/>
      <p v-for="text in texts" v-text="text" style="position: absolute;"></p>
    </div>
  </div>
  `
}
