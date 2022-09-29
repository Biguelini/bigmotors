const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

class EmprestimoController {
    async getEmprestimos(req, res) {
        try {
            await prisma.$connect()
            const allEmprestimos = await prisma.emprestimos.findMany()
            return res.status(200).json({ allEmprestimos })
        } catch (e) {
            return res.status(404).json(e)
        } finally {
            return async () => {
                await prisma.$disconnect()
            }
        }
    }
    async postEmprestimos(req, res) {
        try {
            await prisma.$connect()

            const { idCliente, idProduto, dataPrevDevolucao } = req.body
            const emprestimo = await prisma.emprestimos.create({
                data: {
                    idCliente,
                    idProduto,
                    dataEmprestimo: new Date(),
                    dataPrevDevolucao: new Date(dataPrevDevolucao),
                    dataDevolucao: new Date('01/01/1900'),
                },
            })
            console.log(idProduto)
            return res.status(201).json(emprestimo)

        } catch (e) {
            return res.status(500).json(e)
        } finally {
            return async () => {
                await prisma.$disconnect()
            }
        }
    }
    async devolver(req, res) {
        try {
            const { idEmprestimo } = req.body
            const devolvido = await prisma.emprestimos.update({
                where: { id: idEmprestimo },
                data: { dataDevolucao: new Date() },
            })
            return res.status(201).json(devolvido)
        } catch (e) {
            return res.status(500).json(e)
        } finally {
            return async () => {
                await prisma.$disconnect()
            }
        }
    }
}
module.exports = new EmprestimoController()
