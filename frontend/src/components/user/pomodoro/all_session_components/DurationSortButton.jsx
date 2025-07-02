function DurationSortButton(props){
    const handleClick = props.handleClick;
    const order = props.order;

    return(
        <div className="w-full flex justify-center item-center">
            <button onClick={handleClick}
            className="cursor-pointer w-full h-9 bg-primary border-2 border-primary text-white px-2 py-1 rounded-xl hover:bg-white hover:text-primary transition-colors duration-300">
                {order === "DESC" ? "Longest First" : "Shortest First"}
            </button>
        </div>
    )
}

export default DurationSortButton;