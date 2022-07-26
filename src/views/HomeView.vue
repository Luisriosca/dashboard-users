<template>
  <div class="dashboard pa-6">
    <h1>Users Dashboard</h1>
    <v-container fluid>
      <v-row align="center">
        <v-col cols="12" sm="2" class="py-2 d-flex justify-content-center">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon color="primary" dark v-bind="attrs" v-on="on" >
                mdi-account-filter-outline
              </v-icon>
            </template>
            <span>Select a gender filter</span>
          </v-tooltip>
        </v-col>
        <v-col cols="12" sm="2" class="py-2 d-flex justify-content-center">
    
          <v-btn-toggle v-model="toggleGenderFilter">
            <v-btn @click="filterGender('female')">
              <v-icon>mdi-human-female</v-icon>
            </v-btn>
    
            <v-btn @click="filterGender('male')">
              <v-icon>mdi-human-male</v-icon>
            </v-btn>
    
            <v-btn @click="filterGender('any')">
              <v-icon>mdi-human-male-female</v-icon>
            </v-btn>
    
          </v-btn-toggle>
        </v-col>
        
        <v-col cols="12" sm="2" class="py-2 d-flex justify-content-center">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon color="primary" dark v-bind="attrs" v-on="on" >
                mdi-human-cane
              </v-icon>
            </template>
            <span>Select for an age range</span>
          </v-tooltip>
        </v-col>

      </v-row>
    </v-container>

    <v-data-iterator :items="dataIterator1">
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

              <v-list class="justify-center" dense>
                <v-list-item>
                    <v-list-item-content class="justify-center">
                      {{item.email}}
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
        dataIterator1: [],
        toggleGenderFilter: undefined,
      }
    },
    methods: {
      filterGender(value){
        if(value == 'any'){
          this.dataIterator1 = this.users;
        } else {
          const filteredUsers = this.users.filter((item) => {
            return item.gender == value;
          });
          this.dataIterator1 = filteredUsers;
        }
      }
    },
    created: function () {
      getUsers().then((response) => {
      this.users = response.data.results
      this.dataIterator1 = this.users;
    });
    }
  }
</script>
