const {Router} = require("express")
const router = Router()
const repo = require("../models/usersRepository")
const {check, validationResult} = require("express-validator")

//api/users/create
router.post("/create",
    [
        check("name", "Incorrect name").exists().isAlpha(),
        check(["health","attack","defense"], "incorrect value for health").isNumeric().exists(),

    ],
    async (req,

           res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(), message: "Data is empty or format is incorrect"
                })

            }
            const {name, health, attack, defense, source} = req.body

            const newUser = repo.MakeUser(name, health, attack, defense, source);

            if (newUser) {
                await repo.create(newUser);
            }
            res.status(201).json({message: "user created", user: newUser})
        } catch (e) {
            res.status(500).json({message: "smth went wrong"})
        }
    })
// api/users/users
router.get("/users", async (req, res) => {
    try{
        const Users = await repo.getAll()
        res.status(201).json({users: Users})
    }
    catch (e){
        res.status(500).json({message: "smth went wrong"})

    }

})

//api/users/users/id
router.get("/user/:id",
    [
        check("id", "Incorrect id").exists() ,
    ],
    async (req, res) => {
    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(), message: "Data is empty or format is incorrect"
            })

        }
      /*  errorsCheck(req,res)*/
        const id = req.params.id;
        const User = await repo.getById(id);
        res.status(201).json({user: User})
    } catch
        (e) {
        res.status(500).json({message: "smth went wrong"})
    }
})
//api/users/user/id
router.delete("/user/:id",
    [
        check("id", "Incorrect id").exists() ,
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(), message: "Data is empty or format is incorrect"
            })

        }
        const id = req.params.id;
        await repo.remove(id);
        res.status(201).json({message: "user deleted", user: id})
    }
    catch (e) {
        res.status(500).json({message: "smth went wrong . deletion failed"})
    }
})
router.put("/user",
    [
        check("id", "Incorrect id").exists() ,
        check("name", "Incorrect name").exists().isAlpha(),
        check(["health","attack","defense"], "incorrect value for health").isNumeric().exists(),

    ],
    async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(), message: "Data is empty or format is incorrect"
            })

        }
        const {id,name,health,attack,defense,source}=req.body;
        const user=repo.MakeUser(name,health,attack,defense,source)
        console.log(id);
        await repo.edit(id,user);
        res.status(201).json({message: "user updated", user: user})
    }
    catch (e) {
        res.status(500).json({message: "smth went wrong . update failed"})
    }
})

module.exports = router;