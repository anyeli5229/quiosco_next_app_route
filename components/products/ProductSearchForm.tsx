"use client"
import { SearchSchema } from "@/src/schema"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"

export default function ProductSearchForm() {
    const router = useRouter()
 
    const handleSearchForm = (formData: FormData) => {
        const data = {
            search: formData.get('search')//Se obtiene el valor de que se coloca en el formulario
        }
        const result = SearchSchema.safeParse(data)//Y se le pasa dicho valor al squema para que realize las verificaciones
        if(!result.success) {
            result.error.issues.forEach(issue => {
                toast.error(issue.message)
            })
            return
        }
        router.push(`/admin/products/search?search=${result.data.search}`)//Redirecciona al usuario hacía la url que contiene el QS de la busqueda que realizó en el formulario
    }

    return (
        <form
            action={handleSearchForm}
            className="flex items-center"
        >
            <input
                type="text"
                placeholder="Buscar Producto"
                className="p-2 placeholder-gray-400 w-full"
                name="search"
            />

            <input
                type="submit"
                className="bg-indigo-600 p-2 uppercase text-white cursor-pointer"
                value={'Buscar'}
            />

        </form>
    )
}