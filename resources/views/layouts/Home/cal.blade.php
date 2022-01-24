<section id="calCulator">
  <div class="container">
    <div class="price-box">
      <div class="row">
        <div class="col-sm-6">
          <form name="formulario1" class="form-horizontal form-pricing" role="form">
            <div class="price-slider">
              <div class="col-sm-12">
                <div cursor="pointer" class="css-joga9t">
                  <div class="css-roynbj">
                    <div class="css-1t441vj">
                      <div class="css-12ga2ug">
                        <div class="css-fbzp47"></div>
                        <div class="css-terej8">USDC</div>
                      </div><svg viewBox="0 0 14 14" class="css-5dmco8">
                        <path fill="currentColor" fill-rule="nonzero" d="M1.793 4.043a1 1 0 0 1 1.32-.083l.094.083L7 7.835l3.793-3.792a1 1 0 0 1 1.32-.083l.094.083a1 1 0 0 1 .083 1.32l-.083.094-4.5 4.5a1 1 0 0 1-1.32.083l-.094-.083-4.5-4.5a1 1 0 0 1 0-1.414z"></path>
                      </svg>
                    </div>
                  </div>
                </div>

              </div>
            </div>
            <div class="price-slider">
              <div class="css-t2n2ku">
                <div class="css-1behjg6">
                  <div class="css-f79bhg">
                    <div class="css-1n228lq">APY</div>
                    <div class="css-46cmgp"></div>
                  </div>
                </div><a onclick="algoritmo();" text-decoration="none" referrerpolicy="strict-origin" target="_blank" class="css-1mfu7oz"><button type="button" class="css-18t364o">Invertir</button></a>
              </div>
            </div>
        </div>
        <div class="col-sm-6">
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
            <div class="form-group">
              <div class="row">
                <div class="col-lg-12">
                  <select id="percentage">
                    <option class="valor" value="8">1 Mes</option>
                    <option id="div1" value="12">3 Meses</option>
                    <option id="div2" value="15">6 Meses</option>
                    <option id="div3" value="18">1 Año</option>
                  </select>
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
                <a text-decoration="none" referrerpolicy="strict-origin" target="_blank" class="css-58ag6f"><button type="button" class="css-18t364o">Invertir</button></a>
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
  // Enviar datos al select... apy x 
  function selectOptionsClass(selectClass, arrayOptions) {
    let selects = document.querySelectorAll("." + selectClass);
    let option;

    selects.forEach(select => {
      arrayOptions.forEach(opt => {
        option = document.createElement("option");
        option.value = opt;
        option.dataset = opt;
        option.text = opt;
        select.appendChild(option);

      });
    });
  }
  let testeOptions = ['Semanal', 'Quincenal', 'Mensual', 'Anual'];
  selectOptionsClass('select-teste', testeOptions);

  if (testeOptions = testeOptions) {
    console.log(testeOptions);
  } else
    console.log("nadita");

  let inputs = document.querySelectorAll(".valor");
  var porcent = document.getElementById("percentage").value;

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

  createOptions();

  function createOptions() {
    let select = document.getElementById('percentage');
    var node = document.createElement("option");


  }
  const div2 = document.getElementById('percentage');
  const align = div2.getAttribute('data-time')
  console.log(align);
  // immediate function to preserve global namespace
</script>
</script>