<!--<section id="about" class="about">
    <div class="container">

        <div class="row content banPool">
            <div class="col-lg-12" data-aos="fade-up" data-aos-delay="150">

            </div>
            <div class="col-lg-8 pt-4 pt-lg-0 d-flex" data-aos="fade-up" data-aos-delay="300">
                <a href="#" class="btnLearnMore">Todas las monedas</a>
            </div>
            <div class="col-lg-2 pt-4 pt-lg-0 d-flex" data-aos="fade-up" data-aos-delay="300">
                <a href="#" class="btnLearnMore">Gold Token</a>
            </div>
            <div class="col-lg-2 pt-4 pt-lg-0 d-flex" data-aos="fade-up" data-aos-delay="300">
                <a href="#" class="btnLearnMore">NTF Comming Soon</a>
            </div>
        </div>

    </div>
</section>

<div class="container">
    <table class="table">
        <thead>
            <tr>
                <th>Nombre de la moneda</th>
                <th></th>
                <th>Taza de interes</th>
            </tr>
        </thead>
        <tbody id="data">
            <td>Nombre</td>
            <td></td>
            <td>Símbolo</td>
        </tbody>
        <tfoot>
            <td>Nombre</td>
            <td></td>
            <td>Porcentaje</td>
        </tfoot>
    </table>
</div> \-->
<div class="mainAssets container md:flex justify-between">
    <div class="flex flex-col md:col-span-5 lg:col-span-5 w-full max-w-3xl lg:pr-px mb-16 md:mb-0">
        <header>
            <div> Balance Total</div>
            <div class="totalPrice">
                <h3><span><span>$</span><span>0</span><span class="">.</span><span class="">00</span></span></h3>
            </div>
        </header>
        <section class="assets">
            <header class="flex justify-between items-center">
                <h2>Portafolio</h2>
            </header>
            <div class=" table-responsive relative flex flex-col">
                <table class="table borderless">
                    <tbody>
                        <tr>
                            <td  class="align-middle"> 
                                <div class="">
                                    <ul class=""style="list-style-type: none;">
                                        <li>
                                            <a href="#">
                                                <img src="assets/img/usdtOne.png" alt="Person" class="iconEarn">
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </td>
                            <td class="align-middle">
                               
                                <div class="flex items-center">

                                    <div class="nombre ">
                                        <h6><span class="font-medium" data-v-57b524dc="">Daiko</span></h6>
                                        <div class="subtitulos">
                                            <p class="font-normal text-muted"> LP DVPN · ATOM</p>
                                        </div>
                                    </div>
                                </div>
                            </td>

                            <td class="py-5 align-middle text-right">
                            <div class="">
                                    <ul class=""style="list-style-type: none;">
                                        <li>
                                            <a href="#">
                                                <img src="assets/img/cal.png" alt="Person" class="iconEarn calIco">
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </td>
                            <td class="py-5 align-middle text-right">
                                hola
                            </td>
                            <td class="py-5 align-middle text-right">
                                <div>
                                    <span>---</span>
                                </div>
                                <div>
                                    <span>0.000002 G7</span>
                                </div>
                            </td>
                            <td class="py-5 align-middle text-right">
                                <div>
                                    <span>
                                        <div>Icon</div>

                                    </span>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>

    </div>


    @yield('earn')