<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<style lang="scss">
@import './scss/index.scss';

#app {
  @import url('https://fonts.googleapis.com/css?family=Merriweather:400,700');
  font-family: 'Merriweather', serif;
  text-align: center;
  color: $primary;
  height: 100%;
  background: $background-primary;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
  
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
