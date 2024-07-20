import { useState } from "react";
import CustomSelect from "./CustomSelect";
import Card from "./Card";

function App() {
  const [form, setForm] = useState({
    origin: "JFK",
    destination: "JFK",
    class: "Economy",
  });

  const [data,setData]=useState({
    loading:false,
    data:[],
    error:"",
    isClicked:false
  });
  const originOptions= ["JFK","DEL","SYD","BOM","BNE","BLR"];
  const destinationOptions=["JFK","DEL","SYD","LHR","CDG","DOH","SIN"];
  const classOptions=["Economy","Business","First"]
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.origin === form.destination) {
      alert("Origin and destination can't be the same");
      return;
    }
    const headers = {
      
      "accept": "application/json, text/plain, */*",
      "accept-language": "en-US,en;q=0.9,hi;q=0.8",
      "cache-control": "no-cache",
      "content-type": "application/json",
      "user-agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
    };
    let jsonData = {
      origin: form.origin,
      destination: form.destination,
      partnerPrograms: [
        "Air Canada",
        "United Airlines",
        "KLM",
        "Qantas",
        "American Airlines",
        "Etihad Airways",
        "Alaska Airlines",
        "Qatar Airways",
        "LifeMiles",
      ],
      stops: 2,
      departureTimeFrom: "2024-07-09T00:00:00Z",
      departureTimeTo: "2024-10-07T00:00:00Z",
      isOldData: false,
      limit: 302,
      offset: 0,
      cabinSelection: [`${form.class}`],
      date: "2024-07-09T12:00:17.796Z",
    };
    try {
      setData((prev)=>{
        return {...prev,loading:true,isClicked:true}
      })
      const res = await fetch("https://cardgpt.in/apitest",{method:'POST',headers:headers,body:JSON.stringify(jsonData)});
      const result=await res.json();
      console.log(result);
      setData((prev)=>{
        return {...prev,loading:false,data:result,error:""}
      })
    } catch (error) {
      setData((prev)=>{
        return {...prev,loading:false,data:[],error:error}
      })
    }
  };
  return (
    <div className="App">
      <div className="flex flex-col justify-center items-center mb-4">
        <h1 className="text-4xl mb-5">Choose Origin & Destination Airports:</h1>
          <CustomSelect options={originOptions} label="Origin" value={form.origin} name="origin" onChange={handleChange}/>
          <CustomSelect options={destinationOptions} label="Destination" name="destination" value={form.destination} onChange={handleChange}/>
          <CustomSelect options={classOptions} label="Cabin Selection" name="class" value={form.class} onChange={handleChange}/>
       
        <button onClick={handleSubmit} className="p-4 border w-80 rounded-lg">Search</button>
      </div>
      {data.loading && <h2>Loading...</h2>}
      {data.error && <h2>{data.error}</h2>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-2 lg:mx-32 ">

      {!data.loading && !data.error && data.isClicked  && data.data.data.length>0 &&
      data.data.data.map((val)=>{
        return(
          <Card cardData={val} origin={form.origin} destination={form.destination}/>
        )
      })
    }
    </div>

    {
      !data.loading && !data.error && data.isClicked && data.data.data.length===0 &&
      <h2>Try another search route.</h2>
      }
    </div>
  );
}

export default App;
