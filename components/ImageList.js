export default {
  name: 'ImageList',
  template: `
  <ul class="list-unstyled">
    <li 
      v-for="image in images"
      :key="image"
    >
      <img
        @click="$emit('draw', $event)"
        :src="image"
        class="img-rounded"
      />
    </li>
  </ul>
  `,
  props: {
    images: {
      type: Array,
      required: true
    }
  }
}
