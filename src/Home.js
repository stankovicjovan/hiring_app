import UserList from "./UserList";
import HiredList from "./HiredList";
import useFetch from "./useFetch";

const Home = () => {
  const { data, isLoading, error } = useFetch("http://localhost:8000/users");

  const hiredData = useFetch("http://localhost:8000/hired");

  return (
    <div className="home">
      {error && <h3>{error}</h3>}
      {isLoading && <h3>Loading...</h3>}

      {data && <UserList data={data} title="Available developers" />}
      {hiredData.data && (
        <HiredList hiredData={hiredData.data} title="Hired developers" />
      )}
    </div>
  );
};

export default Home;
