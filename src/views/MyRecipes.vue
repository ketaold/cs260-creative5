<template>
<div>
  <div v-if="user">
    <div class="header">
      <div>
        <p>
          <a class="pure-button" @click="toggleUpload">UPLOAD</i></a>
          <a class="pure-button" @click="logout">LOGOUT</i></a>
        </p>
      </div>
    </div>
    <h1>Your Recipes</h1>
    <escape-event @escape="escape"></escape-event>
    <uploader :show="show" @escape="escape" @upload-finished="uploadFinished" />
    <recipe-gallery :recipes="recipes" />
  </div>
  <div v-else>
    <p>Login or create an account to upload recipes.</p>
    <router-link to="/register" class="pure-button">Register</router-link> or
    <router-link to="/login" class="pure-button">Login</router-link>
  </div>
</div>
</template>

<script>
import EscapeEvent from '@/components/EscapeEvent.vue'
import Uploader from '@/components/Uploader.vue'
import RecipeGallery from '@/components/RecipeGallery.vue'

export default {
  name: 'myrecipes',
  components: {
    EscapeEvent,
    Uploader,
    RecipeGallery
  },
  data() {
    return {
      show: false,
    }
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    recipes() {
      return this.$store.state.recipes;
    }
  },
 async created() {
    await this.$store.dispatch("getUser");
    await this.$store.dispatch("getMyRecipes");
  },
  methods: {
    async logout() {
      try {
        this.error = await this.$store.dispatch("logout");
      } catch (error) {
        console.log(error);
      }
    },
    escape() {
      this.show = false;
    },
    toggleUpload() {
      this.show = true;
    },
    async uploadFinished() {
      this.show = false;
      try {
        this.error = await this.$store.dispatch("getMyRecipes");
      } catch (error) {
        console.log(error);
      }
    },
  }
}
</script>

<style scoped>
h1 {
    font-size: 1.5em;
}

.pure-button {
  margin: 0px 20px;
}

.header {
  display: flex;
}

.header a {
  font-align: center;
  color: #222;
  font-size: 1em
}

.header svg {
  margin-top: 12px;
}

.header .button {
  margin-left: 50px;
  order: 2;
}
</style>
