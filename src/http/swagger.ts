/**
 * @swagger
 * components:
 *   schemas:
 *     Poll:
 *       type: object
 *       required:
 *         - question
 *         - startDate
 *         - endDate
 *         - status
 *         - options
 *       properties:
 *         id:
 *           type: string
 *           description: ID único da enquete
 *         question:
 *           type: string
 *           description: Questão da enquete
 *         startDate:
 *           type: Date
 *           description: Data de início da enquete
 *         endDate:
 *           type: Date
 *           description: Data de término da enquete
 *         status:
 *           type: string
 *           enum: [NOT_STARTED, STARTED, IN_PROGRESS, FINISHED]
 *           description: Status da enquete
 *         options:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               text:
 *                 type: string
 *               votes:
 *                 type: number
 *
 * @swagger
 * /polls:
 *   post:
 *     summary: Cria uma nova enquete
 *     tags: [Enquetes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - question
 *               - startDate
 *               - endDate
 *               - status
 *             properties:
 *               question:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date-time
 *               endDate:
 *                 type: string
 *                 format: date-time
 *               status:
 *                 type: string
 *                 enum: [NOT_STARTED, STARTED, IN_PROGRESS, FINISHED]
 *               options:
 *                 type: array
 *                 minItems: 3
 *                 items:
 *                   type: object
 *                   properties:
 *                     text:
 *                       type: string
 *                     votes:
 *                       type: number
 *
 *     responses:
 *       201:
 *         description: Enquete criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Poll'
 *
 * @swagger
 * /all-polls:
 *   get:
 *     summary: Lista todas as enquetes
 *     tags: [Enquetes]
 *     responses:
 *       200:
 *         description: Lista de enquetes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Poll'
 *
 * @swagger
 * /polls:
 *   get:
 *     summary: Lista enquetes por status
 *     tags: [Enquetes]
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [NOT_STARTED, STARTED, IN_PROGRESS, FINISHED]
 *         required: true
 *         description: Status da enquete
 *     responses:
 *       200:
 *         description: Lista de enquetes filtradas por status
 *
 * @swagger
 * /poll/{id}:
 *   put:
 *     summary: Edita uma enquete
 *     tags: [Enquetes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da enquete
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               question:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date-time
 *               endDate:
 *                 type: string
 *                 format: date-time
 *               status:
 *                 type: string
 *                 enum: [NOT_STARTED, STARTED, IN_PROGRESS, FINISHED]
 *               options:
 *                 type: array
 *                 minItems: 3
 *                 items:
 *                   type: object
 *                   properties:
 *                     text:
 *                       type: string
 *                     votes:
 *                       type: number
 *     responses:
 *       200:
 *         description: Enquete atualizada com sucesso
 *
 *   delete:
 *     summary: Remove uma enquete
 *     tags: [Enquetes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da enquete
 *     responses:
 *       204:
 *         description: Enquete removida com sucesso
 *
 * @swagger
 * /poll/{id}/option:
 *   put:
 *     summary: Adiciona uma opção à enquete
 *     tags: [Opções]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da enquete
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - text
 *               - votes
 *             properties:
 *               text:
 *                 type: string
 *               votes:
 *                 type: number
 *     responses:
 *       204:
 *         description: Opção adicionada com sucesso
 *
 * @swagger
 * /poll/{pollId}/option/{optionId}/increase:
 *   put:
 *     summary: Aumenta o número de votos de uma opção
 *     tags: [Votos]
 *     parameters:
 *       - in: path
 *         name: pollId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da enquete
 *       - in: path
 *         name: optionId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da opção
 *     responses:
 *       204:
 *         description: Voto adicionado com sucesso
 *
 * @swagger
 * /poll/{pollId}/option/{optionId}/decrease:
 *   put:
 *     summary: Diminui o número de votos de uma opção
 *     tags: [Votos]
 *     parameters:
 *       - in: path
 *         name: pollId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da enquete
 *       - in: path
 *         name: optionId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da opção
 *     responses:
 *       204:
 *         description: Voto removido com sucesso
 */
