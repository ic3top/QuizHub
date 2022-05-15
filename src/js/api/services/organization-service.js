const { Organization } = require("../../database");
const { getUser } = require("./user-service");

const addOrganization = async (
  name,
  creatorId,
  description = null,
  address = null
) => {
  const creator = getUser(creatorId);
  console.log(creator);
  if (!creator) return null;
  try {
    const organization = await Organization.create({
      Name: name,
      "Creating date": new Date()
        .toISOString()
        .replace(/T/, " ")
        .replace(/\..+/, ""),
      Creator_Id: creatorId,
      Description: description,
      Adress: address,
    });
    return organization;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getOrganization = async (id) => {
  try {
    const organization = await Organization.findByPk(id);
    return organization;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const updateOrganization = async (
  id,
  name,
  userId,
  description = null,
  address = null
) => {
  const organization = await getOrganization(id);
  if (!organization) return null;
  if (organization.Creator_Id !== userId) throw new Error("Access denied!");
  const changed = await Organization.update(
    {
      Name: name,
      Description: description,
      Adress: address,
    },
    { where: { id } }
  );
  return changed;
};

const deleteOrganization = async (id, userId) => {
  const organization = await getOrganization(id);
  if (!organization) return null;
  if (organization.Creator_Id !== userId) throw new Error("Access denied!");
  const deleted = await Organization.destroy({
    where: { id },
  });
  return deleted;
};

module.exports = {
  addOrganization,
  getOrganization,
  updateOrganization,
  deleteOrganization,
};
