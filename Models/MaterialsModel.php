<?php

class MaterialsModel extends Mysql
{
    private $cod_material_empire;   
    private $material_empire;  
    private $status;
    


    public function __construct()
    {
        parent::__construct();
    }


    ##################
    ### COMBOX:KIT ###
    ##################
    public function comboxKit()
    {

        $sql = "SELECT cod_customer, kit, nombres_empire 
                FROM clientes
                WHERE kit != '' AND status != 0";

        $request = $this->select_all($sql);
        return $request;
    }  


    ####################################################
    ### COMBOX:MOSTRAR MATERIALES CLIENTES NORMALES ###
    ####################################################
    public function comboxMaterial()
    {

        // $sql = "SELECT cod_material_empire, material_empire 
        //         FROM material";
        $sql = "SELECT cod_material_empire, material_empire 
            FROM material
            WHERE material_empire IS NOT NULL";

        $request = $this->select_all($sql);
        return $request;
    }  

    #####################################################
    ### COMBOX:MOSTRAR MATERIALES CLIENTES ESPECIALES ###
    #####################################################
    public function InputMaterialEspecial()
    {

       $sql = "SELECT c.cod_customer, c.nombres_empire, c.kit, m.sizeKit, m.status 
            FROM clientes c
            LEFT JOIN material m ON m.comboxKit = c.cod_customer";

        $request = $this->select_all($sql);
        return $request;
    }


    ####################################
    ### MOSTRAR TODOS LOS MATERIALES ###
    ####################################

    public function selectMaterial()
    {
       
        // $sql = "SELECT m.cod_material_empire, m.material_empire, c.kit, m.sizeKit       
        //         FROM material m
        //         INNER JOIN clientes c
        //         ON m.comboxKit = c.cod_customer
        //         WHERE m.status != 0";

        $sql ="
        SELECT m.cod_material_empire, m.material_empire, c.kit, m.sizeKit       
        FROM material m
        LEFT JOIN clientes c ON m.comboxKit = c.cod_customer
        WHERE m.status != 0
        
        UNION
        
        SELECT NULL, NULL, c.kit, m.sizeKit       
        FROM clientes c
        RIGHT JOIN material m ON m.comboxKit = c.cod_customer
        WHERE m.status != 0 AND m.cod_material_empire IS NULL;
        ";

        $request = $this->select_all($sql);
        return $request;
    }

    #########################
    ### MOSTRAR 1 CLIENTE ###
    #########################

    public function selectUsuario(int $idcliente)
    {
        $this->intIdCliente = $idcliente;
        $sql = "SELECT c.cod_cliente, c.expediente, c.nombre_completo, c.personaContacto, c.cedula, c.numero_ruc, t.descripcion_evaluar, p.descripcion_p, e.descripcion, f.descripcion, c.excepto_impuesto, c.email, 
                       c.ejecutivo, c.fechaInspeccionNormal, c.horaInspeccionNormal, c.fechaInspeccionRapida, c.telefono, c.extension, c.movil, c.direccion, c.observaciones, c.estado
                FROM cliente c    
                INNER JOIN proposito p
                ON c.cod_Proposito = p.cod_proposito
                INNER JOIN entidad e
                ON c.cod_Solicitante = e.cod_entidad
                INNER JOIN cat_forma_pago f
                ON c.cod_Pago = f.cod_forma_pago
                INNER JOIN tvaluo  t
                ON c.cod_evaluar = t.id_tavaluo
                WHERE cod_cliente = $this->intIdCliente";

        $request = $this->select($sql);
        return $request;
    }

    #########################
    ### SAVE NEW MATERIAL ###
    #########################

    // public function insertMaterial($comboxKit, $size, $description) {

    //     $return = "";

    //     $this->comboxKit          = $comboxKit;
    //     $this->sizeKit            = $size;
    //     $this->material_empire    = $description;
    //     $this->status             = 1;         

       
    //     #Consulta
    //     $sql = "INSERT INTO material(material_empire, comboxKit, sizeKit, status) VALUES(?,?,?,?)";

    //     $arrData = array(
    //         $this->material_empire, $this->comboxKit, $this->sizeKit, $this->status   
    //     );

    //     //  dep($arrData);
    //     //  exit();

