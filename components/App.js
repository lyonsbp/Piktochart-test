import CanvasComponent from './CanvasComponent.js'
import ImageList from './ImageList.js'
import ImageUpload from './ImageUpload.js'
import TextList from './TextList.js'

export default {
  name: 'App',
  components: {
    CanvasComponent,
    ImageList,
    ImageUpload,
    TextList
  },
  data() {
    return {
      images: [],
      drawnImages: [],
      drawnTexts: []
    }
  },
  methods: {
    drawImage(image) {
      this.drawnImages.push(image.target.src)
    },
    drawText(text) {
      this.drawnTexts.push(text)
    },
    deleteImage(src) {
      this.drawnImages = this.drawnImages.filter(item => item != src)
    },
    deleteText(text) {
      this.drawnTexts = this.drawnTexts.filter(item => item != text)
    },
    fetchImages() {
      fetch('/images')
        .then(res => res.json())
        .then(data => (this.images = data))
    }
  },
  watch: {
    // Watchers to save images/texts currently on the canvas to local storage
    drawnImages(val) {
      localStorage.setItem('drawnImages', JSON.stringify(val))
    },
    drawnTexts(val) {
      localStorage.setItem('drawnTexts', JSON.stringify(val))
    }
  },
  created() {
    // Fetch list of images on initial lod
    this.fetchImages()
    // If saved images/texts exists, pull them from local storage
    this.drawnImages = JSON.parse(localStorage.getItem('drawnImages')) || []
    this.drawnTexts = JSON.parse(localStorage.getItem('drawnTexts')) || []
  },
  template: `
  <div>
    <!-- side pane -->
    <div class="sidepane col-sm-2 col-md-2 col-lg-2">
      <div class="form">
        <ImageUpload @updateImages="fetchImages"/>
        <!-- Upload Form here -->
      </div>
      <hr />
      <div class="assets">
        <h3>Assets</h3>
          <TextList
            @addText="drawText"
            :texts="drawnTexts"
          />
        <div class="image">
          <h4>Images</h4>
          <ImageList
            @draw="drawImage"
            :images="images"
          />
        </div>
      </div>
    </div>
    <!-- canvas -->
    <CanvasComponent 
      @deleteImage="deleteImage"
      @deleteText="deleteText"
      :images="drawnImages"
      :texts="drawnTexts"
    />
  </div>
  `
}
