const mongoose = require('mongoose');
const Role = mongoose.model(
    "Role",
    new mongooose.schemma({
        name: String,
    })
);
module.export = Role;