function OrderKeyFilterSelector(props){
    const handleKey = props.handleKey;
    const orderKey = props.orderKey;

    return(
        <div className="w-full flex justify-center item-center">
            <select
            value={orderKey}
            onChange={(e)=>handleKey(e.target.value)}
            className="w-full bg-white text-center border-2 border-primary rounded-md py-2 px-3 text-base h-full">
                <option value="create_time">Create time</option>
                <option value="duration">Duration</option>
            </select>
        </div>
    )
}

export default OrderKeyFilterSelector;