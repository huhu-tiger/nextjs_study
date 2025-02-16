import React from "react";
import Count from "./components/Count";
import Person from "./components/Person";
// class App extends React.Component{
//     render(){
//         return (
//             <div>
//                 <Count/>
//                 <hr/>
//                 <Person/>
//             </div>
//         )
//     }
// }


function App(){
    return (
        <div>
                 <Count/>
                <hr/>
                <Person/>
        </div>
    )
}

export default App;