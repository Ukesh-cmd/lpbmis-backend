const sequelize = require('sequelize');
const Op = sequelize.Op;

const models = require('../models/index');

async function createProject(req, res, next) {
  try {
    const projectId = req.params;
    let user_id = req.user.id;
    const municipalityId = req.user.municipality && req.user.municipality.id;
    let projectData = req.body;
    projectData.creator_id = user_id;
    projectData.ward_id = req.user.ward_id;
    projectData.municipality_id = municipalityId;
    projectData.isSubmitted = true;
    
    let project = await models.grant_projects.update({projectData}, {where:{id: projectId}});

    res.send({
      data: { project },
      message: 'Project Created Successfully',
      success: true,
    });
  } catch (err) {
    next(err);
  }
}

async function draftProject(req, res, next) {
  try {
    let user_id = req.user.id;
    const municipalityId = req.user.municipality && req.user.municipality.id;
    let projectData = req.body;
    projectData.creator_id = user_id;
    projectData.ward_id = req.user.ward_id;
    projectData.municipality_id = municipalityId;
    
    let project = await models.grant_projects.create(projectData);

    res.send({
      data: { project },
      message: 'Project Created Successfully',
      success: true,
    });
  } catch (err) {
    next(err);
  }
}

async function getProject(req, res, next) {
  try {
    const municipalityId = req.user.municipality && req.user.municipality.id;
    const municipality_id = municipalityId;
    
    let project = await models.grant_projects.findOne({where:{municipality_id}});

    res.send({
      data: { project },
      message: 'Project fetched Successfully',
      success: true,
    });
  } catch (err) {
    next(err);
  }
}

async function getProjectByWard(req, res, next) {
  try {
    let user_id = req.user.id;
    const municipalityId = req.user.municipality && req.user.municipality.id;
    const ward_id = req.user.ward_id;
    const municipality_id = municipalityId;
    
    let project = await models.grant_projects.findOne({where:{municipality_id, ward_id}});

    res.send({
      data: { project },
      message: 'Project fetched Successfully',
      success: true,
    });
  } catch (err) {
    next(err);
  }
}

async function getProjectById(req, res, next) {
  try {
    const {projectId} = req.params;
    console.log(projectId);
    let project = await models.grant_projects.findOne({where: {id: projectId}});

    res.send({
      data: { project },
      message: 'Project Created Successfully',
      success: true,
    });
  } catch (err) {
    next(err);
  }
}

async function updateProject(req, res, next) {
  try {
    let {projectId} = req.params;
    let projectData = req.body;
    let userId = req.user.id;
    let project_detail = await models.grant_projects.findOne({where: {id: projectId}});

    if(project_detail && project_detail.isVerified ===  'true') {
      res.send({
        message: 'You cannot modify this project',
        success: true
      })
    }

    if(project_detail.creator_id !== userId){
      res.send({
        message: 'You are not authorized to modify this project',
        success: true
      })
    }
    let project = await models.grant_projects.update(projectData,{where: {id: projectId}});

    res.send({
      data: { project },
      message: 'Project Created Successfully',
      success: true,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
    createProject,
    getProjectById,
    getProjectByWard,
    getProject,
    draftProject,
    updateProject
}