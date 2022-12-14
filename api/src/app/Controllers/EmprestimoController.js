const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

class EmprestimoController {
    async getEmprestimos(req, res) {
        try {
            await prisma.$connect()
            const allEmprestimos = await prisma.emprestimos.findMany()
            const allClients = await prisma.clientes.findMany()
            const allProducts = await prisma.produtos.findMany()
            allEmprestimos.map(function (emprestimo) {
                allClients.map(function (cliente) {
                    if (cliente.id == emprestimo.idCliente) {
                        emprestimo.idCliente = emprestimo.idCliente + ' - ' +cliente.nome
                    }
                })
                allProducts.map(function (produto) {
                    if (produto.id == emprestimo.idProduto) {
                        emprestimo.idProduto = emprestimo.idProduto + ' - ' + produto.nome
                    }
                })
            })
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
            if(new Date(dataPrevDevolucao) < new Date()){
                return res.status(403).json('Previsão de devolução inválida')
            }
            if(dataPrevDevolucao == null){
                return res.status(404).json('Previsão de devolução inválida')
            }
            const estaEmprestado = await prisma.produtos.findUnique({
                where: { id: parseInt(idProduto) },
            })
            if (estaEmprestado.disponivel && dataPrevDevolucao != '') {
                const produto = await prisma.produtos.update({
                    where: { id: parseInt(idProduto) },
                    data: { disponivel: false },
                })
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
    async todosClientesProduto(req, res) {
        try {
            const { idProduto } = req.body
            const emprestimosProduto = []
            const emprestimos = await prisma.emprestimos.findMany()
            const allClients = await prisma.clientes.findMany()
            const allProducts = await prisma.produtos.findMany()
            emprestimos.map(function (emprestimo) {
                if (emprestimo.idProduto == idProduto) {
                    allClients.map(function (cliente) {
                        if (cliente.id == emprestimo.idCliente) {
                            emprestimo.idCliente = emprestimo.idCliente + ' - ' +cliente.nome
                        }
                    })
                    allProducts.map(function (produto) {
                        if (produto.id == emprestimo.idProduto) {
                            emprestimo.idProduto = emprestimo.idProduto + ' - ' + produto.nome
                        }
                    })
                    return emprestimosProduto.push(emprestimo)
                }
            })

            return res.status(201).json(emprestimosProduto)
        } catch (e) {
            return res.status(500).json(e)
        } finally {
            return async () => {
                await prisma.$disconnect()
            }
        }
    }
    async todosProdutosClientes(req, res) {
        try {
            const { idCliente } = req.body
            const emprestimosCliente = []
            const emprestimos = await prisma.emprestimos.findMany()
            const allClients = await prisma.clientes.findMany()
            const allProducts = await prisma.produtos.findMany()
            emprestimos.map(function (emprestimo) {
                if (emprestimo.idCliente == idCliente) {
                    allClients.map(function (cliente) {
                        if (cliente.id == emprestimo.idCliente) {
                            emprestimo.idCliente = emprestimo.idCliente + ' - ' +cliente.nome
                        }
                    })
                    allProducts.map(function (produto) {
                        if (produto.id == emprestimo.idProduto) {
                            emprestimo.idProduto = emprestimo.idProduto + ' - ' + produto.nome
                        }
                    })
                    return emprestimosCliente.push(emprestimo)
                }
            })

            return res.status(201).json(emprestimosCliente)
        } catch (e) {
            return res.status(500).json(e)
        } finally {
            return async () => {
                await prisma.$disconnect()
            }
        }
    }
    async clientesComProduto(req, res) {
        try {
            const clientesComItem = []
            const emprestimos = await prisma.emprestimos.findMany()
            const allClients = await prisma.clientes.findMany()
            emprestimos.map(function (emprestimo) {
                if (
                    emprestimo.dataDevolucao.toISOString() ==
                    '1900-01-01T00:00:00.000Z'
                ) {
                    allClients.map(function (cliente) {
                        if (cliente.id == emprestimo.idCliente) {
                            clientesComItem.push(cliente.nome)
                        }
                    })
                }
            })

            return res.status(201).json(clientesComItem)
        } catch (e) {
            return res.status(500).json(e)
        } finally {
            return async () => {
                await prisma.$disconnect()
            }
        }
    }
    async emprestimoAtrasado(req, res) {
        try {
            await prisma.$connect()
            const emprestimos = []
            const allEmprestimos = await prisma.emprestimos.findMany()
            const allClients = await prisma.clientes.findMany()
            const allProducts = await prisma.produtos.findMany()
            allEmprestimos.map(function (emprestimo) {
                if (
                    emprestimo.dataPrevDevolucao < new Date() &&
                    emprestimo.dataDevolucao.toISOString() ==
                        '1900-01-01T00:00:00.000Z'
                ) {
                    allClients.map(function (cliente) {
                        if (cliente.id == emprestimo.idCliente) {
                            emprestimo.idCliente = emprestimo.idCliente + ' - ' +cliente.nome
                        }
                    })
                    allProducts.map(function (produto) {
                        if (produto.id == emprestimo.idProduto) {
                            emprestimo.idProduto = emprestimo.idProduto + ' - ' + produto.nome
                        }
                    })
                    emprestimos.push(emprestimo)
                }
            })
            return res.status(200).json({ emprestimos })
        } catch (e) {
            return res.status(404).json(e)
        } finally {
            return async () => {
                await prisma.$disconnect()
            }
        }
    }
}
module.exports = new EmprestimoController()
