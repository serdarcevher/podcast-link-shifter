<template>
  <div id="app">
    <img alt="Podcast Timecode Shifter Logo" src="./assets/microphone.png">

    <Home msg="Podcast Timecode Shifter"></Home>
  </div>
</template>

<script>
import Home from './components/Home.vue'

export default {
  name: 'App',
  components: {
    Home
  },
}
</script>

<style>
ul {
  padding-inline-start:10px;
}

div#columns {
  display: flex;
  flex-wrap: wrap;
}
#columns > div.column {
  flex-grow: 1;
  width: 33%;
  height: auto;
  padding-bottom:20px;
}

#columns > div.column:nth-child(even) {
  background: #f5f3f4;
}
#columns > div.column:nth-child(odd) {
  background: #fcfcfc;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.p-2 {
  padding:10px;
}
.px-2 {
  padding-left:10px;
  padding-right:10px;
}
.p-4 {
  padding:20px;
}
.pt-2 {
  padding-top:10px;
}
.mt-1 {
  margin-top:5px;
}
.ml-1 {
  margin-left:5px;
}
.mr-1 {
  margin-right:5px;
}
.mb-2 {
  margin-bottom:10px;
}

.short-input {
  width:36px;
}
.long-input {
  width:300px;
  min-width:50%;
  padding:5px;
}


#elements-list {
  width:50%;
  min-width:300px;
  padding-left:0;
}

ul li {
  padding-top:5px;
} 

.centered {
  margin:0 auto;
}

.time-holder {
  cursor:pointer;
  display:inline;
  color:blue;
}
.time-holder.ad {
  color:#c90606;
}

.centered {
  margin:0 auto;
}
.text-align-left {
  text-align:left;
}
.text-align-center {
  text-align:center;
}

.no-list-style {
  list-style-type:none;
}

.ad-bubble {
  display:inline-block;
  width:80%;
  background-color:#c90606;
  color:white;
  border-radius:10px;
  height:30px;
}
button.remove {
  background-color:silver;
  color:white;
  border-radius:5px;
  margin-right:10px;
}

.flex-link {
  display: flex;
  align-items: center;
  flex-direction: row;
}
#top-left {
  position:fixed;
  top:0;
  left:0;
  width:250px;
  height:40px;
}

#top-right {
  position:fixed;
  width:400px;
  height:120px;
  line-height:50px;
  right:0;
  top:0;
  z-index:10;
}
</style>
