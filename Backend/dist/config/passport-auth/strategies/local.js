"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const prisma_client_1 = __importDefault(require("../../prisma-client"));
const bcryptjs_1 = require("bcryptjs");
passport_1.default.use(new passport_local_1.Strategy({
    usernameField: "email",
}, (email, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prisma_client_1.default.user.findUnique({
            where: { email },
        });
        if (!user) {
            return done(null, false, { message: "No user found" });
        }
        const isMatch = yield (0, bcryptjs_1.compareSync)(password, user.password);
        if (isMatch) {
            return done(null, user); // User found and password matches
        }
        return done(null, false, { message: "Invalid Credentials" });
    }
    catch (error) {
        done(error);
    }
})));
