<template>
<transition v-if="showIng" name="modal">
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="modal-header">
          <h1 class="modal-title">Add to Shopping List</h1>
        </div>
        <div class="modal-body">
          <p v-if="error" class="error">{{error}}</p>
          <form @submit.prevent="addIngredient">
            <input v-model="ingredient" placeholder="Ingredient"></input>
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
  name: 'Groceries',
  props: {
    showIng: Boolean,
  },
  data() {
    return {
      ingredient: '',
      error: ''
    }
  },
methods: {
  close() {
    this.$emit('escape');
  },

async addIngredient() {
      try {
       var myData = {
            ingredient: this.ingredient
        }
        this.error = await this.$store.dispatch("upload", myData);
        if (!this.error) {
          this.ingredient = '';
          this.$emit('shoppingFinished');
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
