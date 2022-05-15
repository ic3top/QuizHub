var DataTypes = require("sequelize").DataTypes;
var _answer = require("./answer");
var _answeroption = require("./answeroption");
var _blacklisteduser = require("./blacklisteduser");
var _organization = require("./organization");
var _poll = require("./poll");
var _pollfeedback = require("./pollfeedback");
var _pollresult = require("./pollresult");
var _polltype = require("./polltype");
var _question = require("./question");
var _questionfeedback = require("./questionfeedback");
var _questiontype = require("./questiontype");
var _user = require("./user");
var _whitelisteduser = require("./whitelisteduser");

function initModels(sequelize) {
  var answer = _answer(sequelize, DataTypes);
  var answeroption = _answeroption(sequelize, DataTypes);
  var blacklisteduser = _blacklisteduser(sequelize, DataTypes);
  var organization = _organization(sequelize, DataTypes);
  var poll = _poll(sequelize, DataTypes);
  var pollfeedback = _pollfeedback(sequelize, DataTypes);
  var pollresult = _pollresult(sequelize, DataTypes);
  var polltype = _polltype(sequelize, DataTypes);
  var question = _question(sequelize, DataTypes);
  var questionfeedback = _questionfeedback(sequelize, DataTypes);
  var questiontype = _questiontype(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);
  var whitelisteduser = _whitelisteduser(sequelize, DataTypes);

  answer.belongsToMany(pollfeedback, {
    as: "PollFeedback_id_pollfeedbacks",
    through: questionfeedback,
    foreignKey: "Answer_id",
    otherKey: "PollFeedback_id",
  });
  organization.belongsToMany(user, {
    as: "User_Id_users",
    through: blacklisteduser,
    foreignKey: "Organization_id",
    otherKey: "User_Id",
  });
  organization.belongsToMany(user, {
    as: "User_Id_user_whitelistedusers",
    through: whitelisteduser,
    foreignKey: "Organization_id",
    otherKey: "User_Id",
  });
  poll.belongsToMany(questiontype, {
    as: "QuestionType_id_questiontypes",
    through: question,
    foreignKey: "Poll_id",
    otherKey: "QuestionType_id",
  });
  poll.belongsToMany(user, {
    as: "User_id_users",
    through: pollresult,
    foreignKey: "Poll_id",
    otherKey: "User_id",
  });
  pollfeedback.belongsToMany(answer, {
    as: "Answer_id_answers",
    through: questionfeedback,
    foreignKey: "PollFeedback_id",
    otherKey: "Answer_id",
  });
  pollresult.belongsToMany(question, {
    as: "Question_Id_questions",
    through: answer,
    foreignKey: "PollResult_id",
    otherKey: "Question_Id",
  });
  pollresult.belongsToMany(user, {
    as: "Creator_Id_users",
    through: pollfeedback,
    foreignKey: "PollResult_Id",
    otherKey: "Creator_Id",
  });
  question.belongsToMany(pollresult, {
    as: "PollResult_id_pollresults",
    through: answer,
    foreignKey: "Question_Id",
    otherKey: "PollResult_id",
  });
  questiontype.belongsToMany(poll, {
    as: "Poll_id_poll_questions",
    through: question,
    foreignKey: "QuestionType_id",
    otherKey: "Poll_id",
  });
  user.belongsToMany(organization, {
    as: "Organization_id_organizations",
    through: blacklisteduser,
    foreignKey: "User_Id",
    otherKey: "Organization_id",
  });
  user.belongsToMany(organization, {
    as: "Organization_id_organization_whitelistedusers",
    through: whitelisteduser,
    foreignKey: "User_Id",
    otherKey: "Organization_id",
  });
  user.belongsToMany(poll, {
    as: "Poll_id_polls",
    through: pollresult,
    foreignKey: "User_id",
    otherKey: "Poll_id",
  });
  user.belongsToMany(pollresult, {
    as: "PollResult_Id_pollresults",
    through: pollfeedback,
    foreignKey: "Creator_Id",
    otherKey: "PollResult_Id",
  });
  questionfeedback.belongsTo(answer, { as: "Answer", foreignKey: "Answer_id" });
  answer.hasMany(questionfeedback, {
    as: "questionfeedbacks",
    foreignKey: "Answer_id",
  });
  blacklisteduser.belongsTo(organization, {
    as: "Organization",
    foreignKey: "Organization_id",
  });
  organization.hasMany(blacklisteduser, {
    as: "blacklistedusers",
    foreignKey: "Organization_id",
  });
  poll.belongsTo(organization, {
    as: "Organization",
    foreignKey: "Organization_id",
  });
  organization.hasMany(poll, { as: "polls", foreignKey: "Organization_id" });
  whitelisteduser.belongsTo(organization, {
    as: "Organization",
    foreignKey: "Organization_id",
  });
  organization.hasMany(whitelisteduser, {
    as: "whitelistedusers",
    foreignKey: "Organization_id",
  });
  pollresult.belongsTo(poll, { as: "Poll", foreignKey: "Poll_id" });
  poll.hasMany(pollresult, { as: "pollresults", foreignKey: "Poll_id" });
  question.belongsTo(poll, { as: "Poll", foreignKey: "Poll_id" });
  poll.hasMany(question, { as: "questions", foreignKey: "Poll_id" });
  questionfeedback.belongsTo(pollfeedback, {
    as: "PollFeedback",
    foreignKey: "PollFeedback_id",
  });
  pollfeedback.hasMany(questionfeedback, {
    as: "questionfeedbacks",
    foreignKey: "PollFeedback_id",
  });
  answer.belongsTo(pollresult, {
    as: "PollResult",
    foreignKey: "PollResult_id",
  });
  pollresult.hasMany(answer, { as: "answers", foreignKey: "PollResult_id" });
  pollfeedback.belongsTo(pollresult, {
    as: "PollResult",
    foreignKey: "PollResult_Id",
  });
  pollresult.hasMany(pollfeedback, {
    as: "pollfeedbacks",
    foreignKey: "PollResult_Id",
  });
  poll.belongsTo(polltype, { as: "PollType", foreignKey: "PollType_Id" });
  polltype.hasMany(poll, { as: "polls", foreignKey: "PollType_Id" });
  answer.belongsTo(question, { as: "Question", foreignKey: "Question_Id" });
  question.hasMany(answer, { as: "answers", foreignKey: "Question_Id" });
  answeroption.belongsTo(question, {
    as: "Question",
    foreignKey: "Question_id",
  });
  question.hasMany(answeroption, {
    as: "answeroptions",
    foreignKey: "Question_id",
  });
  question.belongsTo(questiontype, {
    as: "QuestionType",
    foreignKey: "QuestionType_id",
  });
  questiontype.hasMany(question, {
    as: "questions",
    foreignKey: "QuestionType_id",
  });
  blacklisteduser.belongsTo(user, { as: "User", foreignKey: "User_Id" });
  user.hasMany(blacklisteduser, {
    as: "blacklistedusers",
    foreignKey: "User_Id",
  });
  organization.belongsTo(user, { as: "Creator", foreignKey: "Creator_Id" });
  user.hasMany(organization, { as: "organizations", foreignKey: "Creator_Id" });
  poll.belongsTo(user, { as: "Creator", foreignKey: "Creator_Id" });
  user.hasMany(poll, { as: "polls", foreignKey: "Creator_Id" });
  pollfeedback.belongsTo(user, { as: "Creator", foreignKey: "Creator_Id" });
  user.hasMany(pollfeedback, { as: "pollfeedbacks", foreignKey: "Creator_Id" });
  pollresult.belongsTo(user, { as: "User", foreignKey: "User_id" });
  user.hasMany(pollresult, { as: "pollresults", foreignKey: "User_id" });
  whitelisteduser.belongsTo(user, { as: "User", foreignKey: "User_Id" });
  user.hasMany(whitelisteduser, {
    as: "whitelistedusers",
    foreignKey: "User_Id",
  });

  return {
    Answer: answer,
    AnswerOption: answeroption,
    BlacklistedUser: blacklisteduser,
    Organization: organization,
    Poll: poll,
    PollFeedback: pollfeedback,
    PollResult: pollresult,
    PollType: polltype,
    Question: question,
    QuestionFeedback: questionfeedback,
    QuestionType: questiontype,
    User: user,
    WhitelistedUser: whitelisteduser,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
