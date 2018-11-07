<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      For guide and recipes on how to configure / customize this project,<br>
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    </p>
    <h3>Installed CLI Plugins</h3>
    <ul>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel" target="_blank" rel="noopener">babel</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint" target="_blank" rel="noopener">eslint</a></li>
    </ul>
    <form id="inputForm">
      <input type="text" name="companyName" id="companyName" />
      <button v-on:click="performPostRequest" type="submit">Submit</button>
    </form>
    <div id="postResult">{{this.message}}</div>
    <ul v-if="companies">
      <li v-for="company of companies" :key="company.id">
        <div class="content"><a :href="'/api/v1/companies/' + company.id"><p>{{company.companyName}}</p></a></div>
      </li>
    </ul>
    <h3>Essential Links</h3>
    <ul>
      <li><a href="https://vuejs.org" target="_blank" rel="noopener">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank" rel="noopener">Forum</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank" rel="noopener">Community Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank" rel="noopener">Twitter</a></li>
      <li><a href="https://news.vuejs.org" target="_blank" rel="noopener">News</a></li>
    </ul>
    <h3>Ecosystem</h3>
    <ul>
      <li><a href="https://router.vuejs.org" target="_blank" rel="noopener">vue-router</a></li>
      <li><a href="https://vuex.vuejs.org" target="_blank" rel="noopener">vuex</a></li>
      <li><a href="https://github.com/vuejs/vue-devtools#vue-devtools" target="_blank" rel="noopener">vue-devtools</a></li>
      <li><a href="https://vue-loader.vuejs.org" target="_blank" rel="noopener">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank" rel="noopener">awesome-vue</a></li>
    </ul>
  </div>
</template>

<script>
const axios = require("axios");

function loadCompanies() {
  axios
    .get("/api/v1/companies")
    .then(response => {
      this.companies = Object.values(response.data.data);
    })
    .catch(error => {
      this.message = error;
    });
}

function performPostRequest(e) {
  var resultElement = document.getElementById("postResult");
  var name = document.getElementById("companyName").value; 
  
  axios.post("/api/v1/companies", {
    companyName: name
  })
  .then(response => {
    resultElement.className = "show";
    this.message = response.data.status;
    var company = response.data.data;
    var index = this.companies.findIndex(c => c.companyName > company.companyName);

    // if no index found, add at end of array
    if (index === -1) {
      index = this.companies.length;
    }
    this.companies.splice(index, 0, company);

    setTimeout(() => {
      resultElement.className = "";
      this.message = "";
    }, 3000);
  })
  .catch(error => {
    this.message = error;
  });
  
  e.preventDefault();
}

export default {
  name: 'HelloWorld',
  data: function () {
    return { 
      companies: [],
      message: ""
    }
  },
  props: {
    msg: String
  },
  methods: {
    loadCompanies,
    performPostRequest
  },
  created() {
    this.loadCompanies()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
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

#postResult {
    visibility: hidden;
    min-width: 250px;
    margin-left: -125px; /* Divide value of min-width by 2 */
    background-color: #333;
    color: #fff;
    text-align: center;
    border-radius: 2px;
    padding: 16px;
    position: fixed;
    z-index: 1;
    left: 50%;
    bottom: 30px;
}

#postResult.show {
    visibility: visible;
    /* Add animation: Take 0.5 seconds to fade in and out the snackbar.
       However, delay the fade out process for 2.5 seconds */
   -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
   animation: fadein 0.5s, fadeout 0.5s 2.5s;
}

@-webkit-keyframes fadein {
    from { bottom: 0; opacity: 0; }
    to { bottom: 30px; opacity: 1; }
}

@keyframes fadein {
    from { bottom: 0; opacity: 0; }
    to { bottom: 30px; opacity: 1; }
}

@-webkit-keyframes fadeout {
    from { bottom: 30px; opacity: 1; }
    to { bottom: 0; opacity: 0; }
}

@keyframes fadeout {
    from { bottom: 30px; opacity: 1; }
    to { bottom: 0; opacity: 0; }
}
</style>
