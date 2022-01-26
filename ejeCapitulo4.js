/**
 * Ejercicios propuestos
Considerar una colección con documentos de MongoDB que
representan información multimedia de la forma:
*/
let libro={ "tipo": "libro",
 "titulo": "Java para todos",
 "ISBN": "987-1-2344-5334-8",
 "editorial": "Anaya",
 "Autor": ["Pepe Caballero", "Isabel Sanz", "Timoteo Marino"],
 "capítulos": [
 {"capitulo":1,
 "titulo": "Primeros pasos en Java",
 "longitud": 20
 },
 {"capitulo":2,
 "titulo": "Primeros pasos en Java",
 "longitud": 25
 }
 ]
};
let cd = {
    "tipo": "CD",
    "Artista": "Los piratas",
    "Titulo": "Recuerdos",
    "canciones": [
        {
            "cancion": 1,
            "titulo": "Adiós mi barco",
            "longitud": "3:20"
        },
        {
            "cancion": 2,
            "titulo": "Pajaritos",
            "longitud": "4:15"
        }
    ]
};
let dvd = {
    "tipo": "DVD",
    "Titulo": "Matrix",
    "estreno": 1999,
    "actores": [
        "Keanu Reeves",
        "Carry-Anne Moss",
        "Laurence Fishburne",
        "Hugo Weaving",
        "Gloria Foster",
        "Joe Pantoliano"
    ]
};
/*
Realizar las siguientes operaciones:
1) Insertar los documentos dados en una base de datos 
llamada «media» en una única operación.
*/
db.media.insertMany([libro, cd, dvd]);
/*
2) Del documento que hace referencia a la película «Matrix»
recuperar el array de actores.
*/
db.media.find({"Titulo":"Matrix"},{actores:1,_id:0})
/*
3) Del documento que hace referencia a la película «Matrix» 
recuperar todos los campos de información excepto el array de actores.
*/
db.media.find({ Titulo: "Matrix" }, { actores: 0});
/*
4) Del documento que hace referencia a la película «Matrix»
recuperar un único documento en el que aparezcan solo los campos tipo y título.
*/
db.media.find({ Titulo: "Matrix" }, { tipo: 1, Titulo:1, _id:0 });
/*
5) Recuperar todos los documentos que sean de tipo «libro» y
editorial «Anaya» mostrando solo el array «capítulos».
*/
db.media.find({"tipo":"libro","editorial":"Anaya"},{"capitulos":1})
/*
6) Recuperar todos los documentos referidos a canciones que
tengan una canción que se denomine «Pajaritos».
*/
db.media.find({"canciones.titulo":"Pajaritos"})
/*
7) Recuperar todos los documentos en los que «Timoteo
Marino» es autor de un libro.
*/
db.media.find({ "Autor": "Timoteo Marino" });
/*
8) Recuperar todos los documentos de la colección media
ordenados de manera decreciente por el campo «tipo».
*/
db.media.find().sort({"tipo":-1})
/*
9) Recuperar todos los documentos de la colección media
ordenados de manera decreciente por el campo «tipo». Mostrar
solo dos resultados.
*/
db.media.find().sort({ tipo: -1 }).limit(2)
/*
10) Recuperar todos los documentos de la colección «media»
ordenados de manera decreciente por el campo «tipo». Saltarse
el primer resultado.
*/
db.media.find().sort({ tipo: -1 }).skip(1);
/*
11) Recuperar todos los documentos de la colección «media»
ordenados de manera decreciente por el campo «tipo». Recuperar
solo dos resultados y saltarse los dos primeros resultados.
*/
db.media.find().sort({ tipo: -1 }).limit(2).skip(2)
/*
12) Añadir los siguientes documentos a la colección media:

let doc1={"tipo": "DVD", 
    "Titulo": "Blade Runner",
    "estreno":1982
}
let doc2={"tipo": "DVD",
  "Titulo":"Toy Story 3",
  "estreno": 2010
 }
 */
