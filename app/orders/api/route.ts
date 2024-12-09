import { prisma } from "@/src/lib/prisma";

export const dynamic = 'force-dynamic'

export async function GET() {
    const orders = await prisma.order.findMany({
        take: 5, //Se trae 5 elementos
        where: {
            orderReadyAt: {
                not: null //Que no tengan orderReadyAt como null, o que se hayan completado
            }
        },
        orderBy: {
            orderReadyAt: 'desc'//Por orden descendiente para que tome los ultimos 5 o mas recientes
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