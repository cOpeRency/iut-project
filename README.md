# Iut-Project

Ce projet s'appuie sur le framework Hapi.js et a pour objectif de concevoir une API de gestion de films. L'API offre aux utilisateurs la possibilité d'explorer une bibliothèque de films, d'ajouter des films à leurs favoris, et de les retirer à leur convenance. Les autorisations d'accès aux différentes fonctionnalités sont clairement définies.

## Installation 

- Clonez ce projet sur votre appareil
- Exécutez la commande suivante afin de lancer un container mysql (vous pouvez changer la valeur des paramètres dans le .env du projet si vous voulez) :
  
  ```docker run --name hapi-mysql -e MYSQL_USER=samuel -e MYSQL_PASSWORD=samuel23 -e MYSQL_ROOT_PASSWORD=samuel23 -e MYSQL_DATABASE=hapi -d -p 3308:3306 mysql:8 mysqld --default-authentication-plugin=mysql_native_password```
  
- Installez les dépendences de NodeJS : ```npm install```
- Ensuite vous pouvez lancer votre serveur en local : ```npm start```
- Vous pouvez accéder au Swagger via cette url : http://localhost:3000/documentation


## Gestion des utilisateurs

-	Un utilisateur possède un nom, prénom, pseudonyme, un email et un mot de passe (qui est chiffré avant d’être sauvegardé en base de données).

-	Un utilisateur peut se connecter à l’aide de son adresse mail et son mot de passe. Un token JWT lui sera donné en réponse, lui permettant de l’utiliser afin d’avoir le droit d’utiliser la plupart des fonctionnalités de l’appli.

-	Chaque utilisateur possède un rôle : « admin » ou « user » étant utilisé en tant que scope pour gérer l’accès aux différentes fonctionnalités de l’appli.

-	Seuls les gens ayant le rôle « admin » peuvent modifier/supprimer un utilisateur, ou bien tous les afficher

-	Voici l'ensemble des routes de gestion des utilisateurs :
  
![image](https://github.com/cOpeRency/iut-project/assets/122995158/d908dea1-f111-4bee-b289-45354138efc6)


## Gestion des films

-	Un film possède un titre, un réalisateur, une description et une date de sortie.

-	Le réalisateur est une chaine de caractère pour l’instant, le top serait d’avoir une table « Réalisateurs » afin de pouvoir trier les films par réalisateur.

-	N’importe qui peut voir les films ou un film en particulier, mais pour les modifier, ajouter ou supprimer il faut être un administrateur.

- Voici l'ensemble des routes de gestion des films :

  ![image](https://github.com/cOpeRency/iut-project/assets/122995158/140a7ccf-fb4d-4b9e-8396-895984c61330)


## Gestion des favoris

-	Chaque utilisateur a accès à ses favoris, peut ajouter des films dans ses favoris, ou bien les supprimer

- Voici l'ensemble des routes de gestion des favoris :

  ![image](https://github.com/cOpeRency/iut-project/assets/122995158/b1a4edf3-9067-494d-a5cf-c06f79457c18)


Libre à vous de tester les différentes routes, en vous aidant des valeurs par défaut, je ne vous espère pas de 500 foired !
