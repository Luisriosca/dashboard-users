<template>
  <div class="dashboard pa-6">
    <h1 class="">Users Dashboard</h1>
    <carousel-alert :content1="alertText1"></carousel-alert>
    <div class="container">
      <button class="btn btn-outline-primary " @click="getCsv(dataForDisplay)">Export to CSV <v-icon>mdi-download-outline</v-icon></button>

    </div>
    
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
              <v-btn-toggle >
  
                  <v-btn @click="toggleGenderValue('female'); nestedFilter()">
                    <v-icon>mdi-human-female</v-icon>
                  </v-btn>
                  <v-btn @click="toggleGenderValue('male'); nestedFilter()">
                    <v-icon>mdi-human-male</v-icon>
                  </v-btn>
                  <v-btn @click="toggleGenderValue('any'); nestedFilter()">
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
                @change="nestedFilter()"
              >
                  <template v-slot:prepend>
                    <v-text-field
                      :value="range[0]"
                      class="mt-0 pt-0"
                      hide-details
                      single-line
                      type="number"
                      :hide-spin-buttons="true"
                      style="width: 30px"
                      @mouseup="nestedFilter()"
                    ></v-text-field>
                  </template>
                  <template v-slot:append>
                    <v-text-field
                      :value="range[1]"
                      class="mt-0 pt-0"
                      hide-details
                      single-line
                      type="number"
                      style="width: 30px"
                      :hide-spin-buttons="true"
                      @mouseup="nestedFilter()"
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
          @change="nestedFilter()"
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
        toggleGenderFilter: 'any',
        min: 18,
        max: 90,
        range: [18, 90],
        itsFilteredGender: false,
        alertText1: "🧐💡 In this page are displayed all users data. One card for every user.",
        selectCountry: '',
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
      genderFilter(arrayUsers, value){
        console.log('value filter gender: ', value);
        if(value === 'any'){
          //console.log('Entra a any');
          return arrayUsers
        } else {
          const filteredUsers = this.users.filter((user) => {
            return user.gender === value;
          });
          return filteredUsers;
        }
      },
      ageFilter(array){
        console.log('Entra a filtro edad', array);
        console.log(this.range[0], this.range[1]);
        let filterData = array.filter((user) => {
          return user.dob.age >= this.range[0] && user.dob.age <= this.range[1];
        })
        console.log('Sale de filtro edad', filterData);
        return filterData;
      },
      countryFilter(array){
        //console.log('pais:', this.selectCountry);
        let filterData
        if(this.selectCountry == '' ){
          filterData = array;
          } else {
          filterData = array.filter((user) => {
            return user.nat == this.selectCountry;
          });
        }
        return filterData;
      },
      nestedFilter(){
        const array = this.users;
        const countryFiltered = this.countryFilter(array);
        let ageFiltered;
        if(countryFiltered.length > 0 ){
          ageFiltered =  this.ageFilter(countryFiltered);
        } else {
          ageFiltered =  this.ageFilter(array);
        }
        //console.log(ageFiltered.length);
        let genderFiltered;
        if(ageFiltered.length > 0){
          genderFiltered = this.genderFilter(ageFiltered, this.toggleGenderFilter)
        } else {
          genderFiltered = this.genderFilter(array, this.toggleGenderFilter);
        }
        //console.log(genderFiltered.length);
        //console.log('nested filtered data:', genderFiltered)
        this.dataForDisplay = genderFiltered;
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
          return user.dob.age
        })
        ages = ages.sort((a,b) => a - b);
        this.min = ages[0];
        this.max = ages[ages.length - 1]
        this.range = [this.min, this.max]
      },
      toggleGenderValue(value){
        this.toggleGenderFilter = value;
        console.log(this.toggleGenderFilter);
      }
    },
    mounted(){
    },
    created: async function () {
      const results =  await getStoreUsers();
      //console.log(results);
      this.users = results;
      this.dataForDisplay = this.users;
      this.getAges(this.users);
      
    }
  }
</script>
