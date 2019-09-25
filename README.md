# api-ebconsulting
API para prueba técnica de ebconsulting. Realiza llenado automático de la base de datos con valores aleatorios y habilita API para la aplicación en Angular

#### Requisitos:
  * Servidor MySQL
  * Crear base de datos en MySQL, ejecutando el siguiente script:
  
  ```sh
START TRANSACTION;

CREATE DATABASE IF NOT EXISTS school;

USE school;

CREATE TABLE IF NOT EXISTS course (
  id_course int(11) NOT NULL AUTO_INCREMENT,
  name varchar(100) NOT NULL,
  id_teacher int(11) NOT NULL,
  PRIMARY KEY (id_course),
  KEY teacher_index (id_teacher)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS course_student (
  id_course int(11) NOT NULL,
  id_student int(11) NOT NULL,
  inscription_date timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id_course,id_student)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS student (
  id_student int(11) NOT NULL AUTO_INCREMENT,
  name varchar(50) NOT NULL,
  lastname varchar(50) NOT NULL,
  PRIMARY KEY (id_student)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS student_test (
  id_student int(11) NOT NULL,
  id_test int(11) NOT NULL,
  score int(11) NOT NULL,
  PRIMARY KEY (id_student,id_test)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS teacher (
  id_teacher int(11) NOT NULL AUTO_INCREMENT,
  name varchar(50) NOT NULL,
  lastname varchar(50) NOT NULL,
  PRIMARY KEY (id_teacher)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS test (
  id_test int(11) NOT NULL AUTO_INCREMENT,
  name varchar(100) NOT NULL,
  id_course int(11) NOT NULL,
  PRIMARY KEY (id_test),
  KEY id_course (id_course)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE course
  ADD CONSTRAINT couse_teacher FOREIGN KEY (id_teacher) REFERENCES teacher (id_teacher);

ALTER TABLE course_student
  ADD CONSTRAINT rel_course FOREIGN KEY (id_course) REFERENCES course (id_course),
  ADD CONSTRAINT rel_student FOREIGN KEY (id_student) REFERENCES student (id_student);

ALTER TABLE student_test
  ADD CONSTRAINT rel_stu FOREIGN KEY (id_student) REFERENCES student (id_student),
  ADD CONSTRAINT rel_test FOREIGN KEY (id_test) REFERENCES test (id_test);

ALTER TABLE test
  ADD CONSTRAINT rel_cou FOREIGN KEY (id_course) REFERENCES course (id_course);

COMMIT;
```
  * Tener instalado NodeJS (yo usé la versión 8.11.3)
  
#### Configuración:
  * La API trae establecido por defecto el puerto 3000 para el correcto funcionamiento del servidor. Este valor puede modificarse en el archivo **index.js** (línea 3)
  * Para configurar la conexión a la base de datos creada, puede modificarse el archivo **database.js** (líneas 4 a 7)


#### Instrucciones de uso:
1. Clonar o descargar el repositorio https://github.com/tinytini12/api-ebconsulting.git
2. En la carpeta descargada **api-ebconsulting**, ejecutar el comando **npm install**
3. Ejecutar el comando **node src/index.js**
