<template>
  <div id="app">
    <img alt="Podcast Link Shifter Logo" src="./assets/microphone.png">

    <Home msg="Podcast Link Shifter"></Home>
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
div#columns {
  display: flex;
  flex-wrap: wrap;
}
#columns > div.column {
  flex-grow: 1;
  width: 33%;
  height: auto;
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
d-block {
  display:block;
}
.p-2 {
  padding:10px;
}
.p-4 {
  padding:20px;
}
.mt-1 {
  margin-top:5px;
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
}

#elements-list li {
  padding-top:5px;
} 

.centered {
  margin:0 auto;
}

.time-holder {
  display:inline;
  color:blue;
}

.centered {
  margin:0 auto;
}
.text-align-left {
  text-align:left
}
.no-list-style {
  list-style-type:none;
}
</style>
