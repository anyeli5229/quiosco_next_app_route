import Heading from "@/components/iu/Heading";
import ProductsPagination from "@/components/products/ProductsPagination";
import ProductTable from "@/components/products/ProductTable";
import { prisma } from "@/src/lib/prisma";
import { redirect } from "next/navigation";
import Link from 'next/link';
import ProductSearchForm from '@/components/products/ProductSearchForm';

async function productCount() { //Retorna el número de productos que hay en la base de datos
  return await prisma.product.count()
}

async function getProducts(page: number, pageSize: number){
  const skip = (page - 1) * pageSize
  const products = await prisma.product.findMany({
    take: pageSize,
    skip,
    include: {
      category: true //Permite mostrar los datos de la categoria debido a la relación de las tablas en la base de datos
    }
  })
  return products
}

export type ProductsWhitCategory = Awaited<ReturnType<typeof getProducts>> //Exporta el type de los productos y las categorias, esto se hace por medio de typescript, es algo que lo genera 

export default async function ProductPage({searchParams}: {searchParams: {page: string}}) {
  const page = +searchParams.page || 1 //Se obtiene en querystring de page de la url en número, en caso de que no tenga se le coloca el valor de 1 para que no existan errores y siempre hay un valor 
  const pageSize = 10

  if(page < 0) redirect('/admin/products')//Se pone antes porque no depende de las consultas como el valor de totalPages, evita que se redirecione a paginas que no existe por medio de la url

  const productsData = getProducts(page, pageSize)
  const totalProductsData = productCount()

  const [products, totalProducts] = await Promise.all([productsData, totalProductsData]) //Permite realizar las consultas al mismo tiempo sin tener que esperar a que alguna finalice, esto se puede hacer debido a que las consultas son independientes entre sí
  const totalPages = Math.ceil(totalProducts/pageSize) //Permite redondear siempre el valor hacía arriba

  if(page > totalPages) redirect('/admin/products')
  
  return (
    <>
      <Heading>Administrar Productos</Heading>

      <div className='flex flex-col lg:flex-row lg:justify-between gap-5'>
              <Link href={'/admin/products/new'} className='bg-amber-400 w-full lg:w-auto text-xl px-10 py-3 text-center font-bold cursor-pointer'>Crear Producto</Link>

              <ProductSearchForm />

      </div>
      <ProductTable
        products={products}
      />

      <ProductsPagination
        page={page}
        totalPages={totalPages}
      />
    
    </>
  )
}
