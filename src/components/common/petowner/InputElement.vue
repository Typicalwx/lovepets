
<template>  
<div>
 <label><slot></slot></label>
   <input :type="type" :value="value" @input="$emit('input',$event.target.value)"/> 
    <span>{{info}}</span>
    </div> 
</template>   
<script>
export default {
  props: ["type", "value", "info"]
};
</script>