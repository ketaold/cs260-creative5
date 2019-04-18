<template>
  <div class="home">
    <recipe-gallery :recipes="recipes" />
    <footer>
    <p class="center">My GitHub Repository: <a href="https://github.com/ketaold/cs260-creative5">Creative Project 5</a></p>
</footer>
  </div>
  
</template>

<script>
// @ is an alias to /src
import RecipeGallery from '@/components/RecipeGallery.vue'

export default {
  name: 'home',
  components: {
    RecipeGallery
  },
  computed: {
    recipes() {
      return this.$store.state.recipes;
    }
  },
  async created() {
    await this.$store.dispatch("getAllRecipes");
  },
}
</script>