    //     $requestInsert = $this->insert($sql, $arrData);
    //     return $requestInsert;
    
    //     return $return;
    // }

    public function insertMaterial($comboxKit, $size, $description) {
      
    
        // Definir el estado del material
        $status = 1; // Supongo que el estado predeterminado es 1 (activo), puedes cambiarlo si es necesario
    
        // Consulta SQL para insertar el material
        $sql = "INSERT INTO material(material_empire, comboxKit, sizeKit, status) VALUES (?, ?, ?, ?)";
    
        // Datos a insertar
        if (!empty($comboxKit)) {
            $arrData = array(
                NULL, // Descripción del material
                $comboxKit,   // ComboxKit asignado
                $size,        // Tamaño del kit
                $status       // Estado del material
            );
        } else {
            $arrData = array(
                $description, // Descripción del material
                NULL,         // ComboxKit asignado (valor nulo)
                NULL,         // Tamaño del kit
                $status       // Estado del material
            );
        }
        
        //  dep($arrData);
        //  exit();
    
        // Ejecutar la consulta de inserción
        $requestInsert = $this->insert($sql, $arrData);
    
        return $requestInsert;
    }
    


    ##############################
    ### MODELO: EDIT MATERIAL ###
    ##############################

    public function editMaterial(int $idMaterial)
    {       

        //Buscar Tipo de Usuario
        $this->cod_material_empire= $idMaterial;
        $sql = "SELECT * FROM material WHERE cod_material_empire = $this->cod_material_empire";
        $request = $this->select($sql);
        return $request;
    }


    ###############################
    ### MODELO: UPDATE MATERIAL ###
    ###############################
     public function updateEditMaterial($intIdidMaterial, $comboxKit, $size, $description)
    {
        $this->cod_material_empire = $intIdidMaterial;  
        $this->material_empire     = $description;
        $this->comboxKit           = $comboxKit;
        $this->size                = $size;
        $this->status              = 1;   

        // $sql = "SELECT * FROM material WHERE equipment_description = '{$this->equipment_descripcion}' AND id_equipment != $this->id_Equipment";

        // $request = $this->select_all($sql);

        $sql = "UPDATE material SET material_empire = ?, comboxKit = ?, sizeKit = ?, status = ?  
                WHERE cod_material_empire = $this->cod_material_empire";

         // Datos a insertar
        if (!empty($comboxKit)) {
            $arrData = array(
                NULL,                // Descripción del material
                $this->comboxKit,   // ComboxKit asignado
                $this->size,        // Tamaño del kit
                $this->status       // Estado del material
            );
        } else {
            $arrData = array(
                $this->material_empire, // Descripción del material
                NULL,                   // ComboxKit asignado (valor nulo)
                NULL,                   // Tamaño del kit
                $this->status           // Estado del material
            );
        }       
        
       
        //  var_dump($arrData);
        //  exit();

        $request = $this->update($sql, $arrData);
        
        return $request;
    }


    ### MODELO: DELETE MATERIAL ### 
    public function deleteMaterial(int $intIdMaterial)
    {

        #id
        $this->cod_material_empire = $intIdMaterial;

        $sql = "UPDATE material SET status = ? WHERE cod_material_empire = $this->cod_material_empire";

        $arrData = array(0);
        $request = $this->update($sql, $arrData);

        if ($request) {
            $request = 'ok';
        } else {
            $request = 'error';
        }
        return $request;
    }


  


    ### MODELO: UPDATE EQUIPMENT ###
    /*public function updateEquipment(int $intIdEquipment, string $description, int $intEstado)
    {

        $this->id_Equipment          = $intIdEquipment;
        $this->equipment_descripcion = $description;
        $this->activo                = $intEstado;

        $sql = "SELECT * FROM equipment WHERE equipment_description = '{$this->equipment_descripcion}' AND id_equipment != $this->id_Equipment";

        $request = $this->select_all($sql);

        if (empty($request)) {
            $sql = "UPDATE equipment SET equipment_description = ?, activo = ? WHERE id_Equipment = $this->id_Equipment";
            $arrData = array($this->equipment_descripcion, $this->activo);

            var_dump($arrData);
            exit();

            $request = $this->update($sql, $arrData);
        } else {
            $request = "exist";
        }
        return $request;
    }*/
}
