import { User, schema } from "../model/user.model.js";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";

const signUp = async (req, res) => {
    // Error from joi:
    const { error } = schema.validate(req.body);
    if (error) res.status(400).send(error.details[0].message);

    // custom error for uniqueness:
    const isNotUnique = await User.findOne({ email: req.body.email });
    if (isNotUnique) res.status(400).send("Email already exist.");

    // hashing password:
    const salt = await bcrypt.genSalt(10);
    const hash_password = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hash_password,
    });
    try {
        const saveUser = await user.save();
        res.json(saveUser);
    } catch (err) {
        res.send(handleError(err));
    }
};

const login = async (req, res) => {
    // If user not found:
    const user = await User.findOne({ email: req.body.email });
    if (!user) res.status(400).send("User not found");

    // if password doesn't match
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) res.status(400).send("Invalid password");

    // Create and assign token:
    const token = JWT.sign({ _id: user._id }, process.env.TOKEN_SECRET);

    res.header("auth-token", token).send(token);
};

const post = async (req, res) => {
    res.json({ posts: "my first post", desc: "random posts with access" });
};

export { signUp, login, post };
