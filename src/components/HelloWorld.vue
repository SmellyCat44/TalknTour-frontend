<template>
  <div class="hello">
    
      <router-view/>

      
    <div class="main-content">
      <h1>{{ msg }}</h1>
      <div class="search-container">
        <input type="text" class="search-bar" v-model="searchQuery" placeholder="Please state your needs..."/>
      </div>

      <div class="buttons-container">
      <button class="custom-button" @click="startRecording">Start</button>
      <button class="custom-button" @click="stopRecording">Stop</button>
      </div>

      <div v-if="isRecording">Recording...</div>

    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'SpeechDemo',
  data() {
    return {
      msg: 'Welcome to Your TalknTour',
      mediaRecorder: null,
      chunks: [],
      isRecording: false,
      response: '', // 响应结果
      searchQuery: '',
    };
  },

  methods: {
    startRecording: async function () {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          this.mediaRecorder = new MediaRecorder(stream);
          this.mediaRecorder.start();
          this.isRecording = true;

          this.mediaRecorder.addEventListener('dataavailable', (e) => {
            this.chunks.push(e.data);
          });
        } catch (error) {
          console.error('Error accessing microphone:', error);
        }
      }
    },

    stopRecording: function () {
      if (this.mediaRecorder) {
        this.mediaRecorder.stop();
        this.isRecording = false;

        this.mediaRecorder.addEventListener('stop', async () => {
          const blob = new Blob(this.chunks, { type: 'audio/wav' });
          this.chunks = [];
          this.mediaRecorder = null;

          const fileName = `recording_${Date.now()}.wav`;
          let file = new File([blob], fileName, { type: blob.type });

          let formData = new FormData();
          formData.append('file', file);

          try {
            let response = await axios.post('http://localhost:8082/audio/recognize', formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            });
            this.response = response.data; // 存储响应结果
            if (this.response && this.response.transcript) {
              this.searchQuery = this.response.transcript;
            }
            this.$nextTick(() => { // 当DOM更新后执行
              if (this.response.redirect!=0) {
                // 跳转到 '/restaurantPage' 页面
                setTimeout(() => {
                  this.$router.push({name: 'RestaurantPage', params: { redirect: this.response.redirect }});
                }, 500); // 添加500毫秒的延迟
              }
            });
            console.log(response);
          } catch (error) {
            console.error(error);
          }
        });
      }
    },

  },
};
</script>

<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.main-content{
  display: flex;
  height: 500px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url('../assets/bg.jpg');
  background-size: contain; /* Will ensure that the entire image is visible, but might leave empty space */
  /* OR */
  /* background-size: 100% auto; Will ensure the width is always 100% and the height auto scales */
  background-repeat: no-repeat; /* To avoid repeating image, optional depending on image and design */
  background-position: center; /* To center the image */
  margin-bottom: 20px;
  margin-top: 80px;
}

/* .search-container,
.buttons-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px; 
} */

.custom-button {
  font-size: 1.5em; 
  padding: 10px 20px; 
  background-color: #0ABAB5; 
  color: white; 
  border: none; 
  border-radius: 20px;
  cursor: pointer;
}
.custom-button:hover {
  background-color: #089A95;
}
.response {
  font-size: 1.5em; 
}
.search-bar::placeholder {
  text-align: center;
}

.search-container {
  /* Removed the positioning and transformation styles */
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px; 
}

.search-bar {
  padding: 10px;
  font-size: 1.5em;
  width: 700px;
  border-radius: 23px;
  border: none;
  margin: 10px;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
}

.search-button:hover {
  background-color: #089A95;
}
</style>

