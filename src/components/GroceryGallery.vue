<template>

<div>
  <div class="image" v-for="grocery in allGroceries" v-bind:key="grocery._id">
    <p class="ingredients">{{grocery.ingredient}}</p>
  </div>
</div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'GroceryGallery',
  props: {
    allGroceries: Array
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
