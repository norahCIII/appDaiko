<section id="calCulator">
  <div class="container">
    <div class="section-title" data-aos="fade-up">
      <h2>LO QUE PODRIAS ESTAR GANANDO</h2>
      <p></p>
    </div>
    <div class="price-box">
      <div class="row">
      <div class="details col-sm-6">
          <div class="calBan">
            <h1 class="display-4">Hello, world!     
                <span class="cd-words-wrapper cd-headline slide">
                  <b class="is-visible">Holi</b>
                  <b>Holitas</b>
                </span>            
            </h1><!-- cd-intro -->
            <p class="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
            <hr class="my-4">
            <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
            <p class="lead">
              <a class="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
            </p>
          </div>
        </div>
        <div class="col-sm-6">
          <form name="formulario1" class="form-horizontal form-pricing" role="form">
            <div class="col-sm-12">
              <div class="price-form">
                <div class="price-slider">
                  <div class="css-1c0t6ml">
                    <div class="css-1bt0omd"><input name="capital_inicial" class="css-1wugum4" value="000,000"><span class="css-x7dwdu">USDC</span></div>
                    
                  </div>
                </div>
                <div class="form-group ">
                  <div class="row d-flex screen">
                    <div class="col-lg-2">
                      <select id="percentage" onChange="valorCambiado()">
                        <option class="valor" value="6">1 Mes</option>
                        <option class="valor" value="9">3 Meses</option>
                        <option class="valor" value="12">6 Meses</option>
                        <option class="valor" value="18">1 Año</option>
                      </select>
                    </div>

                    <div class="col-lg-4">
                      <div class="css-1behjg6">
                        <div class="css-f79bhg">
                          <div class="css-1n228lq">APY</div>
                          <div class="css-46cmgp" id="apyScreen"></div>
                        </div>
                      </div>
                    </div>

                  </div>
                  <div class="form-group">
                    <div class="row">
                      <div class="col-sm-12">
                        <div class="css-1kilc6l"><span class="css-g1n7ys">Ingresos diarios</span>
                          <div class="css-roynbj"><span id="diario" class="css-c4q7yl">0.01</span><span class="css-wk7a33"> USDC </span></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="row">
                      <div class="col-sm-12">
                        <div class="css-1kilc6l"><span class="css-g1n7ys">Ingresos mensuales</span>
                          <div class="css-roynbj"><span id="mensual" class="css-c4q7yl">0.53</span><span class="css-wk7a33"> USDC </span></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="row">
                      <div class="col-sm-12">
                        <div class="css-mo4gq"><span class="css-g1n7ys">Ingresos anuales</span>
                          <div class="css-roynbj"><span id="apliInter" class="css-c4q7yl">6.37</span><span class="css-wk7a33"> USDC </span></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr class="style">
                  <div class="form-group">
                    <div class="col-sm-12">
                      <a onclick="algoritmo();" text-decoration="none" referrerpolicy="strict-origin" target="_blank" class="css-1mfu7oz"><button type="button" class="css-18t364o">Invertir</button></a>
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="col-sm-12">
                      <img src="https://github.com/AmirolAhmad/Bootstrap-Calculator/blob/master/images/payment.png?raw=true" class="img-responsive payment" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
        
        <!-- end card -->
      </div>
    </div>
  </div>

</section>
<script>
  /*
  let testeOptions = ['Semanal', 'Quincenal', 'Mensual', 'Anual'];
  selectOptionsClass('select-teste', testeOptions);

  if (testeOptions = testeOptions) {
    console.log(testeOptions);
  } else
    console.log("nadita");

     function valorCambiado() {
  var x = document.getElementById("percentage").value;
  document.getElementById("apyScreen").innerHTML = "% " + x;

*/

  let inputs = document.querySelectorAll(".valor");
  var porcent = document.getElementById("percentage").value;
  // Mostrar Apy %


  function valorCambiado(input) {
    var x = document.getElementById("percentage").value; // Carga El Porcentaje Del Select.
    document.getElementById("apyScreen").innerHTML = "% " + x;
    myElementValue = myElement.value;
  }


  function algoritmo() {

    // get references to select list and display text box
    var time = 1;

    inputs.forEach(input => {

      let capital_inicial, interes_simple, numero_de_annos, porcentaje_de_interes;
      capital_inicial = parseFloat(document.formulario1.capital_inicial.value);
      numero_de_annos = time;
      porcentaje_de_interes = parseFloat(document.getElementById("percentage").value);
      interes_simple = capital_inicial * porcentaje_de_interes / 100 * numero_de_annos;
      mensual = interes_simple / 12;
      diario = interes_simple / 365;
      document.getElementById("apliInter").innerHTML = interes_simple;
      document.getElementById("mensual").innerHTML = mensual;
      document.getElementById("diario").innerHTML = diario;
    })

  }

  $(function() {
    $("#slider").slider();
  });

  // immediate function to preserve global namespace
</script>
</script>