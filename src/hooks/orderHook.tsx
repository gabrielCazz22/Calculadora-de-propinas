import { useState } from "react";

export function useOrder() {


    const [propina, setPropina] = useState<number | string>("")
    const [cantidad, setCantidad] = useState<number | string>("")
    const [comida, setComida] = useState<string>("")
    const [precio, setPrecio] = useState<number | string>("")

    const [listaComidas, setListaComidas] = useState<any[]>([])



    const subtotal = listaComidas.reduce((acomulador, item) => {
        return acomulador + (Number(item.cantidad * Number(item.precio)))
    }, 0)

    const montoPropina = subtotal * (Number(propina) / 100)

    const totalFinal = subtotal + montoPropina




    function agregarComida() {
        if (!comida.trim()) return

        const nuevaComida = { cantidad: cantidad || 1, comida, precio: precio || 0 }

        setListaComidas([...listaComidas, nuevaComida])

        setCantidad("")
        setComida("")
        setPrecio("")
    }

    function eliminarComida(posicion: number) {
        const listaActualizada = listaComidas.filter((_, index) => index !== posicion)
        setListaComidas(listaActualizada)
    }

    return {
        cantidad,
        setCantidad,
        comida,
        setComida,
        precio,
        setPrecio,
        propina,
        setPropina,
        listaComidas,
        subtotal,
        montoPropina,
        totalFinal,
        agregarComida,
        eliminarComida,
    }
}