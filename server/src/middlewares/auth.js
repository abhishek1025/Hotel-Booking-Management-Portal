import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config/config.js";
import { HttpStatus } from "../constant/constants.js";
import { throwError, asyncErrorHandler } from "../helpers/index.js";
import { ExpiredTokenStore } from "../schemaModels/model.js";

export let authenticateToken = asyncErrorHandler(async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        throwError({
            message: "Authorization at headers is required",
            statusCode: HttpStatus.UNAUTHORIZED,
        });
    }

    const authorizationParts = authorization.split(" ");
    const token = authorizationParts[1];

    if (!token) {
        throwError({
            message: "Not authorized to access this route",
            statusCode: HttpStatus.UNAUTHORIZED,
        });
    }

    // check if token starts with Bearear and check if token exist
    if (authorizationParts[0] !== "Bearer" && token) {
        throwError({
            message: "Invalid authorization headers received",
            statusCode: HttpStatus.UNAUTHORIZED,
        });
    }

    const isTokenStoredInDB = await ExpiredTokenStore.findOne({ token });

    if (isTokenStoredInDB) {
        throwError({
            message: "Invalid auth token",
            statusCode: HttpStatus.UNAUTHORIZED,
        });
    }

    const userInfo = jwt.verify(token, SECRET_KEY);
    req.user = userInfo;
    req.authToken = token;
    next();
});
