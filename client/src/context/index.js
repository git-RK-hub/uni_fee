import React, {
  useState, createContext, useCallback, useContext, useEffect
} from 'react';

const ApiContext = createContext();

export function useAPI() {
  const context = useContext(ApiContext);
  if (context === undefined) {
    throw new Error("Context must be used within a Provider");
  }
  return context;
}

export function ApiContextProvider({ children }) {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const fetchContactsData = useCallback(async () => {
      setIsLoading(true);
      try {
          fetch('http://localhost:8000/')
            .then(res => res.json())
            .then(data => {
              setIsLoading(false);
              setData(data)
            })
            .catch(err => {
              setIsLoading(false);
              alert(err);
            })
      } catch (error) {
          console.log(error);
          setIsLoading(false);
      }
  },[]);

  useEffect(() => {
    fetchContactsData();
  }, [fetchContactsData])

  return (
      <ApiContext.Provider value={{ data, isLoading }}>
          {children}
      </ApiContext.Provider>
  );
}


