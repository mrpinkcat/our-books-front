<template>
  <div class="admin">
    
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import Logo from './../components/Logo.vue';

@Component({
  components: {
    Logo,
  },
})
export default class Admin extends Vue {

}
</script>

<style lang="scss" scoped>
@import './../scss/index.scss';

.admin {

}
</style>
