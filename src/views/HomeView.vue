import getUsers from '@/services/userService';
<template>
  <div class="dashboard pa-6">
    <h1>This is the dasboard</h1>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate quaerat animi sed praesentium eveniet harum, dolores unde eum, vel, ut minus necessitatibus corporis? Placeat eum accusamus, veritatis rem officiis modi.</p>
    <button class="btn btn-primary">Hola</button>
    <v-data-iterator :items="users">
      <template v-slot:default="props">
        <v-row>
          <v-col
            v-for="item in props.items"
            :key="item.id.value"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            
            <v-card>

              <v-list class="d-flex justify-content-center">
                <v-list-item-avatar 
                :size="62"
                > 
                    <v-img
                      :alt="`${item.name.first} avatar`"
                      :src="item.picture.thumbnail"
                    ></v-img>
                </v-list-item-avatar>
              </v-list>



              <v-list class="justify-center" dense>
                <v-list-item>
                    <v-list-item-content class="justify-center">
                      {{ item.name.first  + ' ' +  item.name.last}}
                    </v-list-item-content>
                </v-list-item>
              </v-list>

            </v-card>

          </v-col>

        </v-row>

      </template>

    </v-data-iterator>
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
    created: function () {
      getUsers().then((response) => {
      this.users = response.data.results
    });
    }
  }
</script>
