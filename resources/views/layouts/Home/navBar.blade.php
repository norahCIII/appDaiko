 <!-- ======= Header ======= -->
 <header id="header" class="fixed-top d-flex align-items-center">
     <div class="container d-flex align-items-center justify-space-around">
         <div class="logo">
             <a href="{{ url('../') }}"><img src="assets/img/daikoWh.png" alt="" class="img-fluid"></a>
         </div>

         <nav id="navbar" class="navbar">
             <ul class="navLink">
                 <li><a class="nav-link scrollto " href="{{ url('../gana') }}">ASSETS</a></li>
                 <li><a class="nav-link scrollto" href="{{ url('../pool') }}">POOL</a></li>
                 <li><a class="nav-link scrollto" href="{{ url('../pool') }}">FUNDING POOL</a></li>
                 <li><a class="nav-link scrollto " href="#portfolio">INTERCAMBIO</a></li>
                 <li><a class="nav-link scrollto" href="{{ url('../about') }}">NOSOTROS</a></li>
                 <li><a class="nav-link scrollto" href="#contact">SOPORTE</a></li>
                 @if (Route::has('login'))
                 @auth
                 <li> <a class="getstarted scrollto" href="{{ url('../dashboard') }}">Dashboard</a></li>

             </ul>
             @else
             <ul class="login">

                 <li><a class="btn getstarted scrollto" href="{{ route('login') }}">Ingresar</a></li>
                 @if (Route::has('register'))
                 <li> <a class="btn getstarted scrollto" href="{{ route('register') }}" class="ms-4 text-muted">Registrar</a></li>
                 @endif
                 @endif
                 @endif
             </ul>

             <i class="bi bi-list mobile-nav-toggle"></i>
         </nav>
         <!-- .navbar -->

     </div>
 </header>
 @yield('navBar')
 <!-- ======= End Header ======= -->