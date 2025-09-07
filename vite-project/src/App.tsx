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

function App() {
  return (
    <ChakraProvider>
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

          </Route>
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
