<template>
  <div class="dashboard pa-6">
    <h1 class="btn btn-primary">Users Dashboard</h1>
    
    <carousel-alert :content1="alertText1" :content2="alertText2" :content3="alertText3"></carousel-alert>
    
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
  
        <div class="col-sm-12 col-md-6 col-lg-3 d-flex justify-content-around align-items-center">
          <div class="row">
            
            <div class="col-2 d-flex justify-content-center align-items-center">
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon color="primary" dark v-bind="attrs" v-on="on" >
                    mdi-human-cane
                  </v-icon>
                </template>
                <span>Select an age range</span>
              </v-tooltip>
            </div>

            <div class="col-10 d-flex justify-content-center align-items-center">
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

      </div>

    <data-iterator :dataIterator1="dataForDisplay"></data-iterator>

  </div>
</template>

<script>
  import getUsers from '../services/userService' 

  import CarouselAlert from '@/components/CarouselAlert.vue';
  import DataIterator from '@/components/DataIterator.vue';

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
        alertText2: "For using the filtering options, you can press a gender button, select a range using the slider or clicking on an item of the country list.",
        alertText3: "https://github.com/Luisriosca",
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
      filterAge(){
        console.log(this.range);
        let data = [];
        if(this.itsFilteredGender){
          data = this.dataForDisplay;
        } else {
          data = this.users;
        }
        console.log(data);
        let filterData = data.filter((user) => {
          return user.registered.age >= this.range[0] && user.registered.age <= this.range[1]
        });
        this.dataForDisplay = filterData;
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
        this.dataForDisplay = this.users;
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
