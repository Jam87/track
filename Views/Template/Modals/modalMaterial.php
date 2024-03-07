<div id="modalMaterial" class="modal zoomIn" tabindex="-1" aria-hidden="true" style="display: none;">
    <div class="modal-dialog modal-dialog-scrollable">
        <div class="modal-content border-0 overflow-hidden">
            <div class="modal-header bg-pattern p-3 headerRegister">
                <h4 class="card-title mb-0" id="titleModal"></h4>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="alert alert-warning  rounded-0 mb-0">
                <i class="ri-alert-line me-3 align-middle"></i><b><?= $data['page_title_bold']; ?></b>
                <?= $data['descrption_modal1']; ?><span class="text-danger"> * </span><?= $data['descrption_modal2']; ?>
            </div>
            <div class="modal-body">
                <form method="post" id="formMaterial" name="formMaterial">
                    <input type="hidden" id="idMaterial" name="idMaterial" value="">
                    <!-- cliente espcial -->
                    <div class="form-group" id="campoClienteEspecial">
                        <div class="row">
                            <label for="tipoCliente">Special Client</label>
                            <div class="form-switch">
                                <input class="form-check-input" type="checkbox" role="switch" id="SwitchCheck1">
                                <label class="form-check-label" for="SwitchCheck1">No/Si</label>
                            </div>
                        </div>
                    </div>
                    <br>
                    <div id="campoKit" class="form-group">
                        <div class="row">
                            <div class="col-sm-6">
                                <label>Select the kit <span class="text-danger">*</span></label>
                                <select class="form-select" id="comboxKit" name="comboxKit">
                                    <!-- opciones del select -->
                                </select>
                            </div>
                            <div class="col-sm-6">
                                <label>Enter size <span class="text-danger">*</span></label>
                                <div class="input-group">
                                    <input type="text" class="form-control form-border" name="size" id="size" placeholder="Enter size" oninput="convertirAMayusculas('size')" autocomplete="off">
                                    <div class="input-group-append">
                                        <button class="btn btn-outline-secondary" type="button" data-bs-toggle="tooltip" data-bs-placement="top" title="Establecer el tamaño que tendra el kit del cliente">
                                            <i class="ri-question-line"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>                  
                    <div class="mb-3" id="campoDescripcion">
                        <label for="Description" class="form-label">Description <span class="text-danger">*</span></label>
                        <input type="text" class="form-control" id="txtDescripcion" name="txtDescripcion" placeholder="Write the material" oninput="convertirAMayusculas('txtDescripcion')" autocomplete="off">
                    </div><!--Fin description-->
                    <br>
                    <div class="text-end">
                        <button type="button" id="btnActionForm" class="btn btn-primary" onclick="guardarMaterial()">
                            <span id="btnText">Guardar</span>
                        </button>
                        <button type="button" id="btnCerrar" class="btn btn-light" data-bs-dismiss="modal">(esc) Close</button>
                        <!-- Base Buttons -->
                    </div>
                </form>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->
