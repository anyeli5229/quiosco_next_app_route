import { Order, OrderProducts, Product } from "@prisma/client";

export type OrderItem = Pick<Product, 'id' | 'name' | 'price'> & {
    quantity: number
    subtotal: number
} 

export type OrderWithProducts = Order & { //SE creaun type con la unión de las tablas que genera prisma, para asi poder mostrar los datos de las mismas y sea más facil mostrar los datos en el dom
    orderProducts: (OrderProducts & {
        product: Product
    })[]
}