"use client"
import useSWR from 'swr'
import OrderCard from "@/components/order/OrderCard";
import { OrderWithProducts } from '@/src/types';
import Heading from '@/components/iu/Heading';

export default function OrdersPage() {
  const url = '/admin/orders/api'
  const fetcher = () => fetch(url).then(res => res.json()).then(data => data)//Then se usa para no hacer asincrona la funcion, ya que en componentes de cliente no se puede usar async, retorna la respuesta json y data
  const { data, isLoading } = useSWR<OrderWithProducts[]>(url, fetcher, {//Toma 3 parametros, key(url), fetcher(consulta) y objeto de configuracion
    refreshInterval: 60000,//Se habilita el refresh de 1m
    revalidateOnFocus: false,//Elimina los querys

  })

  if(isLoading) return <p>Cargando...</p>
  
  if(data) return (
    <>
      <Heading>Administrar Ordenes</Heading>

      {data.length ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-5 mt-5">
          {data.map(order => (
            <OrderCard 
              key={order.id}
              order={order}
            />
          ))}
        </div>
      ) : <p className="text-center">No hay ordenes Pendientes</p>}
    </>
  )
}
