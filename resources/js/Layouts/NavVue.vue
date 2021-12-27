<template>
  <header id="header" class="fixed-top d-flex align-items-center">
    <div class="container d-flex align-items-center justify-space-around">
      <div class="logo">
        <a href="{{ url('../') }}"
          ><img src="assets/img/daikoWh.png" alt="" class="img-fluid"
        /></a>
      </div>

      <nav id="navbar" class="navbar">
        <ul class="navLink">
          <li><a class="nav-link scrollto">Earn Yield</a></li>
          <li><a class="nav-link scrollto">Reward Pool</a></li>
          <li><a class="nav-link scrollto">Funding Pool</a></li>
          <li>
            <a class="nav-link scrollto" href="#portfolio">Intercambio</a>
          </li>
          <li><a class="nav-link scrollto">Nosotros</a></li>
          <li><a class="nav-link scrollto" href="#contact">Soporte</a></li>
        </ul>
        <ul class="login">
          <li>
            <a class="clases" href="{{ route('login') }}">Ingresar</a>
          </li>

          <li>
            <a href="{{ route('register') }}" class="clases">Registrar</a>
          </li>
        </ul>

        <i class="bi bi-list mobile-nav-toggle"></i>
      </nav>
      <!-- .navbar -->
    </div>
  </header>
</template>



<script>
export default {
  mounted() {
    console.log("Ready!!!");
  },
  computed: {
    classes() {
      return this.class ? "nav-link ms-4 text-muted" : "nav-link";
    },
  },
};
</script>