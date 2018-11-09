<template>
  <div class="dashboard">
    <h1>{{ title }}</h1>
    <ul>
      <li v-for="menuItem in menuItems" :key="menuItem.name">
        <a class="menuItem" :href="menuItem.link">{{ menuItem.name }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
function loadMenuItems() {
  this.menuItems = [
    { name: "Companies", link: "" },
    { name: "Accounts", link: "" },
    { name: "Payments", link: "" }];
}

export default {
  name: 'Dashboard',
  data: function () {
    return { 
      menuItems: []
    }
  },
  props: {
    title: String
  },
  methods: {
    loadMenuItems
  },
  created() {
    this.loadMenuItems()
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
.menuItem {
  display: inline-block;
  background: black;
  padding: 10px;
  color: white;
  height: 150px;
  width: 150px;
  text-decoration: none;
}

</style>
