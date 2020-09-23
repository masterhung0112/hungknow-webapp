# Hung Knowledge Web 

[![CI](https://github.com/masterhung0112/hungknow-webapp/workflows/CI/badge.svg)](https://github.com/masterhung0112/hungknow-webapp/actions?query=workflow%3ACI)
<!-- Comment out Circle CI because of unuse
[![CircleCI](https://circleci.com/gh/masterhung0112/hungknow-webapp.svg?style=shield)](https://circleci.com/gh/masterhung0112/hungknow-webapp) 
-->


The web that make use of next.js and full of my knowledge related to web technology.

# CI

CI was tested on the following platform:
- Github actions
- Google Cloud Build

CI would use a existing docker file submitting to GCR.

Then each time you change or add new packages in package.json, you should build a new docker image file for CI

### **Build a new docker image for CI**
- Open *build/cloudbuild-ci-gcr.yaml*
- Bump up the version of image file
- Run the following comment
```
gcloud builds submit --config=build/cloudbuild-ci-gcr.yaml
```