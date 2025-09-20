import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(cors());

    //Cria um novo usuário
app.post('/usuarios', async (req, res) => {
    await prisma.user.create({
    data: {
        email: req.body.email,
        name: req.body.name,
        age: req.body.age
    },
    });
    res.status(201).json(req.body)
    });

    //Lista todos os usuários
    app.get('/usuarios', async (req, res) => {
        let users = []
        if (req.query){
            users= await prisma.user.findMany ({
                where: {
                    name: req.query.name,
                    email: req.query.email,
                    age:req.query.age
                }
            })
        }else {
            users= await prisma.user.findMany()
        }
    
        res.status(200).json(users);
    });

    // Edita um usuário
    app.put('/usuarios/:id', async (req, res) => {
    
    await prisma.user.update({
    where: { 
        id:req.params.id,
        },
        data: {
        email: req.body.email,
            name: req.body.name,
            age: req.body.age
        },
        });
        res.status(201).json(req.body)
    });

    //Deleta um usuário
    app.delete('/usuarios/:id', async (req, res) => {
    await prisma.user.delete({
        where: {
            id: req.params.id,
        }
        })

        res.status(200).json({message: "Usuário deletado com sucesso!"})
    });
    app.listen(3000);


/* Objetivo: Criar uma API de Usuários
- Criar um novo usuário
- Listar todos os usuários
- Editar um usuário
- Deletar um usuário*/

/*
Cria um novo usuario
app.post('/usuarios');
Edita um usuário
app.put ('/usuarios');
Deleta um usuário
app.delete ('/usuarios');
As rotas precisam de duas coisas
1- o tipo de rota ou método HTTP;
2 - o endereço da rota;
db
lucasjsanti
Sheriffe*1728*  
*/
