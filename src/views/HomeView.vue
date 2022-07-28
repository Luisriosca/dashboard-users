<template>
  <div class="dashboard pa-6">
    <h1>Users Dashboard</h1>

    <v-container fluid>

      <div class="row">
        <div class="col-sm-12 col-md-4 col-lg-6 d-flex justify-content-around align-items-center">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon color="primary" dark v-bind="attrs" v-on="on" >
                mdi-account-filter-outline
              </v-icon>
            </template>
            <span>Select a gender filter</span>
          </v-tooltip>
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
        </div>
  
        <div class="col-sm-12 col-md-4 col-lg-6 d-flex justify-content-around align-items-center">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon color="primary" dark v-bind="attrs" v-on="on" >
                mdi-human-cane
              </v-icon>
            </template>
            <span>Select an age range</span>
          </v-tooltip>
          
          <v-range-slider
            v-model="range"
            :max="max"
            :min="min"
            hide-details
            class="align-center"
            @change="filterAge()"
          >
            <template v-slot:prepend>
              <v-text-field
                :value="range[0]"
                class="mt-0 pt-0"
                hide-details
                single-line
                type="number"
                :hide-spin-buttons="true"
                style="width: 60px"
                @mouseup="filterAge();"
              ></v-text-field>
            </template>
            <template v-slot:append>
              <v-text-field
                :value="range[1]"
                class="mt-0 pt-0"
                hide-details
                single-line
                type="number"
                style="width: 60px"
                :hide-spin-buttons="true"
                @mouseup="filterAge();"
              ></v-text-field>
            </template>
          </v-range-slider>

        </div>

      </div>
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
        min: 18,
        max: 90,
        range: [18, 90],
        itsFilteredGender: false
      }
    },
    methods: {
      setLimit(value, isMin){
        if(isMin){
          this.range[0] = value;
        } else {
          this.range[1] =value;
        }
      },
      filterGender(value){
        if(value == 'any'){
          this.dataIterator1 = this.users;
          this.itsFilteredGender = false;
        } else {
          const filteredUsers = this.users.filter((item) => {
            return item.gender == value;
          });
          this.itsFilteredGender = true;
          this.dataIterator1 = filteredUsers;
        }
      },
      filterAge(){
        console.log(this.range);
        let data = [];
        if(this.itsFilteredGender){
          data = this.dataIterator1;
        } else {
          data = this.users;
        }
        console.log(data);
        let filterData = data.filter((user) => {
          return user.registered.age >= this.range[0] && user.registered.age <= this.range[1]
        });
        this.dataIterator1 = filterData;
      },
      getAges(arrayUsers){
        return arrayUsers.map((user) => {
          return user.registered.age
        })
      }
    },
    created: function () {
      getUsers().then((response) => {
        this.users = response.data.results
        this.dataIterator1 = this.users;
        console.log(response.data.results);
        let ages = this.getAges(this.users);
        ages = ages.sort((a,b) => a - b);
        this.min = ages[0];
        this.max = ages[ages.length - 1]
        this.range = [this.min, this.max]
      });
    }
  }
</script>
