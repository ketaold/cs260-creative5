<template>

<div>
  <div class="image" v-for="recipe in recipes" v-bind:key="recipe._id">
    <img :src="recipe.path" />
    <p class="title">{{recipe.title}}</p>
    <p class="date">
<span v-if="recipe.user.name">{{recipe.user.name}}, </span>
  {{formatDate(recipe.created)}}
	</p>
    <p class="ingredients"><b>Ingredients:</b> {{recipe.ingredients}}</p>
    <p class="instructions"><b>Instructions:</b> {{recipe.instructions}}</p>
    <a v-bind:href="recipe.link">{{recipe.link}}</a>
  </div>
</div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'RecipeGallery',
  props: {
    recipes: Array
  },
  methods: {
    formatDate(date) {
      if (moment(date).diff(Date.now(), 'days') < 15)
        return moment(date).fromNow();
      else
        return moment(date).format('d MMMM YYYY');
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Indie+Flower');

.title {
  margin: 0px;
  font-size: 2em;
  font-weight:bold;
  font-family:  'Indie Flower', cursive; 
}

.date {
  margin: 0px;
  font-size: 0.9em;
  font-weight: normal;
  font-style: italic;
  color: #777777
}

.ingredients {
    font-family:  Courier;   
}

.instructions {
    font-family:  Courier;   
}

p {
  margin: 0px;
}

</style>
