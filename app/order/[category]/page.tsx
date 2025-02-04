import Heading from "@/components/iu/Heading"
import ProductCard from "@/components/products/ProductCard"
import { prisma } from "@/src/lib/prisma"

async function getProducts(category: string) {
  const products = await prisma.product.findMany({
    where: {
      category: {
        slug: category
      }
    }
  })
  return products
}

export default async function page({params}: { params: { category : string}}) {
  const products = await getProducts(params.category)

  return (
    <>
      <Heading>Elige y personaliza tu pedido a continuación</Heading>
      <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-4 gap-4 items-start">
        {products.map(product => (
          <ProductCard
          key={product.id}
          product={product}
          />
        ))}
      </div>
    </>
  )
}
