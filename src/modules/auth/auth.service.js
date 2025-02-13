import userModel from "../../../Database/models/user.model.js"
import { sendEmail } from "../../utilts/sendEmail.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


export const signup = async (req, res) => {
    let { name, email, password, confirmPassword } = req.body
    if (!name || !email || !password || !confirmPassword) {
        return res.status(400).json({ error: "All fields are required" })
    }
    if (password !== confirmPassword) {
        return res.status(400).json({ error: "Passwords do not match" })
    }
    let user = await userModel.findOne({ email })
    if (user) {
        return res.status(400).json({ error: "User already exists" })
    }
    let hashedPassword = await bcrypt.hash(password, + process.env.HASHED_PASSWORD)
    let addedUser = await userModel.insertMany({ name, email, password: hashedPassword })
    if (!addedUser) {
        return res.status(400).json({ error: "User not added" });
    }
    let token = jwt.sign({ id: addedUser._id }, process.env.JWT_SECRET, { expiresIn: "1d" })
    const html = `<a href='${process.env.BASE_URL}/auth/confirm-email/${token}' >confirm</a>`
    sendEmail(email, html)
    res.json({ message: "User added successfully", addedUser });
}
export const confirmEmail = async (req, res) => {
    let { token } = req.params
    console.log(token);
    if (!token) {
        return res.status(400).json({ error: "Invalid token" })
    }
    let decoded = jwt.verify(token, process.env.JWT_SECRET)
    let user = await userModel.findOne({ id: decoded.id })
    if (!user) {
        return res.status(400).json({ error: "User not found" })
    }
    user.confirmed = true
    await user.save()
    console.log("user confirmed");
    res.json({ message: "Email confirmed successfully" })
}
export const login = async (req, res) => {
    let { email, password } = req.body
    console.log(email, password);

    if (!email || !password) {
        return res.status(400).json({ error: "All fields are required" })
    }
    let user = await userModel.findOne({ email })
    let comparedPassword = await bcrypt.compare(password, user.password)
    if (comparedPassword) {
        let token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" })
        res.json({ message: "User logged in successfully", token })
    }
    else {
        return res.status(400).json({ error: "Invalid credentials" })
    }
}

