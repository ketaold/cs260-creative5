<template>
<div id="app">
  <div class="pure-menu">
    <ul class="pure-menu-list">
      <li class="pure-menu-item">
        <router-link to="/" class="pure-menu-link">HOME</router-link>
      </li>
      <li class="pure-menu-item">
        <router-link to="/myrecipes" class="pure-menu-link">MY RECIPES</router-link>
      </li>
    </ul>
  </div>
  <div class="content">
  <div class="header">
  <h1>Recipe Sharing</h1>
  </div>
    <router-view />
  </div>
</div>
</template>

<style>

@import url('https://fonts.googleapis.com/css?family=Slabo+27px');


#app {
  font-family: 'Slabo 27px', serif;
  color: #2c3e50;
  font-size: 18px;
  display: flex;
  min-height: 100%;
}

.pure-menu {
  /* To limit the menu width to the content of the menu: */
  /* display: inline-block; */
  /* Or set the width explicitly: */
  text-align: left;
  background: #008080;
}

.pure-menu-link {
  color: #fff;
  padding: 10px 20px;
  font-weight: 800;
  padding-top: 50px;
}

.pure-menu-link:hover {
  background: #333;
}

.pure-menu-link.router-link-exact-active {
  background: #fff;
  color: #008080;
}

.content {
  margin: 50px 100px;
}

html {
  height: 100%;
  box-sizing: border-box;
}

body {
  height: 100%;
  background: repeating-linear-gradient(
  45deg,
  #ffffff,
  #fcfcfc 100px
);

}

*,
*:before,
*:after {
  box-sizing: inherit;
  /* https://css-tricks.com/box-sizing/ */
}

.error {
  color: #F2385A;
}

.pure-button-primary {
  background-color: #36B1BF;
}

/* Modals */
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 500px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h1 {
  margin-bottom: 30px;
  font-size: 1.5em;
}

.modal-body {
  margin: 0;
}

.modal-body input {
  margin-bottom: 20px;
  height: 30px;
}

.modal-footer {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}

.modal-default-button {
  float: right;
}


/*
  * The following styles are auto-applied to elements with
  * transition="modal" when their visibility is toggled
  * by Vue.js.
  *
  * You can easily play with the modal transition by editing
  * these styles.
  */
.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
