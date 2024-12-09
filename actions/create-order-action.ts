"use server"
import { prisma } from "@/src/lib/prisma"
import { OrderSchema } from "@/src/schema"

 //Se crea un archivo aparte que permite que se ejecute en el servidor las funciones asincronas que se mandan a llamar en componentees del cliente 

export async function createOrder(data: unknown) {
    const result = OrderSchema.safeParse(data)
    if(!result.success) {
        return {
            errors: result.error.issues
        }
    }

    try {
        await prisma.order.create({
            data: {
                name: result.data.name,
                total: result.data.total,
                orderProducts: {
                    create: result.data.order.map(product => ({
                        productId: product.id,
                        quantity: product.quantity
                    }))
                }
            }
        })
    } catch (error) {
        console.log(error)
    }
}