<template>

</template>

<script>
export default {
  name: "Bus",
  created() {
    const params=this.$route.params.params;
    const path=this.$route.params.path;
    const name=this.$route.params.name;
    this.$router.push({
      name: name,
      path: path,
      params: params
    });
  }
}
</script>

<style scoped>

</style>
