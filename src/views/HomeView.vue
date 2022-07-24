<template>
  <div class="home">
    {{usuarios}}
  </div>
</template>

<script>
import getUsers from '@/services/userService'

export default {
  name: 'HomeView',
  data: function () {
    return {
      usuarios: {},
      msg: 'Hola mundo'
    }
  },
  components: {
    
  },
  mounted () {
    getUsers().then((response) => {
      this.usuarios = response
    });
  }
}
</script>
