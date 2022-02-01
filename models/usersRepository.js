const User = require("../models/User")
const db = require("mongoose")
const {json} = require("express");
const {model} = require("mongoose");

class usersRepository {
    static async getAll() {
        try {
            return await User.find();
        }
        catch (e) {
            console.log (JSON.stringify({loc: "userRepository : getAll", err: e.message}));
        }
    }

    static async getById(_id) {

        try{
            return await User.findById(_id);
        }
        catch (e){
            console.log (JSON.stringify({loc: "userRepository : getAll", err: e.message}));

        }
    }

    static async  create(newUser) {
        try {
            if (newUser) {
                    const user = new User(newUser);
                    await user.save();
            } else {
                throw      "smth wentworng";
            }
        } catch (e) {
            console.log (JSON.stringify({loc: "userRepository : add", err: e.message}));
        }
    }

    static  async  edit(id,user) {
        try {
            if (user&&id) {
              await  User.findByIdAndUpdate(id, user)
            } else {
                throw   "user not found";
            }
        } catch (e) {
            console.log( JSON.stringify({loc: "userRepository : edit", err: e.message}));
        }
    }

    static  async  remove(id) {
        try {
            if (id) {
              await  User.findByIdAndDelete(id)
            } else {
                throw "user not found";
            }
        } catch (e) {
            console.log( JSON.stringify({loc: "userRepository : remove", err: e.message}));
        }
    }

    static validateUser(user) {
        return User.name.length > 0 && !isNaN(user.attack) && !isNaN(user.defense) && !isNaN(user.health);
    }

    static MakeUser(name, health, attack, defense, source) {
        return {
            name: name,
            health: health,
            attack: attack,
            defense: defense,
            source: source
        };
    }
}

module.exports = usersRepository