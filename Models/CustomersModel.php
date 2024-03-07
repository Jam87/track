<?php
### CLASE: MarcaModel ###
class CustomersModel extends Mysql
{
    private $cod_customer;
    private $nombres_empire;
    private $apellidos_empire;
    private $opening_hours_empire;
    private $closing_time_empire;
    private $status;



    public function __construct()
    {
        parent::__construct();
    }


    /********************/
    /* COMBOX:CLIENTES */
    /******************/
    public function comboxClientes()
    {
        // Consulta SQL para obtener los clientes y verificar si tienen un kit asignado
        $sql = "SELECT cod_customer, nombres_empire, kit FROM clientes";
    
        // Ejecutar la consulta SQL y obtener los resultados
        $request = $this->select_all($sql);
    
        // Devolver los resultados
        return $request;
    }


   
    ##########################
    ### SHOW ALL CUSTOMERS ###
    ##########################

    public function selectCliente()
    {

        $sql = "SELECT 
        kit,
        cod_customer, 
        nombres_empire, 
        CONCAT(
            opening_hours_empire, 
            ' - ', 
            closing_time_empire
        ) AS horario_completo,
        status
        FROM clientes
        WHERE status != 0;
        ";
    

        $request = $this->select_all($sql);
        return $request;
    }



    ### MODELO: SAVE NEW CUSTOMER ###
    public function insertClient($kit, $nombres, $horaApertura, $horaCierre) {

        $this->kit                  = $kit;
        $this->nombres_empire       = $nombres;       
        $this->opening_hours_empire = $horaApertura;
        $this->closing_time_empire  = $horaCierre;
        $this->status               = 1;      
            
        

        #Consulta
        $sql = "INSERT INTO clientes(kit, nombres_empire, opening_hours_empire, closing_time_empire, status) VALUES(?,?,?,?,?)";

        $arrData = array(
            $this->kit, $this->nombres_empire, $this->opening_hours_empire, $this->closing_time_empire, $this->status 
        );
        
        
        $requestInsert = $this->insert($sql, $arrData);

        if(!$requestInsert){
            throw new Exception("Error al insertar los datos");
        }
        return $requestInsert;       
        
    }


    #############################
    ### MODELO: UPDATE CLIENT ###
    #############################

    public function updateEditClient($intIdidClient, $kit, $nombres, $horaApertura, $horaCierre)
    {
        $this->cod_customer          = $intIdidClient;  
        $this->kit                   = $kit; 
        $this->nombres_empire        = $nombres;          
        $this->opening_hours_empire  = $horaApertura;  
        $this->closing_time_empire   = $horaCierre;                


        $sql = "UPDATE clientes 
                SET kit = ?,  nombres_empire = ?, opening_hours_empire = ?, closing_time_empire = ?
                WHERE cod_customer = ? ";
        $arrData = array($this->kit, $this->nombres_empire , $this->opening_hours_empire, $this->closing_time_empire, $this->cod_customer);    
        
        $request = $this->update($sql, $arrData);
        
        return $request;
    }

  

    ### MODELO: DELETE CLIENT ### 
    public function deleteClient(int $idCliente)
    {
        
        #id
        $this->cod_customer = $idCliente;

        $sql = "UPDATE clientes SET status = ? WHERE cod_customer = $this->cod_customer";

        $arrData = array(0);
        $request = $this->update($sql, $arrData);

        if ($request) {
            $request = 'ok';
        } else {
            $request = 'error';
        }
        return $request;
    }


    ###########################
    ### MODELO: EDIT CLIENT ###
    ###########################

    public function editClient(int $idClient)
    {       

        //Buscar Tipo de Usuario
        $this->cod_customer = $idClient;
        $sql = "SELECT * FROM clientes WHERE cod_customer = $this->cod_customer";
        $request = $this->select($sql);
        return $request;
    }

 
}
