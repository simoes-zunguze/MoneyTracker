import {Router} from "express"
import { UserProfileController } from "../app/controllers/UserProfileController"

const userProfileController = new UserProfileController;

export default

Router()

.post(
    "/edit", (req, res) => {
        userProfileController.edit(req, res);
}

)