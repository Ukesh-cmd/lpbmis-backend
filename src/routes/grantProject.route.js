const express = require('express');
const router = express.Router();
const mustBe = require('mustbe').routeHelpers();

const GrantProjectController = require('../controllers/grantProject.controller');

router.post('/grantProjects', mustBe.authorized('projectEntry'), GrantProjectController.createProject);
router.post('/draftProjects', mustBe.authorized('projectEntry'), GrantProjectController.draftProject);
router.get('/grantProjects', mustBe.authorized('projectApprover'), GrantProjectController.getProject);
router.get('/grantProject', mustBe.authorized('projectEntry'), GrantProjectController.getProjectByWard);
router.get('/grantProjects/:projectId', mustBe.authorized('projectEntry'), GrantProjectController.getProjectById);

router.patch('/updateProject/:projectId', mustBe.authorized('projectEntry'), GrantProjectController.updateProject)
router.patch('/verifyProject/:projectId', mustBe.authorized('projectApprover'), GrantProjectController.updateProject)
module.exports = router