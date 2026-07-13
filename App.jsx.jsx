import { useState, useEffect } from "react"
import { auth } from "./firebase.js"
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth"

const products = [
  { id: 1, name: "Parle-G Biscuit 100g", price: 10, mrp: 12, stock: 500 },
  { id: 2, name: "Tata Tea 250g", price: 55, mrp: 65, stock: 200 },
  { id: 3, name: "Surf Excel 500g", price: 80, mrp: 95, stock: 150 },
  { id: 4, name: "Maggi 70g", price: 14, mrp: 16, stock: 800 }
]

export default function App() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  const [cart, setCart] = useState([])

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })
  }, [])

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
      alert(error.message)
    }
  }

  const signup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password)
    } catch (error) {
      alert(error.message)
    }
  }

  const addToCart = (product) => {
    setCart([...cart, product])
    alert(product.name + " cart me add ho gaya!")
  }

  const total = cart.reduce((sum, item) => sum + item.price, 0)
  
  // YAHAN APNA WHATSAPP NUMBER DAALNA
  const whatsappNumber = "917250456947" 

  const sendWhatsAppOrder = () => {
    let message = `*New B2B Order - AmbikaMart*\n\n`
    cart.forEach(item => {
      message += `• ${item.name} - ₹${item.price}\n`
    })
    message += `\n*Total: ₹${total}*`
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`)
  }

  if (!user) {
    return (
      <div style={{padding: "50px", textAlign: "center", background: "#fff8f3", minHeight: "100vh"}}>
        <h1 style={{color: "#ff6b35", fontSize: "40px"}}>AmbikaMart B2B</h1>
        <p>Wholesale for Retailers</p>
        <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} style={{padding: "10px", margin: "10px", width: "250px"}} />
        <br/>
        <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} style={{padding: "10px", margin: "10px", width: "250px"}} />
        <br/>
        <button onClick={login} style={{padding: "10px 20px", background: "#ff6b35", color: "white", border: "none", margin: "5px"}}>Login</button>
        <button onClick={signup} style={{padding: "10px 20px", background: "#555", color: "white", border: "none", margin: "5px"}}>Signup</button>
      </div>
    )
  }

  return (
    <div style={{padding: "20px", maxWidth: "1200px", margin: "auto"}}>
      <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px"}}>
        <h1 style={{color: "#ff6b35"}}>AmbikaMart B2B</h1>
        <div>
          <span style={{marginRight: "20px"}}><b>Cart: {cart.length}</b> | Total: ₹{total}</span>
          <button onClick={() => signOut(auth)}>Logout</button>
        </div>
      </div>
      
      <h2>Wholesale Products</h2>
      <div style={{display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px"}}>
        {products.map(product => (
          <div key={product.id} style={{border: "1px solid #ddd", padding: "15px", borderRadius: "8px"}}>
            <h3>{product.name}</h3>
            <p><b style={{color: "#ff6b35"}}>₹{product.price}</b> <s style={{color: "gray"}}>MRP ₹{product.mrp}</s></p>
            <p>Stock: {product.stock}</p>
            <button onClick={() => addToCart(product)} style={{padding: "8px", background: "#ff6b35", color: "white", border: "none", width: "100%", borderRadius: "5px"}}>Add to Cart</button>
          </div>
        ))}
      </div>

      {/* WHATSAPP BUTTON */}
      {cart.length > 0 && (
        <div style={{marginTop: "30px", textAlign: "center"}}>
          <button 
            onClick={sendWhatsAppOrder}
            style={{padding: "15px 30px", background: "#25D366", color: "white", border: "none", borderRadius: "8px", fontSize: "18px", cursor: "pointer"}}
          >
            📱 Order on WhatsApp
          </button>
        </div>
      )}
    </div>
  )
}