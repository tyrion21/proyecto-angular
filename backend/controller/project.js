/* Controlador realizar funciones CRUD */
"use strict";

var Project = require("../models/projects");
var fs = require("fs");
var path = require("path");

var controller = {
  home: function(req, res) {
    return res.status(200).send({
      message: "Soy la home"
    });
  },
  test: function(req, res) {
    return res.status(200).send({
      message: "Soy el metodo o test del controlador de project"
    });
  },

  saveProject: function(req, res) {
    var project = new Project();

    var params = req.body;
    project.name = params.name;
    project.description = params.description;
    project.category = params.category;
    project.year = params.year;
    project.langs = params.langs;
    project.image = null;

    project.save((err, projectStored) => {
      if (err)
        return res
          .status(500)
          .send({ message: "Error al guardar el documento" });

      if (!projectStored)
        return res
          .status(404)
          .send({ message: "No se ha podido guardar el proyecto" });

      return res.status(200).send({ project: projectStored });
    });
  },
  //Mostrar Objeto
  getProject: function(req, res) {
    var projectId = req.params.id;
    Project.findById(projectId, (err, project) => {
      if (err)
        return res.status(500).send({ message: "Error al devolver los datos" });

      if (!project)
        return res.status(404).send({ message: "El Proyecto no existe" });

      return res.status(200).send({
        project
      });
    });
  },

  //Mostrar Objetos
  getProjects: function(req, res) {
    Project.find({})
      .sort("-year")
      .exec((err, projects) => {
        if (err)
          return res
            .status(500)
            .send({ message: "Error al devolver los datos." });

        if (!projects)
          return res
            .status(404)
            .send({ messagge: "No hay proyectos que mostrar" });

        return res.status(200).send({ projects });
      });
  },

  //Actualizar Objetos
  updateProject: function(req, res) {
    var projectId = req.params.id;
    var update = req.body;

    Project.findByIdAndUpdate(
      projectId,
      update,
      { new: true },
      (err, projectUpdated) => {
        if (err)
          return res.status(500).send({ message: "Error al actualizar" });

        if (!projectUpdated)
          return res
            .status(404)
            .send({ messagge: "No existe el proyecto para actualizar" });

        return res.status(200).send({
          project: projectUpdated
        });
      }
    );
  },

  deleteProject: function(req, res) {
    var projectId = req.params.id;

    Project.findByIdAndRemove(projectId, (err, projectRemoved) => {
      if (err)
        return res
          .status(500)
          .send({ message: "No se ha podido borrar el proyecto" });

      if (!projectRemoved)
        return res
          .status(404)
          .send({ messagge: "No se ´puede eliminar ese proyecto" });

      return res.status(200).send({
        project: projectRemoved
      });
    });
  },

  uploadImage: function(req, res) {
    var projectId = req.params.id;
    var fileName = "Imagen no subida";

    if (req.files) {
      var filePath = req.files.image.path;
      var fileSplit = filePath.split("\\");
      var fileName = fileSplit[1];
      var expSplit = fileName.split(".");
      var fileExt = expSplit[1];

      if (
        fileExt == "png" ||
        fileExt == "jpeg" ||
        fileExt == "jpg" ||
        fileExt == "gif"
      ) {
        Project.findByIdAndUpdate(
          projectId,
          { image: fileName },
          { new: true },
          (err, projectUpdated) => {
            if (err)
              return res
                .status(500)
                .send({ message: "La imagen no se ha subido" });

            if (!projectUpdated)
              return res.status(404).send({
                messagge: "El proyecto no existe y no se ha asignado la imagen"
              });

            return res.status(200).send({
              project: projectUpdated
            });
          }
        );
        return res.status(200).send({
          files: fileName
        });
      } else {
        fs.unlink(filePath, err => {
          return res.status(200).send({
            message: "la extension no es valida"
          });
        });
      }
    } else {
      return res.status(200).send({
        message: fileName
      });
    }
  },
  getImageFile: function(req, res) {
    var file = req.params.file;
    var path_file = "./uploads/" + file;

    fs.exists(path, exists => {
      if (exists) {
        return res.sendFile(path.resolve(path_file));
      } else {
        return res.status(200).send({
          message: "No existe la imagen..."
        });
      }
    });
  }
};

module.exports = controller;
