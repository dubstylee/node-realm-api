<template>
  <div class="dashboard">
    <h1>{{ title }}</h1>
    <menu-item class="menuItem"
               v-for="item in menuItems"
               :key="item.name"
               :title="item.title"
               :link="item.link"
               :image="item.image">
    </menu-item>
  </div>
</template>

<script>
const MenuItem = require("./MenuItem").default;

function loadMenuItems() {
  this.menuItems = [
    { title: "Companies", link: "/Companies", image: "logo.png" },
    { title: "Accounts", link: "/Accounts", image: "logo.png" },
    { title: "Invoices", link: "/Invoices", image: "" },
    { title: "Payments", link: "/Payments", image: "" },
    { title: "Checkbook", link: "/Checkbook", image: "" },
  ];
}

export default {
  name: "Dashboard",
  components: {
    MenuItem
  },
  data() {
    return { 
      menuItems: []
    };
  },
  props: {
    title: String
  },
  methods: {
    loadMenuItems
  },
  created() {
    this.loadMenuItems();
  }
};
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
  color: #42b983;
  height: 150px;
  width: 150px;
  margin: 10px;
  border-radius: 5px;
}

.menuItem:hover {
  background: rgba(0, 0, 0, 0.8);
}

</style>
