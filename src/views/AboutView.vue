<template>
  <div class="about pa-6">
    <h1>README.md</h1>
    <div class="container">
      <div v-html="markdownToHtml">
      </div>
    </div>
  </div>
</template>

<script>
  import {marked} from 'marked';
  
  import md from '../services/markdown'
  

  export default {
    name: 'about-view',
    data(){
      return {
        markdown: "## Hola"
      }
    },
    created(){
    },  
    computed: {
      markdownToHtml(){
        return marked.parse(md)
      }
    }
  }

</script>