import React from "react";
import "./style.css";
const Quotes = () => {
  const [quotes, setQuotes] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);
  const useEffectMount = 1
  React.useEffect(() => {
    (async function () {
      try {
        setLoading(true);
        const response = await fetch("https://api.quotable.io/random");
        const data = await response.json();
        setQuotes(data.content);
        setLoading(false);
      }
      catch(err){
        console.log("Quotes Error" , err)
      }
    })();
  }, [useEffectMount]);

  return (
    <div className="quotes_container mt-5">
      <p>Quotes</p>
      <p>{loading ? "Loading..." : quotes}</p>
    </div>
  );
};

export default Quotes;
