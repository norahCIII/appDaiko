<!-- ======= Calculator Apy ======= -->
<section id="pricing" class="pricing">
  <div class="container">

    <div class="section-title">
      <h2>LO QUE PODRIAS ESTAR GANANDO</h2>
      <p></p>
    </div>

    <div class="row">

      <div class="col-lg-6 col-md-6">
        <div class="box" data-aos="zoom-in-right" data-aos-delay="200">
          <form name="formulario1">
            <h3>Cuanto?</h3>
            <input name="capital_depositado" required="required" step="0.000001" type="number" class="sc-efQSVx hMMbuG">

            <ul>
              
              <h3>Interes</h3>

              <input name="tasa_de_interes" required="required" step="0.000001" type="number" class="sc-efQSVx hMMbuG">
              <h3>Cuanto tiempo?</h3>
              <input name="tiempo" required="required" step="0.000001" type="number" class="sc-efQSVx hMMbuG">
            </ul>

            <td colspan="2" rowspan="1">
              <input value="Procesar" type="button" onclick="algoritmo();" />
              <input type="reset" />
            </td>

        </div>
      </div>

      <div class="col-lg-6 col-md-6 mt-4 mt-md-0">
        <div class="box recommended" data-aos="zoom-in" data-aos-delay="100">

          <h3>Total</h3>
          <label for="interes_compuesto">
            <h4><sup>$</sup><span></span></h4>
          </label>
          <input name="interes_compuesto" step="0.000001" type="number" />
          <ul>
            <h3>Apy</h3>
            <label for="monto">
              <h4><sup>$</sup><span></span></h4>
            </label>
            <input name="monto" step="0.000001" type="number" />
          </ul>

          <div class="btn-wrap">
            <a href="#" class="btn-buy">Registrate</a>
          </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</section>
<!-- ======= Calculator Apy ======= -->
@yield('calculator')


<script>
  function algoritmo() {
    let capital_depositado, interes_compuesto, monto, tasa_de_interes, tiempo;
    capital_depositado = parseFloat(document.formulario1.capital_depositado.value);
    tasa_de_interes = parseFloat(document.formulario1.tasa_de_interes.value);
    tiempo = parseFloat(document.formulario1.tiempo.value);
    monto = Math.pow(1.0 + tasa_de_interes / 100, tiempo) * capital_depositado;
    interes_compuesto = monto - capital_depositado;
    document.formulario1.interes_compuesto.value = interes_compuesto;
    document.formulario1.monto.value = monto;
  }
</script>