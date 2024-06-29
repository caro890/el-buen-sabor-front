import { useEffect } from "react";

const CallbackPage = () => {
    useEffect(() => {
        console.log("ejecutando callback page")
    }, []);
    return <div></div>;
};
  
export default CallbackPage;
