<!--MODAL DE CLIENTES-->
<div id="modalCliente" class="modal zoomIn" tabindex="-1" aria-hidden="true" style="display: none;">
    <div class="modal-dialog">
        <div class="modal-content border-0 overflow-hidden" style="background: #F2F2F2 !Important;">
            <div class="modal-header bg-pattern p-3 headerRegister">
                <h4 class="card-title mb-0" id="titleModal">Nuevo usuario</h4>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
         
            <div class="modal-body">
                <!-- TODO: Formulario de Mantenimiento -->
                <form method="post" id="formCliente" name="formCliente">
                    <input type="hidden" id="idCliente" name="idCliente" value="">
                    <div class="modal-body">

                        <div class="row">
                            <div class="">
                                <div class="card pag-title-box">
                                    <div class="pag-title-box">
                                        <h4 class="card-title mb-0 flex-grow-1">General information</h4>
                                        <div>
                                        </div>
                                    </div><!-- end card header -->

                                    <div class="p-3 col-xl-12">
                                        <div>
                                            <div> 
                                            <div class="form-group">
                                            <div class="row">
                                                <label for="tipoCliente">Special Client</label>
                                                <div class="form-switch">
                                                    <input class="form-check-input" type="checkbox" role="switch" id="SwitchCheck1" onchange="mostrarOcultarCampo()">
                                                    <label class="form-check-label" for="SwitchCheck1">No/Si</label>
                                                </div>
                                            </div>
                                            </div>
                                            <br>
                                            <div id="campoKit" class="form-group" style="display: none;" style="margin-bottom:20px;">
                                                <div class="row">
                                                    <div class="input-group">
                                                    <div class="col-sm-6">
                                                        <input type="text" class="form-border" name="kit" id="kit" placeholder="Enter the kit name" oninput="convertirAMayusculas('kit')" autocomplete="off">
                                                    </div>
                                                    <div class="input-group-append">
                                                        <button class="btn btn-outline-secondary" type="button" data-bs-toggle="tooltip" data-bs-placement="top" title="It is the kit that said client will have assigned.">
                                                            <i class="ri-question-line"></i>
                                                        </button>
                                                    </div>
                                                    </div>                                                   
                                                </div>
                                            </div>
                                                                                
                                            <!--GRUPO 1-->
                                                <div class="form-group">
                                                    <div class="row">
                                                    <div class="input-group">
                                                        <input type="text" class="form-control form-border" name="nombres" id="nombres" placeholder="Write the names" oninput="convertirAMayusculas('nombres')" autocomplete="off">
                                                        <div class="input-group-append">
                                                            <button class="btn btn-outline-secondary" type="button" data-bs-toggle="tooltip" data-bs-placement="top" title="By default everything you write is capital letter">
                                                                <i class="ri-question-line"></i>
                                                            </button>
                                                        </div>
                                                    </div>                                                  
                                                    </div>
                                                </div>
                                                <br>

                                                <!--GRUPO 2-->
                                                <div class="form-group">
                                                    <div class="row">
                                                        <div class="col-sm-6">
                                                            <label for="horaRapida">Opening hours </label>
                                                            <input type="time" class="form-control" id="horaApertura" name="horaApertura">
                                                        </div>
                                                        <div class="col-sm-6">
                                                            <label for="horaNormal">Closing time </label>
                                                            <input type="time" class="form-control" id="horaCierre" name="horaCierre">
                                                        </div>
                                                    </div>
                                                </div>
                                                <br>                                                
                                        </div>

                                        <!--end col-->
                                    </div>
                                </div><!-- end card header -->

                            </div><!-- end card -->
                        </div><!-- end col -->
                        <!-- end col -->
                    </div><!--Fin: 1 card-->

            </div>
            <div class="modal-footer">
            <button type="button" id="btnActionForm" class="btn btn-primary" onclick="guardarCliente()">
                <span id="btnText">Guardar</span>
            </button>
            <button type="button" id="btnCerrar" class="btn btn-light" data-bs-dismiss="modal">(esc) Close</button>
            </div>
            </form>
        </div>
    </div><!-- /.modal-content -->
</div><!-- /.modal-dialog -->
</div><!-- /.modal -->

