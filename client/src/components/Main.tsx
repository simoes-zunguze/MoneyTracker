import react from "react";

// interface props{
    
// }
const Main: react.FC = function Main({children}) {
    return (
        <>
            <div className="main">
                    {children}
            </div>
        </>
    )
}

export default Main;