#!/bin/bash

# Étape de checkout du code
git checkout main
git pull origin main

# Installation des dépendances
npm install

# Exécution des tests unitaires avec Mocha et génération de la couverture de code
npx nyc mocha

# Exécution des tests d'intégration et d'interface utilisateur avec Cypress
npx cypress run 
