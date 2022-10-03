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
            console.log(parseInt(idProduto))
            const estaEmprestado = await prisma.produtos.findUnique({
                where: { id: parseInt(idProduto) },
            })
            if (!estaEmprestado) {
                const produto = await prisma.produtos.update({
                    where: { id: parseInt(idProduto) },
                    data: { disponivel: false },
                })
                console.log(produto)
                const emprestimo = await prisma.emprestimos.create({
                    data: {
                        idCliente,
                        idProduto,
                        dataEmprestimo: new Date(),
                        dataPrevDevolucao: new Date(dataPrevDevolucao),
                        dataDevolucao: new Date('01/01/1900'),
                    },
                })

                return res.status(201).json(emprestimo)
            }
            return res.status(403).json('Já está emprestado')
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
            const adevolver = await prisma.emprestimos.findUnique({
                where: { id: idEmprestimo },
            })
            const devolvido = await prisma.emprestimos.update({
                where: { id: idEmprestimo },
                data: { dataDevolucao: new Date() },
            })
            await prisma.produtos.update({
                where: { id: parseInt(devolvido.idProduto) },
                data: { disponivel: true },
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
