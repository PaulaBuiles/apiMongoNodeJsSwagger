const express = require("express");
const userSchema = require("../models/user");
const router = express.Router();

// create user

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: El nombre del usuario
 *         age:
 *           type: integer
 *           description: La edad del usuario
 *         email:
 *           type: string
 *           description: El email del usuario
 *       required:
 *         - name
 *         - age
 *         - email
 *       example:
 *         name: Paula Builes
 *         age: 20
 *         email: pbuiles@gmail.com
 */
/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Crea un nuevo usuario
 *     description: Endpoint para crear un nuevo usuario.
 *     tags: [User]    
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Usuario creado exitosamente
 *       400:
 *         description: Solicitud incorrecta, datos del usuario incompletos
 *       500:
 *         description: Error del servidor al intentar crear el usuario
 */
router.post("/users", (req, res) => {
    const user = userSchema(req.body);
    user
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// get all users
/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Devuelve todos los usuarios
 *     description: Endpoint para devolver todos los usuarios registrados en el sistema.
 *     tags: [User]    
 *     responses:
 *       200:
 *         description: Todos los usuarios
 *         content:
 *            application/json:
 *               schema:
 *                  type: array
 *                  items:
 *                     $ref: '#/components/schemas/User'
 *       400:
 *         description: Solicitud incorrecta, datos del usuario incompletos
 *       500:
 *         description: Error del servidor al intentar crear el usuario
 */
router.get("/users", (req, res) => {
    userSchema
      .find()
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
});
  
// get a specific user
/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Devuelve un usuario especifico
 *     description: Endpoint para devolver un usuario especifico por el id registrado en el sistema.
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: El id del usuario
 *     responses:
 *       200:
 *         description: Todos los usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Solicitud incorrecta, no se encontro un usuario
 *       500:
 *         description: Error del servidor al intentar crear el usuario
 */

router.get("/users/:id", (req, res) => {
    const { id } = req.params;
    userSchema
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// delete a user
/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Elimina un usuario especifico
 *     description: Endpoint para eliminar un usuario especifico por el id registrado en el sistema.
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: El id del usuario
 *     responses:
 *       200:
 *         description: El usuario se eliminó correctamente
 *       404:
 *         description: Solicitud incorrecta, no se encontro un usuario
 *       500:
 *         description: Error del servidor al intentar crear el usuario
 */
router.delete("/users/:id", (req, res) => {
    const { id } = req.params;
    userSchema
        .deleteOne({ _id: id })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// update a user
/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Actualiza/edita un usuario especifico
 *     description: Endpoint para actualizar un usuario especifico por el id registrado en el sistema.
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: El id del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: El usuario se actualizó correctamente
 *       404:
 *         description: Solicitud incorrecta, no se encontro un usuario
 *       500:
 *         description: Error del servidor al intentar crear el usuario
 */
router.put("/users/:id", (req, res) => {
    const { id } = req.params;
    const { name, age, email } = req.body;
    userSchema
        .updateOne({ _id: id }, { $set: { name, age, email } })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

module.exports = router;