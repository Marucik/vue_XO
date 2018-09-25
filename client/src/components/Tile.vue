<template>
<div class="tile">{{ symbol }}</div>
</template>

<script>
export default {
  name: 'tile',
  props: ['symbol'],
  data () {
    return {
    }
  }
}
</script>

<style scoped>
*{
    box-sizing: border-box;
}

.tile {
    display: flex;
    width: 100px;
    height: 100px;
    background-color: white;
    border-radius: 10%;
    justify-content: center;
    align-items: center;
    font-size: 4rem;
}

.tile:hover {
    background-color: grey;
}
</style>
