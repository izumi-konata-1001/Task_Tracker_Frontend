function OrderSortButton(props){
    const handleClick = props.handleClick;
    const order = props.order;

    return(
        <div class="w-full flex justify-center item-center px-20">
            <button onClick={handleClick}
            class="w-full h-9 bg-primary border-2 border-primary text-white px-2 py-1 rounded-md hover:bg-white hover:text-primary transition-colors duration-300">
                {order === "DESC" ? "From Latest to Oldest" : "Form Oldest to Latest"}
            </button>
        </div>
    )
}

export default OrderSortButton;