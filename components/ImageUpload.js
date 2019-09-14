export default {
  name: 'ImageUpload',
  data() {
    return {
      image: null
    }
  },
  methods: {
    uploadImage() {
      // Build form data object and attach file so we can send to server
      const formData = new FormData()
      const file = document.querySelector('#image-input').files[0]
      formData.append('upload', file)

      // Upload file to server, then refresh the images list if successful
      fetch('/uploads', {
        method: 'POST',
        body: formData
      }).then(res => {
        if (res.ok) {
          this.$emit('updateImages')
        }
      })
    }
  },
  template: `
  <div class="form">
    <h3>Form</h3>
    <input
      v-model="image"
      id="image-input"
      type="file"
      class="form-control"
      placeholder="Upload Your Images"
      name="upload"
    />
    <button
      id="submit"
      @click="uploadImage"
      class="btn btn-default"
      >upload
    </button>
  </div>
  `
}
