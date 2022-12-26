import { Route,Routes } from'react-router-dom';
import Home from './routes/home/home.component';
import Navigation from './routes/navigation/navigation.component';
import SignIn from './routes/sign-in/sign-in.component';

const Shop = () => {
  return(
    <div>
      <hi>shop page</hi>
    </div>
  )
}

const App = () => {

  return (
    <>
      <Routes >
        <Route path='/' element={<Navigation/>}>
          <Route index element={<Home />}/>
          <Route path='shop' element={<Shop/>}/>
        </Route>
        <Route path='/sign-in' element={<SignIn/>}/>
      </Routes>
    </>
  );
};

export default App;
