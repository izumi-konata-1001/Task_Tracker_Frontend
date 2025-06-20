import { useState } from "react";

function FilterButton(){
    const [sortOrder, setSortOrder] = useState("DESC");
    const toggleOrder = () =>{
        setSortOrder((prev)=>(prev ==='DESC'? 'ASC' : 'DESC'))
    }

    return(
        <div class="w-full flex justify-center item-center px-20">
            <button onClick={toggleOrder}
            class="w-full h-9 bg-primary border-2 border-primary text-white px-2 py-1 rounded-md hover:bg-light hover:text-primary transition-colors duration-300">
                {sortOrder === "DESC" ? "Latest" : "Oldest"}
            </button>
        </div>
    )
}

export default FilterButton;