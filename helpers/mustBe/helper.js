const {
    SUPER_ADMIN,
    PROJECT_APPROVER,
    PROJECT_ENTRY,
    PROJECT_VIEWER,
    SUPER_USER,
    ADMIN,
    PROJECT_VERIFIER,
  } = require('../constant');
  
  let ENTRIES = [
    PROJECT_ENTRY,
    PROJECT_APPROVER,
    SUPER_USER,
    ADMIN,
    PROJECT_VERIFIER,
  ];
  
  module.exports = {
    activities: {
      projectEntry: {
        is: function (identity, params, callback) {
          let user = identity.user;
          if (ENTRIES.includes(user.role)) {
            callback(null, 'true');
          } else if (user === 'err') {
            callback(null, false);
          } else {
            throw new Error(`Sorry, you have no permission for this action.`);
          }
        },
      },
      projectApprover: {
        is: function (identity, params, callback) {
          let user = identity.user;
          if (user.role === PROJECT_APPROVER) {
            callback(null, 'true');
          } else if (user === 'err') {
            callback(null, false);
          } else {
            throw new Error(`Sorry, you have no permission for this action.`);
          }
        },
      },
      projectVerifier: {
        is: function (identity, params, callback) {
          let user = identity.user;
          if (user.role === PROJECT_VERIFIER) {
            callback(null, 'true');
          } else if (user === 'err') {
            callback(null, false);
          } else {
            throw new Error(`Sorry, you have no permission for this action.`);
          }
        },
      },
      superAdmin: {
        is: function (identity, params, callback) {
          let user = identity.user;
          if (user.role === SUPER_ADMIN) {
            callback(null, 'true');
          } else if (user === 'err') {
            callback(null, false);
          } else {
            throw new Error(`Sorry, you have no permission for this action.`);
          }
        },
      },
      superUser: {
        is: function (identity, params, callback) {
          let user = identity.user;
          if (user.role === SUPER_USER) {
            callback(null, 'true');
          } else if (user === 'err') {
            callback(null, false);
          } else {
            throw new Error(`Sorry, you have no permission for this action.`);
          }
        },
      },
      projectViewer: {
        is: function (identity, params, callback) {
          let user = identity.user;
          if (
            [
              SUPER_USER,
              PROJECT_VIEWER,
              PROJECT_ENTRY,
              ADMIN,
              PROJECT_APPROVER,
              PROJECT_VERIFIER,
            ].includes(user.role)
          ) {
            callback(null, 'true');
          } else if (user === 'err') {
            callback(null, false);
          } else {
            throw new Error(`Sorry, you have no permission for this action.`);
          }
        },
      },
      admin: {
        is: function (identity, params, callback) {
          let user = identity.user;
          if ([SUPER_USER, ADMIN].includes(user.role)) {
            callback(null, 'true');
          } else if (user === 'err') {
            callback(null, false);
          } else {
            throw new Error(`Sorry, you have no permission for this action.`);
          }
        },
      },
    },
    user: async function (req, cb) {
      projectId = req.params.projectId;
      municipality_id = req.user.municipality.id;
      if (req.user) {
        cb(null, req.user);
      } else {
        cb('invalid credentials');
      }
    },
  };
  