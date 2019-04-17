<template>
<transition v-if="show" name="modal">
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="modal-header">
          <h1 class="modal-title">Upload</h1>
        </div>
        <div class="modal-body">
          <p v-if="error" class="error">{{error}}</p>
          <form @submit.prevent="upload">
            <input v-model="title" placeholder="Title">
            <p></p>
            <textarea v-model="ingredients" placeholder="Ingredients"></textarea>
            <p></p>
            <textarea v-model="instructions" placeholder="Instructions"></textarea>
            <p></p>
            <input type="file" name="photo" @change="fileChanged">
            <p></p>
            <button type="button" @click="close" class="pure-button">Close</button>
            <button type="submit" class="pure-button pure-button-secondary">Upload</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</transition>
</template>

<script>
export default {
  name: 'Uploader',
  props: {
    show: Boolean,
  },
  data() {
    return {
      title: '',
      ingredients: '',
      instructions: '',
      file: null,
      error: '',
    }
  },
methods: {
  fileChanged(event) {
    this.file = event.target.files[0]
  },
  close() {
    this.$emit('escape');
  },

async upload() {
      try {
       /* const formData = new FormData();
        formData.append('photo', this.file, this.file.name);
        formData.append('title', this.title);
        formData.append('ingredients', this.ingredients);
        formData.append('instructions', this.instructions);
        this.error = await this.$store.dispatch("upload", formData);*/
        var myData = {
            title: this.title,
            ingredients: this.ingredients,
            instructions: this.instructions
        }
        this.error = await this.$store.dispatch("upload", myData);
        if (!this.error) {
          this.title = '';
          this.instructions = '';
          this.ingredients = '';
          this.file = null;
          this.$emit('uploadFinished');
        }
      } catch (error) {
        console.log(error);
      }
}
}
}

</script>


<style scoped>
input {
  width: 100%;
}

textarea {
  width: 100%;
  height: 100px
}

.pure-button-secondary {
  float: right;
}
</style>
