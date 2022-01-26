let libro ={ "tipo": "libro",
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
}

let cd = { "tipo": "CD",
 "Artista": "Los piratas",
 "Titulo": "Recuerdos",
 "canciones": [
 {"cancion":1,
 "titulo": "Adiós mi barco",
 "longitud": "3:20"
 },
 {"cancion":2,
 "titulo": "Pajaritos",
 "longitud": "4:15"
 }
 ]
}

let dvd= { "tipo": "DVD",
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
}


/**
 * Realizar las siguientes operaciones:
1) Insertar los documentos dados en una base de datos ejercicios y colección sea «media» en una única operación.

/*
sudo service mongod start
mongosh
use ejercicios
db.media.insertMany([libro,cd, dvd])

2) Actualizar el documento que hace referencia a la película
«Matrix», de manera que se cambia su estructura a:
let nuevo={"tipo": "DVD",
 "Titulo": "Matrix",
 "estreno": 1999,
 "genero":"accion"
}
*/
db.media.updateOne(
  { "Titulo": "Matrix" },
    [
      { "$set": { "tipo": "DVD", "Titulo": "Matrix", "estreno": 1999, "genero": "accion" } },
      { "$unset": { "actores":""} }
    ]
);
db.multimedia.updateOne({ Titulo: "Matrix" }, [
  { $set: { tipo: "DVD", Titulo: "Matrix", estreno: 1999, genero: "accion" } },
  { $unset: "actores"}
]);

db.media.findOneAndReplace(
  { Titulo: "Matrix" },
  { tipo: "DVD", Titulo: "Matrix", estreno: 1999, genero: "accion" }
);
/**
 * 3) Considerar un nuevo documento para la colección media:
{“tipo”: “Libro”,
 “Titulo”: “Constantinopla”,
 “capitulos”:12,
 “leidos”:3
}
Añadir el documento a la colección media y a continuación
incrementar en 5 unidades el valor de la clave «leídos». 
 */
db.media.insertOne({
    "tipo": "Libro",
    "Titulo": "Constantinopla",
    "capitulos": 12,
    "leidos": 3
});
db.media.updateOne({ "Titulo": "Constantinopla" }, { "$inc": { "leidos": 1 } });

/**
 * 4) Actualizar el documento referido a la película «Matrix»
cambiando el valor de la clave «género» a «ciencia ficción».
*/
db.media.updateOne({ "Titulo": "Matrix" }, {"$set":{"genero":"ciencia ficción"}})
/**
5) Actualizar el documento referido al libro «Java para todos»
de manera que se elimine la clave «editorial».
*/
db.media.updateOne(
  { "titulo": "Java para todos" },
  { "$unset": { "editorial":"" } }
);
/**
6) Actualizar el documento referido al libro «Java para todos»
añadiendo el autor «María Sancho» al array de autores.
*/
db.media.updateOne(
  { "titulo": "Java para todos" },
  { "$push": { "Autor": "María Sancho" } }
);
/*
7) Actualizar el documento referido a la película «Matrix»
añadiendo al array «actores» los valores de «Antonio Banderas» y
«Brad Pitt» en una única operación.
*/
db.media.updateOne(
  { Titulo: "Matrix" },
    {
        $push: {
            "actores": { "$each": ["Antonio Banderas", "Brad Pitt"] }
        }
    }
);
db.media.find({ Titulo: "Matrix" });
/*
8) Actualizar el documento referido a la película «Matrix»
añadiendo al array «actores» los valores «Joe Pantoliano», «Brad
Pitt» y «Natalie Portman» en caso de que no se encuentren, y si
se encuentran no se hace nada.
*/
db.media.updateOne(
  { Titulo: "Matrix" },
  {
    $addToSet: {
      actores: {
        $each: ["Joe Pantoliano", "Brad Pitt", "Natalie Portman"],
      },
    },
  }
);
/*
9) Actualizar el documento referido a la película «Matrix» eliminando del array el primer y último actor.
*/
db.media.updateOne(
    { Titulo: "Matrix" },
    { $pop: { "actores": -1 }}
)
db.media.updateOne(
  { Titulo: "Matrix" },
  { $pop: { "actores": 1 } }
);
/*
10) Actualizar el documento referido a la película «Matrix»
añadiendo al array actores los valores «Joe Pantoliano» y
«Antonio Banderas».
*/
db.media.updateOne(
  { Titulo: "Matrix" },
  {
    $push: {
      actores: { $each: ["Joe Pantoliano","Antonio Banderas"] },
    },
  }
);
/*
11) Actualizar el documento referido a la película «Matrix»
eliminado todas las apariciones en el array «actores» de los valores «Joe Pantoliano» y «Antonio Banderas».
*/
db.media.updateOne(
  { Titulo: "Matrix" },
  {
    $pull: {
      actores: {
        $in: ["Joe Pantoliano", "Antonio Banderas"],
      },
    },
  }
);
/*
12) Actualizar el documento referido al disco «Recuerdos» y
añadir una nueva canción al array «canciones»:
 {“cancion”:5,
 “titulo”: “El atardecer”,
 “longitud”: “6:50”
 }
 */
db.media.updateOne(
    { Titulo: "Recuerdos" },
    {
        $push: {
            canciones:{"cancion":5,"titulo": "El atardecer","longitud": "6:50"}
        }
    }
)
/*
13) Actualizar el documento referido al disco «Recuerdos» de
manera que la canción «El atardecer» tenga asignado el número
3 en vez de 5.
*/
db.media.updateOne(
    { "canciones.cancion": 5 },
    {
        $set: {
        "canciones.$.cancion":3
        }
    }
)
/*
14) Actualizar el documento referido al disco «Recuerdos»
de manera que en una sola operación se cambia el nombre del
artista a «Los piratillas» y se muestre el documento resultante.
*/
db.media.findOneAndUpdate(
  { Titulo: "Recuerdos" },
  {
    $set: {
      Artista: "Los piratillas",
    },
    },
  {"returnNewDocument":true}
)
/*
15) Renombrar el nombre de la colección «media» a «multimedia».
 */
db.media.renameCollection("multimedia")