<!-- ======= Calculator Apy ======= -->
<section id="pricing" class="pricing">
  <div class="container">

    <div class="section-title">
      <h2>LO QUE PODRIAS ESTAR GANANDO</h2>
      <p></p>
    </div>

    <div class="row">

      <div class="col-lg-6 col-md-6">
        <div class="box recommended" data-aos="zoom-in-right" data-aos-delay="200">

          <form name="formulario1">
            <table style="text-align: left; margin-left: auto; margin-right: auto;">
              <tbody>
                <tr>

                </tr>
                <tr>
                  <td>
                    <label for="numero_de_annos">Ingresa el valor de numero de annos:</label>
                  </td>
                  <td>
                    <input name="numero_de_annos" required="required" step="0.000001" type="number" />
                  </td>
                </tr>


                <tr>
                  <td>
                    <label for="interes_simple">Valor de interes simple:</label>
                  </td>
                  <td>
                    <input name="interes_simple" step="0.000001" type="number" />
                  </td>
                </tr>
              </tbody>
            </table>

            <h3>Cantidad?</h3>
            <input type="number" min='1' max='999999999' name="capital_inicial" id="amount" for="capital_inicial" class="sc-efQSVx hMMbuG">

            <ul>
              <h3>Tiempo?</h3>


              <select id="percentage" onChange="valorCambiado()">
                <option class="valor" data-time="1.125" value="12">Semanal</option>
                <option class="valor" data-time="1.125" value="30">Quincenal</option>
                <option class="valor" data-time="1.125" value="40">Mensual</option>
                <option class="valor" data-time="1.125" value="50">Anual</option>
              </select>

            </ul>
            
            <div class="btn-wrap">
              <a onclick="algoritmo();" class="btn-learn-more">Calcular</a>
            </div>
          </form>
        </div>
      </div>

      <div class="col-lg-6 col-md-6 mt-4 mt-md-0">
        <div class="box recommended" data-aos="zoom-in" data-aos-delay="100">

          <h3>Total</h3>

          <label>
            <h4>
              <div name="interes_simple" step="0.000001" type="number"></div><span></span>
            </h4>
          </label>

          <ul>
            <h3>Porcentaje</h3>
            <label for="monto">
              <h4>
                <div id="porcent"></div><span></span>
              </h4>
            </label>

          </ul>

          <div class="btn-wrap">
            <a href="#" class="btn-learn-more">Registrate</a>
          </div>

        </div>

      </div>

    </div>
  </div>
</section>

<!-- ======= Calculator Apy =======
 
  createOptions();

  function createOptions() {
    let select = document.getElementById('percentage');
 
      var node = document.createElement("option");
      node.innerHTML = i;
      node.setAttribute('value', i);
      node.setAttribute('class', 'percent');
      select.appendChild(node);
    
  }
  


  function calculateInterest(amount, payments, interest) {
    var total = amount;
    for (var i = 1; i <= payments; i++) {
      var percent = total * interest;
      total = total += percent;
    }
    return '$' + total.toFixed(2);
  }

  function handler() {

    var para = document.getElementById('show'),
      result = document.getElementsByTagName('div')

    var select = document.getElementById('percentage'),
      percentValue = select.options[select.selectedIndex].value / 100,
      amounts = document.getElementById('amount'),
      amountValue = parseFloat(amounts.value),
      time = document.getElementById('time'),
      timeValue = parseInt(time.value);

    if (para.className === "show test") {
      para.remove();
      para = document.createElement('p');
      para.id = "show";
      result = document.getElementById('result');
      result.appendChild(para);
    }

    para.innerHTML = calculateInterest(amountValue, timeValue, percentValue);
    para.className = "show";
    para.className += " test";
  }
 
7 = 5%
30 = 8 %
90 = 12%
180 = 16%
365 = 20 %
  let inputs = document.querySelectorAll(".valor");
inputs.forEach(input => {
  console.log(input.value);           // mostramos el valor
  console.log(input.dataset.cambio);  // mostramos el cambio
});
console.log("input.value");  

function valorCambiado() {
  var x = document.getElementById("percentage").value;
  document.getElementById("demo").innerHTML = "You selected: " + x;
}

  let inputs = document.querySelectorAll(".valor");
  var porcent = document.getElementById("percentage").value;
  var time = document.getElementById("percentage").value;
  inputs.forEach(input => {
    document.getElementById("porcent").innerHTML = "% " + porcent; // Muestra El Porcentaje En Pantalla Al Cargar.

  });

  function valorCambiado(input) {
   
    var x = document.getElementById("percentage").value; // Carga El Porcentaje Del Select.
     var time = document.getElementById("percentage").dataset.time;
    
    document.getElementById("time").innerHTML = "Time " + percentage; // Carga El Data En Pantalla Al Cargar.
    document.getElementById("porcent").innerHTML = "% " + x;
    myElementValue = myElement.value;
  }
-->

@yield('calculator')

<script>
  let inputs = document.querySelectorAll(".valor");
  var porcent = document.getElementById("percentage").value;
  var time = document.getElementById("percentage").value;
  inputs.forEach(input => {
    document.getElementById("porcent").innerHTML = "% " + porcent; // Muestra El Porcentaje En Pantalla Al Cargar.

  });

  function valorCambiado(input) {
    var x = document.getElementById("percentage").value; // Carga El Porcentaje Del Select.
    document.getElementById("porcent").innerHTML = "% " + x;
  }

  function algoritmo() {

    // get references to select list and display text box
    var sel = document.getElementById('scripts');
    var el = document.getElementById('display');
    inputs.forEach(input => {

      let capital_inicial, interes_simple, numero_de_annos, porcentaje_de_interes;
      capital_inicial = parseFloat(document.formulario1.capital_inicial.value);
      numero_de_annos = parseFloat(document.formulario1.numero_de_annos.value);
      porcentaje_de_interes = parseFloat(document.getElementById("percentage").value);
      interes_simple = capital_inicial * porcentaje_de_interes / 100 * numero_de_annos;
      document.formulario1.interes_simple.value = interes_simple;

    })




  }
  // immediate function to preserve global namespace
</script>