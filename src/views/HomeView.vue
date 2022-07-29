<template>
  <div class="dashboard pa-6">
    <h1 class="">Users Dashboard</h1>
    <carousel-alert :content1="alertText1"></carousel-alert>
    <button class="btn btn-outline-primary " @click="getCsv(dataForDisplay)">Descarga el CSV</button>
    
      <div class="row">

        <div class="col-sm-12 col-md-6 col-lg-3">
          <div class="row">
            <div class="col-3 d-flex justify-content-center align-item-center">
              <v-tooltip bottom >
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon color="primary" dark v-bind="attrs" v-on="on" >
                      mdi-account-filter-outline
                    </v-icon>
                  </template>
                  <span>Select a gender filter</span>
              </v-tooltip>
            </div>
            
            <div class="col-9 d-flex justify-content-center align-item-center">
              <v-btn-toggle v-model="toggleGenderFilter" >
  
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
          </div>

        </div>
  
        <div class="col-sm-12 col-md-6 col-lg-5 d-flex justify-content-around align-items-center">
          <div class="row">
            
            <div class="col-3 d-flex justify-content-center align-items-center">
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon color="primary" dark v-bind="attrs" v-on="on" >
                    mdi-human-cane
                  </v-icon>
                </template>
                <span>Select an age range</span>
              </v-tooltip>
            </div>

            <div class="col-7 d-flex justify-content-center align-items-center">
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
        </div>

        <div class="col-sm-12 col-md-6 col-lg-4 d-flex justify-content-center align-items-center p-md-4">
          <v-select
          v-model="selectCountry"
          :items="countries"
          append-outer-icon="mdi-map"
          menu-props="auto"
          hide-details
          label="Select"
          single-line
          class="p-0"
          @change="imprimir($event)"
          ></v-select>
        </div>
      </div>

    <data-iterator :dataIterator1="dataForDisplay"></data-iterator>

  </div>
</template>

<script>
  //import getUsers from '../services/userService' 

  import CarouselAlert from '@/components/CarouselAlert.vue';
  import DataIterator from '@/components/DataIterator.vue';
  import { getStoreUsers } from '../services/userService';
  import getCsvFile from '../services/csvService'
  export default {
    name: 'HomeView',
    components: {
    CarouselAlert,
    DataIterator
},
    data: function () {
      return {
        users: [],
        dataForDisplay: [],
        toggleGenderFilter: undefined,
        min: 18,
        max: 90,
        range: [18, 90],
        itsFilteredGender: false,
        alertText1: "In this page are displayed all users data. One card for every user. ",
        selectCountry: 'MX',
        countries: ['AU', 'BR', 'CA', 'CH', 'DE', 'DK', 'ES', 'FI', 'FR', 'GB', 'IE', 'IN', 'IR', 'MX', 'NL', 'NO', 'NZ', 'RS', 'TR', 'UA', 'US']
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
          this.dataForDisplay = this.users;
          this.itsFilteredGender = false;
        } else {
          const filteredUsers = this.users.filter((item) => {
            return item.gender == value;
          });
          this.itsFilteredGender = true;
          this.dataForDisplay = filteredUsers;
        }
      },
      genderFilter(arrayUsers, value){
        if(value == 'any'){
          return arrayUsers
        } else {
          const filteredUsers = this.users.filter((user) => {
            return user.gender == value;
          });
          return filteredUsers;
        }
      },
      filterAge(){
        //console.log(this.range);
        let data = [];
        if(this.itsFilteredGender){
          data = this.dataForDisplay;
        } else {
          data = this.users;
        }
        //console.log(data);
        let filterData = data.filter((user) => {
          return user.registered.age >= this.range[0] && user.registered.age <= this.range[1]
        });
        this.dataForDisplay = filterData;
      },
      ageFilter(array){
        let filterData = array.filter((user) => {
          return user.registered.age >= this.range[0] && user.registered.age <= this.range[1];
        })
        return filterData;
      },
      countryFilter(array){
        console.log(array);
      },
      imprimir(evento){
        console.log("Evento", evento);
        console.log("Selected", this.selectCountry);
      },
      getCsv(data){
        getCsvFile(data, 'allUsers.csv')
      },  
      getAges(arrayUsers){
        let ages = arrayUsers.map((user) => {
          return user.registered.age
        })
        ages = ages.sort((a,b) => a - b);
        this.min = ages[0];
        this.max = ages[ages.length - 1]
        this.range = [this.min, this.max]
      }
    },
    mounted(){
    },
    created: async function () {
      const results =  await getStoreUsers();
      console.log(results);
      this.users = results;
      this.dataForDisplay = this.users;
      this.getAges(this.users);
      
    }
  }
</script>
