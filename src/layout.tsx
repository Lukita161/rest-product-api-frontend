import { Outlet } from "react-router-dom"

export const Layout = ()=> {
    return (
        <>
            <header className="w-full bg-purple-500 p-6">
                <div >
                    <h1 className="text-4xl text-gray-900 font-black">Administrador de productos</h1>
                </div>
            </header>
            <main className="mt-10 mx-auto max-w-6xl p-10 bg-white shadow">
                <Outlet />
            </main>
        </>
    )
}