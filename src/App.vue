<template>
  <div id="app">
    <nav>
      <div class="nav-container">
        <div class="logo">
          <img src="./assets/mp.png" alt="Microphone" /><h1>TalknTour</h1>
        </div>
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/login">Register/Login</router-link></li>
        <li><router-link to="/favorites">Favorites</router-link></li>
        <li><router-link to="/history">History</router-link></li>
        <li><router-link to="/myprofile">MyProfile</router-link></li>
      </ul>
    </div>
    </nav>
    <!-- <img src="./assets/mp.png"> -->
    <router-view/>
    <div class="footer">
    <p>© 2023 Qianwen Song's Website. All rights reserved.</p>
    <p>
      <a href="/privacy">Privacy Policy</a> | 
      <a href="/terms">Terms of Service</a> |
      <a href="/contact">Contact</a>
    </p>
    <p>University of Southampton, Southampton, SO17 1BJ  |  Email: qs9n22@soton.ac.uk</p>
    <p>
      Follow us:
      <!-- <a href="https://www.twitter.com/sotracycanwait"><img src="https://twitter.com/elonmusk/photo" alt="Twitter" width="20" height="20"></a> -->
      <a href="https://twitter.com/intent/tweet?button_hashtag=SotracycanWait&ref_src=twsrc%5Etfw"
      class="twitter-hashtag-button"
      data-show-count="false"
      ref="tweetButton">Tweet</a>
      <a href="https://www.instagram.com/sotracycanwait"><img src="https://www.instagram.com/static/images/ico/favicon.ico/36b3ee2d91ed.ico" alt="Instagram" width="20" height="20">Instagram</a>
    </p>
  </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    // 在组件挂载后，异步加载 Twitter widgets.js
    const script = document.createElement('script');
    script.src = 'https://platform.twitter.com/widgets.js';
    script.charset = 'utf-8';
    script.async = true;
    document.head.appendChild(script);
    
    // 初始化 Twitter 按钮，确保在组件挂载后重新渲染
    if (window.twttr) {
      window.twttr.widgets.load(this.$refs.tweetButton);
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
nav {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100; 
  background-color: #535252; /* Dark grey background */
  padding: 10px 0; /* 10px top and bottom padding */
}
.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 10px;
}

nav ul {
  display: flex; /* Make list items align horizontally */
  list-style: none; /* Remove default list styles */
  margin: 0; /* Remove default margin */
  padding: 0; /* Remove default padding */
}

nav a {
  color: #fff; /* White text */
  text-decoration: none; /* Remove underline */
  font-size: 1em; /* Smaller text */
  transition: color 0.3s ease; /* Smooth color transition */
  padding: 0 10px; /* Add some horizontal padding */
}

nav h1 {
  color: #fff; /* White text */
  font-size: 1.5em; /* Bigger text */
  margin: 0;
}

nav a:hover {
  color: #0ABAB5; /* Change text color on hover */
}
.footer {
      position: relative;
      left: 0;
      /* bottom: 0; */
      width: 100%;
      background-color: #535252;
      color: white;
      text-align: center;
      padding: 10px;
    }
    .footer a {
      color: #ffffff;
    }
    .footer p {
      margin: 0;
    }

.logo img,
.logo h1 {
  display: inline-block;
}
  img{
    width: 25px;
    height: 25px;
  }
</style>
