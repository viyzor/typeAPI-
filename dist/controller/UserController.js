"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const data_source_1 = require("../data-source");
const User_1 = require("../entity/User");
class UserController {
    constructor() {
        this.userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
    }
    async all(request, response, next) {
        return this.userRepository.find();
    }
    async one(request, response, next) {
        const id = parseInt(request.params.id);
        const user = await this.userRepository.findOne({
            where: { id }
        });
        if (!user) {
            return "unregistered user";
        }
        return user;
    }
}
exports.UserController = UserController;
