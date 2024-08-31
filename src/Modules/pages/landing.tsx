import { Maze } from "../shared/maze"
import { Navbar } from "../shared/navbar"

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
                <Maze/>
            </div>
        </div>
    )
}