import { useDebug } from "../../../../Context/debug-context"

export const DebugFragment: React.FC = () => {

    const { statusLog } = useDebug()

    return(
        <>
        {
            statusLog.map(log => (
              <>
                {"\n>"+ log}
              </>
            ))
        }
        </>
    )
}