import { prisma } from "@/src/lib/prisma"

export const dynamic = 'force-dynamic'

export async function GET() {
    const orders = await prisma.order.findMany({
        where: {
            status: false //Se trae todas las ordenes que tengan el status como false 
        },
        include: { //Pero tambien incluye la relacion de orderProducts
            orderProducts: {
                include: {
                    product: true //Que a su vez incluye lao datos del producto
                }
            }
        }
    })
    return Response.json(orders)
}