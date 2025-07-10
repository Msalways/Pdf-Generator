"use strict";
const zod_1 = require("zod");
const AuthSchema = (0, zod_1.object)({
    email: (0, zod_1.string)().email("Invalid email format"),
    password: (0, zod_1.string)().min(6, "Password must be at least 6 characters"),
}).required({
    email: true,
    password: true,
});
module.exports = {
    AuthSchema,
};
