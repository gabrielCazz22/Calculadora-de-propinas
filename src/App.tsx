import Header from "./Header"
import { useOrder } from "./hooks/orderHook"

function App() {

  const {
    cantidad, setCantidad,
    comida, setComida,
    precio, setPrecio,
    propina, setPropina,
    listaComidas,
    subtotal, montoPropina, totalFinal,
    agregarComida, eliminarComida
  } = useOrder()


  return (
    <>
      <div className="h-screen flex flex-col bg-slate-100 overflow-hidden text-slate-800">
        <Header />
        <div className="flex w-full justify-center items-center gap-4 flex-1 p-4">

          {/* Tarjeta Izquierda (Menú) */}
          <div className="bg-white border border-slate-300 shadow-sm rounded-lg flex w-[20rem] min-h-100 p-4 flex-col gap-3 items-center justify-start">
            <h2 className="font-bold text-lg text-slate-800">Menú</h2>

            <div className="w-full flex flex-col gap-2">

              {/* Fila con los inputs */}
              <div className="flex w-full gap-2">

                <input
                  type="number"
                  className="w-15 bg-slate-50 text-xs text-center py-1.5 rounded border border-slate-300 focus:outline-none focus:border-blue-500"
                  placeholder="Cant"
                  value={cantidad}
                  onChange={(e) => setCantidad(e.target.value)}
                />

                <input
                  type="text"
                  className="flex-1 bg-slate-50 text-xs text-center py-1.5 rounded border border-slate-300 focus:outline-none focus:border-blue-500"
                  placeholder="Ej. Tacos, Pizza..."
                  value={comida}
                  onChange={(c) => setComida(c.target.value)}
                />
                <input
                  type="number"
                  className="w-20 bg-slate-50 text-xs text-center py-1.5 rounded border border-slate-300 focus:outline-none focus:border-blue-500"
                  placeholder="$ Precio"
                  value={precio}
                  onChange={(p) => setPrecio(p.target.value)}
                />
              </div>

              <button
                className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold py-2 rounded transition-colors cursor-pointer"
                onClick={agregarComida}
              >
                + Agregar Comida
              </button>

            </div>

            <div className="w-full flex flex-col gap-1.5 mt-2 overflow-y-auto max-h-60">
              {listaComidas.length === 0 ? (
                <p className="text-xs text-slate-400 text-center py-4">No hay platillos agregados aún</p>
              ) : (
                listaComidas.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center bg-slate-50 px-3 py-1.5 rounded border border-slate-200 text-xs text-slate-800 shadow-sm"
                  >
                    <span className="font-medium">
                      <span className="text-blue-600 font-bold mr-1">{item.cantidad} </span>
                      {item.comida}
                    </span>

                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-emerald-600">${(Number(item.precio) * Number(item.cantidad)).toFixed(2)}</span>

                      {/* Botón de Eliminar */}
                      <button
                        onClick={() => eliminarComida(index)}
                        className="bg-red-500 hover:bg-red-600 text-white font-bold px-1.5 py-0.5 rounded text-[10px] cursor-pointer transition-colors"
                        title="Eliminar platillo"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

          </div>

          {/* Tarjeta Derecha (Totales) */}
          <div className="bg-white border border-slate-300 shadow-sm rounded-lg flex w-[20rem] min-h-100 p-4 flex-col gap-3 items-center justify-start">

            <div className="flex flex-col w-full h-full p-3 border border-slate-200 rounded bg-slate-50">

              {/* Lista compacta */}
              <div className="w-full gap-1.5 flex flex-col">{listaComidas.map((c, position) => {
                return (
                  <div key={position} className="flex flex-row justify-between text-center items-center py-1 text-xs text-slate-700 border-b border-slate-200">
                    <h2>{c.comida}</h2>
                    <h2 className="font-mono font-semibold">${(c.precio * c.cantidad).toFixed(2)}</h2>
                  </div>
                )
              })}</div>

              {/* Botones y Totales */}
              {listaComidas.length === 0 ? (
                <div className="text-center text-slate-400 py-6 my-auto">
                  <p className="text-xs">No hay comida para mostrar</p>
                </div>
              ) : (
                <>
                  <section className="flex flex-wrap w-full p-3 justify-center gap-2 mt-auto text-white">

                    <button
                      className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-xs font-medium cursor-pointer transition-all active:scale-95"
                      onClick={() => setPropina(5)}
                    >
                      5%
                    </button>
                    <button
                      className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-xs font-medium cursor-pointer transition-all active:scale-95"
                      onClick={() => setPropina(10)}
                    >
                      10%
                    </button>
                    <button
                      className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-xs font-medium cursor-pointer transition-all active:scale-95"
                      onClick={() => setPropina(15)}
                    >
                      15%
                    </button>

                    <label className="self-center text-center text-slate-700 text-xs w-full flex items-center justify-center gap-2 mt-2">
                      Personalizado:
                      <input
                        type="number"
                        className="border border-slate-300 bg-white text-center rounded px-2 py-0.5 text-xs w-16 text-slate-800"
                        placeholder="%"
                        onChange={(e) => setPropina(Number(e.target.value))}
                      />
                    </label>

                  </section>

                  <div className="text-xs text-slate-700 flex flex-col gap-1 border-t border-slate-200 pt-2 mt-2 font-medium">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Propina:</span>
                      <span>${Number(montoPropina).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-sm text-slate-900 border-t border-slate-300 pt-1 mt-1">
                      <span>Monto Final:</span>
                      <span className="text-blue-600">${totalFinal.toFixed(2)}</span>
                    </div>
                  </div>
                </>
              )}
            </div>

          </div>

        </div>
      </div>
    </>
  )
}

export default App
