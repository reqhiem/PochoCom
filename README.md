# Proyecto Pocho's Com.

## Propósito del proyecto
El presente proyecto busca desarrollar un sitio web para "La semana de computación", cuyo propósito es la visualización e incripción en actividades académicas referidas a las ramas de Ciencia de la computación independientemente de la universidad o situación academica de los visitantes. 

## Funciones del proyecto

1. El sistema cuenta con login para diferenciar de usuario y administrador
2. El administrador es capaz de crear contribuidores y actividades.
3. El administrador es capaz de editar contribuidores y actividades.
4. El dministrador es capaz de visuazlizar contribuidores y actividades.
5. El administrador es capaz de eliminar contribuidores y actividades.
6. El visitante puede escoger que edición visualizar.
7. El visitante puede visualiar las actividaddes y contribuidores del evento
8. El visitante para poder visualizar los enlaces de las actividades debe inscribirse previamente.


## Descripción

El presente proyecto corresponde al proyecto final del curso de Ingeniería de Software 1 del programa de Ciencia de la Computación, para el cual se aplicó todos los conocimientos adquiridos para el desarrollo de un sistema con las prácticas y estándares propios del área Ingeniería de Software.

## Objetivo


### Objetivo general

1. El objetivo del siguiente proyecto es desarrollar un Sistema de Publicación de Proceedings de Eventos respetando los principios adquiridos a lo largo del curso.

### Objetivos especificos

1. En la fase de licitación, recopilar los aspectos funcionales y no funcionales del sistema mediante una exploración del estado del arte y sistemas afines.

2. En la fase de espacificación de requisitos de software (ERS), se construye el Documento de ERS de acuerdo al estándar IEE-830,  para los requisitos funcionales (RF) y no funcionales (RNF).

3. En la fase de diseño se determinan los modelos de datos (UML diagrama de clases), arquitecturales (IEEE-) y  procedimentales, ello en el marco de las buenas prácticas.

## Desarrollo

El sistema web en cuestión obedece al siguiente diagrama de Casos de Uso.

![Diagrama de casos de uso](./public/images/UML_DC.png)

### Diseño de modelos de datos
![UML modelo de clases](./public/images/UML_MD.png)

### Diseño arquitectural

![Visión general](./public/images/AS_vision_general.png)


![Diseño significativo](./public/images/AS_significativo.png)

## Práctica de código legible aplicadas

1. Los nombres de las variable tienen un significativo y son pronunciables
    ``` {js}
    const currentDate = moment().format("YYYY/MM/DD");
    ```
2. Se Utilizo el mismo vocabulario para el mismo tipo de variable
    ``` {js}
    getUserInfo();
    
    getClientData();

    getCustomerRecord();
    ```
3. Se procuro usar 2 o menos argumentos en las funciones
    ```{js}
    const eliminarEdicion = (req,res) => {
        let id = req.params.id
        Edicion.destroy({
            where: {
                id: id
            }
        }).then(edicion => {
            res.redirect('/admin/')
        })
    }
    ```
4. Cada función realiza solo realiza una tarea
    ```{js}
    function emailActiveClients(clients) {
        clients.filter(isActiveClient).forEach(email);
    }

    function isActiveClient(client) {
        const clientRecord = database.lookup(client);
        return clientRecord.isActive();
    }

    ```
5. Los nombres de las funciones realizan lo mencionado
    ``` {js}
    const loginPageController = (req,res) =>{
        res.render('visitor/login', {page:'login'})
    }
    ```
6. Se removio el  "dead code"
    ``` {js}
    ```
7. Se comento el código que tenia lógica de negocio
``` {js}
    // Pagina de logueo
    const loginPageController = (req,res) =>{
        res.render('visitor/login', {page:'login'})
    }
```
Basado en el libro
> Clean Code: A Handbook of Agile Software Craftsmanship 
> --<cite> Robert C. Martin's.

## Estilos de programación:

1. **Kick Forward (Function composition)**:
    Variation of the Pipeline style, with the following additional constraints:
    
    Each function takes an additional parameter, usually the last, which is
    another function.
    
    Ejemplo: para el ruteo, el módulo express toma como parámetro funciones Middleware y Funciones de controlador que manejan el flujo de los Objetos Request anh Response de HTTP. 
2. **Things (Objects and Object Interaction)**:
    The larger problem is decomposed into things that make sense for the
    problem domain.
    
   Ejemplo: Para la manipulación de los datos se consideró un enfoque orientado a Objetos.
   
3. **Constructivist (Adversity)**:
    Every single function checks the sanity of its arguments and either
    returns something sensible when the arguments are unreasonable or
    assigns them reasonable values.
        
    Ejemplo: para el manejo de errores de tipo conexión y creación de datos se uso bloques `Try{}Catch(error){}`.
    
## Conceptos DDD

1. **Repositories**. Para la manipulación de datos, estos presentan un ciclo de vida que se gestiona mediante la herramienta **ORM sequelize**.
2. **Entities**. El lenguaje de programación orientada a objetos nos permite manipular los datos a un nivel de abstración de Entidades.
3. **Modules**. El sistema presenta modularización de sus funcionalidades para poder gestionar los recursos de forma eficiente.

De acuerdo al libro Domain-Driven Design de Abel Avram.

## Principios SOLID


1. **Single Responsibility Principle**. Una clase debe tener una única responsabilidad.

    **Ejemplo:** Las clases que abstraen los datos representan en esencia a una entidad.

    ```
    class Edicion extends Model {
        /**
        * Helper method for defining associations.
        * This method is not a part of Sequelize lifecycle.
        * The `models/index` file will call this method automatically.
        */
        static associate(models) {
        Edicion.belongsToMany(models.Usuario,{
            through: models.Registro
        })

        //Edicion-actividad
        Edicion.hasMany(models.Actividad)
        }
    };
    Edicion.init({
        anio: DataTypes.STRING,
        nombre: DataTypes.STRING,
        fechaInicio: DataTypes.DATE,
        fechaFin: DataTypes.DATE
    }, {
        sequelize,
        modelName: 'Edicion',
        timestamps: false,
    });
    
    ```



2. **Liskov Substitution Principle**. Una clase debe poder desempeñar las mismas funciones que la clase padre de la que heredó.

    **Ejemplo:** La clase `Edición` es una clase que representa a la entidad Edición, este se extiende de una clase padre llamada `Model`, por lo que la clase `Edicion` desempeña todas las funcionalidades de la clase padre.

3. **Dependency Inversion Principle**. Depende de las abstracciones y no las clases específicas.

    **Ejemplo:** En la manipulación de código, la responsabilidad de las clases de los modelos de datos depende en esencia de la abstracción `Models` de a libreria ORM.