 <!-- ======= SubNavTwo ======= -->
 <section id="hero" class="heroTwo d-flex align-items-center">
   <div class="container">
     <div class="row">
       <div class="col-lg-6 pt-5 pt-lg-0 order-2 order-lg-1 d-flex flex-column justify-content-center">
         <h1 data-aos="fade-up">
           <h1>Gane hasta un 16% de interés</h1>
           <div id="textType"></div>
         </h1>
         <p data-aos="fade-up" data-aos-delay="400">Obtenga las mejores utilidades invirtiendo en cripto activos estables y reciba un pago de interés entre un 7% a un 16% redimible cada mes.</p>
         <div data-aos="fade-up" data-aos-delay="800" class="d-flex">
           <div style="margin-right: 20px;">
             <a href="#about" class="btn btn-dark-moon-hero">Registrate</a>
           </div>
           <div>
             <a href="#about" class="btn btn-dark-moon-hero">Empieza a ganar</a>
           </div>
         </div>
       </div>
       <div class="col-lg-6 order-1 order-lg-2 hero-img" data-aos="fade-left" data-aos-delay="200">
         <img src="assets/img/blok.png" class="img-fluid animated daikoImg" alt="">
       </div>
     </div>
   </div>
 </section>
 <script type="text/javascript">
   var i, text;
   i = 0;
   text = "Sobre su inversión";
   var speed = 200;

   function typing() {
     if (i < text.length) {
       document.getElementById("textType").innerHTML += text.charAt(i);
       i++;
       setTimeout(typing, speed);
     }
   }
   typing();
 </script>
 <!-- ======= EndSubNav ======= -->
 @yield('banNavTwo')