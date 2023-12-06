import { useEffect, useState } from "react";
import axios from "axios";

const Test = () => {
  const [fact, setFact] = useState("");
  const [length, setLength] = useState(0);

  const getFact = async () => {
    try {
      const response = await axios.get("https://catfact.ninja/fact");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setFact(data.fact);
      setLength(data.length);
      console.log(data);
    } catch (error) {
      console.error("Fetching fact failed:", error);
    }
  };

  useEffect(() => {
    getFact();
  }, []);

  return (
    <>
      <div className="text-red-100">Fact: {fact}</div>
      <div className="text-red-100">Length: {length}</div>
    </>
  );
};

export default Test;
