import Heading from "@/components/iu/Heading";
import AddProductForm from "@/components/products/AddProductForm";
import ProductForm from "@/components/products/ProductForm";

export default function CreateProductPage() {
  return (
    <>
      <Heading>Nuevo Producto</Heading>

      <AddProductForm> 
        {/*Se renderiza ProductForm en AddProductForm
        Pero se le guarda un espacio a ProductForm en el servidor por medio del children */}
        <ProductForm /> 
      </AddProductForm>
    
    </>
  )
}
