import './App.css';

function App() {

const handleGoogleSignIn =() =>{
  console.log(new Date())
}

  return (
    <div className="App">
      <button onClick={handleGoogleSignIn} style={{marginTop:'150px',backgroundColor:"#7FFFD4"}}> Sign in with Google </button> 
    </div>
  );
}

export default App;
