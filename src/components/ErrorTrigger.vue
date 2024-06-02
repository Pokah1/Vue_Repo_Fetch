<script setup>
const handleClick = () => {
  alert('This is a test page for error handling if anything goes wrong in the in the components.')
  throw new Error(
    'This is a test page for error handling. If anything goes wrong in the components, an error will be triggered.'
  )
}
</script>

<template>
  <button
    @click="
      {
        handleClick
      }
    "
    class="errorbtn"
  >
    Trigger Error
  </button>
</template>

<style scoped>
.errorbtn {
  padding: 20px;
  width: 200px;
  color: #fff;
  border-radius: 5px;
  box-shadow: 0 4px 15px 0 rgba(24, 36, 19, 0.75);
  margin: 30px 30px 50px 30px;
  font-size: 1rem;
  height: 100%;
  -webkit-background-clip: text;
  font-size: 1.2rem;
}
</style>
