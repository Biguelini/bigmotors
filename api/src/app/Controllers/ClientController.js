const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const validateCpf = (cpf) => {
    const re = /^(([0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2})|([0-9]{11}))$/
    return re.test(cpf)
}
const validateNumber = (number) => {
    const re =
        /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/
    return re.test(number)
}

class ClientController {
    async getClients(req, res) {
        try {
            await prisma.$connect()
            const allClients = await prisma.clientes.findMany()
            return res.status(200).json({ allClients })
        } catch (e) {
            return res.status(404).json(e)
        } finally {
            return async () => {
                await prisma.$disconnect()
            }
        }
    }
    async registerClient(req, res) {
        try {
            await prisma.$connect()

            const { nome, telefone, cpf } = req.body
            if (
                nome == '' ||
                telefone == '' ||
                cpf == '' ||
                validateCpf(cpf) === false ||
                validateNumber(telefone) === false
            ) {
                return res.status(406).json({ message: 'Invalid data' })
            } else {
                const cpfAlreadyUsed = await prisma.clientes.findUnique({
                    where: { cpf: cpf },
                })
                if (cpfAlreadyUsed) {
                    return res
                        .status(409)
                        .json({ message: 'CPF is already used' })
                } else {
                    const createdClient = await prisma.clientes.create({
                        data: {
                            nome,
                            telefone,
                            cpf,
                        },
                    })
                    return res
                        .status(201)
                        .json({ message: 'Client created', createdClient })
                }
            }
        } catch (e) {
            return res.status(500).json(e)
        } finally {
            return async () => {
                await prisma.$disconnect()
            }
        }
    }
    async deleteClient(req, res) {
        try {
            await prisma.$connect()

            const { cpf } = req.body
            if (cpf != '') {
                const deletedClient = await prisma.clientes.delete({
                    where: { cpf: cpf },
                })
                return res
                    .status(200)
                    .json({ message: 'Client deleted with sucess', deletedClient })
            }
        } catch (e) {
            return res.status(500).json(e)
        } finally {
            return async () => {
                await prisma.$disconnect()
            }
        }
    }
}
module.exports = new ClientController()
