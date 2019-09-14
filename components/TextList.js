export default {
  name: 'TextList',
  props: {
    texts: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      inputText: ''
    }
  },
  methods: {
    addText() {
      console.log(this.inputText)
      this.$emit('addText', this.inputText)
    }
  },
  template: `
    <div class="text">
      <h4>Text</h4>
      <p v-for="text in texts" v-text="text"></p>
      <input v-model="inputText" @keydown.enter="addText" name="Add Text" placeholder="Add Text"/>
      <button @click="addText" id="addText" class="btn btn-default">Add Text</button>
    </div>
  `
}
