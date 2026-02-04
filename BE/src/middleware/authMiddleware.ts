import { Request, Response, NextFunction } from "express";
import admin from "../config/firebaseAdmin";
import { messaging } from "firebase-admin";

export async function verifyToken(
    req : Request,
    res : Response,
    next : NextFunction
) {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({messaging : "Unauthorized"});
    }
    const token = authHeader.split("")[1];
    
    try{
       const decodedToken = await admin.auth().verifyIdToken(token);
       (req as any).user = decodedToken
       next()
    }
    catch{
       res.status(401).json({ message : "Invalid token" });
    }
}

