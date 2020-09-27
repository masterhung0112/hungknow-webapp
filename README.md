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

## Google Cloud Build

Workflows:
* Build CI cache docker image
* Build new PR request before merging to master branch

### CI Cache docker image
Trigger Condition: when package-lock.json is changed

Each time you change or add new packages in package.json, you should build a new docker image file for CI:
    * Docker file: *build/Dockerfile.ci*
    * Cloud Build script: build/cloudbuild-ci-gcr.yaml

Google Cloud Build will be triggered when the above condition is satisfied. The above cloud build script is used to build a new Docker image, then submit to GCR. The tag of docker image is the **short Git version hash**, because it's easier to keep track what git commit that cause the creation of CI docker image. Then tag *latest* name to that the newly-created CI docker image.

### Build new PR request before merging to master branch

<< add description >>

### **Build a new docker image for CI**
- Open *build/cloudbuild-ci-gcr.yaml*
- Bump up the version of image file
- Run the following comment
```
gcloud builds submit --config=build/cloudbuild-ci-gcr.yaml
```

# List of ignore files

* .gitignore
    * List of folders and files that we don't want to submit along with git commit
* .dockerignore
    * List of folders and files that we don't want to upload to docker engine as context
* .gcloudignore
    * List of folders and files that we don't want gcloud to include when uploading our files to its service as build context
* .eslintignore
    * List of folders and files that we don't want to check lint syntax
* .npmignore
    * List of folders and files that we don't want npm to keep when this package is installed as a dependency in another package