db.media.insertMany([doc1,doc2])
/*
13) Realizar las siguientes consultas:
– Recuperar los documentos sobre películas cuya fecha
de estreno sea mayor que 2000. En los resultados no
mostrar el array de actores.
*/
db.media.find({"estreno":{$gt:2000}},{"actores":0})
/*
– Recuperar los documentos sobre películas cuya fecha de
estreno sea mayor o igual que 1999. En los resultados
no mostrar el array de actores.
*/
db.media.find({ estreno: { $gte: 1999 } }, { actores: 0 });
/*
– Recuperar los documentos sobre películas cuya fecha
de estreno sea menor que 1999. En los resultados no
mostrar el array de actores.
*/
db.media.find({ estreno: { $lt: 1999 } }, { actores: 0 });
/*
– Recuperar los documentos sobre películas cuya fecha de
estreno sea menor o igual que 1999. En los resultados
no mostrar el array de actores.
*/
db.media.find({ estreno: { $lte: 1999 } }, { actores: 0 });
/*
– Recuperar los documentos sobre películas cuya fecha de
estreno sea mayor o igual que 1999 y menor que 2010.
En los resultados no mostrar el array de actores
*/
db.media.find({ estreno: { $gte: 1999, $lt:2010}}, { actores: 0 });
/*
14) Recuperar todos los documentos sobre libros de manera
que el autor no sea «Camilo José Cela».
*/
db.media.find({"tipo": "libro","Autor":{$ne:"Camilo José Cela"}})
/*
15) Recuperar todos los documentos sobre películas que se
hayan estrenado en alguno de los años 1999, 2005 y 2006. En los
resultados no mostrar el array de actores.
*/
db.media.find({ tipo: "DVD", "estreno":{$in:[1999,2005,2006]} },{"actores":0});
/*
16) Recuperar todos los documentos sobre películas que no
se hayan estrenado en los años 1999, 2005 y 2006. En los resultados no mostrar el array de actores.
*/
db.media.find(
    { tipo: "DVD", estreno: { $not: { $in: [1999, 2005, 2006] } }},
  { actores: 0 }
);
/*
17) Recuperar todos los documentos sobre películas que se
hayan estrenado en los años 1999 y 2005 exactamente. En los
resultados no mostrar el array de actores.
*/
db.media.find(
  { tipo: "DVD", estreno: { $in: [1999, 2005] } },
  { actores: 0 }
);
/*
18) Recuperar todos los documentos sobre libros que hayan
sido escritos por Pepe Caballero e Isabel Sanz y que además entre
los títulos de sus capítulos haya alguno que se denomine «Bucles».
*/
db.media.find({
  "tipo": "libro",
  "Autor": "Pepe Caballero",
  "Autor": "Isabel Sanz",
  "capítulos.titulo": "Bucles",
});
/*
19) Recuperar todos los documentos que tomen en la clave
«Título» el valor «Recuerdos» o que tome en la clave «estreno» el
valor «1999», y que tome en la clave tipo «DVD».
*/

/*
20) Considerar el documento acerca de la película «Matrix» y
recuperar del array de actores:
– Los 3 primeros actores.
– Los últimos 3 actores.
– 3 actores saltándose los 2 dos primeros actores.
– 4 actores saltándose los 5 últimos actores.
*/
/*
21) Recuperar los documentos referidos a películas tales que en
su campo «estreno» tenga un valor par. No mostrar el array actores.
*/
/*
22) Recuperar los documentos referidos a películas tales que
en su campo «estreno» tenga un valor impar. No mostrar el array
actores.
*/
/*
23) Recuperar todos los documentos referidos a canciones
tales que el número de canciones es exactamente 2.
*/
/*
24) Recuperar todos los documentos tales que tengan un
array de actores.
*/
/*
25) Recuperar todos los documentos tales que no tengan un
array de actores.
*/
/*
26) Considerar la siguiente tabla que asigna a cada tipo de
datos BSON con un valor numérico:
Recuperar todos los documentos que tienen un campo
denominado «canciones» cuyo valor sea del tipo un documento
embebido.
*/
/*
27) Insertar el siguiente documento:
{"tipo": "CD",
 "Artista": "Los piratas",
 "Titulo": "Recuerdos",
 "canciones": [
 {"cancion":1,
 "titulo": "Adiós mi barco",
 "longitud": "3:20"},
 {"cancion":3,
 "titulo": "Pajaritos",
 "longitud": "4:15"}]}
 */
/*
28) Recuperar todos los documentos sobre discos en los que
se dan exactamente las siguientes condiciones: existe una canción
denominada «Pajaritos» y el número de canción es el 2.
*/
/*
29) Recuperar todos los documentos sobre discos en los que
no se dan exactamente las siguientes condiciones: existe una
canción denominada «Pajaritos» y el número de canción es el 2.
*/
/*
30) Encontrar los DVD que sean más antiguos que 1995.
*/
/*
31) Encontrar todos los documentos en los que en el campo
«Artista» aparece la palabra «piratas».
*/
/*
32) Encontrar todos los documentos en los que en el campo
«Artista» aparece la palabra «piratas» y además tienen un campo
«Titulo».
 */