<template>
<div>
  <div v-if="user">
    <div class="header">
      <div>
        <p>
          <a class="pure-button" @click="toggleUpload">UPLOAD</a>
          <a class="pure-button" @click="logout">LOGOUT</a>
        </p>
      </div>
    </div>
    <escape-event @escape="escape"></escape-event>
    <uploader :show="show" @escape="escape" @upload-finished="uploadFinished" />
    <groceries :showIng="showIng" @escape="escape" @shopping-finished="shoppingFinished" />
    <div class="row">
        <div class="column">
        <h1>Your Recipes</h1>
            <recipe-gallery :recipes="recipes" />
        </div>
        <div class="column">
         <h1>Your Shopping List</h1>
            <a class="pure-button" @click="addIngDialog">ADD TO SHOPPING LIST</a>
            <grocery-gallery :allGroceries="allGroceries" />
        </div>
    </div>
    
  </div>
  <div v-else>
    <p>Login or create an account to upload recipes.</p>
    <router-link to="/register" class="pure-button">REGISTER</router-link> or
    <router-link to="/login" class="pure-button">LOGIN</router-link>
  </div>
  <footer>
    <p class="center">My GitHub Repository: <a href="https://github.com/ketaold/cs260-creative5">Creative Project 5</a></p>
</footer>
</div>

</template>

<script>
import EscapeEvent from '@/components/EscapeEvent.vue'
import Uploader from '@/components/Uploader.vue'
import RecipeGallery from '@/components/RecipeGallery.vue'
import GroceryGallery from '@/components/GroceryGallery.vue'
import Groceries from '@/components/Groceries.vue'

export default {
  name: 'myrecipes',
  components: {
    EscapeEvent,
    Uploader,
    RecipeGallery,
    GroceryGallery,
    Groceries
    
  },
  data() {
    return {
      show: false,
      showIng: false
    }
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    recipes() {
      return this.$store.state.recipes;
    },
    allGroceries() {
        return this.$store.state.groceries;
    }
  },
 async created() {
    await this.$store.dispatch("getUser");
    await this.$store.dispatch("getMyRecipes");
    await this.$store.dispatch("getMyGroceries");
  },
  methods: {
    async logout() {
      try {
        this.error = await this.$store.dispatch("logout");
      } catch (error) {
        console.log(error);
      }
    },
    addIngDialog() {
        this.showIng = true;
    },
    escape() {
      this.showIng = false;
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
      async shoppingFinished() {
      this.showIng = false;
      try {
      this.error = await this.$store.dispatch("getMyGroceries");
      } catch (error) {
        console.log(error);
      }
      }
    },
  }

</script>

<style scoped>
h1 {
    font-size: 1.5em;
}

.row {
  display: flex;
}

.column {
  flex: 50%;
  margin-right: 5vw;
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
