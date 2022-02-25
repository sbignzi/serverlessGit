const dynamoose = require("dynamoose");
const tableName = process.env.PROVIDER_TABLE;
const ProviderSchema = new dynamoose.Schema(
  {
    ID: {
      hashKey: true,
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      default: true,
      required: true,
    },
    filter: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    platform: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: "createDate",
      updatedAt: "updateDate",
    },
  }
);

const Provider = dynamoose.model(tableName, ProviderSchema);

module.exports.Provider = Provider;