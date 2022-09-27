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
            console.log(idCliente, idProduto,typeof(dataPrevDevolucao))
            const emprestimo = await prisma.emprestimos.create({
                data: {
                    idCliente: '123123',
                    idProduto: '123123',
                    dataEmprestimo: new Date(),
                    dataPrevDevolucao: new Date(dataPrevDevolucao),
                    dataDevolucao: new Date('01/01/1900'),
                },
            })
            return res.status(201).json(emprestimo)
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
