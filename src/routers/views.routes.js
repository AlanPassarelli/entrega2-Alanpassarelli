import { Router } from 'express';
import ProductManager from "../dao/managers/productManagerMongo.js"
const pm = new ProductManager()

const routerV = Router()


routerV.get("/",async(req,res)=>{
    const listadeproductos=await pm.getProductsView()
    res.render("home",{listadeproductos})
})

routerV.get("/realtimeproducts",(req,res)=>{
res.render("realtimeproducts")
})

routerV.get("/chat",(req,res)=>{
res.render("chat")
})

routerV.get("/login",(req,res)=>{
    res.render("login")
    })

    routerV.get("/signup",(req,res)=>{
        res.render("signup")
        })

export default routerV