import { create } from 'zustand'
import { OrderItem } from './types'
import { Product } from '@prisma/client'

interface Store {
    order: OrderItem[]
    addToOrder: (product: Product) => void
    increaseQuantity: (id: Product['id']) => void
    decreaseQuantity: (id: Product['id']) => void
    removeItem: (id: Product['id']) => void
    clearOrder: () => void
}

export const useStore = create<Store>((set, get) => ({
    order: [],
    addToOrder: (product) => {
        const {categoryId, image, ...data} = product //Se separan los valores de categoryId y de image mientras que los otros datos se mantienen
        let order : OrderItem[] = []
        if(get().order.find( item => item.id === product.id)) {//Si existe un item(aliemto) selecciona que tenga el mismo id del producto que se agrega
            order = get().order.map( item => item.id === product.id ? {//Se itera sobre los elemntos de la order y si el item tiene el mismo id que el producto paara identificar que elemnto modificar
                ...item,//los datos del alimento se mantiene
                quantity: item.quantity + 1, //la cantidad del alimento aumenta
                subtotal: item.price * (item.quantity + 1)//El precio se multiplica porla cantidad de alimentos mas 1
            } : item ) //Se retorna el item en caso contrario de que no se encuentre relación de id
        } else {//Si no hay un alimento agregado
            order = [...get().order, {//Se obtiene la orden
                ...data, //Se mantiene los datos
                quantity: 1,//Pero se aumenta la cantidad 
                subtotal: 1 * product.price//Y el precio se multiplica por 1
            }]
        }
        set(() => ({
            order
        }))
    },
    increaseQuantity: (id) => {
        set((state) => ({//Esta función hace exactamente lo mismo que el id de addtoOrder, solo es una manera diferente de escribirlo
            order: state.order.map( item => item.id === id ? {
                ...item,
                quantity: item.quantity + 1,
                subtotal: item.price * (item.quantity + 1)
            } : item )
        }))
    },
    decreaseQuantity: (id) => {
        const order = get().order.map( item => item.id === id ? {
            ...item,
            quantity: item.quantity - 1,
            subtotal: item.price * (item.quantity - 1)
        } : item )

        set(() => ({
            order
        }))
    },
    removeItem: (id) => {
        set((state) => ({
            order: state.order.filter(item => item.id !== id)
        }))
    },
    clearOrder: () => {
        set(() => ({
            order: []
        }))
    }
}))