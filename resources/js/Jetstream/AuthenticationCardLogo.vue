<template>
  <Link :href="'/'" class="d-flex justify-content-center mb-4">
    <div class="logo">
             <!-- Uncomment below if you prefer to use an image logo -->
             <a href="{{ url('../') }}"><img src="assets/img/emblema1.png" alt="" class="img-fluid logLogin"></a>
         </div>
  </Link>
</template>

<script>
import { defineComponent } from 'vue' 
import { Link } from '@inertiajs/inertia-vue3';

export default defineComponent({
  components: {
    Link,
  },
})
</script>