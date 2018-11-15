<template>
  <router-link :to="link">
    <span class="font-weight-black">{{ title }}</span><br/>
    <img width="120" alt="Vue logo" :src="imageUrl">
  </router-link>
</template>

<script>

export default {
  name: "MenuItem",
  data() {
    return { };
  },
  computed: {
    imageUrl() {
      // eslint-disable-next-line security/detect-non-literal-require
      return this.image ? require("../assets/" + this.image) : "data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=";
    }
  },
  props: {
    image: String,
    title: String,
    link: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a {
  color: #42b983;
  text-decoration: none;
}
div {
  color: white;
}

</style>
