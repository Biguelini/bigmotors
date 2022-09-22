const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

class ProductsController {
    async getProducts(req, res) {
        try {
            await prisma.$connect()
            const allProducts = await prisma.produtos.findMany()
            return res.status(200).json({ allProducts })
        } catch (e) {
            return res.status(404).json(e)
        } finally {
            return async () => {
                await prisma.$disconnect()
            }
        }
    }
    async registerProduct(req, res) {
        try {
            await prisma.$connect()

            const { nome, imagem, preco } = req.body
            if (nome == '' || imagem == '' || preco == '') {
                return res.status(406).json({ message: 'Invalid data' })
            } else {
                const createdProduct = await prisma.produtos.create({
                    data: {
                        nome,
                        imagem,
                        preco,
                        disponivel: true,
                    },
                })
                return res
                    .status(201)
                    .json({ message: 'Product created', createdProduct })
            }
        } catch (e) {
            return res.status(500).json(e)
        } finally {
            return async () => {
                await prisma.$disconnect()
            }
        }
    }
    async deleteProduct(req, res) {
        try {
            await prisma.$connect()

            const { id } = req.body
            if (id != '') {
                const deletedProduct = await prisma.produtos.delete({
                    where: { id: id },
                })
                return res
                    .status(200)
                    .json({
                        message: 'Product deleted with sucess',
                        deletedProduct,
                    })
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
module.exports = new ProductsController()
