'use strict';
module.change_code = 1;
var _ = require('lodash');
var CTM_DATA_TABLE_NAME = 'ChickenTikkaMasalaData';

var credentials = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: 'eu-west-1'
};

 var dynasty = require('dynasty')({region:'us-east-1'});

/////////////////////////////////////
/*
var localUrl = 'http://localhost:4000';
var localCredentials = {
  region: 'us-east-1',
  accessKeyId: 'fake',
  secretAccessKey: 'fake'
};
var localDynasty = require('dynasty')(localCredentials, localUrl);
var dynasty = localDynasty;
*/

/////////////////////////////////



var localDynasty = require('dynasty')(localCredentials, localUrl);
var dynasty = localDynasty;

function ChickenTikkaMasalaHelper() {}
var ChickenTikkaMasalaTable = function() {
  return dynasty.table(CTM_DATA_TABLE_NAME);
};

ChickenTikkaMasalaHelper.prototype.createChickenTikkaMasalaTable = function() {
  return dynasty.describe(CTM_DATA_TABLE_NAME)
    .catch(function(error) {
      return dynasty.create(CTM_DATA_TABLE_NAME, {
        key_schema: {
          hash: ['userId', 'string']
        }
      });
    });
};

ChickenTikkaMasalaHelper.prototype.storeChickenTikkaMasalaData = function(userId, ChickenTikkaMasalaData) {
  return ChickenTikkaMasalaTable().insert({
    userId: userId,
    data: ChickenTikkaMasalaData
  }).catch(function(error) {
    console.log(error);
  });
};

ChickenTikkaMasalaHelper.prototype.readChickenTikkaMasalaData = function(userId) {
  return ChickenTikkaMasalaTable().find(userId)
    .then(function(result) {
      return result;
    })
    .catch(function(error) {
      console.log(error);
    });
};

module.exports = ChickenTikkaMasalaHelper;
