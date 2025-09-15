import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import Contact from './pages/Contact';

// About sub-pages
import Team from './pages/About/Team';
import History from './pages/About/History';

// Products sub-pages
import Software from './pages/Products/Software';
import Services from './pages/Products/Services';

// Contact sub-pages
import Support from './pages/Contact/Support';
import Feedback from './pages/Contact/Feedback';
// Table
import SimpleTable from './pages/Table/SimpleTable.tsx'
import AdvancedTable from './pages/Table/AdvancedTable.tsx'
import TableDemo from './pages/Table'
// Study
import StudyDemo from './pages/Study.tsx';
import Miaobiao from './pages/Study/Miaobiao.tsx';
import Jisuan from './pages/Study/Jisuan'
import TodoContextComponent from './pages/Study/Todo_context.tsx'
import TodoReducer from './pages/Study/Todo_reducer.tsx'
import Todo from './pages/Study/Todo.tsx'
// transfer state
import TransferState from './pages/TransferState';
import ContextUse from './pages/TransferState/ContextUse';
import ZustandDemo from './pages/TransferState/Zustanddemo.tsx';
import ZustandTable from './pages/TransferState/TableDemo/ZustandTable';
import ZustandImmer from './pages/TransferState/ZustandImmer'
import ZustandStore from './pages/TransferState/ZustandStore.tsx';

// TankQuery
import TankQuery from "./pages/TankQuery";
import TankQueryBase from "./pages/TankQuery/TankQueryBase";
import TankQueryProviderBase from "./components/ProviderClient";   // 全局provider
import TankQueryAdvancedTable from './pages/TankQuery/AdvancedTable.tsx'


function App(): JSX.Element {
  return (

      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />

            {/* About Routes */}
            <Route path="about" element={<About />} />
            <Route path="about/team" element={<Team />} />
            <Route path="about/history" element={<History />} />

            {/* Products Routes */}
            <Route path="products" element={<Products />} />
            <Route path="products/software" element={<Software />} />
            <Route path="products/services" element={<Services />} />

            {/* Contact Routes */}
            <Route path="contact" element={<Contact />} />
            <Route path="contact/support" element={<Support />} />
            <Route path="contact/feedback" element={<Feedback />} />

            {/* Table Routes */}
            <Route path="table" element={<TableDemo />} />
            <Route path="table/simpletable" element={<SimpleTable />} />
            <Route path="table/advancedtable" element={<AdvancedTable />} />

            {/* Study Routes */}
            <Route path="study" element={<StudyDemo />} />
            <Route path="study/miaobiao" element={<Miaobiao />} />
            <Route path="study/jisuan" element={<Jisuan />} />
            <Route path="study/todo_reducer" element={<TodoReducer />} />
            <Route path="study/todo" element={<Todo />} />
            <Route path="study/todo_context" element={<TodoContextComponent />} />


            <Route path="transferstate" element={<TransferState />} />
            <Route path="transferstate/contextuse" element={<ContextUse />} />
            <Route path="transferstate/zustandDemo" element={<ZustandDemo />} />
            <Route path="transferstate/zustandTable" element={<ZustandTable />} />
            <Route path="transferstate/zustandImmer" element={<ZustandImmer />} />
            <Route path="transferstate/zustandStore" element={<ZustandStore />} />
            <Route path="tankquery" element={<TankQuery />} />
            <Route path="tankquery/tankquerybase" element={<TankQueryBase />} />
            <Route path="tankquery/tankqueryadvancedtable" element={<TankQueryAdvancedTable/>}/>

          </Route>
        </Routes>
      </Router>

  );
}




export default () => (
    <ChakraProvider toastOptions={{ defaultOptions: { position: 'top' } } }>
      <TankQueryProviderBase>
        <App/>
      </TankQueryProviderBase>
    </ChakraProvider>
);
