<section id="calCulator">
  <div class="container">
    <div class="price-box">
      <div class="row">
        <div class="col-sm-6">
          <form name="formulario1" class="form-horizontal form-pricing" role="form">
            <div class="col-sm-12">
              <div class="price-form">
                <div class="price-slider">
                  <div class="css-1c0t6ml">
                    <div class="css-1bt0omd"><input name="capital_inicial" class="css-1wugum4" value="500,000"><span class="css-x7dwdu">USDC</span></div>
                    <div class="css-gn9u53">
                      <div class="react-slider-holder" style="width: 100%; cursor: pointer; transform: translateY(-1px); padding-top: 2px; padding-bottom: 2px; touch-action: none;">
                        <div style="width: 100%; border-radius: 100px; background: transparent;">
                          <div style="width: 49.9995%; background-color: rgb(255, 255, 255); height: 2px; cursor: pointer; border-radius: 100px; display: flex; justify-content: flex-end;">
                            <div style="width: 18px; height: 18px; position: relative; transform: translate(50%, -50%);">
                              <div style="width: 18px; height: 18px; min-width: 18px; background-color: rgb(189, 162, 111); border-radius: 50%; border: 2px solid rgb(189, 162, 111); cursor: pointer;"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="css-zl9v69">
                        <div class="css-roynbj">10</div>
                        <div class="css-roynbj">1,000,000</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="form-group ">
                  <div class="row d-flex screen">
                    <div class="col-lg-2">
                      <select id="percentage" onChange="valorCambiado()">
                        <option class="valor" value="8">1 Mes</option>
                        <option class="valor" value="12">3 Meses</option>
                        <option class="valor" value="15">6 Meses</option>
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
          </form>
        </div>
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

  // immediate function to preserve global namespace
</script>
</script>