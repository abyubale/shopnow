import { Button } from "react-bootstrap";
import Products from "../components/Products/Products";
import Slides from "../components/Slides/Slides";
import { useNavigate } from "react-router-dom";
import route from "../routes/route.json";
const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Slides />
      <div className="d-flex justify-content-center">
        <div
          className="d-flex justify-content-center"
          style={{
            height: "fit-content",
            flexWrap: "wrap",
            maxWidth: "1400px",
          }}
        >
          <Products />
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <Button
          variant="success m-4"
          style={{ padding: "10px" }}
          onClick={() => navigate(`/${route.PRODUCTS}`)}
        >
          View all
        </Button>
      </div>
    </div>
  );
};

export default Home;
