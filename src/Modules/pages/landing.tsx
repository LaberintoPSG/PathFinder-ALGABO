import { Maze } from "../_shared/componentes/maze/maze"
import { Navbar } from "../_shared/componentes/navbar"

export const LandingPage = () => {
    return (
        <div style={{
            height: '100vh'
        }}>
            <Navbar/>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '90vh'
            }}>
                <Maze
                    length={15}
                    width={30}
                />
            </div>
        </div>
    )
}