<template>
    <div>
      <span class="count">{{ count }}</span>
      <button class="btn1" @click="increment">Increment</button>
   </div>
</template>
<script>
 import axios from 'axios';
 export default{
 name: 'Counter',
  data() {
    return {
      count: 0,
      value:null
    }
  },

  methods: {
    increment() {
      this.count++
    }
  }
}
</script>