import getUsers from '@/services/userService';
<template>
  <div class="dashboard pa-6">
    <h1>This is the dasboard</h1>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate quaerat animi sed praesentium eveniet harum, dolores unde eum, vel, ut minus necessitatibus corporis? Placeat eum accusamus, veritatis rem officiis modi.</p>

    <div class="row">
      <div class="col-12 table-responsive">
        <table class="table">
          <thead>
            <tr>Nombre</tr>
            <tr>Apellido</tr>
            <tr>Correo</tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id.value">
              <td>{{user.name.first}}</td>
              <td>{{user.name.last}}</td>
            </tr>
          </tbody>
          <tfoot>

          </tfoot>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  import getUsers from '../services/userService' 
  export default {
    name: 'HomeView',
    data: function () {
      return {
        users: [],
      }
    },
    mounted: function () {
      getUsers().then((response) => {
      this.usuarios = response
    });
    }
  }
</script>
