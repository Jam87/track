<?php
class Materials extends Controllers
{

    public function __construct()
    {
        session_start(); #Inicio sesion
        /* if (empty($_SESSION['login'])) {
            header('Location: ' . base_url() . '/login');
        }*/
        parent::__construct();
    }

    ### CONTROLADOR ###
    public function Materials()
    {
        $data['page_title'] = "Materials";
        $data['page_name'] = "Materials";
        $data['description'] = "";
        $data['breadcrumb-item'] = "";
        $data['breadcrumb-activo'] = "";
        //$data['page_functions_js'] = "functions_material.js";
        $data['page_functions_js'] = array("common_functions_material.js", "functions_material.js");
        $data['view'] = "Materials";

        $data['data-sidebar-size'] = 'lg';

        #Data modal
        $data['page_title_modal'] = "Nuevo Material";
        $data['page_title_bold'] = "Dear user";
        $data['descrption_modal1'] = "Fields highlighted with";
        $data['descrption_modal2'] = "they are needed.";

        #Cargo la vista(tipos). La vista esta en View - Tipos
        $this->views->getView($this, "materials", $data);
    }


    ### OBTENER MATERIALES DE CLIENTES ESPECIALES ###
    function mostrarKit()
    {

        $arrData = $this->model->comboxKit();
              
        echo json_encode($arrData, JSON_UNESCAPED_UNICODE);
        exit();
    }

     ### OBTENER MATERIALES CLIENTES NORMALES ###
     function mostrarMaterial()
     {
 
         $arrData = $this->model->comboxMaterial(); 
         
         echo json_encode($arrData, JSON_UNESCAPED_UNICODE);
         exit();
     }

     ### OBTENER MATERIAL CLIENTE ESPECIALES ###
     function mostrarMaterialEspecial()
     {
 
         $arrData = $this->model->InputMaterialEspecial(); 
         
         echo json_encode($arrData, JSON_UNESCAPED_UNICODE);
         exit();
     }

    #################################################
    ### CONTROLADOR: MOSTRAR TODOS LOS MATERIALES ###
    #################################################

    public function getMaterial()
    {

        $arrData = $this->model->selectMaterial();

        for ($i = 0; $i < count($arrData); $i++) {

            #Estado
            // if ($arrData[$i]['status'] == 1) {
            //     $arrData[$i]['status'] = '<span class="badge rounded-pill bg-success">Active</span>';
            // } else {
            //     $arrData[$i]['status'] = '<span class="badge rounded-pill bg-danger">Inactive</span>';
            // }

            #Botones de accion
            $arrData[$i]['options'] = '<div class="text-center">
				<button type="button" class="btn btn-warning btn-sm" onClick="fntEditMaterial(' . $arrData[$i]['cod_material_empire'] . ')" title="Edit"><i class="ri-edit-2-line"></i></button>
				<button type="button" class="btn btn-danger btn-sm" onClick="fntDelMaterial(' . $arrData[$i]['cod_material_empire'] . ')" title="Eliminate"><i class="ri-delete-bin-5-line"></i></button>
				</div>';
        }


        #JSON
        echo json_encode($arrData, JSON_UNESCAPED_UNICODE);
        exit();
    }

    ###########################################
    ### CONTROLADOR: GUARDAR NUEVO MATERIAL ###
    ###########################################

    public function setMaterial()   
    {      
  
        
        if ($_POST) {
  
            #Capturo los datos dle modal
            // Obtener el valor de idMaterial y asegurarse de que sea un entero
            $intIdidMaterial = isset($_POST['idMaterial']) ? cleanInteger($_POST['idMaterial']) : 0;              
           
  
            // Obtener el valor de comboxKit y size
            $comboxKit = isset($_POST['comboxKit']) ? $_POST['comboxKit'] : '';
            $size = isset($_POST['size']) ? cleanString($_POST['size']) : '';
  
            // Obtener el valor de txtDescripcion
            $description = isset($_POST['txtDescripcion']) ? cleanString($_POST['txtDescripcion']) : '';            
  
            $request_Material = '';
  
            if ($intIdidMaterial == 0) {
               
                #Crear
                $request_Material = $this->model->insertMaterial($comboxKit, $size, $description);
              
              
                $option = 1;
            } else {
                
                #Actualizar updateMarca
                $request_Material = $this->model->updateEditMaterial($intIdidMaterial, $comboxKit, $size, $description);
  
                $option = 2;
            }
  
            #Verificar
            if ($request_Material !== 'existe') {
                if ($option == 1) {
                    $arrResponse = array('status' => true, 'msg' => 'Client saves successfully');
                } else {
                    $arrResponse = array('status' => true, 'msg' => 'Data updated correctly.');
                }
            } else {
                $arrResponse = array('status' => false, 'msg' => '¡Attention! El material already exists.');
            }
  
  
            echo json_encode($arrResponse, JSON_UNESCAPED_UNICODE);
        }
        die();
    }
    
    


    ##################################
    ### CONTROLADOR: EDIT MATERIAL ###
    ##################################

    public function EditMaterial(int $idmaterial)
    {
        #id
        $intIdMaterial = intval($idmaterial);

        if ($intIdMaterial  > 0) {
            $arrData = $this->model->editMaterial($intIdMaterial);

            if (empty($arrData)) {
                $arrResponse = array('status' => false, 'msg' => 'Datos no encontrados.');
            } else {
                $arrResponse = array('status' => true, 'data' => $arrData);
            }
            echo json_encode($arrResponse, JSON_UNESCAPED_UNICODE);
        }
        die();
    }

    ####################################
    ### CONTROLADOR: DELETE MATERIAL ###
    ####################################

    public function delMaterial()
    {

        if ($_POST) {

            $intIdMaterial = intval($_POST['idMaterial']);           

            $requestDelete = $this->model->deleteMaterial($intIdMaterial);

            if ($requestDelete) {
                $arrResponse = array('status' => true, 'msg' => 'Material has been removed');
            } else {
                $arrResponse = array('status' => false, 'msg' => 'Error deleting material.');
            }
            echo json_encode($arrResponse, JSON_UNESCAPED_UNICODE);

            die();
        }
    }
}
