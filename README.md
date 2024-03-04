# Iut-Project

Ce projet s'appuie sur le framework Hapi.js et a pour objectif de concevoir une API de gestion de films. L'API offre aux utilisateurs la possibilité d'explorer une bibliothèque de films, d'ajouter des films à leurs favoris, et de les retirer à leur convenance. Les autorisations d'accès aux différentes fonctionnalités sont clairement définies.

## Installation 

- Clonez ce projet sur votre appareil
- Exécutez la commande suivante afin de lancer un container mysql (vous pouvez changer la valeur des paramètres dans le .env du projet si vous voulez) :
  
  ```docker run --name hapi-mysql -e MYSQL_USER=samuel -e MYSQL_PASSWORD=samuel23 -e MYSQL_ROOT_PASSWORD=samuel23 -e MYSQL_DATABASE=hapi -d -p 3308:3306 mysql:8 mysqld --default-authentication-plugin=mysql_native_password```
  
- Installez les dépendences de NodeJS : 


## Gestion des utilisateurs

-	Un utilisateur possède un nom, prénom, pseudonyme, un email et un mot de passe (qui est chiffré avant d’être sauvegardé en base de données).

-	Un utilisateur peut se connecter à l’aide de son adresse mail et son mot de passe. Un token JWT lui sera donné en réponse, lui permettant de l’utiliser afin d’avoir le droit d’utiliser la plupart des fonctionnalités de l’appli.

-	Chaque utilisateur possède un rôle : « admin » ou « user » étant utilisé en tant que scope pour gérer l’accès aux différentes fonctionnalités de l’appli.

-	Seuls les gens ayant le rôle « admin » peuvent modifier/supprimer un utilisateur, ou bien tous les afficher

