 <!-- ======= Header ======= -->
 <header id="header" class="fixed-top d-flex align-items-center">
     <div class="container d-flex align-items-center justify-space-around navFlex">
         <div class="logo">
             <a href="{{ url('../') }}"><img src="assets/img/daikoWh.png" alt="" class="img-fluid"></a>
         </div>

         <nav id="navbar" class="navbar">
             <ul class="navLink">
                 <li><a id="len1" class="nav-link scrollto hoverable " href="{{ url('../gana') }}">HOME</a></li>
                 <li><a  id="len2" class="nav-link scrollto hoverable" href="{{ url('../pool') }}">PORTAFOLIO</a></li>
                 <li><a id="len3" class="nav-link scrollto hoverable" href="{{ url('../pool') }}">NOSOTROS</a></li>
                 <li><a class="nav-link scrollto hoverable " href="#portfolio">CONTACTO</a></li>
                 <li><a id="len4" class="nav-link scrollto hoverable" href="{{ url('../about') }}">APRENDE</a></li>
               
                 @if (Route::has('login'))
                 @auth
                 <li> <a id="len5 class="getstarted scrollto" href="{{ url('../dashboard') }}">Dashboard</a></li>

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