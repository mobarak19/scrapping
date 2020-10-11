const scrappingApiServices = require("../services");
const validator = require("../utils/validator");
const scrapping = async (req, res) => {
  let requiredFields = ["sell_type", "asset_type", "address"];
  let validated = validator.validateParams(req, requiredFields);
  if (!validated.status) {
    return res
      .status(403)
      .json(validator.getResponse(validated.status, validated.message));
  }
  //venta
  let validateField = {
    sell_type: ["comprar", "rentar"],
    asset_type: ["departamentos", "casas", "terrenos"],
  };
  let validatedData = validator.validateData(req, validateField);
  if (!validatedData.status) {
    return res
      .status(403)
      .json(validator.getResponse(validatedData.status, validatedData.message));
  }

  return await scrappingApiServices.scrappingService(req.body, res);
};

module.exports = { scrapping };
