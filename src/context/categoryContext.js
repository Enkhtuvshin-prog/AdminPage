import { createContext, useState } from 'react';

export const CategoryContext = createContext();

const CategoryProvider = ({ children }) => {
  const [filteredCategory, setFilteredCategory] = useState([]);

  const [category, setCategory] = useState({});
  const [isEdit, setIsEdit] = useState(null);
  const [changeState, setChangeState] = useState(false);
  const [travels, setTravels] = useState([]);
  const [selectTravel, setSelectTravel] = useState({});
  
  return (
    <CategoryContext.Provider
      value={{
        filteredCategory,
        setFilteredCategory,
        
        category,
        setCategory,
        isEdit,
        setIsEdit,
        changeState,
        setChangeState,
        travels,
        setTravels,
        selectTravel,
        setSelectTravel
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryProvider;
