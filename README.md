<h1 align="center">
  <br>
  Prédiction et Classification de Crimes de New York City

</h1>

<div align="center">
  <h4>
    <a href="#dataset">Dataset</a> |
    <a href="#notebooks">Notebooks</a> |
    <a href="#technologies">Technologies</a> |
    <a href="#visualisation">Visualisation</a> |
    <a href="#paper">Paper</a>
  </h4>
</div>

<br>

## Dataset

Ce Dataset comprend tous les crimes, délits et infractions valides signalés au département de police de New York (NYPD) de 2006 à la fin de l'année dernière (2019). Pour plus de détails, veuillez consulter [NYPD Complaint Data Historic](https://data.cityofnewyork.us/Public-Safety/NYPD-Complaint-Data-Historic/qgea-i56i).

## Notebooks

Les Notebooks sont disponible sur Kaggle

- [Notebook d'exploration](https://www.kaggle.com/yxuko16/nyd-complaint-data-exploration)
- [Notebook de Modèle](https://www.kaggle.com/omaymaabid/nyc-complaint-predicition)

## Technologies

### Frontend, pour la visualisation

- [React](https://reactjs.org/)
- [ArcGIS](https://developers.arcgis.com/javascript/)

#### Installation

- Installez [NodeJs](https://nodejs.org/en/)
- Installer les dépendances

```sh
npm install
```

- Vérifiez adresse de l'API backend dans src/constants/index.jsx
- Lancer App.

```sh
npm run start
```

### Backend, pour la prédiction

- [Flask](https://flask.palletsprojects.com/en/1.1.x/)

- Installez [Python](https://www.python.org/)
- Installer les dépendances

```sh
pip install -r requirements.txt
```

- Lancer App.

```sh
python app.py
```

## Visualisation

La Visualisation est disponible [ici](https://ter-nyc.yxuko.vercel.app/).

## Paper

Le Papier de recherche est disponible sous format pdf dans ce répertoire.
