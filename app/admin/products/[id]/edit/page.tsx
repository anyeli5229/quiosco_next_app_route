import GoBackButton from "@/components/iu/GoBackButton"
import Heading from "@/components/iu/Heading"
import EditProductForm from "@/components/products/EditProductForm"
import ProductForm from "@/components/products/ProductForm"
import { prisma } from "@/src/lib/prisma"
import Link from "next/link"
import { notFound, redirect } from "next/navigation"

async function getProductById(id: number) {
    const product = await prisma.product.findUnique({
        where: {
            id
        }
    })
    if(!product) {
        notFound()
    }

    return product
}

export default async function EditProductsPage({ params }: { params: { id: string } }) {

    const product = await getProductById(+params.id)

    return (
        <>
            <Heading>Editar Producto: {product.name}</Heading>

            <GoBackButton />

            {/* se ejecuta en el cliente */}
            <EditProductForm> 
            {/* se ejecuta en el servidor debido al children */}
                <ProductForm 
                    product={product}
                />
            </EditProductForm>
        </>
    )
}
