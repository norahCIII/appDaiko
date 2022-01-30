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

                 <li>
                 <a class="btn btn-block btn-social btn-flickr" href="{{ route('login') }}">
                    <i class="fa fa-university fa-2x"></i>Ingresar
                  </a>
               
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
 <!-- ======= End Header ======= 
  <nav id="navbar" class="navbar">
        <ul>
          <li><a class="nav-link scrollto active" href="#hero">Home</a></li>
          <li><a class="nav-link scrollto" href="#about">About</a></li>
          <li><a class="nav-link scrollto" href="#services">Services</a></li>
          <li><a class="nav-link scrollto " href="#portfolio">Portfolio</a></li>
          <li><a class="nav-link scrollto" href="#team">Team</a></li>
          <li><a class="nav-link scrollto" href="#pricing">Pricing</a></li>
          <li class="dropdown"><a href="#"><span>Drop Down</span> <i class="bi bi-chevron-down"></i></a>
            <ul>
              <li><a href="#">Drop Down 1</a></li>
              <li class="dropdown"><a href="#"><span>Deep Drop Down</span> <i class="bi bi-chevron-right"></i></a>
                <ul>
                  <li><a href="#">Deep Drop Down 1</a></li>
                  <li><a href="#">Deep Drop Down 2</a></li>
                  <li><a href="#">Deep Drop Down 3</a></li>
                  <li><a href="#">Deep Drop Down 4</a></li>
                  <li><a href="#">Deep Drop Down 5</a></li>
                </ul>
              </li>
              <li><a href="#">Drop Down 2</a></li>
              <li><a href="#">Drop Down 3</a></li>
              <li><a href="#">Drop Down 4</a></li>
            </ul>
          </li>
          <li><a class="nav-link scrollto" href="#contact">Contact</a></li>
          <li><a class="getstarted scrollto" href="#about">Get Started</a></li>
        </ul>
        <i class="bi bi-list mobile-nav-toggle"></i>
      </nav><!-- .navbar -->-->