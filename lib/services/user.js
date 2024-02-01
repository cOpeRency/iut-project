'use strict';

const { Service } = require('@hapipal/schmervice');
const {response} = require("request/request");
module.exports = class UserService extends Service {

    create(user){

        const { User } = this.server.models();

        return User.query().insertAndFetch(user);
    }

    async list(){

        const { User } = this.server.models();

        return User.query();
    }

    async findById(id){

        const { User } = this.server.models();

        return User.query().findById(id).throwIfNotFound();
    }

    async delete(id){

        const { User } = this.server.models();

        const user = await User.query().findById(id);

        if (!user) {
            return response({ message: 'User not found' }).code(404);
        }

        return User.query().deleteById(id);
    }
}
