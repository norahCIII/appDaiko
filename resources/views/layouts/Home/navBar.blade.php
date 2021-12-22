 <!-- ======= Header ======= -->
 <header id="header" class="fixed-top d-flex align-items-center">
     <div class="container d-flex align-items-center justify-content-between">
         <div class="logo">
             <a href="{{ url('../') }}"><img src="assets/img/logo1.png" alt="" class="img-fluid"></a>
         </div>

         <nav id="navbar" class="navbar">
             <ul>
                 <li><a class="nav-link scrollto active" href="{{ url('../gana') }}">Earn Yield</a></li>
                 <li><a class="nav-link scrollto" href="{{ url('../pool') }}">Pool</a></li>
                 <li><a class="nav-link scrollto " href="#portfolio">Intercambio</a></li>
                 <li><a class="nav-link scrollto" href="{{ url('../about') }}">Nosotros</a></li>
                 <li><a class="nav-link scrollto" href="#contact">Soporte</a></li>
                 @if (Route::has('login'))

                 @auth
                 <li> <a class="nav-link scrollto active" href="{{ url('../dashboard') }}">Dashboard</a></li>
                 @else
                 <li><a class="getstarted scrollto" href="{{ route('login') }}">Ingresar</a></li>
                 @if (Route::has('register'))
                 <li> <a class="getstarted scrollto" href="{{ route('register') }}" class="ms-4 text-muted">Registrar</a></li>
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