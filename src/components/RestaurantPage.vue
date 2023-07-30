<template>
  <div>
    <h1>Query Page</h1>
    <el-spinner v-if="isLoading" type="fading-circle" class="spinner"></el-spinner>
    <el-table :data="restaurants" style="width: 80%; margin:auto; margin-top: 25px; margin-bottom: 20px; border-radius: 10px;" :header-cell-style="{background:'#69e8bb',color:'#535252'}">
      <el-table-column
        prop="name"
        label="Name"
        width="250">
      </el-table-column>
      <el-table-column
        prop="distance"
        label="Distance(km)"
        width="120">
      </el-table-column>
      <el-table-column
        prop="rating"
        label="Rating"
        width="100">
      </el-table-column>
      <el-table-column
        prop="vicinity"
        label="Vicinity">
      </el-table-column>
      <el-table-column
        label="Image"
        width="180">
        <template slot-scope="scope">
          <img :src="scope.row.icon" style="width: 50px; height: 50px;">
        </template>
      </el-table-column>
      <el-table-column label="Go to Map" width="100">
      <template slot-scope="scope">
      <el-button type="primary" @click="openMap(scope.row.placeId)" style="border-radius: 10px; background-color: #535252; color:#69e8bb; border: 1px solid transparent; ">View</el-button>
    </template>
</el-table-column>

    </el-table>
  </div>
</template>

<script>
import axios from 'axios';
import * as geolib from 'geolib';

export default {
data() {
  return {
    restaurants: [],
    isLoading: true, // 新增一个isLoading状态
    query:'',
    redirect:'',
  }
},
async created() {
  this.redirect = this.$route.params.redirect;
  if(this.redirect==1) {
      this.query = 'restaurant_nearby';
  }
  else if(this.redirect==2){
    this.query = 'lodging_nearby';
  }
  else if(this.redirect==3){
    this.query = 'amusement_park_nearby';
  }
  else if(this.redirect==4){
    this.query = 'park_nearby';
  }
  else if(this.redirect==5){
    this.query = 'night_club_nearby';
  }
  else if(this.redirect==6){
    this.query = 'public_station';
  }
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(this.fetchRestaurants, error => {
      console.error("Error occurred. Error code: " + error.code);
    });
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
},
methods: {
  async fetchRestaurants(position) {
    
    try {
      const response = await axios.post('http://localhost:8082/place/'+this.query, {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
      this.restaurants = response.data.results.map(restaurant => {
        const distance = geolib.getDistance(
        { latitude: position.coords.latitude, longitude: position.coords.longitude },
        { latitude: restaurant.geometry.location.lat, longitude: restaurant.geometry.location.lng }
      )/1000;
      return { ...restaurant, distance };
      });
      this.isLoading = false; // 获取数据后，设置isLoading为false
    } catch (error) {
      console.error(error);
    }
  },
  openMap(placeId) {
    const url = `https://www.google.com/maps/place/?q=place_id:${placeId}`;
    window.open(url, '_blank');
  }
}
}
</script>

<style scoped>

h1 {
  text-align: center;
  color: #22f2c5;
}
.el-table {
  margin-top: 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
::v-deep .el-table .el-table__header-wrapper tr {
background-color: #69e8bb !important;
}

::v-deep .el-table .el-table__row:hover {
background-color: #e8f4fc !important;
}
.spinner {
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
}
</style>
