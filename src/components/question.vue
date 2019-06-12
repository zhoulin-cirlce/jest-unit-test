<template>
  <div class="wrapper">
    <label for="input">问题：</label>
    <input id="input" type="text" v-model="inputValue">
    <Button @click="getAnswer">click</Button>
    
    <p>答案：{{answer}}</p>
    <img :src="src">
    <div>
      <p>同一个函数调用，返回值不同</p>
      <Button @click=" getResult('0')">askType=0</Button>
      <Button @click=" getResult('1')">askType=1</Button>      
    </div>
  </div>
  
</template>

<script>
  import axios from 'axios';
  import Counter from './../pages/counter'
  import {Button}  from 'mand-mobile'
  export default {
    name: 'AnQuestion',
    components:{
      [Button.name]:Button
    },
    data() {
      return {
        inputValue: 'ok?',
        answer: '',
        src: '',
        askType:'null'
      }
    },
    methods: {
      getAnswer() {
        return axios.get('api/view').then(result => {
          if (result && result.data) {
            this.answer = result.data.answer;
            this.src = result.data.image;
            return result
          }
        }).catch(e => {})
         
      },
      getResult(askType){
        return axios.post('api/ask_type').then(result =>{
          switch(result.askType){
            case '0':
              this.askType='type_0';
              break;
            case '1':
              this.askType='type_1';
              break;
            default:
              this.askType='null';
              break;
          }
        })
      },
       getAnswerFormat() {
        return axios.get('api/newlist').then(result => {
          if (result && result.data) {
            this.answer = 'second_'+result.data.answer;
            this.src = 'second_'+result.data.image;
            return result
          }
        }).catch(e => {})
         
      }

    }
  }
</script>
