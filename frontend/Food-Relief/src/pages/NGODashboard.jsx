import { useEffect,useState } from "react";
import API from "../services/api";

function NGODashboard(){

  const [food,setFood] = useState([]);

  useEffect(()=>{

    fetchFood();

  },[]);

  const fetchFood = async () => {

    const res = await API.get("/food/available");

    setFood(res.data);

  };

  const acceptDonation = async (id) => {

    await API.put(`/food/accept/${id}`);

    alert("Donation accepted");

    fetchFood();

  };

  return(

    <div>

      <h2>Available Food</h2>

      {food.map((item)=>(
        <div key={item._id}>

          <h3>{item.foodName}</h3>
          <p>Quantity: {item.quantity}</p>
          <p>Location: {item.location}</p>

          <button onClick={()=>acceptDonation(item._id)}>
            Accept
          </button>

        </div>
      ))}

    </div>

  );

}

export default NGODashboard;