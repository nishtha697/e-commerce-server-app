import * as usersDao from "../users/user-dao.js";

const findUsers = async (req, res) => {
    const users = await usersDao.findUsers()
    res.json(users);
}

const findUserById = async (req, res) => {
    const user = await usersDao.findUserById(req.params.uid)
    res.json(user);
}

const createUser = async (req, res) => {
    const newUser = req.body;
    newUser._id = (new Date()).getTime();
    const insertedUser = await usersDao.createUser(newUser);
    res.json(insertedUser);
}

const updateUser = async (req, res) => {
    const userIdToUpdate = req.params.pid;
    const updates = req.body;
    const status = await usersDao.updateUser(userIdToUpdate, updates);
    res.json(status);
}

export default (app) => {
    app.post('/api/users', createUser);
    app.get('/api/users', findUsers);
    app.get('/api/users/:uid', findUserById);
    app.put('/api/users/:uid', updateUser);
}
