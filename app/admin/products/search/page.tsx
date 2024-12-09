import ProductSearchForm from "@/components/products/ProductSearchForm";
import Heading from "@/components/iu/Heading";
import ProductTable from "@/components/products/ProductTable";
import { prisma } from "@/src/lib/prisma";

async function searchProducts(searchTerm: string) { //Se hace la consulta de todos los productos
    const products = await prisma.product.findMany({
        where: {
            name: { //Que en su nombre 
                contains: searchTerm, //Contengan el valor de la propiedad que se le pase en la función 
                mode: 'insensitive' //Sin importar si la busqueda se reaiza en mayusculas o minusculas 
            }
        },
        include: {
            category: true
        }
    })
    return products
}

export default async function SearchPage({ searchParams }: { searchParams: { search: string } }) {

    const products = await searchProducts(searchParams.search) //Se recupera el valor de la busqueda por medio de la  url

    return (
        <>
            <Heading>Resultados de búsqueda: {searchParams.search}</Heading>

            <div className='flex flex-col lg:flex-row lg:justify-end gap-5'>
                <ProductSearchForm />
            </div>

            {products.length ? (
                <ProductTable
                    products={products}
                />
            ) : <p className="text-center text-lg">No hay resultados</p>}

        </>
    )
}